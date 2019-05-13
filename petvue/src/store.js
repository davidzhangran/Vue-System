// 所有仓库的东西都会放到这个仓库里面来
import Vue from 'vue'
import Vuex from 'vuex'
import users from "./store/userManagement"
import commodity from "./store/commodity"
import storefront from "./store/storefront"
import pet from "./store/pet"
import petMaster from "./store/petMaster"
import servePet from "./store/servePet"
import storesystemfront from "./store/storesystemfront"
import orders from "./store/orders"
Vue.use(Vuex);
export default new Vuex.Store({//引入单个模块
  modules: {
    storefront,
    pet,
    users,
    commodity,
    servePet,
    storesystemfront,
    petMaster,
    servePet,
    orders,
  }
})
