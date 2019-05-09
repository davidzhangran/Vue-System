import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/login";
import Register from "./views/register"
import UserSystem from "./views/userSystem";
import UserStore from "./views/userStore";
import Pet from "./components/pet/pet";
import CommodityTab from "./components/commodity/commodityTab"
import SystemFront from "./components/systemfront/systemfront"
import AddStorefront from "./components/storefront/addStorefront";
import Storefront from "./components/storefront/storefrontTab";
import MoreSf from "./components/storefront/moreSf";
import UserManagement from "./components/userManagement/userManagement"
import Commodity from "./components/commodity/commodity"
import ServePet from "./components/servePet/servePet"
import Orders from "./components/orders/orders"
import PetMaster from "./components/petMaster/petMaster"
Vue.use(Router)

const router = new Router({
  routes: [
    {//登陆
      path: '/',
      name: "empty",
      component: Login
    },
    {
      path: '/login/:phone',
      name: 'login',
      component: Login
    },
    {//注册
      path: '/register',
      name: 'register',
      component: Register
    },
    {//平台管理系统
      path: '/userSystem',
      name: 'userSystem',
      component: UserSystem,
      children: [{//用户管理
        path: 'userManagement',
        component: UserManagement
      }, {//门店管理
        path: 'systemFront',
        component: SystemFront
      },
      {//宠主管理
        path: 'petMaster',
        component: PetMaster
      }]
    },
    {//门店管理系统
      path: '/userStore',
      name: 'userStore',
      component: UserStore,
      children: [{//宠物管理
        path: 'Pet',
        name: 'Pet',
        component: Pet,
      },
      {//门店
        path: 'storefront',
        name: 'storefront',
        component: Storefront
      },
      {//新增商品
        path: 'commodity',
        name: 'commodity',
        component: Commodity
      },
      {//申请门店
        path: 'addStorefront',
        name: 'addStorefront',
        component: AddStorefront
      }, {//更多门店信息
        path: 'moreSf',
        name: 'moreSf',
        component: MoreSf
      },
      {//商品列表
        path: 'commodityTab',
        name: 'commodityTab',
        component: CommodityTab
      },
      {//订单
        path: 'orders',
        name: 'orders',
        component: Orders
      },
      {//服务
        path: 'servePet',
        name: 'servePet',
        component: ServePet
      },]
    }
  ]
})
export default router

