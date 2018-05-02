class Config {
  constructor () {
    this.skip_subs_with_commenters_less_than = 1000
    this.skip_users_with_subs_greater_than = 100
    this.delete_cross_subs_with_overlap_less_than = 10
  }
}
module.exports = new Config()
