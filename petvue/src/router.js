import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Register from "./views/register"
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import Storefront from "./components/storefront/storefront"
<<<<<<< HEAD

=======
import SystemFront from "./components/systemfront/systemfront"
import UserManagement from "./components/userManagement/userManagement"
import Commodity from "./components/commodity/commodity"
>>>>>>> 7bf5064800f99284ece84ae4763b6de0d5a33f0c
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
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
<<<<<<< HEAD
      }]
=======
      },
      {
        path: 'commodity',
        name: 'commodity',
        component: Commodity
      },]
>>>>>>> 7bf5064800f99284ece84ae4763b6de0d5a33f0c
    }
  ]
})
