// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//1,引入清空样式
import './assets/css/reset.css';

//2,引入vuex
import store from './store'

//3,数据交互，配置代理 utils/http.js 基本架子

//4,过滤器
import './filters'

//5,全局组件
import './components'

//6,路由组件

//7,element-ui
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
