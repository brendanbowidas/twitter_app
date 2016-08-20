<template>
  <div>
    <h1 class="text-center">{{msg}}</h1>
    <div class="red text-center">hi</div>
    <searchbar></searchbar>
    <tweets-container></tweets-container>
  </div>
</template>

<script>
import searchbar from '../searchbar/component.vue'
import tweetsContainer from '../tweets_container/component.vue'

export default {
  data() {
    return {
      msg: 'hello world',
    }
  },
  components: { searchbar, tweetsContainer },
}
</script>
