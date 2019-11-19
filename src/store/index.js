import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from "../services/AuthService"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: `${window.location.protocol}//${window.location.hostname}:5555/api`,
    name: null,
    userId: null
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      if (state.isLoggedIn) {
        state.name = auth.getUsername();
        state.userId = auth.getUserId();
      } else {
        state.userId = null;
        state.name = null;
      }
    }
  },
  actions: {
    authenticate(ctx) {
      ctx.commit('authenticate');
    }
  }
})
