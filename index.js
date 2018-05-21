const lib = require('./lib')
const config = require('./config')
const related = require('./process_related')
const products = require('./process_products')
const about = require('./process_subreddit_about')
const chalk = require('chalk')
const Progress = require('./progress')

let json_output_chain = {}

async function process () {
  try {
    /*
    *** Process related subreddits
    */
    console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_related.js ${chalk.yellowBright('started')}`)
    await related.start(json_output_chain)
    console.log(Object.keys(json_output_chain).length, 'subreddits')

    /*
    *** Process products found in the comments
    */
    console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_products.js ${chalk.yellowBright('started')}`)
    await products.start(json_output_chain)

    /*
    *** Process about.json files for each subreddit (add subreddit description / public_description)
    */
    console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_subreddit_about.js ${chalk.yellowBright('started')}`)
    await about.start(json_output_chain)

    /*
    *** Upload files to AWS S3
    */
    console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} Uploading files to Amazon S3 ${chalk.yellowBright('started')}`)
    // let bucket = await lib.createS3Bucket()
    let bucket = config.upload_files_to_this_s3_bucket

    // upload subreddit index
    console.log(`uploading ${chalk.yellowBright('index/subreddit_list.json')} start`)
    let subredditList = Object.keys(json_output_chain)
    subredditList.sort((a, b) => {
      if (json_output_chain[a].subscribers === json_output_chain[b].subscribers) return 0
      return json_output_chain[a].subscribers > json_output_chain[b].subscribers ? -1 : 1
    })
    await lib.writeS3BucketGzip(bucket, 'index/subreddit_list.json', JSON.stringify({list: subredditList}))

    // upload all subreddit data
    console.log(`uploading ${chalk.yellowBright('index/subreddit_data.json')} start`)
    await lib.writeS3BucketGzip(bucket, 'index/subreddit_data.json', JSON.stringify(json_output_chain))

    // upload individual data files for each subreddit
    console.log(`uploading ${chalk.yellowBright('data/{subreddit}.json')} start`)
    let sent = Object.keys(json_output_chain).length
    var bar = new Progress(` :bar ${chalk.greenBright(':percent')} ${chalk.magentaBright('ETA(:etas)')}`,
    { complete: chalk.bgGreen(' '), incomplete: chalk.bgWhite(' '), width: 50, renderThrottle: 0, total: Object.keys(json_output_chain).length })
    for (var subreddit in json_output_chain) {
      if (json_output_chain.hasOwnProperty(subreddit)) {
        await lib.writeS3BucketGzip(bucket, 'data/' + subreddit + '.json', JSON.stringify(json_output_chain[subreddit]))
        sent--
        bar.tick()
        if (sent === 0) {
          console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} ${chalk.greenBright('Script is done!')}`)
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
}
process()
