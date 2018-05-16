const config = require('./config')
const lib = require('./lib')
const chalk = require('chalk')
const Progress = require('./progress')

class ProcessClique {
  constructor () {
    this.asdf = ''
  }

  start (json_output_chain) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}

module.exports = new ProcessClique()
