import {
  createStore
} from 'vuex';
import jwt_decode from "jwt-decode";

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
    setLogin({
      commit
    }) {
      commit('SET_LOGIN')
    },
    setToken({
      commit
    }, token) {
      commit('SET_TOKEN', token)
    },
    setLogout({
      commit
    }) {
      commit('SET_LOGOUT')
    },
    checkToken({
      commit
    }) {
      if (localStorage.getItem("token")) {

        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        console.log('token from LS', token);
        console.log('*** Heures restantes avant expiration Token ***', Math.round(((decodedToken.exp * 1000) - Date.now()) / 1000 / 3600 * 100) / 100);

        // Vérification si token est expiré

        if (Date.now() >= decodedToken.exp * 1000) {
          console.log('token expiré');
          alert('Session expirée - veuillez vous reconnecter');
          localStorage.clear();
          commit('SET_LOGOUT');
        } else {
          commit('SET_LOGIN');
          commit('SET_TOKEN', token);
        }

      } else {
        console.log('pas de token')
        commit('SET_LOGOUT')
      }
    }
  },
  modules: {}
})