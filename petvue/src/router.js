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
import CommodityTab from "./components/commodity/commodityTab"
>>>>>>> b80c474bf8ee497aa13f739739242371d6275d33
import SystemFront from "./components/systemfront/systemfront"
import UserManagement from "./components/userManagement/userManagement"
import Commodity from "./components/commodity/commodity"
import ServePet from "./components/servePet/servePet"
import Orders from "./components/orders/orders"
import PetMaster from "./components/petMaster/petMaster"
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
      },
      {
        path: 'commodityTab',
        name: 'commodityTab',
        component: CommodityTab
      },
      {
        path: 'orders',
        name: 'orders',
        component: Orders
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

