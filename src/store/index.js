import {
  createStore
} from 'vuex';
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    logged: false,
    token: null,
    programs: null
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
    SET_PROGRAMS(state, programs) {
      state.programs = programs;
    },
    DELETE_PROGRAM(state, progId) {
      const index = state.programs.findIndex(prog => prog._id == progId);
      state.programs.splice(index, 1);
    },
    UPDATE_PROGRAM(state, program) {
      const index = state.programs.findIndex(prog => prog._id == program._id);
      state.programs[index] = program;
      state.programs.sort( (a, b) => new Date(a.schedule) - new Date(b.schedule) );
    },
    // ADD_PROGRAM(state, program) {
    //   state.programs.push(program);
    // }
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
    setPrograms({ commit }, programs) {
      commit('SET_PROGRAMS', programs)
    },
    deleteProgram({ commit }, progId) {
      commit('DELETE_PROGRAM', progId)
    },
    updateProgram({ commit }, program) {
      commit('UPDATE_PROGRAM', program)
    },
    // addProgram({ commit }, program) {
    //   commit('ADD_PROGRAM', program)
    // },
    checkToken({ commit }) {
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