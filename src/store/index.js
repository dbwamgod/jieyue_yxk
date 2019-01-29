import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)
// const bi = {ba:'aa',bb:'bb'}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  // bi
})
