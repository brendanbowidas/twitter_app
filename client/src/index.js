/* eslint-disable no-new */
/* global SERVER_URL */
import Vue from 'vue'
import resource from 'vue-resource'
import './scss/src.scss'
import { app } from './components'
import store from './state_management/store'

// use Vue's AJAX library
Vue.use(resource)

// set our root url for http requests depending on environment
if (process.env.NODE_ENV === 'production') {
  Vue.http.options.root = 'productionurl'
} else {
  // SERVER_URL is defined in our development webpack config
  Vue.http.options.root = SERVER_URL
  Vue.config.debug = true
}


/* This is the root Vue instance,
 it initializes the app and mounts it to <div id="app"> in index.html */
new Vue({
  components: { app },
  el: '#app',
  template: '<app></app>',
  store,
})
