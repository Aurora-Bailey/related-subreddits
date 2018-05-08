const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3()
const zlib = require('zlib')
const config = require('./config')

class Lib {
  constructor () {
    this.stopwatch_now = Date.now()
  }

  memoryUsed () {
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    return `${used}`.slice(0, 6) + ' MB'
  }

  stopwatch () {
    let then = this.stopwatch_now
    this.stopwatch_now = Date.now()
    return `${(this.stopwatch_now - then) / 1000}`.slice(0, 6) + ' Sec'
  }

  createS3Bucket (unique_bucket_name = "related-subreddits-" + Math.floor(Math.random() * 1e8)) {
    return new Promise((resolve, reject) => {
      let params = {Bucket: unique_bucket_name}
      s3.createBucket({Bucket: params.Bucket}, function(err, data) {
        if (err) reject(err)
        else resolve(params.Bucket)
      })
    })
  }

  writeS3Bucket (unique_bucket_name, file_name, data) {
    return new Promise((resolve, reject) => {
      zlib.gzip(Buffer.from(data), (err, data_gzip) => {
        if (err) reject(err)
        else {
          let params = {
            Bucket: unique_bucket_name,
            Key: file_name,
            Body: data_gzip,
            ContentEncoding: 'gzip',
            ContentType: 'application/json'
          }
          s3.putObject(params, function(err, data) {
            if (err) reject(err)
            else resolve()
          })
        }
      })
    })
  }

  loadDirectoryFilesAsTextArrays (directory) {
    return new Promise((resolve, reject) => {
      let files = fs.readdir(path.resolve(directory), (err, files) => {
        if (err) reject(err)
        else {
          let data_array = []
          files.forEach(file_name => {
            let filepath = path.resolve(directory, file_name)
            let text_data = zlib.gunzipSync(fs.readFileSync(filepath)).toString().trim()
            data_array.push(text_data)
          })
          resolve(data_array)
        }
      })
    })
  }

}

module.exports = new Lib()
