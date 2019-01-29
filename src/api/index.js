//  const _baseUrl = "http://api.bdc.jieyue.com/api/uranus-one-api/" //正式环境
// const _baseUrl = 'http://10.50.180.111:10000/saasbi/manager/'//测试环境
// const _baseUrl = 'http://172.18.101.118:10000/uranus-one-api/'//开发环境
const _baseUrl = 'http://stg.bdc.jieyue.com/api/uranus-one-api/'//准生产

//  const _loginUrl = 'http://bi.jieyuechina.com/api/'//正式环境登录
// const _loginUrl = 'http://10.50.180.111:10000/'//测试环境登录
// const _loginUrl = 'http://172.18.101.118:10000/'//开发环境登录

export default {
	login(){//登录
		return _loginUrl +'mc-auth/auth/login'
	},
    msgList () {//朋友圈基础信息
      return _baseUrl + 'circle/reportFriend'
    },
    
}
