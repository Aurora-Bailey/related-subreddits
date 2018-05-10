const config = require('./config')
const marked = require('marked')
const rp = require('request-promise')
const lib = require('./lib')

class ProcessSubredditAbout {
  constructor () {
    this.data_directory = './data/author_subreddits/'
    this.subreddit_about_pages = {}
  }

  start (json_output_chain) {
    return new Promise((resolve, reject) => {
      lib.getS3ObjectGunzip('ngau', 'subreddit_about.json').catch(err => {console.error(err)}).then(data => {
        this.subreddit_about_pages = JSON.parse(data)

        let subreddits_without_data = this.subredditsNotInData(json_output_chain)
        console.log(JSON.stringify(subreddits_without_data))
        console.log(subreddits_without_data.length, 'Subreddits found without data!')
        console.log(Object.keys(this.subreddit_about_pages).length, 'Subreddits found on S3.')
        this.pullSubredditData(subreddits_without_data, () => {
          lib.writeS3BucketGzip('ngau', 'subreddit_about.json', JSON.stringify(this.subreddit_about_pages)).catch(err => {console.error(err)}).then(() => {
            this.writeAbout(json_output_chain)
            resolve()
          })
        })
      })


    })
  }

  writeAbout (json_output_chain) {
    Object.keys(json_output_chain).forEach(sub => {
      if (sub === '_index_subreddits') return false
      json_output_chain[sub].x_subs.public_description = []
      json_output_chain[sub].x_subs.subscribers = []
      json_output_chain[sub].x_subs.over18 = []
      json_output_chain[sub].x_subs.subreddits.forEach(subreddit => {
        if (typeof this.subreddit_about_pages[subreddit] === 'object') {
          json_output_chain[sub].x_subs.public_description.push(marked(this.subreddit_about_pages[subreddit].public_description))
          json_output_chain[sub].x_subs.subscribers.push(marked(this.subreddit_about_pages[subreddit].subscribers))
          json_output_chain[sub].x_subs.over18.push(marked(this.subreddit_about_pages[subreddit].over18))
        } else {
          json_output_chain[sub].x_subs.public_description.push('Description not found!')
          json_output_chain[sub].x_subs.subscribers.push(0)
          json_output_chain[sub].x_subs.over18.push(false)
        }
      })
    })
  }

  subredditsNotInData (json_output_chain) {
    let list = []
    Object.keys(json_output_chain).forEach(subreddit => {
      if (subreddit === '_index_subreddits') return false
      if (typeof this.subreddit_about_pages[subreddit] !== 'object') list.push(subreddit)
    })
    return list
  }

  pullSubredditData (subreddit_list, callback) {
    if (subreddit_list.length === 0) {
      callback()
    } else {
      let sub = subreddit_list.pop()
      console.log('Pulling about for', sub)
      const options = {uri: `https://www.reddit.com/r/${sub}/about.json`, json: true}
      rp(options).then(results => {
        this.subreddit_about_pages[sub] = results.data
        setTimeout(() => {
          this.pullSubredditData(subreddit_list, callback)
        }, 1000)
      }).catch(err => {
        console.log('=========== Failed', options.uri)
        console.log(err)
        setTimeout(() => {
          this.pullSubredditData(subreddit_list, callback)
        }, 1000)
      })
      // asdf

    }
  }
}

module.exports = new ProcessSubredditAbout()
