import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idKorisnika: -1
  },
  mutations: {
    setID(state,id){
      state.idKorisnika = id;
    }
  },
  getters:{
    getId: state => {
      return state.idKorisnika
    }
  },
  actions: {
    setIdKorisnika({comit,state}, payload){
      this.commit('setId',payload.idKorisnika)
    }
  },
  modules: {
  }
})
