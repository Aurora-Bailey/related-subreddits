const related = require('./process_related')

let json_output_chain = {}
related.start(json_output_chain).catch(err => {console.error(err)}).then(done => {
  console.log(JSON.stringify(json_output_chain['AskReddit']))
})
