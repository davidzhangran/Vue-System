import comService from "../service/commodity";


export default {
    //命名空间，防止不同的状态重名
    namespaced: true,
    state: {
        currentPage: 1,//当前页
        eachPage: 2,//每页显示条数
        totalPage: 0,
        count: 0,
        commoditys: []
    },
    mutations: {//同步方法
        getCommoditysByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        setEachPage: (state, eachPage) => state.eachPage = eachPage,
        setCurrentPage: (state, currentPage) => state.currentPage = currentPage
    },
    actions: {
        async addCommodityAsync(context, playlod) {
            // const { currentPage, eachPage } = context.state
            const data = await comService.addCommodity(playlod);
            console.log(data)
        },
        async getCommoditysAsync(context, playlod) {
            const { currentPage, eachPage } = context.state
            const data = await comService.getcommoditysByPage({ currentPage, eachPage })
            // console.log(data);
            data.currentPage = Number(data.currentPage)
            data.eachPage = Number(data.eachPage)
            context.commit("getCommoditysByPage", data)
        },
    },
}

