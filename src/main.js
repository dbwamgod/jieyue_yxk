/*
 * @Author: changge
 * @Date: 2018-06-01 14:50:54
 * @Last Modified by:   changge
 * @Last Modified time: 2018-06-05 10:50:54
 */
import Vue from 'vue';
import {
  AlertPlugin,
  ToastPlugin,
  LoadingPlugin,
} from 'vux';
import App from './App';
import router from './router';
import oDC from './dc';
import Echarts from 'echarts';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'lib-flexible/flexible';
Vue.use(MintUI);

Vue.config.productionTip = false;

Vue.prototype.$Echarts = Echarts;


Vue.prototype.$GetQueryString = function UrlSearch() {
  let name, value;
  let str = location.href;
  let num = str.indexOf("?")
  str = str.substr(num + 1);

  let arr = str.split("&");
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf("=");
    if (num > 0) {
      name = arr[i].substring(0, num);
      value = arr[i].substr(num + 1);
      this[name] = value;
    }
  }
};
router.beforeEach((to, from, next) => {
  if (from.path !== to.path) {
    document.title = to.meta.title || '捷思致诚  执信以越';
  }
  next();
});

Vue.use(oDC);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
