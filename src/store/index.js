import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    token: null
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
    SET_LOGOUT(state) {
      state.logged = false,
      state.token = null
    },
  },
  actions: {
    setLogin({ commit }) {
      commit('SET_LOGIN')
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setLogout({ commit }) {
      commit('SET_LOGOUT')
    },
    checkToken({ commit }) {
      if(localStorage.getItem("token")) {
        commit('SET_LOGIN')

      } else {
        console.log('pas de token')
        commit('SET_LOGOUT')
      }
    }
  },
  modules: {
  }
})
