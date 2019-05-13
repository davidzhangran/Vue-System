import storefrontService from "../service/storefront";

export default {
  namespaced: true,//命名空间，防止不同的状态重名
  state: {
    currentPage: 1,//当前页码
    eachPage: 5,// 每页显示条数
    totalPage: 0,//总页数
    count: 0,//总条数
    storefrontInfo: [],//门店数据,
    moreSf: {},
    user: {},
    flag: false,
    loading: false,
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
    setCurrentPage: (state, currentPage) => state.currentPage = currentPage,//翻页
    setEachPage: (state, eachPage) => {//当在最后一页进行翻页时调到以第一
      state.eachPage = eachPage;
      if (state.currentPage == state.totalPage) {
        state.currentPage = "1";
      }
    },
    moreInfo: (state, row) => {
      console.log(row);

      state.moreSf = row;
      // console.log(state);
    },//增加单个门户信息
    getStaff: (state, payload) => {
      state.moreSf = payload;
    },
    closeFlag(state) {
      state.flag = false;
    },
    openFlag(state) {

      state.flag = true;
      console.log(state.flag);
    },
    openLoading(state) {//开
      state.loading = true;
    },
    closeLoading(state) {
      state.loading = false;
    }
  },
  actions: {
    async addStorefrontAsync(context, payload) {//申请门店
      const data = await storefrontService.addStorefront(payload)
      console.log(data);
      // context.commit("getStorefrontByPage", data);//通过commit触发getStorefrontByPage
    },
    async getStorefrontByPageAsync(context, plo) {//获取门店
      context.commit("openLoading");
      const userId = document.cookie.match(
        new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
      )[2];
      const { currentPage, eachPage } = context.state;
      const data = await storefrontService.getStorefrontByPage({ currentPage, eachPage, userId });//拿到数据，通过mutations触发数据更新
      // console.log(data);
      context.commit("getStorefrontByPage", data);//通过commit触发getStorefrontByPage
      context.commit("closeLoading");
    },

    async addStaffAsync(context, payload) {//增加店员
      context.commit("openLoading");
      const data = await storefrontService.addStaff(payload);//拿到数据，通过mutations触发数据更新
      context.commit("getStaff", data);//通过commit触发getStorefrontByPage
      context.commit("closeLoading");
    },
    async addGoodsAsync(context, { _id }) {//添加商品
      context.commit("openLoading");
      const [data] = await storefrontService.addGoods({ _id: context.state.moreSf._id, goodsId: _id });//拿到数据，通过mutations触发数据更新
      context.commit("getStaff", data);//通过commit触发getStorefrontByPage
      context.commit("closeLoading");
    },
    async addServeAsync(context, { _id }) {//添加服务
      context.commit("openLoading");
      const [data] = await storefrontService.addServe({ _id: context.state.moreSf._id, serveId: _id });
      context.commit("getStaff", data);
      context.commit("closeLoading");
    },
    async addPetAsync(context, { _id }) {//添加宠物
      context.commit("openLoading");
      const [data] = await storefrontService.addPet({ _id: context.state.moreSf._id, petId: _id });
      context.commit("getStaff", data);
      context.commit("closeLoading");
    },
    async removeAsync(context, { typeId, type }) {//移除
      context.commit("openLoading");
      const [data] = await storefrontService.remove({ _id: context.state.moreSf._id, typeId, type });
      context.commit("getStaff", data);
      context.commit("closeLoading");

    },
    async removeStaffAsync(context, { phone }) {//移除
      context.commit("openLoading");

      const [data] = await storefrontService.removeStaff({ _id: context.state.moreSf._id, phone });
      context.commit("getStaff", data);
      context.commit("closeLoading");

    },
  },
}