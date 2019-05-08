import storefrontService from "../service/storefront";

export default {
  namespaced: true,//命名空间，防止不同的状态重名
  state: {
    currentPage: 1,//当前页码
    eachPage: 5,// 每页显示条数
    totalPage: 0,//总页数
    count: 0,//总条数
    storefrontInfo: []//门店数据,
  },
  mutations: {//同步方法
    getStorefrontByPage(state, payload) {
      payload.storefrontInfo.map(item => {
        if (item.state === "1") {
          return item.state = "申请中"
        } else if (item.state === "2") {
          return item.state = "可用"
        } else {
          return item.state = "不可用"
        }
      })
      Object.assign(state, payload);//合并操作
    },
    setCurrentPage: (state, currentPage) => {
      state.currentPage = currentPage
      console.log(state.currentPage);

    },//翻页
    setEachPage: (state, eachPage) => {//当在最后一页进行翻页时调到以第一
      state.eachPage = eachPage;
      if (state.currentPage == state.totalPage) {
        state.currentPage = "1";
      }
    },
  },
  actions: {
    async addStorefrontAsync(context, plo) {//申请门店
      const data = await storefrontService.addStorefront(plo)

      console.log(data);
    },
    async getStorefrontByPageAsync(context, plo) {//获取门店
      const { currentPage, eachPage } = context.state;
      let data = "";
      if (plo) {
        data = await storefrontService.getStorefrontByPage({ currentPage, eachPage, value: plo.value, inputText: plo.inputText });//拿到数据，通过mutations触发数据更新
      } else {
        data = await storefrontService.getStorefrontByPage({ currentPage, eachPage });//拿到数据，通过mutations触发数据更新
      }

      console.log(data);
      context.commit("getStorefrontByPage", data);//通过commit触发getStorefrontByPage
    },
    async updateStorefrontAsync(context, plo) {//修改门店
      const data = await storefrontService.updateStorefront(plo);//拿到数据，通过mutations触发数据更新
      console.log(data);
      if (data) {
        context.dispatch("getStorefrontByPageAsync");
      }
    },
  },
}