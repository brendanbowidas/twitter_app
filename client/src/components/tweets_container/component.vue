<template>
  <div v-if="tweets.length" id="sortable" class="row align-center">
    <template v-for="tweet in tweets" transition="item" track-by="$index">
      <tweet-card :data="tweet"></tweet-card>
    </template>
  </div>
  <div v-show="tweets.status && tweets.status === 'ERROR'" class="error small-4 offset-4 columns">
    <p>{{tweets.msg}}</p>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import tweetCard from '../tweet_card/component.vue'
import './component.scss'

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
