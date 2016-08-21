require('dotenv').config()
const OAuth = require('oauth').OAuth2
const https = require('https')
const geocoder = require('geocoder')


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
        const formattedTweets = formatTweets(tweets)
        cb(formattedTweets)
      })
    })
  }

  function tweetsBySearchTerm(query, count, token, geo, cb) {
    geocode(geo, (geocoded) => {
      const options = {
        hostname: 'api.twitter.com',
        path: `/1.1/search/tweets.json?count=${count}&q=${encodeURIComponent(query)}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      if (geocoded.status === 'OK') {
        options.path += `&geocode=${geocoded.msg}`
      } else if (geocoded.status === 'ERROR') {
        return cb(geocoded)
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
    })

  }


  function geocode(query, cb) {
    geocoder.geocode(query, (err, data) => {
      if (err) return cb(false)
      // TODO: handle errors here data.results[0] is undefined
      if (data.status === 'OK') {
        const results = data.results[0].geometry.location
        return cb({ status: 'OK', msg: `${results.lat},${results.lng},10mi` })
      }
      return cb({ status: 'ERROR', msg: 'Invalid location!'})
    })
  }


  module.exports = { getToken, getUserTweets, tweetsBySearchTerm }
