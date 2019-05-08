import petMasterService from '../service/petMasterService'

export default {
    namespaced: true,
    state: { //自身状态
        // currentPage: 1, //当前页码
        // eachPage: 3, //每页显示的条数
        // totalPage: 10, //总页数
        // count: 0, //总条数
        // users: [], //用户数据

    },
    mutations: {//同步

    },
    actions: { //异步
        async addPetMasterAsync(context, p) {

            const result = await petMasterService.addPetMaster(p)
            console.log(result);
        }

    }
}