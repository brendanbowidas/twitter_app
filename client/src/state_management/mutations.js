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
}
