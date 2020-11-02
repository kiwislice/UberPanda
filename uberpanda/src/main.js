import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'animate.css/animate.css'
import StoreView from './components/StoreView.vue'
import Store from './components/Store.vue'
import PriceComputer from './components/PriceComputer.vue'

Vue.config.productionTip = false
Vue.use(VueRouter, BootstrapVue)

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: StoreView },
  { path: '/foo', component: Store },
  { path: '/bar', component: Bar },
  { path: '/pricecomputer', component: PriceComputer },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode:'hash',
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

// 现在，应用已经启动了！

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
