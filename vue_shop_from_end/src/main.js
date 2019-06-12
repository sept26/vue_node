// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import '@/assets/css/base.css'
import '@/assets/iconfonts/iconfont.css'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading-bars.svg'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
