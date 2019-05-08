import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Register from "./views/register"
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import SystemFront from "./components/systemfront/systemfront"
import UserManagement from "./components/userManagement/userManagement"
import Commodity from "./components/commodity/commodity"
import AddStorefront from "./components/storefront/addStorefront";
import Storefront from "./components/storefront/storefrontTab";
import MoreSf from "./components/storefront/moreSf";

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
      },
      {
        path: 'commodity',
        name: 'commodity',
        component: Commodity
      },
      {
        path: 'addStorefront',
        name: 'addStorefront',
        component: AddStorefront
      }, {
        path: 'moreSf',
        name: 'moreSf',
        component: MoreSf
      },]
    }
  ]
})
