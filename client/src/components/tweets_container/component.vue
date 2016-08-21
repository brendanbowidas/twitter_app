<template>
  <div id="sortable" class="row align-center">
    <template v-for="tweet in tweets"  transition="item" track-by="$index">
      <tweet-card :data="tweet"></tweet-card>
    </template>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import tweetCard from '../tweet_card/component.vue'
import { swapTweets } from '../../state_management/actions'
import './component.scss'

export default {
  ready() {
    const list = document.getElementById('sortable')
    Sortable.create(list)
  },

  vuex: {
    getters: {
      tweets: state => state.tweets,
    },
    actions: { swapTweets },
  },
  components: { tweetCard },
}
</script>
