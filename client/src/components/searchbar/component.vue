<template>
  <div>
    <input type="text" v-model="term" @keyup.enter="getTweets">
    <a class="button primary" @click="getTweets">search</a>
  </div>
</template>

<script>
import './component.scss'
import { setTweets } from '../../state_management/actions'
export default {
  vuex: {
    actions: { setTweets },
  },
  data() {
    return {
      term: null,
    }
  },
  methods: {
    getTweets() {
      if (this.term) {
        this.$http.get(`tweets/${this.term}`)
        .then(response => {
          this.setTweets(response.data)
        })
      }
    },
  },
}
</script>
