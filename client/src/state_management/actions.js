
export const setTweets = (store, tweets) => {
  store.dispatch('SET_LOADING', false)
  store.dispatch('SET_TWEETS', tweets)
}

export const clearTweets = (store) => {
  store.dispatch('CLEAR_TWEETS')
}

export const loading = (store) => {
  store.dispatch('SET_LOADING', true)
}

export const removeTweet = (store, index) => {
  store.dispatch('REMOVE_TWEET', index)
}
export const swapTweets = (store, idxA, idxB) => {
  store.dispatch('SWAP_TWEETS', idxA, idxB)
}
