import axios from 'axios'
import $ from 'jquery'
import { Message , Loading  } from 'element-ui';
import router from '../router';
var storage=localStorage;
var Authorization = storage.getItem("userid");
// axios.defaults.headers.common['Authorization'] = Authorization;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// console.log('Authorization',Authorization)headers
axios.defaults.timeout = 60000
// code状态码200判断
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
axios.interceptors.response.use((res) => {
    if (res.status !== 200) {
        Message.error("网络错误！");
        return Promise.reject(res)
    }
    if(res.data.code==407){
        Message.warning("登录已过期，请重新登录！");
        router.push({name:"Login"});
        localStorage.removeItem("userName");
        localStorage.removeItem("userid");
    }
    return res
}, (error) => {
    var errors = error.toString();
    if (errors.indexOf("401") > -1) {
        Message.warning("登录已过期，请重新登录！");
        router.push({name:"Login"});
    }else{
        Message.error("网络错误！");
    }
    $(".el-loading-mask").remove();
    return Promise.reject(error)
});

// class Axios {
//
//   get(url, param){
//
//     return new Promise((resolve, reject)=>{
//       console.log('thisget',sessionStorage)
//       axios({
//               method:'get',
//               url,
//               params: param,
//             }).then(function(res){
//                resolve(res);
//             })
//
//
//   });
//   }
//   post(url, param){
//     return new Promise((resolve, reject)=>{
//       console.log('thispost',sessionStorage)
//       axios({
//               method:'post',
//               url,
//               data: param,
//             }).then(function(res){
//                resolve(res);
//             })
//
//
//   });
//   }
//
//
// };
export default axios
