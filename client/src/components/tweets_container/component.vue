<template>
  <div id="sortable" class="row align-center">
      <tweet-card v-for="tweet in tweets" transition="item" track-by="$index" :data="tweet"></tweet-card>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import tweetCard from '../tweet_card/component.vue'

export default {
  ready() {
    const list = document.getElementById('sortable')
    Sortable.create(list, {})
  },
  vuex: {
    getters: {
      tweets: state => state.tweets,
    },
  },
  components: { tweetCard },
}
</script>
