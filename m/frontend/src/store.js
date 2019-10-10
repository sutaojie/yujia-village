import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    loadStatus (state, flag) {
      state.loading = flag
    }
  },
  actions: {

  }
})
