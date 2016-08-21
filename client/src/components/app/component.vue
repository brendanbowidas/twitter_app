<template>
  <div>
    <searchbar></searchbar>
    <error v-if="tweets.status && tweets.status === 'ERROR'" :msg="tweets.msg"></error>
    <tweets-container v-if="tweets.length"></tweets-container>
  </div>
</template>

<script>
import searchbar from '../searchbar/component.vue'
import tweetsContainer from '../tweets_container/component.vue'
import error from '../error/component.vue'
export default {
  vuex: {
    getters: {
      tweets: state => state.tweets,
    },
  },
  data() {
    return {

    }
  },
  components: { searchbar, tweetsContainer, error },
}
</script>
