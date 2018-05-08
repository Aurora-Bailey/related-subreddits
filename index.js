const lib = require('./lib')
const related = require('./process_related')

let json_output_chain = {}
related.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
  // console.log(JSON.stringify(json_output_chain['AskReddit']))
  console.log(lib.memoryUsed())
})



// lib.createS3Bucket().catch(err => {console.error(err)}).then(bucket => {
//   let sent = Object.keys(json_output_chain).length
//   Object.keys(json_output_chain).forEach(key => {
//     lib.writeS3Bucket(bucket, key + '.json', JSON.stringify(json_output_chain[key])).catch(err => {console.error(err)}).then(() => {
//       sent--
//       console.log(sent)
//       if (sent === 0) console.log('done')
//     })
//   })
// })
