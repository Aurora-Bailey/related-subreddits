## This directory will hold the raw csv files compiled from reddit comments.

Download csv from AWS S3 (Oregon West)

```
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000000.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000001.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000002.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000003.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000004.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000005.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000006.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000007.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000008.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000009.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000010.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000011.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000012.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000013.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000014.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000015.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000016.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000017.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000018.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000019.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000020.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000021.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000022.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000023.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000024.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000025.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000026.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000027.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000028.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000029.csv"
wget -P ./data/author_subreddits/ "http://data.reddit.guide/author_subreddit_unique_2018_8_000000000030.csv"

wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000000.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000001.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000002.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000003.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000004.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000005.csv"
wget -P ./data/comments_with_product_links/ "http://data.reddit.guide/comments_with_products_2018_8_000000000006.csv"

```

OR build a new one with [Google BigQuery reddit dataset](https://bigquery.cloud.google.com/table/fh-bigquery:reddit_comments.2015_05)

BigQuery steps
1. use legacy SQL (probably even the legacy ui too) save to BigQuery table
2. export table to a gzip csv on google cloud storage
3. download and re-upload to AWS data.reddit.guide aws s3 cp ./folder s3://data.reddit.guide --recursive

```
SELECT author, subreddit
FROM [fh-bigquery:reddit_comments.2005],
[fh-bigquery:reddit_comments.2006],
[fh-bigquery:reddit_comments.2007],
[fh-bigquery:reddit_comments.2008],
[fh-bigquery:reddit_comments.2009],
[fh-bigquery:reddit_comments.2010],
[fh-bigquery:reddit_comments.2011],
[fh-bigquery:reddit_comments.2012],
[fh-bigquery:reddit_comments.2013],
[fh-bigquery:reddit_comments.2014],
[fh-bigquery:reddit_comments.2015_01],
[fh-bigquery:reddit_comments.2015_02],
[fh-bigquery:reddit_comments.2015_03],
[fh-bigquery:reddit_comments.2015_04],
[fh-bigquery:reddit_comments.2015_05],
[fh-bigquery:reddit_comments.2015_06],
[fh-bigquery:reddit_comments.2015_07],
[fh-bigquery:reddit_comments.2015_08],
[fh-bigquery:reddit_comments.2015_09],
[fh-bigquery:reddit_comments.2015_10],
[fh-bigquery:reddit_comments.2015_11],
[fh-bigquery:reddit_comments.2015_12],
[fh-bigquery:reddit_comments.2016_01],
[fh-bigquery:reddit_comments.2016_02],
[fh-bigquery:reddit_comments.2016_03],
[fh-bigquery:reddit_comments.2016_04],
[fh-bigquery:reddit_comments.2016_05],
[fh-bigquery:reddit_comments.2016_06],
[fh-bigquery:reddit_comments.2016_07],
[fh-bigquery:reddit_comments.2016_08],
[fh-bigquery:reddit_comments.2016_09],
[fh-bigquery:reddit_comments.2016_10],
[fh-bigquery:reddit_comments.2016_11],
[fh-bigquery:reddit_comments.2016_12],
[fh-bigquery:reddit_comments.2017_01],
[fh-bigquery:reddit_comments.2017_02],
[fh-bigquery:reddit_comments.2017_03],
[fh-bigquery:reddit_comments.2017_04],
[fh-bigquery:reddit_comments.2017_05],
[fh-bigquery:reddit_comments.2017_06],
[fh-bigquery:reddit_comments.2017_07],
[fh-bigquery:reddit_comments.2017_08],
[fh-bigquery:reddit_comments.2017_09],
[fh-bigquery:reddit_comments.2017_10],
[fh-bigquery:reddit_comments.2017_11],
[fh-bigquery:reddit_comments.2017_12],
[fh-bigquery:reddit_comments.2018_01],
[fh-bigquery:reddit_comments.2018_02],
[fh-bigquery:reddit_comments.2018_03],
[fh-bigquery:reddit_comments.2018_04],
[fh-bigquery:reddit_comments.2018_05],
[fh-bigquery:reddit_comments.2018_06],
[fh-bigquery:reddit_comments.2018_07],
[fh-bigquery:reddit_comments.2018_08]
GROUP BY author, subreddit


SELECT author, subreddit, created_utc, retrieved_on, score, subreddit_id, link_id, parent_id, id, body
FROM [fh-bigquery:reddit_comments.2005],
[fh-bigquery:reddit_comments.2006],
[fh-bigquery:reddit_comments.2007],
[fh-bigquery:reddit_comments.2008],
[fh-bigquery:reddit_comments.2009],
[fh-bigquery:reddit_comments.2010],
[fh-bigquery:reddit_comments.2011],
[fh-bigquery:reddit_comments.2012],
[fh-bigquery:reddit_comments.2013],
[fh-bigquery:reddit_comments.2014],
[fh-bigquery:reddit_comments.2015_01],
[fh-bigquery:reddit_comments.2015_02],
[fh-bigquery:reddit_comments.2015_03],
[fh-bigquery:reddit_comments.2015_04],
[fh-bigquery:reddit_comments.2015_05],
[fh-bigquery:reddit_comments.2015_06],
[fh-bigquery:reddit_comments.2015_07],
[fh-bigquery:reddit_comments.2015_08],
[fh-bigquery:reddit_comments.2015_09],
[fh-bigquery:reddit_comments.2015_10],
[fh-bigquery:reddit_comments.2015_11],
[fh-bigquery:reddit_comments.2015_12],
[fh-bigquery:reddit_comments.2016_01],
[fh-bigquery:reddit_comments.2016_02],
[fh-bigquery:reddit_comments.2016_03],
[fh-bigquery:reddit_comments.2016_04],
[fh-bigquery:reddit_comments.2016_05],
[fh-bigquery:reddit_comments.2016_06],
[fh-bigquery:reddit_comments.2016_07],
[fh-bigquery:reddit_comments.2016_08],
[fh-bigquery:reddit_comments.2016_09],
[fh-bigquery:reddit_comments.2016_10],
[fh-bigquery:reddit_comments.2016_11],
[fh-bigquery:reddit_comments.2016_12],
[fh-bigquery:reddit_comments.2017_01],
[fh-bigquery:reddit_comments.2017_02],
[fh-bigquery:reddit_comments.2017_03],
[fh-bigquery:reddit_comments.2017_04],
[fh-bigquery:reddit_comments.2017_05],
[fh-bigquery:reddit_comments.2017_06],
[fh-bigquery:reddit_comments.2017_07],
[fh-bigquery:reddit_comments.2017_08],
[fh-bigquery:reddit_comments.2017_09],
[fh-bigquery:reddit_comments.2017_10],
[fh-bigquery:reddit_comments.2017_11],
[fh-bigquery:reddit_comments.2017_12],
[fh-bigquery:reddit_comments.2018_01],
[fh-bigquery:reddit_comments.2018_02],
[fh-bigquery:reddit_comments.2018_03],
[fh-bigquery:reddit_comments.2018_04],
[fh-bigquery:reddit_comments.2018_05],
[fh-bigquery:reddit_comments.2018_06],
[fh-bigquery:reddit_comments.2018_07],
[fh-bigquery:reddit_comments.2018_08]
WHERE (body LIKE '%.amazon.%'
OR body like '%.amzn.%'
OR body like '%.bestbuy.%'
OR body like '%.walmart.%'
OR body like '%.ebay.%'
OR body like '%.overstock.%'
OR body like '%.newegg.%'
OR body like '%.microcenter.%'
OR body like '%.bhphotovideo.%'
OR body like '%.rei.%'
OR body like '%.cabelas.%'
OR body like '%.macys.%'
OR body like '%.steampowered.%'
OR body like '%.playstation.%'
OR body like '%.etsy.%'
OR body like '%.aliexpress.%'
OR body like '%.ikea.%')
```
