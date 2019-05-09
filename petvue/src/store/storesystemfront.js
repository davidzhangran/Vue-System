import storefrontService from "../service/storesystemfront";

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
            // payload.storefrontInfo.map(item => {
            //     if (item.state === "1") {
            //         return item.state = "申请中"
            //     } else if (item.state === "2") {
            //         return item.state = "可用"
            //     } else {
            //         return item.state = "不可用"
            //     }
            // })
            console.log(payload);
            Object.assign(state, payload);//合并操作
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage
        },//翻页
        setEachPage: (state, eachPage) => {//当在最后一页进行翻页时调到以第一
            state.eachPage = eachPage;
            state.currentPage = 1;
        },
    },
    actions: {
        async addStorefrontAsync(context, plo) {//申请门店
            const data = await storefrontService.addStorefront(plo)
        },
        async getStorefrontByPageAsync(context, plo = { state: 2 }) {//获取门店
            const { currentPage, eachPage } = context.state;
            let data = "";
            if (plo.value && plo.inputText) {
                data = await storefrontService.getStorefrontByPage({ currentPage, eachPage, value: plo.value, inputText: plo.inputText, state: plo.state });//拿到数据，通过mutations触发数据更新
            } else {
                data = await storefrontService.getStorefrontByPage({ currentPage, eachPage, state: plo.state });//拿到数据，通过mutations触发数据更新
            }
            context.commit("getStorefrontByPage", data);//通过commit触发getStorefrontByPage
        },
        async updateStorefrontAsync(context, plo) {//修改门店
            const data = await storefrontService.updateStorefront(plo);//拿到数据，通过mutations触发数据更新
            if (data) {
                context.dispatch("getStorefrontByPageAsync", { state: plo.newState });
            }
        }
    },
}