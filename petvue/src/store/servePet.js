import servePet from "../service/servePet";
export default {
  //命名空间，防止不同的状态重名
  namespaced: true,
  state: {
    currentPage: 1,
    eachPage: 10,
    maxPage: 0,
    total: 0,
    serves: []
  },
  mutations: {//同步方法
    getPetsByPage(state, payload) {
      Object.assign(state, payload);//合并操作，相当于上一种
      //命名空间，防止不同的状态重名
    },
    setCurrentPage: (state, currentPage) => {
      state.currentPage = currentPage
      console.log(state.currentPage);
    },//翻页
    setEachPage: (state, eachPage) => {//当在最后一页进行翻页时调到以第一
      state.eachPage = eachPage;
      if (state.currentPage == state.total) {
        state.currentPage = "1";
      }
    },
  },
  actions: {
    //分页
    async getPetsByPageAsync(context, { type, text,userId} = {}) {
      const { currentPage, eachPage } = context.state;
      userId=document.cookie.match(new RegExp("(^| )" + "id" + "=([^;]*)(;|$)"))[2]
      if (type != undefined) {
        const data = await servePet.getPetsByPageSer({ currentPage, eachPage, type, text ,userId});//拿到数据，通过mutations触发数据更新
        context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
      } else {
        const data = await servePet.getPetsByPageSer({ currentPage, eachPage,userId });//拿到数据，通过mutations触发数据更新
        context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
      }
    },
    async addPetAsync(context, playlod) {
      const data = await servePet.addPet(playlod);
      context.dispatch("getPetsByPageAsync");
    },
    //删除服务
    async removePetAsync(context, payload) {
      const data = await servePet.removePet({ _id: payload });
      context.dispatch("getPetsByPageAsync");
    },
    //修改服务
    async updatePetAsync(context, payload) {
      const data = await servePet.updatePet(payload);
      context.dispatch("getPetsByPageAsync");
    },

  },
}