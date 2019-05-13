import OrderService from "../service/orders";
import comService from "../service/commodity";
import petService from "../service/petService";
import servePet from "../service/servePet";
import storefrontService from "../service/storefront";
import petMasterService from '../service/petMasterService'

export default {
    //命名空间，防止不同的状态重名
    namespaced: true,
    state: {
        currentPage: 1,//当前页
        eachPage: 3,//每页显示条数
        totalPage: 0,//总页数
        count: 0,//总条数
        commoditys: [],
        pets: [],
        serves: [],
        storefrontInfo: [],
        orders: [],
        petMasterUsers: []
    },
    mutations: {//同步方法
        getCommoditysByPage: (state, payload) => {
            Object.assign(state.commoditys, payload.commoditys)
        },
        getPetsByPage: (state, payload) => {
            Object.assign(state.pets, payload.pets)
        },
        getServesByPage: (state, payload) => {
            Object.assign(state.serves, payload.serves)
        },
        getStorefrontByPage: (state, payload) => {
            Object.assign(state.storefrontInfo, payload.storefrontInfo)
        },
        getPetMasterByPgae: (state, payload) => {
            Object.assign(state.petMasterUsers, payload.petMasterUsers)
        },
        getOrdersByPage: (state, payload) => {
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
        async addOrdersAsync(context, playlod) {
            // const { currentPage, eachPage } = context.state
            const data = await OrderService.addOrders(playlod);
        },
        // 获取订单
        async getOrdersAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state
            const data = await OrderService.getOrdersByPage({ currentPage, eachPage })
            console.log(data);
            
            context.commit("getOrdersByPage", data)

        },
        // 
        async removeOrdersAsync(context, playlod) {
            const data = await OrderService.removeOrders(playlod);
            context.dispatch("getOrdersAsync");
        },
        async upDataOrdersAsync(context, playlod) {
            const data = await OrderService.upDataOrders(playlod);
            context.dispatch("getOrdersAsync");
        },
        // 获取商品
        async getCommoditysAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state
            if (type == undefined) {
                const data = await comService.getcommoditysByPage({ userId })
                context.commit("getCommoditysByPage", data)
            } else {
                const data = await comService.getcommoditysByPage({ type, text })
                context.commit("getCommoditysByPage", data)
            }
        },
        //宠物
        async getPetsByPageAsync(context, { type, text, userId } = {}) {
            userId = document.cookie.match(new RegExp("(^| )" + "id" + "=([^;]*)(;|$)"))[2]
            const { currentPage, eachPage } = context.state;
            if (type != undefined) {
                const data = await petService.getPetsByPageSer({ type, text, userId });//拿到数据，通过mutations触发数据更新
                context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
            } else {
                const data = await petService.getPetsByPageSer({ userId });//拿到数据，通过mutations触发数据更新
                context.commit("getPetsByPage", data);//通过commit触发getStudentsByPage
            }

        },
        // 服务
        async getServesByPageAsync(context, { type, text, userId } = {}) {
            const { currentPage, eachPage } = context.state;
            userId = document.cookie.match(new RegExp("(^| )" + "id" + "=([^;]*)(;|$)"))[2]
            if (type != undefined) {
                const data = await servePet.getPetsByPageSer({ type, text, userId });//拿到数据，通过mutations触发数据更新
                context.commit("getServesByPage", data);//通过commit触发getStudentsByPage
            } else {
                const data = await servePet.getPetsByPageSer({ userId });//拿到数据，通过mutations触发数据更新
                context.commit("getServesByPage", data);//通过commit触发getStudentsByPage
            }
        },
        //门店
        async getStorefrontByPageAsync(context, plo) {//获取门店
            const { currentPage, eachPage } = context.state;
            let data = [];
            const userId = document.cookie.match(
                new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
              )[2];
            if (plo) {
                data = await storefrontService.getStorefrontByPage({ value: plo.value, inputText: plo.inputText,userId });//拿到数据，通过mutations触发数据更新
            } else {
                data = await storefrontService.getStorefrontByPage({ currentPage, eachPage,userId });//拿到数据，通过mutations触发数据更新
            }
            context.commit("getStorefrontByPage", data);//通过commit触发getStorefrontByPage
        },
        async getPetMasterByPageAsync(context) {
            const { eachPage, currentPage } = context.state//解构得到state里面的两个值
            const data = await petMasterService.getPetMasterByPage({ eachPage, currentPage })
            context.commit("getPetMasterByPgae", data)
        }
    }
}
// getOrdersAsync