import comService from "../service/commodity";


export default {
    //命名空间，防止不同的状态重名
    namespaced: true,
    state: {
        currentPage: 1,//当前页
        eachPage: 3,//每页显示条数
        totalPage: 0,
        count: 0,
        commoditys: []
    },
    mutations: {//同步方法
        getCommoditysByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        // setEachPage: (state, eachPage) => state.eachPage = eachPage,
        setCurrentPage: (state, currentPage) => state.currentPage = currentPage,
        setEachPage: (state, eachPage) => {//当在最后一页进行翻页时调到以第一
            state.eachPage = eachPage;
            if (state.currentPage == state.totalPage) {
                state.currentPage = 1;
            }
        },
    },
    actions: {
        async addCommodityAsync(context, playlod) {
            // const { currentPage, eachPage } = context.state
            const data = await comService.addCommodity(playlod);
            console.log(data)
        },
        async getCommoditysAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state
            if (type == undefined) {
                const data = await comService.getcommoditysByPage({ currentPage, eachPage, userId })
                context.commit("getCommoditysByPage", data)
            } else {
                const data = await comService.getcommoditysByPage({ currentPage, eachPage, type, text, userId })
                console.log(data)
                context.commit("getCommoditysByPage", data)
            }


        },
        async upDataCommodityAsync(context, playlod) {
            const data = await comService.upDataCommodity(playlod);
            context.dispatch("getCommoditysAsync");
        },
        async removeCommodityAsync(context, playlod) {
            const data = await comService.removeCommodity(playlod);
            context.dispatch("getCommoditysAsync");
        },
    },
}
