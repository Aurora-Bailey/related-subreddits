const config = require('./config')
const marked = require('marked')
const rp = require('request-promise')
const lib = require('./lib')
const chalk = require('chalk')
const Progress = require('./progress')

class ProcessSubredditAbout {
  constructor () {
    this.data_directory = './data/author_subreddits/'
    this.subreddit_about_pages = {}
  }

  start (json_output_chain) {
    return new Promise((resolve, reject) => {
      console.log(`Downloading about page from s3 ${chalk.cyanBright(lib.memoryUsed())} ${chalk.redBright(lib.stopwatch())}`)
      lib.getS3ObjectGunzip('ngau', 'subreddit_about.json').catch(err => {console.error(err)}).then(data => {
        console.log(`Loaded about page from s3 ${chalk.cyanBright(lib.memoryUsed())} ${chalk.redBright(lib.stopwatch())}`)
        this.subreddit_about_pages = JSON.parse(data)

        let subreddits_without_data = this.subredditsNotInData(json_output_chain)
        let subreddits_without_data_length = subreddits_without_data.length
        console.log(`${Object.keys(this.subreddit_about_pages).length} Subreddits found on S3.`)
        console.log(`${chalk.redBright(subreddits_without_data_length)} Subreddits found without data!`)
        this.pullSubredditData(subreddits_without_data, () => {
          console.log(`Loaded abbout pages from reddit ${chalk.cyanBright(lib.memoryUsed())} ${chalk.redBright(lib.stopwatch())}`)
          if (subreddits_without_data_length > 0) {
            console.log('upload about file back to S3')
            lib.writeS3BucketGzip('ngau', 'subreddit_about.json', JSON.stringify(this.subreddit_about_pages)).catch(err => {console.error(err)}).then(() => {
              this.writeAbout(json_output_chain)
              resolve()
            })
          } else {
            console.log('skip S3 upload')
            this.writeAbout(json_output_chain)
            resolve()
          }
        })
      })


    })
  }

  writeAbout (json_output_chain) {
    Object.keys(json_output_chain).forEach(sub => {
      // if (typeof this.subreddit_about_pages[sub].description === 'undefined') this.subreddit_about_pages[sub].description = this.subreddit_about_pages[sub].error_message
      if (typeof this.subreddit_about_pages[sub].public_description === 'undefined') this.subreddit_about_pages[sub].public_description = this.subreddit_about_pages[sub].error_message
      // json_output_chain[sub].banner_img = this.subreddit_about_pages[sub].banner_img || ''
      // json_output_chain[sub].header_img = this.subreddit_about_pages[sub].header_img || ''
      // json_output_chain[sub].icon_img = this.subreddit_about_pages[sub].icon_img || ''
      // json_output_chain[sub].description = marked(this.subreddit_about_pages[sub].description)
      json_output_chain[sub].public_description = marked(this.subreddit_about_pages[sub].public_description)
      json_output_chain[sub].subscribers = this.subreddit_about_pages[sub].subscribers || 0
      json_output_chain[sub].accounts_active = this.subreddit_about_pages[sub].accounts_active || 0
      json_output_chain[sub].created_utc = this.subreddit_about_pages[sub].created_utc || 0

      json_output_chain[sub].x_subs.public_description = []
      json_output_chain[sub].x_subs.subscribers = []
      json_output_chain[sub].x_subs.over18 = []
      json_output_chain[sub].x_subs.subreddits.forEach(subreddit => {
        if (typeof this.subreddit_about_pages[subreddit].public_description === 'undefined') this.subreddit_about_pages[subreddit].public_description = this.subreddit_about_pages[subreddit].error_message
        json_output_chain[sub].x_subs.public_description.push(marked(this.subreddit_about_pages[subreddit].public_description))
        json_output_chain[sub].x_subs.subscribers.push(this.subreddit_about_pages[subreddit].subscribers || 0)
        json_output_chain[sub].x_subs.over18.push(this.subreddit_about_pages[subreddit].over18 || false)
      })
    })
  }

  subredditsNotInData (json_output_chain) {
    let list = []
    Object.keys(json_output_chain).forEach(subreddit => {
      if (typeof this.subreddit_about_pages[subreddit] !== 'object') list.push(subreddit)
    })
    return list
  }

  pullSubredditData (subreddit_list, callback) {
    if (subreddit_list.length === 0) {
      callback()
    } else {
      let sub = subreddit_list.pop()
      console.log(`Pulling about for ${chalk.yellowBright(sub)}`)
      const options = {uri: `https://www.reddit.com/r/${sub}/about.json`, json: true}
      rp(options).then(results => {
        this.subreddit_about_pages[sub] = results.data
        setTimeout(() => {
          this.pullSubredditData(subreddit_list, callback)
        }, 1000)
      }).catch(err => {
        if (!err.error) err.error = {}
        if (!err.error.reason) err.error.reason = 'unknown'
        this.subreddit_about_pages[sub] = {error_message: err.error.reason}
        console.log(chalk.redBright('Failed'), options.uri, 'set data', JSON.stringify(this.subreddit_about_pages[sub]))
        setTimeout(() => {
          this.pullSubredditData(subreddit_list, callback)
        }, 1000)
      })
      // asdf

    }
  }
}

module.exports = new ProcessSubredditAbout()
