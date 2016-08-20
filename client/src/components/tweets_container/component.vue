<template>
  <div class="row align-center">
      <tweet-card v-for="tweet in tweets" track-by="$index" :data="tweet"></tweet-card>
  </div>
</template>

<script>
import tweetCard from '../tweet_card/component.vue'

export default {
  vuex: {
    getters: {
      tweets: state => state.tweets,
    },
  },
  components: { tweetCard },
}
</script>
