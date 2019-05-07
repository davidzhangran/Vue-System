import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
<<<<<<< HEAD
import Pet from "./components/pet/pet";

=======
import Storefront from "./components/storefront/storefront"
>>>>>>> 2aa8cbc1b2bafff63f593a34860f3a061fa4934c

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
      children:[{
        path: 'Pet',
        name: 'Pet',
        component: Pet,
      }]
=======
      children: [
        {
          path: 'storefront',
          name: 'storefront',
          component: Storefront
        }
      ]
>>>>>>> 2aa8cbc1b2bafff63f593a34860f3a061fa4934c
    }
  ]
})
