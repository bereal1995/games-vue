import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMoment from 'vue-moment'
import '@/assets/scss/App.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/lib/firebase'
import UUID from "vue-uuid"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMoment)
Vue.use(UUID)

Vue.config.productionTip = false
Vue.prototype.$constants = {
  path: {
    PATH_HOME: '/',
    PATH_LIST: '/list',
    PATH_GAME: '/game',
    PATH_GAME_RPS: '/game/rockPaperScissors',
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
