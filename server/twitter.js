require('dotenv').config()
const OAuth = require('oauth').OAuth2
const https = require('https')
const geocoder = require('geocoder')
const co = require('co')

const oauth = new OAuth(process.env.API_KEY, process.env.API_SECRET,
  'https://api.twitter.com/', null, 'oauth2/token', null)



  /**
  * Grabs the Twitter OAuth bearer token required to use the API
  *
  * @param {Function} cb - callback to execute after token request
  *
  */
  function getToken(cb) {
    oauth.getOAuthAccessToken('', {
      'grant_type': 'client_credentials'
    }, (err, access_token) => {
      if (err) {
        console.log(err)
      }
      cb(access_token)
    })
  }

  /**
  * Formats each tweet to return only the information we need for the client app
  *
  * @param {Array<Object>} tweets
  * @returns {Array<Object>|String}
  */
  function formatTweets(tweets) {
    if (tweets.length) {
      return tweets.map((tweet) => {
        return {
          name: tweet.user.name,
          screen_name: tweet.user.screen_name,
          timestamp: tweet.created_at,
          text: tweet.text,
          image: tweet.user.profile_image_url_https,
          favorites: tweet.favorite_count,
          retweets: tweet.retweet_count
        }
      })
    }
    // if tweets are an empty array
    if (Array.isArray(tweets) && tweets.length === 0) {
      return "This user hasn't tweeted yet!"
    }
    // if an error response is send back from the API
    if (typeof tweets === 'object' && tweets.error && tweets.error === 'Not authorized.') {
      return "Invalid username"
    }
    // If tweets is undefined
    return 'Something went wrong!'

  }

// TODO: clean up the duplicate https code, client side error handling


  /**
  * Retrieves a list of tweets for a given user
  *
  * @param {String} username
  * @param {Number} count - number of tweets to return
  * @param {String} token - OAuth bearer token
  * @param {Function<Array>} cb - callback function
  *
  */
  function getUserTweets(username, count, token, cb) {
    const options = {
      hostname: 'api.twitter.com',
      path: `/1.1/statuses/user_timeline.json?count=${count}&screen_name=${username}&exclude_replies=true`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    https.get(options, (result) => {
      let buffer = ''
      result.setEncoding('utf8')
      result.on('data', (data) => {
        buffer += data
      })
      result.on('end', () => {
        const tweets = JSON.parse(buffer)
        console.log(tweets.length);
        const formattedTweets = formatTweets(tweets)
        cb(formattedTweets)
      })
    })
  }

  function tweetsBySearchTerm(query, count, token, geo, cb) {
    let geocoded = null
    if (geo) {
      co(function* () {
         geocoded = yield geocode(geo)
      })
    }

    const options = {
      hostname: 'api.twitter.com',
      path: `/1.1/search/tweets.json?count=${count}&q=${encodeURIComponent(query)}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    if (geocoded) {
      options.path.concat(`&geocode=${geocoded}`)
    }
    https.get(options, (result) => {
      let buffer = ''
      result.setEncoding('utf8')
      result.on('data', (data) => {
        buffer += data
      })
      result.on('end', () => {
        const tweets = JSON.parse(buffer)
        const formattedTweets = formatTweets(tweets.statuses)
        cb(formattedTweets)
      })
    })
  }


  function geocode(query) {
    geocoder.geocode(query, (err, data) => {
      if (err) return false
      const results = data.results[0].geometry.location
      return `${results.lat},${results.lng},10mi`
    })
  }


  module.exports = { getToken, getUserTweets, tweetsBySearchTerm }
