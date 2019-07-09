// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { slide } from './slide'
import { loadLive2d } from './live2d'
require('vue2-animate/dist/vue2-animate.min.css')

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$slide = slide
Vue.prototype.$loadLive2d = loadLive2d

Vue.prototype.$isPc = function(){
     var userAgentInfo = navigator.userAgent;
     var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
     var flag = true;
     for (var v = 0; v < Agents.length; v++) {
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
     }
     return flag;
  }

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
