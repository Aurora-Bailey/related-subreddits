const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

function createS3Bucket () {
  return new Promise((resolve, reject) => {
    let bucketName = "related-subreddits-" + Math.floor(Math.random() * 1e8)
    console.log('######################### Create new bucket #########################')
    console.log(bucketName)
    s3.createBucket({Bucket: bucketName}, function(err, data) {
      if (err) reject(err)
      else resolve(bucketName)
    })
  })
}

function writeS3Bucket (bucket, name, data) {
  return new Promise((resolve, reject) => {
    params = {Bucket: bucket, Key: name, Body: data}
    console.log('write ', name)
    s3.putObject(params, function(err, data) {
      console.log('saved ', name)
      if (err) reject(err)
      else resolve()
    })
  })
}

function memoryUsed () {
  const used = process.memoryUsage().heapUsed / 1024 / 1024
  console.log(`The script uses approximately ${used} MB`)
}

let now = Date.now()
function stopwatch () {
  let then = now
  now = Date.now()
  return (now - then) / 1000
}

function padWithZero (num) {
  if (parseInt(num) < 10) return '0' + num
  else return '' + num
}

function loadChunk (index) {
  let file = path.resolve('./data/author_subreddits_all_0000000000' + padWithZero(index))
  console.log('Loading -', file)
  let content = fs.readFileSync(file).toString().trim().split('\n')
  content.shift()
  console.log('Processing')
  processChunk(content)
}

let author_object = {}
let author_array = {}
let subreddit_object = {}
let subreddit_array = {}
function processChunk (chunk) {
  chunk.forEach(item => {
    let [author, subreddit] = item.split(',')

    let a_c = author.charAt(0)
    let s_c = subreddit.charAt(0)

    if (typeof subreddit_object[s_c] !== 'object') {
      subreddit_object[s_c] = {}
      subreddit_array[s_c] = []
    }
    if (typeof author_object[a_c] !== 'object') {
      author_object[a_c] = {}
      author_array[a_c] = []
    }

    if (typeof subreddit_object[s_c][subreddit] !== 'object') {
      subreddit_object[s_c][subreddit] = {nm: subreddit,/* id: subreddit_array[s_c].length,*/ cmt: 0}
      subreddit_array[s_c].push(subreddit_object[s_c][subreddit])
    }

    if (typeof author_object[a_c][author] !== 'object') {
      author_object[a_c][author] = {/*id: author_array[a_c].length, */sub: []}
      author_array[a_c].push(author_object[a_c][author])
    }

    subreddit_object[s_c][subreddit].cmt++
    author_object[a_c][author].sub.push(subreddit_object[s_c][subreddit])

  })
  memoryUsed()
  console.log('######################### Chunk Time:', stopwatch(), '#########################')
}

// { nm: 'SaintPoitiersbourg', cmt: 2 }
function loopThroughSubredditsArray (processFunction) {
  Object.keys(subreddit_array).forEach(letter => {
    subreddit_array[letter].forEach(sub => {
      processFunction(sub)
    })
  })
}

// { sub: [ { nm: 'nanaimo', cmt: 65 }, {...} ] }
function loopThroughAuthorsArray (processFunction) {
  Object.keys(author_array).forEach(letter => {
    author_array[letter].forEach(auth => {
      processFunction(auth)
    })
  })
}

function testLoopSpeed () {
  console.log('######################### Test Loop Speed #########################')
  loopThroughSubredditsArray(sub => {})
  console.log('Subreddit array empty loop:', stopwatch())
  loopThroughAuthorsArray(author => {})
  console.log('Author array empty loop:', stopwatch())
}

let comment_minimum = 1000
function crunch () {
  let response_array = []

  console.log('######################### Write index #########################')
  let sub_list = []
  let sub_cmt = []
  loopThroughSubredditsArray(sub => {
    if (sub.cmt < comment_minimum) return false
    sub_list.push(sub.nm)
    sub_cmt.push(sub.cmt)
  })
  console.log(sub_list.length)
  response_array.push({sub: '_index_subreddits', data: JSON.stringify({length: sub_list.length, list: sub_list, cmt: sub_cmt})})

  console.log('######################### Start the crunch #########################')
  loopThroughSubredditsArray(sub => {
    if (sub.cmt < comment_minimum) return false
    let response = {subreddit: sub.nm, c: sub.cmt, x_subs: {}}
    loopThroughAuthorsArray(author => {
      let match = false
      author.sub.forEach(sr => {
        if (sub == sr) match = true
      })

      if (match) {
        author.sub.forEach(sr => {
          if (sr.cmt < comment_minimum) return false
          if (sr == sub) return false
          if (typeof response.x_subs[sr.nm] !== 'object') response.x_subs[sr.nm] = {x: 0, c: sr.cmt}
          response.x_subs[sr.nm].x++
        })
      }

    })
    response_array.push({sub: sub.nm, data: JSON.stringify(response)})
    console.log(sub.nm, stopwatch())
  })
  return response_array
}

function writeAll (response_array) {
  return new Promise((resolve, reject) => {
    createS3Bucket().catch(err => reject(err)).then(bucket => {
      console.log('######################### Upload to S3 #########################')
      let sent = 0
      let sending = response_array.length
      response_array.forEach(response => {
        writeS3Bucket(bucket, '' + response.sub + '.json', response.data).catch(err => {reject(err)}).then(() => {
          sent++
          if (sending == sent) resolve()
        })
      })
    })
  })
}

// Start
console.log('######################### Start #########################')

// Load from file
for (var i = 0; i < 24; i++) {
  loadChunk(i)
}

// Test loop speed
testLoopSpeed()

// Crunch and writeToFile
writeAll(crunch()).catch(err => {console.error(err)}).then(() => {
  console.log('')
  console.log('######################### Done #########################')
})
