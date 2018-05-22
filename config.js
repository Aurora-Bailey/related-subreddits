class Config {
  constructor () {
    this.skip_subs_with_commenters_less_than = 700
    this.skip_users_with_subs_greater_than = 100
    this.delete_cross_subs_with_overlap_less_than = 3
    this.number_of_x_subs_per_subreddit = 100

    this.number_of_products_per_subreddit = 10

    this.upload_files_to_this_s3_bucket = "reddit.guide"
  }
}
module.exports = new Config()
