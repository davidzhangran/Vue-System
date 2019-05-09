import petMasterService from '../service/petMasterService'
export default {
    // 命名空间，防止命名冲突
    namespaced: true,
    state: { //自身状态
        currentPage: 1, //当前页码
        eachPage: 3, //每页显示的条数
        totalPage: 10, //总页数
        count: 0, //总条数
        petMasterUsers: [], //用户数据
    },
    mutations: {//同步
        getPetMasterByPgae: (state, payload) => {
            //合并操作 不能直接赋值 因为直接赋值会导致原有的state响应式get set 失效 因为后台返回的是一个普通对象
            Object.assign(state, payload);
            console.log(state);
            
        },
        setEachPage: (state, eachPage) => {
            console.log("setEachPage");
            state.eachPage = eachPage
        },
        setCurrentPage: (state, currentPage) => {
            console.log("setCurrentPage");
            
            state.currentPage = currentPage
        }
    },
    actions: { //异步
        // 增加宠主
        async addPetMasterAsync(context, p) {
            const result = await petMasterService.addPetMaster(p)
            console.log(result);
        },
        // 宠主分页
        async getPetMasterByPageAsync(context) {
            const { eachPage, currentPage } = context.state//解构得到state里面的两个值
            const data = await petMasterService.getPetMasterByPage()
            console.log(data);
            context.commit("getPetMasterByPgae", data)
        }
    }
}