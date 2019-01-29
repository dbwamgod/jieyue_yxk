/*
 * @Author: changge
 * @Date: 2018-06-05 10:37:17
 * @Last Modified by:   changge
 * @Last Modified time: 2018-06-05 10:37:17
 */

// const http = 'http://172.18.101.118:10000/galaxy-uranus-api';//开发
// const http = 'http://10.50.180.111:10000/uranus-backend-api';//测试
const http = 'http://urs.jieyuechina.com/api/uranus-backend-api';//生产
export default class BaseAPI {
    constructor() {
         this.getUserInfo = `${http}/userPortrait/getUserInfo`;
    }
      

    
}

