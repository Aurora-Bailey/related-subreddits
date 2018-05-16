const lib = require('./lib')
const related = require('./process_related')
const products = require('./process_products')
const about = require('./process_subreddit_about')
const chalk = require('chalk')
const Progress = require('./progress')

let json_output_chain = {}
console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_related.js ${chalk.yellowBright('started')}`)
related.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
  console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_related.js ${chalk.greenBright('done')}`)
  console.log('')
  console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_products.js ${chalk.yellowBright('started')}`)
  products.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
    console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_products.js ${chalk.greenBright('done')}`)
    console.log('')
    console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_subreddit_about.js ${chalk.yellowBright('started')}`)
    about.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
      console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} process_subreddit_about.js ${chalk.greenBright('done')}`)
      console.log('')
      console.log(`${chalk.cyanBright(lib.memoryUsed())} ${chalk.magentaBright(lib.totaltime())} Uploading files to Amazon S3 ${chalk.yellowBright('started')}`)

      lib.createS3Bucket().catch(err => {console.error(err)}).then(bucket => {
        console.log(`Created bucket ${chalk.greenBright(bucket)}`)
        // upload subreddit index
        let subredditList = Object.keys(json_output_chain)
        subredditList.sort((a, b) => {
          if (json_output_chain[a].subscribers === json_output_chain[b].subscribers) return 0
          return json_output_chain[a].subscribers > json_output_chain[b].subscribers ? -1 : 1
        })
        console.log(`uploading ${chalk.yellowBright('index/subreddit_list.json')} start`)
        lib.writeS3BucketGzip(bucket, 'index/subreddit_list.json', JSON.stringify({list: subredditList})).catch(err => {console.error(err)}).then(() => {
          console.log(`upload ${chalk.greenBright('index/subreddit_list.json')} complete`)
          // upload all subreddit data
          console.log(`uploading ${chalk.yellowBright('index/subreddit_data.json')} start`)
          lib.writeS3BucketGzip(bucket, 'index/subreddit_data.json', JSON.stringify(json_output_chain)).catch(err => {console.error(err)}).then(() => {
            console.log(`upload ${chalk.greenBright('index/subreddit_data.json')} complete`)
            console.log(`uploading ${chalk.yellowBright('data/subreddit.json')} start`)
            // upload individual data files for each subreddit
            let sent = Object.keys(json_output_chain).length
            var bar = new Progress(` :bar ${chalk.greenBright(':percent')} ${chalk.magentaBright('ETA(:etas)')}`, {
              complete: chalk.bgGreen(' '),
              incomplete: chalk.bgWhite(' '),
              width: 50,
              renderThrottle: 0,
              total: Object.keys(json_output_chain).length
            })
            Object.keys(json_output_chain).forEach(key => {
              lib.writeS3BucketGzip(bucket, 'data/' + key + '.json', JSON.stringify(json_output_chain[key])).catch(err => {console.error(err)}).then(() => {
                sent--
                bar.tick()
                if (sent === 0) {
                  bar.terminate()
                  console.log(`upload ${chalk.greenBright('data/subreddit.json')} complete`)
                  console.log(chalk.greenBright('Script is done!'))
                }
              })
            })
          })
        })


      })
    })
  })
})
