const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3()
const zlib = require('zlib')
const csv = require('csv-parser')
const config = require('./config')
const chalk = require('chalk')
const Progress = require('./progress')

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

  getDirectoryNumLines (directory) {
    return new Promise((resolve, reject) => {
      let count_lines = 0
      let files = fs.readdir(path.resolve(directory), (err, files) => {
        if (err) reject(err)
        else {
          let num_processing = files.length
          files.forEach(file_name => {
            let file_path = path.resolve(directory, file_name)
            let in_quote = false
            fs.createReadStream(file_path).pipe(zlib.createGunzip())
            .on('data', chunk => {
              // console.log(chunk.toString())
              for (let i = 0; i < chunk.length; ++i) {
                if (chunk[i] === 34) in_quote = !in_quote
                if (chunk[i] === 10 && !in_quote) count_lines++
              }
            })
            .on('end', () => {
              num_processing--
              if (num_processing === 0) resolve(count_lines)
            })
          })
        }
      })
    })
  }

  loadDirectoryParsed (directory, processLine) {
    return new Promise((resolve, reject) => {
      console.log(`Calculating number of lines in ${chalk.yellowBright(directory)}`)
      this.getDirectoryNumLines(directory).then(number_of_lines => {
        console.log(`${number_of_lines} lines found ${chalk.yellowBright('start loading')}`)
        let update_every_x_lines = Math.floor(number_of_lines / 1000)
        var bar = new Progress(`Loading [:bar] :percent :rate/s ${chalk.cyanBright('Memory(:memory)')} ${chalk.magentaBright('ETA(:etas)')}`, {
          complete: '=',
          incomplete: ' ',
          width: 50,
          total: number_of_lines
        })
        let lines_loaded = 0
        let files = fs.readdir(path.resolve(directory), (err, files) => {
          if (err) reject(err)
          else {
            let num_processing = files.length
            files.forEach(file_name => {
              let file_path = path.resolve(directory, file_name)
              fs.createReadStream(file_path).pipe(zlib.createGunzip()).pipe(csv())
              .on('data', line => {
                lines_loaded++
                if (lines_loaded % update_every_x_lines === 0) bar.tick(update_every_x_lines, {memory: this.memoryUsed()}) // console.log(this.memoryUsed(), 'lines loaded:', lines_loaded)
                processLine(line)
              })
              .on('end', () => {
                num_processing--
                if (num_processing === 0) {
                  bar.terminate()
                  console.log(`Loaded ${number_of_lines} lines from ${files.length} files in ${chalk.greenBright(directory)}`)
                  resolve()
                }
              })
            })
          }
        })
      })
    })
  }

}

module.exports = new Lib()
