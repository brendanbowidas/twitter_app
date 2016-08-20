// grab our enviromnent variables
require('dotenv').config()

const express = require('express')
const json = require('body-parser').json()
const twitter = require('twitter')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()

const getToken = require('./twitter.js').getToken
const getTweets = require('./twitter.js').getTweets

// enable body parsing middleware
app.use(json)
// enable CORS middleware
app.use(cors())

//define our routes
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/tweets/:user', (req, res) => {
  getTweets(req.params.user, 20, app.get('bearer_token'), (tweets) => {
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
