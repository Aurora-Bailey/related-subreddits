## This directory will hold the raw csv files compiled from reddit comments.


Structure

* /related-subreddits
  * /data
    * /author_subreddits_all_000000000000.csv
    * /author_subreddits_all_000000000001.csv
    * /author_subreddits_all_000000000002.csv
    * ...


Contents

```
author,subreddit --header
bob,AskReddit  --csv
Sally,videos
```


Download from AWS S3 (Oregon West)

```
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000000.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000001.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000002.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000003.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000004.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000005.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000006.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000007.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000008.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000009.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000010.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000011.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000012.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000013.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000014.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000015.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000016.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000017.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000018.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000019.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000020.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000021.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000022.csv";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000023.csv";
```
