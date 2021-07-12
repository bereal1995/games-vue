import Vue from 'vue'
import Vuex from 'vuex'
import {moduleRps} from "@/store/moduleRps";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    rps: moduleRps,
  }
})
