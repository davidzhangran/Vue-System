import petMasterService from '../service/petMasterService'
export default {
    // 命名空间，防止命名冲突
    namespaced: true,
    state: { //自身状态
        loading: false,
        dialogTableVisible: false,
        currentPage: 1, //当前页码
        eachPage: 3, //每页显示的条数
        totalPage: 10, //总页数
        count: 0, //总条数
        petMasterUsers: [], //用户数据
    },
    mutations: {//同步
        getPetMasterByPage: (state, payload) => {
            //合并操作 不能直接赋值 因为直接赋值会导致原有的state响应式get set 失效 因为后台返回的是一个普通对象
            Object.assign(state, payload);
        },
        setEachPage: (state, eachPage) => {
            state.eachPage = eachPage
            state.currentPage = 1
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage
        },
        close(state) {
            state.dialogTableVisible = false
        },
        open(state) {
            state.dialogTableVisible = true
        },
        openLoading(state) {
            state.loading = true
        },
        closeLoaing(state) {
            state.loading = false
        },
    },
    actions: { //异步
        // 增加宠主
        async addPetMasterAsync({ dispatch, commit }, p) {
            const {banner} = p
            console.log(banner);
            const result = await petMasterService.addPetMaster(p)
            commit("close")
            dispatch("getPetMasterByPageAsync")
        },
        // 宠主分页
        async getPetMasterByPageAsync({ commit, state }) {
            commit("openLoading")
            const { eachPage, currentPage } = state//解构得到state里面的两个值
            const data = await petMasterService.getPetMasterByPage({ eachPage, currentPage })
            commit("getPetMasterByPage", data)
            commit("closeLoaing")
        },
        //修改宠主
        async updateMasterByIdAsync({dispatch, commit},upDate) {
            commit("openLoading")
            const result = await petMasterService.updatePetMaster(upDate)
            commit("closeLoaing")
            dispatch("getPetMasterByPageAsync")
        },
        //删除宠主
        async delePetMasterAsync({dispatch, commit},_id) {
            commit("openLoading")
            const result = await petMasterService.delePetMaster({_id})
            commit("closeLoaing")
            dispatch("getPetMasterByPageAsync")
        }
    }
}