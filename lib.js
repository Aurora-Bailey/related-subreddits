const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3()
const zlib = require('zlib')
const csv = require('csv-parser')
const config = require('./config')

class Lib {
  constructor () {
    this.stopwatch_now = Date.now()
    this.totaltime_start = Date.now()
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

  totaltime () {
    let now = Date.now()
    return `${(now - this.totaltime_start) / 60000}`.slice(0, 7) + ' Min'
  }

  createS3Bucket (unique_bucket_name = "related-subreddits-" + Math.floor(Math.random() * 1e8)) {
    return new Promise((resolve, reject) => {
      let params = {Bucket: unique_bucket_name}
      s3.createBucket(params, function(err, data) {
        if (err) reject(err)
        else resolve(params.Bucket)
      })
    })
  }

  getS3ObjectGunzip (unique_bucket_name, object_name_with_extension) {
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: unique_bucket_name,
        Key: object_name_with_extension
      }
      s3.getObject(params, function(err, data) {
        if (err) reject(err)
        else resolve(zlib.gunzipSync(data.Body))
      })
    })
  }

  writeS3BucketGzip (unique_bucket_name, file_name, data_text) {
    return new Promise((resolve, reject) => {
      zlib.gzip(Buffer.from(data_text), (err, data_gzip) => {
        if (err) reject(err)
        else {
          let params = {
            Bucket: unique_bucket_name,
            Key: file_name,
            Body: data_gzip,
            ContentEncoding: 'gzip',
            ContentType: 'application/json'
          }
          s3.putObject(params, (err, result) => {
            if (err) reject(err)
            else resolve()
          })
        }
      })
    })
  }

  loadDirectoryParsed (directory, processLine) {
    return new Promise((resolve, reject) => {
      let files = fs.readdir(path.resolve(directory), (err, files) => {
        if (err) reject(err)
        else {
          let num_processing = files.length
          files.forEach(file_name => {
            let file_path = path.resolve(directory, file_name)
            fs.createReadStream(file_path).pipe(zlib.createGunzip()).pipe(csv())
            .on('data', line => {
              processLine(line)
            })
            .on('end', () => {
              num_processing--
              if (num_processing === 0) resolve()
            })
          })
        }
      })
    })
  }

}

module.exports = new Lib()
