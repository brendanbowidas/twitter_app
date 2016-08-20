<template>
  <div>
    <input type="text" v-model="term" @keyup.enter="selectedFilter">
    <label>Search By:
      <select v-model="selectedFilter">
        <option v-for="filter in filters" :selected="filter.name === 'Username'" :value="filter.method">{{filter.name}}</option>
      </select>
    </label>
    <label>How many tweets?
      <input type="number" value="20" min="1" max="100" v-model="count">
    </label>
    <a class="button primary" @click="getUserTweets">search</a>
  </div>
</template>

<script>
import './component.scss'
import { setTweets, clearTweets } from '../../state_management/actions'
export default {
  vuex: {
    actions: { setTweets, clearTweets },
  },
  data() {
    return {
      term: null,
      count: 1,
      filters: [
        {
          name: 'Username',
          method: this.getUserTweets,
        },
        {
          name: 'Search Term',
          method: this.searchByTerm,
        },
      ],
      selectedFilter: '',
    }
  },
  methods: {
    getUserTweets() {
      if (this.term) {
        this.clearTweets()
        this.$http.get(`user-tweets/${this.term}?count=${this.count}`)
        .then(response => {
          this.setTweets(response.data)
        })
      }
    },
    searchByTerm() {
      if (this.term) {
        this.clearTweets()
        this.$http.get(`term/${this.term}?count=${this.count}`)
        .then(response => {
          this.setTweets(response.data)
        })
      }
    },
  },
}
</script>
