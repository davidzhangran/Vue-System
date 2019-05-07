import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import Storefront from "./components/storefront/storefront"
// import SystemFront from "./components/systemfront/systemfront"
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
      // children: [{
      //   path: 'systemFront',
      //   name: 'systemFront',
      //   component: SystemFront
      // }]
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
      },]
    }
  ]
})
