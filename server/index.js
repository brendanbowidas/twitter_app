// grab our enviromnent variables
require('dotenv').config()

const express = require('express')
const json = require('body-parser').json()
const twitter = require('twitter')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()

const getToken = require('./twitter.js').getToken
const getUserTweets = require('./twitter.js').getUserTweets
const tweetsBySearchTerm = require('./twitter.js').tweetsBySearchTerm

// enable body parsing middleware
app.use(json)
// enable CORS middleware
app.use(cors())

//define our routes
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/user-tweets/:user', (req, res) => {
  getUserTweets(req.params.user, req.query.count, app.get('bearer_token'), (tweets) => {
    res.send(tweets)
  })

})

app.get('/term/:term', (req, res) => {
  tweetsBySearchTerm(req.params.term, req.query.count, app.get('bearer_token'), req.query.geo, (tweets) => {
    res.send(tweets)
  })
})


// get OAuth bearer token for twitter API, then start the app
getToken((token) => {
  if (token) {
    // give us global access to the token
    app.set('bearer_token', token)
  }
  // fire up the server
  app.listen(PORT, (err, conn) => {
    if (err) console.log(err)
    console.log(`server listening on port ${PORT}`);
  })
})
