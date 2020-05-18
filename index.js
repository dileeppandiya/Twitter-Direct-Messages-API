const express = require('express');
const Twitter = require('twit');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

let api_client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
});

app.get('/', function (req, res) {
  res.send('hello world')
})


app.get('/home_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', count: 10 };

  api_client
    .get('statuses/home_timeline', params)
    .then(timeline => {

      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });

});

app.get('/mentions_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', count: 10 };

  api_client
    .get('statuses/mentions_timeline', params)
    .then(timeline => {

      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });

});

app.post('/post_tweet', (req, res) => {
  tweet = req.body
  api_client
      .post(`statuses/update`, tweet)
      .then(tweeting => {
        console.log(tweeting);

        res.send(tweeting);
      })

     .catch(error => {
      res.send(error);
    });
});

app.post('/re_tweet_with_comments', (req, res) => {
  tweet = req.body
  var req = {
    status: req.body.status ,
    in_reply_to_status_id: req.body.in_reply_to_status_id
  };

  console.log(req);
  api_client.post('statuses/update', req,
    function(err, data, response) {
      console.log(data);
      if(err!=null)
        res.send(err)
      res.send(response)
    }
  );
 });

 app.post('/re_tweet', (req, res) => {
  tweet = req.body
  console.log(req.body);
  api_client.post('statuses/retweet/'+req.body.tweet_id, {},
    function(err, data, response) {
      if(err!=null)
        res.send(err)
      res.send(true);
    }
  );

 });

app.listen(3000, () => console.log('Server running'))
