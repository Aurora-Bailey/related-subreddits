## This directory will hold the raw csv files compiled from reddit comments.

Download csv from AWS S3 (Oregon West)

```
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000000.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000001.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000002.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000003.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000004.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000005.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000006.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000007.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000008.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000009.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000010.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000011.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000012.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000013.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000014.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000015.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000016.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000017.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000018.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000019.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000020.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000021.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000022.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/ngau/author_subreddits_all_000000000023.csv";
```

OR build a new one with [Google BigQuery reddit dataset](https://bigquery.cloud.google.com/table/fh-bigquery:reddit_comments.2015_05)
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
[fh-bigquery:reddit_comments.2016_01],
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
[fh-bigquery:reddit_comments.2017_12]
GROUP BY author, subreddit
```
