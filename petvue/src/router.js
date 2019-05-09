import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Register from "./views/register"
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import Storefront from "./components/storefront/storefront"

import SystemFront from "./components/systemfront/systemfront"
import UserManagement from "./components/userManagement/userManagement"
import Commodity from "./components/commodity/commodity"
import ServePet from "./components/servePet/servePet"
import ApplyFront from "./components/systemfront/applyfront"
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name:"empty",
      component: Login
    },
    {
      path: '/login/:phone',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userSystem',
      name: 'userSystem',
      component: UserSystem,
      children: [{
        path: 'userManagement',
        component: UserManagement
      }, {
        path: 'systemFront',
        component: SystemFront
      }, {
        path: 'applyFront',
        component: ApplyFront
      }]
    },
    {
      path: '/userStore',
      name: 'userStore',
      component: UserStore,
      children: [{
        path: 'Pet',
        name: 'Pet',
        component: Pet,
      },
      {
        path: 'storefront',
        name: 'storefront',
        component: Storefront
      },
      {
        path: 'commodity',
        name: 'commodity',
        component: Commodity
      },
      {
        path: 'servePet',
        name: 'servePet',
        component: ServePet
      },]
    }
  ]
})
export default router

