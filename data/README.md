This directory will hold the raw csv files compiled from reddit comments.


Structure

* /related-subreddits
  * /data
    * /author_subreddits_all_000000000000
    * /author_subreddits_all_000000000001
    * /author_subreddits_all_000000000002
    * ...


Contents

```
author,subreddit --header
bob,AskReddit  --csv
Sally,videos
```


Download from AWS S3 (Oregon West)

```
npm download

OR

wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000000";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000001";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000002";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000003";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000004";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000005";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000006";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000007";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000008";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000009";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000010";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000011";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000012";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000013";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000014";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000015";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000016";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000017";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000018";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000019";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000020";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000021";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000022";
wget -P ./data/ "https://s3-us-west-2.amazonaws.com/noros/author_subreddits_all_000000000023";
```
