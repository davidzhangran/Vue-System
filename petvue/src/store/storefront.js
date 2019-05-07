import storefrontService from "../service/storefront";

export default {
  namespaced: true,//命名空间，防止不同的状态重名
  state: {
    currentPage: 1,//当前页码
    eachPage: 10,//每页显示的条数
    totalPage: 0,//总页数
    count: 0,//总条数
    storefrontInfo: []
  },
  mutations: {//同步方法
    getStorefrontByPage: (state, playlod) => {
      Object.assign(state, playlod);
    }
  },
  actions: {
    async addStorefrontAsync(context, plo) {
      const data = await storefrontService.addStorefront(plo)
      console.log(data);
    },
    //获取门店
    async getStorefrontByPageAsync(context) {
      const { currentPage, eachPage } = context.state;
      const data = await storefrontService.getStorefrontByPage(currentPage, eachPage);
      context.commit("getStorefrontByPage", data);
    }
  },
}