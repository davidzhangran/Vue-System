import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import Storefront from "./components/storefront/storefront"
<<<<<<< HEAD
=======

>>>>>>> e56a80d13a2f3e6c31608c1accf1d19a101c16d4
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
<<<<<<< HEAD
      children:[
        {
=======
      children: [{
>>>>>>> e56a80d13a2f3e6c31608c1accf1d19a101c16d4
        path: 'Pet',
        name: 'Pet',
        component: Pet,
      },
      {
        path: 'storefront',
        name: 'storefront',
        component: Storefront
<<<<<<< HEAD
      }]
=======
      },]
>>>>>>> e56a80d13a2f3e6c31608c1accf1d19a101c16d4
    }
  ]
})
