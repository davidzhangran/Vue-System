import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Register from "./views/register"
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import Storefront from "./components/storefront/storefront"
import PetMaster from "./components/petMaster/petMaster" //引入宠主管理

import SystemFront from "./components/systemfront/systemfront"
import UserManagement from "./components/userManagement/userManagement"
import Commodity from "./components/commodity/commodity"
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: "empty",
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
      },
      {//宠主管理
        path: 'petMaster',
        component: PetMaster
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
      },]
    }
  ]
})
export default router

