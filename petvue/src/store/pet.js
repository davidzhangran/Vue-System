import petService from "../service/petService";

export default {
  //命名空间，防止不同的状态重名
  namespaced: true,
  state: {
    currentPage: 1,
    eachPage: 10,
    maxPage: 0,
    total: 0,
    pets: []
  },
  mutations: {//同步方法
    getPetsByPage(state, payload) {
      Object.assign(state, payload);//合并操作，相当于上一种
    },
    setEachPage: (state, eachPage) => state.eachPage = eachPage,
    setCurrentPage: (state, currentPage) => state.currentPage = currentPage,
  },
  actions: {
    async addPetAsync(context, playlod) {
      const data = await petService.addPet(playlod);
      context.dispatch("getPetsByPageAsync");
    },
    //分页
    async getPetsByPageAsync(context, { type, text } = {}) {
      const { currentPage, eachPage } = context.state;
      if (type != undefined) {
        const data = await petService.getPetsByPageSer({ currentPage, eachPage, type, text });//拿到数据，通过mutations触发数据更新
        context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
      } else {
        const data = await petService.getPetsByPageSer({ currentPage, eachPage });//拿到数据，通过mutations触发数据更新
        context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
      }

    },
    //删除宠物
    async removePetAsync(context, payload) {
      const data = await petService.removePet({ _id: payload });
      context.dispatch("getPetsByPageAsync");
    },
    //修改
    async updatePetAsync(context, payload) {
      const data = await petService.updatePet(payload);
      context.dispatch("getPetsByPageAsync");
    },

  },
}