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
        let sent = Object.keys(json_output_chain).length
        Object.keys(json_output_chain).forEach(key => {
          lib.writeS3BucketGzip(bucket, key + '.json', JSON.stringify(json_output_chain[key])).catch(err => {console.error(err)}).then(() => {
            sent--
            console.log(sent)
            if (sent === 0) console.log('done')
          })
        })
      })
    })
  })
})
