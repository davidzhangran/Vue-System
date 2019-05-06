import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import System from "./views/system";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/system',
      name: 'system',
      component: System
    }
  ]
})
