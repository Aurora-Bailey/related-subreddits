let o = {a: Array(1e7).fill('asdf'), b: Array(1e7).fill('asdf'), c: Array(1e7).fill('asdf')}
let start = Date.now()

function doSomethingAsync () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

function ripThroughArrayAsync (processFunction) {
  return new Promise((resolve, reject) => {
    let found_one = false
    Object.keys(o).every(letter => {
      let x = o[letter].pop()
      if (typeof x !== 'undefined') {
        found_one = true
        processFunction(x, () => {
          setTimeout(() => {
            ripThroughArrayAsync(processFunction).catch(err => {reject(err)}).then(result => {
              resolve(result)
            })
          }, 0)
        })
        return false
      }
      return true
    })
    if (!found_one) resolve('done')
  })
}


// ripThroughArrayAsync((author, callback) => {
//   let x = author
//   // console.log(x)
//   doSomethingAsync().then(() => {
//     // console.log('did somethine async')
//   })
//   callback()
// }).catch(err => {console.error(err)}).then(result => {
//   console.log(Date.now() - start)
//   console.log(result)
//   console.log(o)
// })
