import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    token: ''
  },
  getters: {
    loggedIn(state) {
      return state.logged
    }
  },
  mutations: {
    SET_LOGIN(state) {
      state.logged = true
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    setLogin({ commit }) {
      commit('SET_LOGIN')
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
  },
  modules: {
  }
})
