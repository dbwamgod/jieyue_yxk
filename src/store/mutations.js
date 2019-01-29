import * as types from "./mutation-types";

export default {
  [types.STAtE_ROUTER](state,res){
    state.state_router=res
  },
  [types.SAVE_USERID](state,{userid}){
   state.userid=userid
   localStorage.setItem('userid',userid)
  },
  [types.SAVE_DEVICEInfO](state,{deviceinfo}){
   state.deviceinfo=deviceinfo
  },
  [types.REAL_LIST](state,{data}){
    console.log(data)
   state.realList=data
  },
}
