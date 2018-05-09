const marked = require('marked')
const config = require('./config')
const lib = require('./lib')

class ProcessProducts {
  constructor () {
    this.data_directory = './data/comments_with_product_links/'

    this.subreddits_object = {}
    this.products_object = {}
  }

  start (json_output_chain) {
    return new Promise((resolve, reject) => {
      console.log(lib.memoryUsed(), lib.stopwatch(), '|', 'Start process product')
      this.loadParseCSV().catch(err => {console.error(err)}).then(() => {
        console.log(lib.memoryUsed(), lib.stopwatch(), '|', `End csv load`)
        this.writeProducts(json_output_chain)
        console.log(lib.memoryUsed(), lib.stopwatch(), '|', 'Write products')

        setTimeout(() => {resolve(true)}, 0)
      })
    })
  }

  loadParseCSV () {
    return lib.loadDirectoryParsed(this.data_directory, line => {
      let {author, subreddit, created_utc, retrieved_on, gilded, score, body} = line

      // Find Amazon links
      let amazon_product_array = [] // {name: 'Amazon-Product': asin: 'ASDFGHQWER'}
      let amazon_links = body.match(/(www\.amazon\.com\/([a-zA-Z0-9\.\-\?\+\_\=\&\;\:\%]*\/|)dp\/[A-Z0-9]{10}|www\.amzn\.com\/[A-Z0-9]{10})/g)
      if (amazon_links !== null) {
        amazon_links.forEach(link => {
          let link_split = link.split('/')
          if (link_split.length === 4) { // www.amazon.com/Adventures-Pepe-Pede-Eric-Hauser/dp/1682616738
            let [domain, name, dp, asin] = link_split
            amazon_product_array.push({name, asin})
          } else if (link_split.length === 3) { // www.amazon.com/dp/1682616738
            let [domain, dp, asin] = link_split
            amazon_product_array.push({name: '', asin})
          } else if (link_split.length === 2) { // www.amzn.com/B000NCOKZQ
            let [domain, asin] = link_split
            amazon_product_array.push({name: '', asin})
          }
        })
      }

      // Commit amazon products to memory
      amazon_product_array.forEach(product => {
        // Products
        if (typeof this.products_object[product.asin] !== 'object') this.products_object[product.asin] = {asin: product.asin, name: product.name, count: 0}
        if (product.name.length > this.products_object[product.asin].name.length) this.products_object[product.asin].name = product.name
        this.products_object[product.asin].count++

        // Subreddits
        if (typeof this.subreddits_object[subreddit] !== 'object') this.subreddits_object[subreddit] = {products: {}}
        if (typeof this.subreddits_object[subreddit].products[product.asin] !== 'object') {
          this.subreddits_object[subreddit].products[product.asin] = {ref: this.products_object[product.asin], count: 0, best_comment: body, comment_score: score}
        }
        this.subreddits_object[subreddit].products[product.asin].count++
        if (score > this.subreddits_object[subreddit].products[product.asin].comment_score) this.subreddits_object[subreddit].products[product.asin].best_comment = body
      })

    })
  }

  writeProducts (json_output_chain) {
    Object.keys(this.subreddits_object).forEach(subreddit => {
      if (typeof json_output_chain[subreddit] !== 'object') return false // json_output_chain[subreddit] = {}
      json_output_chain[subreddit].products = {asin: [], name: [], comment: [], count: []}

      // Flatten to array
      let products_array = []
      Object.keys(this.subreddits_object[subreddit].products).forEach(product => {
        products_array.push({
          asin: this.subreddits_object[subreddit].products[product].ref.asin,
          name: this.subreddits_object[subreddit].products[product].ref.name,
          t_count: this.subreddits_object[subreddit].products[product].ref.count, // total count
          s_count: this.subreddits_object[subreddit].products[product].count, // subreddit count
          comment: this.subreddits_object[subreddit].products[product].best_comment,
        })
      })

      // Sort array
      products_array.sort((a, b) => {
        if (a.s_count == b.s_count) return 0
        return a.s_count > b.s_count ? -1 : 1
      })

      // Write top results
      products_array.slice(0, config.number_of_products_per_subreddit).forEach(product => {
        json_output_chain[subreddit].products.asin.push(product.asin)
        json_output_chain[subreddit].products.name.push(product.name)
        json_output_chain[subreddit].products.count.push(product.s_count)
        json_output_chain[subreddit].products.comment.push(marked(product.comment))
      })
    })
  }
}

module.exports = new ProcessProducts()
