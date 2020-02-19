import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    epidemicdata:{},
    citylist:[]
  },
  mutations: {
    updateddata(state,data){
      state.epidemicdata=data;
    },
    updatedcity(state,data){
      state.citylist=data;
    }
  },
  actions: {
    updatedfun(context,data) {
      context.commit('updateddata',data)
    },
    updatedcityfun(context,data) {
      context.commit('updatedcity',data)
    },
  },
  modules: {
  }
})
