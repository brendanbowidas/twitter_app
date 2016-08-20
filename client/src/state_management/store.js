import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)
// Define our base application state
const state = {
  tweets: [],
}

const store = new Vuex.Store({
  state,
  mutations,
})

export default store
