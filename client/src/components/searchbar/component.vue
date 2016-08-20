<template>
  <div>
    <input type="text" v-model="term" @keyup.enter="selectedFilter">
    <label>Search By:
      <select v-model="selectedFilter">
        <option v-for="filter in filters" :value="filter.method">{{filter.name}}</option>
      </select>
    </label>
    <a class="button primary" @click="getUserTweets">search</a>
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
        this.$http.get(`user-tweets/${this.term}`)
        .then(response => {
          this.setTweets(response.data)
        })
      }
    },
    searchByTerm() {
      if (this.term) {
        this.$http.get(`term/${this.term}`)
        .then(response => {
          this.setTweets(response.data)
        })
      }
    },
  },
}
</script>
