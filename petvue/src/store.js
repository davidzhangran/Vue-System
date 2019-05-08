import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
<<<<<<< HEAD
import storefront from "./store/storefront";
import pet from "./store/pet";
=======
import storefront from "./store/storefront"
>>>>>>> e56a80d13a2f3e6c31608c1accf1d19a101c16d4
export default new Vuex.Store({//引入单个模块
  modules: {
    storefront,
    pet
  }
})
