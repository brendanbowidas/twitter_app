<template>
  <div>
    <input type="text" v-model="term" @keyup.enter="selectedFilter">

    <label>Search By:
      <select @change="getFilterType($event)" id="search-by" v-model="selectedFilter">
        <option v-for="filter in filters" :selected="filter.name === 'Username'" :value="filter.method">{{filter.name}}</option>
      </select>
    </label>

    <label>Max tweets to display:
      <input type="number" value="20" min="1" max="100" v-model="count">
    </label>
    <label v-if="filterName === 'Search Term'">Search by location <small>(optional)</small>
      <input v-model="location" type="text" placeholder="enter a city name, e.g New York, NY">
    </label>

    <a class="button primary" @click="selectedFilter">search</a>
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
      location: null,
      filterName: '',
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
    getFilterType(e) {
      this.$set('filterName', e.target.options[e.target.options.selectedIndex].textContent)
    },
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
        let url = `term/${this.term}?count=${this.count}`
        if (this.location) {
          url += `&geo=${this.location}`
        }
        this.clearTweets()
        this.$http.get(url)
        .then(response => {
          this.setTweets(response.data)
        })
      }
    },
  },
}
</script>
