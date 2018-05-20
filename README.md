Run on
* AWS EC2 (Oregon West, for quicker download)
* 64GB ram
* IAM instance profile with access to S3

install node 10
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

install git and download project
```
sudo apt-get install git
git clone https://github.com/gbradthompson/related-subreddits.git
```

download data
```
cd related-subreddits
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000000.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000001.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000002.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000003.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000004.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000005.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000006.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000007.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000008.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000009.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000010.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000011.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000012.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000013.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000014.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000015.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000016.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000017.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000018.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000019.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000020.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000021.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000022.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000023.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000024.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000025.csv"

wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000000.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000001.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000002.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000003.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000004.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000005.csv"

```


```
npm install
screen
npm start
```


all in one
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -; sudo apt-get install -y nodejs; sudo apt-get install -y build-essential; sudo apt-get install git; git clone https://github.com/gbradthompson/related-subreddits.git; cd related-subreddits; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000000.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000001.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000002.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000003.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000004.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000005.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000006.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000007.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000008.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000009.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000010.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000011.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000012.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000013.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000014.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000015.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000016.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000017.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000018.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000019.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000020.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000021.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000022.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000023.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000024.csv"; wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_3_000000000025.csv"; wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000000.csv"; wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000001.csv"; wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000002.csv"; wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000003.csv"; wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000004.csv"; wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_3_000000000005.csv"; npm install;

screen
npm start
```
