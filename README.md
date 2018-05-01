Run on
* AWS EC2 (Oregon West, for quicker download)
* 64GB ram
* IAM instance profile with access to S3

install node 10
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -; sudo apt-get install -y nodejs; sudo apt-get install -y build-essential;
```

install git and download project
```
sudo apt-get install git; git clone https://github.com/gbradthompson/related-subreddits.git; cd related-subreddits;
```

download data
```
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


```
npm install
npm start
```


all in one
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -; sudo apt-get install -y nodejs; sudo apt-get install -y build-essential;sudo apt-get install git; git clone https://github.com/gbradthompson/related-subreddits.git; cd related-subreddits; npm install; npm download; npm start;
```
