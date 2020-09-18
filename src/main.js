import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/js/flexible.min.js';
// import './assets/js/mock.js'
import './assets/css/reset.css'
// 动态把 rem单位换算为px   设计稿 100px = 1rem
import axios from 'axios';
// 全局导入vant
import { Notify ,Lazyload} from 'vant'
import 'vant/lib/index.css'
 // 全局注册
 Vue.use(Lazyload);
Vue.use(Notify);
// Vue.use(Vant);
 

Vue.prototype.$http = axios; //所有vue的实例都将拥有一个叫$http的方法
Vue.config.productionTip = false
 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 所有的Vue组件都是Vue构造函数的实例
// 我需要在每个vue组件中都是要axios
// 把axios挂载到vue的prototype原型上，
// 按需加载vant 布置
// 01  安装 npm i babel-plugin-import -D
// 02 配置bable.config.js
 //03  main.js  导入vant 去掉     Vue.use(Vant);
 //04 在组件需要地方导入