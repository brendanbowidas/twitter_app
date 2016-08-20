/* eslint-disable no-new */
import Vue from 'vue'
import resource from 'vue-resource'
import './scss/src.scss'
import { app } from './components'

// use Vue's AJAX library
Vue.use(resource)

new Vue({
  components: { app },
  el: '#app',
  template: '<app></app>',
})
