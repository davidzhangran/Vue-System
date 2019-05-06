import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Storefront from "./components/storefront/storefront"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/userSystem',
      name: 'userSystem',
      component: UserSystem,

    },
    {
      path: '/userStore',
      name: 'userStore',
      component: UserStore,
      children: [
        {
          path: 'storefront',
          name: 'storefront',
          component: Storefront
        },
      ]
    }
  ]
})
