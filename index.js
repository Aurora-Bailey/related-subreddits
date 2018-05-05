const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
const zlib = require('zlib')
const parse = require('csv-parse/lib/sync')
const s3 = new AWS.S3()
const config = require('./config')

function createS3Bucket () {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: "related-subreddits-" + Math.floor(Math.random() * 1e8),
      CreateBucketConfiguration: {
        LocationConstraint: "us-west-2"
      }
    }
    console.log(params.Bucket)
    console.log('######################### Create new bucket #########################')
    s3.createBucket({Bucket: params.Bucket}, function(err, data) {
      if (err) reject(err)
      else resolve(params.Bucket)
    })
  })
}

function writeS3Bucket (bucket, name, data) {
  return new Promise((resolve, reject) => {
    zlib.gzip(Buffer.from(data), (err, data_gzip) => {
      if (err) reject(err)
      else {
        params = {Bucket: bucket, Key: name, Body: data_gzip, ContentEncoding: 'gzip', ContentType: 'application/json'}
        // console.log('write ', name)
        s3.putObject(params, function(err, data) {
          console.log('saved ', name)
          if (err) reject(err)
          else resolve()
        })
      }
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
  let file = path.resolve('./data/author_subreddits_all_0000000000' + padWithZero(index) + '.csv')
  console.log('Loading -', file)
  let content = zlib.gunzipSync(fs.readFileSync(file)).toString().trim().split('\n')
  content.shift() // remove [ 'author', 'subreddit' ]
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

function crunch () {
  let response_array = []

  console.log('######################### Write index #########################')
  let sub_list = []
  let sub_cmt = []
  loopThroughSubredditsArray(sub => {
    if (sub.cmt < config.skip_subs_with_commenters_less_than) return false
    sub_list.push(sub.nm)
    sub_cmt.push(sub.cmt)
  })
  console.log(sub_list.length)
  let total_subreddits = sub_list.length
  response_array.push({sub: '_index_subreddits', data: JSON.stringify({length: sub_list.length, list: sub_list, cmt: sub_cmt})})

  console.log('######################### Start the crunch #########################')
  let count_authors = 0
  loopThroughAuthorsArray(author => {
    count_authors++
    if (count_authors % 1e4 === 0) {
      console.log(count_authors)
      memoryUsed()
    }
    if (author.sub.length > config.skip_users_with_subs_greater_than) return false
    author.sub.forEach(subreddit => {
      if (subreddit.cmt < config.skip_subs_with_commenters_less_than) return false
      author.sub.forEach(sub => {
        if (sub.cmt < config.skip_subs_with_commenters_less_than) return false
        if (sub.nm == subreddit.nm) return false
        if (typeof subreddit['x_subs'] !== 'object') subreddit['x_subs'] = {}
        if (typeof subreddit.x_subs[sub.nm] !== 'object') subreddit.x_subs[sub.nm] = {x: 0, c: sub.cmt}
        subreddit.x_subs[sub.nm].x++
      })
    })
  })
  console.log('Loop through authors', stopwatch())
  memoryUsed()

  let count_subreddits = 0
  loopThroughSubredditsArray(subreddit => {
    if (typeof subreddit['x_subs'] === 'undefined') return false

    count_subreddits++
    if (count_subreddits % 1e3 === 0) memoryUsed()

    // delete x_subs with only 1 user
    Object.keys(subreddit.x_subs).forEach(sub => {
      if (subreddit.x_subs[sub].x < config.delete_cross_subs_with_overlap_less_than) {
        delete subreddit.x_subs[sub]
      }
    })
    if(Object.keys(subreddit.x_subs).length <1) return false

    // build response
    let response = {subreddit: subreddit.nm, c: subreddit.cmt, x_subs: subreddit.x_subs}
    response_array.push({sub: subreddit.nm, data: JSON.stringify(response)})
  })
  console.log('Loop through subreddits', stopwatch())
  memoryUsed()

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
for (var i = 0; i < config.number_of_files_to_load; i++) {
  loadChunk(i)
}

// Crunch and writeToFile
writeAll(crunch()).catch(err => {console.error(err)}).then(() => {
  console.log('')
  console.log('######################### Done #########################')
})
