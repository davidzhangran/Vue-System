import OrderService from "../service/orders";
import comService from "../service/commodity";
import petService from "../service/petService";
import servePet from "../service/servePet";
import storefrontService from "../service/storefront";

export default {
    //命名空间，防止不同的状态重名
    namespaced: true,
    state: {
        currentPage: 1,//当前页
        eachPage: 1,//每页显示条数
        totalPage: 0,
        count: 0,
        commoditys: [],
        pets: [],
        serves: [],
        storefrontInfo: [],
        orders:[],
    },
    mutations: {//同步方法
        getCommoditysByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        getPetsByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        getServesByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        getStorefrontByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        getOrdersByPage: (state, payload) => {
            Object.assign(state, payload)
        },
        setEachPage: (state, eachPage) => state.eachPage = eachPage,
        setCurrentPage: (state, currentPage) => state.currentPage = currentPage,
        setEachPage: (state, eachPage) => {//当在最后一页进行翻页时调到以第一
            state.eachPage = eachPage;
            if (state.currentPage == state.totalPage) {
                state.currentPage = 1;
            }
        },
    },
    actions: {
        async addOrdersAsync(context, playlod) {
            // const { currentPage, eachPage } = context.state
            const data = await OrderService.addOrders(playlod);
            console.log(data)
        },
        // 获取订单
        async getOrdersAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state
            if (type == undefined) {
                const data = await OrderService.getOrdersByPage({ currentPage, eachPage, userId })
                context.commit("getOrdersByPage", data)
            } else {
                const data = await OrderService.getOrdersByPage({ currentPage, eachPage, type, text })
                context.commit("getOrdersByPage", data)
            }
        },
        async removeOrdersAsync(context, playlod) {
            const data = await OrderService.removeOrders(playlod);
            context.dispatch("getOrdersAsync");
        },
        // 获取商品
        async getCommoditysAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state
            if (type == undefined) {
                const data = await comService.getcommoditysByPage({ currentPage, eachPage, userId })
                context.commit("getCommoditysByPage", data)
            } else {
                const data = await comService.getcommoditysByPage({ currentPage, eachPage, type, text })
                context.commit("getCommoditysByPage", data)
            }
        },
        //宠物
        async getPetsByPageAsync(context, { type, text, userId } = {}) {
            userId = document.cookie.match(new RegExp("(^| )" + "id" + "=([^;]*)(;|$)"))[2]
            const { currentPage, eachPage } = context.state;
            if (type != undefined) {
                const data = await petService.getPetsByPageSer({ currentPage, eachPage, type, text, userId });//拿到数据，通过mutations触发数据更新
                context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
            } else {
                const data = await petService.getPetsByPageSer({ currentPage, eachPage, userId });//拿到数据，通过mutations触发数据更新
                context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
            }

        },
        // 服务
        async getServesByPageAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state;
            userId = document.cookie.match(new RegExp("(^| )" + "id" + "=([^;]*)(;|$)"))[2]
            if (type != undefined) {
                const data = await servePet.getPetsByPageSer({ currentPage, eachPage, type, text, userId });//拿到数据，通过mutations触发数据更新
                context.commit("getServesByPage", data);//通过commit触发getStudentsByPage
            } else {
                const data = await servePet.getPetsByPageSer({ currentPage, eachPage, userId });//拿到数据，通过mutations触发数据更新
                context.commit("getServesByPage", data);//通过commit触发getStudentsByPage
            }
        },
        //门店
        async getStorefrontByPageAsync(context, plo) {//获取门店
            const { currentPage, eachPage } = context.state;
            let data = "";
            if (plo) {
                data = await storefrontService.getStorefrontByPage({ currentPage, eachPage, value: plo.value, inputText: plo.inputText });//拿到数据，通过mutations触发数据更新
            } else {
                data = await storefrontService.getStorefrontByPage({ currentPage, eachPage });//拿到数据，通过mutations触发数据更新
            }
            context.commit("getStorefrontByPage", data);//通过commit触发getStorefrontByPage
        },
    }
}
// getOrdersAsync