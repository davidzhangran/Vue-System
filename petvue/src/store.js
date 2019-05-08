// 所有仓库的东西都会放到这个仓库里面来

import Vue from 'vue'
import Vuex from 'vuex'
import users from "./store/userManagement"
import commodity from "./store/commodity"
Vue.use(Vuex);
import storefront from "./store/storefront"
import pet from "./store/pet"
import petMaster from "./store/petMaster"
export default new Vuex.Store({//引入单个模块
  modules: {
    storefront,
    pet,
    users,
    commodity,
    petMaster
  }
})
