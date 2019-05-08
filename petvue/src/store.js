import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import storefront from "./store/storefront";
import pet from "./store/pet";
export default new Vuex.Store({//引入单个模块
  modules: {
    storefront,
    pet
  }
})
