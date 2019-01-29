import * as types from "./mutation-types";
export default {
  async stateRouter({commit},payload){
    commit(types.STAtE_ROUTER,payload)
  },
  async saveUserid({commit},userid){
      commit(types.SAVE_USERID,{userid})
  },
  async saveDevice({commit},deviceinfo){
      commit(types.SAVE_DEVICEInfO,{deviceinfo})
  },
  async setRealList({commit},data){
    console.log('commit',data)
      commit(types.REAL_LIST,{data})
  },
 
  
}

