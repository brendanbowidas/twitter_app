
export default {
  SET_TWEETS(state, tweets) {
    state.tweets = tweets
  },
  CLEAR_TWEETS(state) {
    state.tweets = []
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
  REMOVE_TWEET(state, index) {
    state.tweets.splice(index, 1)
  },
  // Swap 2 items in the tweets array
  SWAP_TWEETS(state, idxA, idxB) {
    const copy = [...state.tweets]
    const temp = copy[idxA]
    copy[idxA] = copy[idxB]
    copy[idxB] = temp
    state.tweets = copy
  },
}
