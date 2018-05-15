const lib = require('./lib')
const related = require('./process_related')
const products = require('./process_products')
const about = require('./process_subreddit_about')

let json_output_chain = {}
related.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
  console.log('===========', lib.memoryUsed(), lib.totaltime(), '|', 'related done')
  products.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
    console.log('===========', lib.memoryUsed(), lib.totaltime(), '|', 'products done')
    about.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
      console.log('===========', lib.memoryUsed(), lib.totaltime(), '|', 'about done')


      lib.createS3Bucket().catch(err => {console.error(err)}).then(bucket => {
        // upload subreddit index
        let subredditList = Object.keys(json_output_chain)
        subredditList.sort((a, b) => {
          if (json_output_chain[a].subscribers === json_output_chain[b].subscribers) return 0
          return json_output_chain[a].subscribers > json_output_chain[b].subscribers ? -1 : 1
        })
        lib.writeS3BucketGzip(bucket, 'index/subreddit_list.json', JSON.stringify({list: subredditList})).catch(err => {console.error(err)}).then(() => {
          console.log('index/subreddit_list.json upload complete')
        })

        // upload all subreddit data
        lib.writeS3BucketGzip(bucket, 'index/subreddit_data.json', JSON.stringify(json_output_chain)).catch(err => {console.error(err)}).then(() => {
          console.log('index/subreddit_data.json upload complete')
        })

        // upload individual data files for each subreddit
        let sent = Object.keys(json_output_chain).length
        Object.keys(json_output_chain).forEach(key => {
          lib.writeS3BucketGzip(bucket, 'data/' + key + '.json', JSON.stringify(json_output_chain[key])).catch(err => {console.error(err)}).then(() => {
            sent--
            console.log(sent)
            if (sent === 0) console.log('done')
          })
        })
      })
    })
  })
})
