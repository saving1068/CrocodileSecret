// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import FastClick from 'fastclick'
import axios from 'axios'
import Api from '@/api'
import Vuex from 'vuex'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'


import call from '@/callApp.js'
import cityData from '@/plugin/CITIES'
import './assets/css/resert.css' 

import 'swiper/dist/css/swiper.min.css';

import store from './store/store'


import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import { Lazyload } from 'vant';

Vue.use(Lazyload);



Vue.use(Vant)
Vue.use(Vuex)

Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.prototype.$avatar=""
Vue.prototype.$Api = Api
Vue.prototype.$cityData = cityData
Vue.prototype.$call = call
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
