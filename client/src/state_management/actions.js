
export const setTweets = (store, tweets) => {
  store.dispatch('SET_TWEETS', tweets)
}

export const clearTweets = (store) => {
  store.dispatch('CLEAR_TWEETS')
}
