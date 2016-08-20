<template>
  <div id="sortable" class="row align-center tweet-container">
    <div v-for="tweet in tweets" track-by="$index">
        <tweet-card :data="tweet"></tweet-card>
    </div>

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
