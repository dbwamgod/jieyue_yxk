// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import $$ from 'jquery'
import { quillEditor } from "vue-quill-editor";
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import { moveHoverAmplification, anchorFunc } from '@/common/directive'
import { Dialog } from '@/common/dialog/dialogPrompt.js'


import 'element-ui/lib/theme-chalk/index.css'
import Axios from '@/utils/diyaxios'
import common from '@/common/common.js'
import { stringFilter, removeHtml, strSub } from '@/common/filter.js'

/***富文本****/
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
Vue.prototype.HOST = '/api'

Vue.prototype.$http = Axios;
Vue.prototype.$common = common;

import echarts from "echarts";

Vue.config.productionTip = false;
Vue.directive('moveHoverAmplification',moveHoverAmplification)
Vue.directive('anchor', anchorFunc)

//Vue.use(router);
Vue.use(ElementUI);
Vue.use(Dialog);


Vue.use(echarts);
Vue.filter("stringFilter", stringFilter);
Vue.filter("removeHtml", removeHtml);
Vue.filter("strSub", strSub);
Vue.prototype.$GetQueryString = function () {
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
let routeList = [];
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  console.log(to.name)
  if (to.name==''||to.name == null){
    return next({
      name:'content'
    })
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})



