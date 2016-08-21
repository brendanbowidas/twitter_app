<template>
  <div>
    <header-component></header-component>
    <searchbar></searchbar>
    <error v-if="tweets.status && tweets.status === 'ERROR'" :msg="tweets.msg"></error>
    <loader v-if="loading"></loader>
    <tweets-container v-if="tweets.length"></tweets-container>
  </div>
</template>

<script>
import searchbar from '../searchbar/component.vue'
import tweetsContainer from '../tweets_container/component.vue'
import error from '../error/component.vue'
import headerComponent from '../header/component.vue'
import loader from '../loader/component.vue'
export default {
  vuex: {
    getters: {
      tweets: state => state.tweets,
      loading: state => state.loading,
    },
  },
  data() {
    return {

    }
  },
  components: { searchbar, tweetsContainer, error, headerComponent, loader },
}
</script>
