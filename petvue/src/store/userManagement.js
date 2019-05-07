import userService from '../service/userManagement'

export default {
    namespaced: true,
    state: {
        currentPage: "1", //当前页码
        eachPage: 3, //每页显示的条数
        totalPage: 10, //总页数
        count: 0, //总条数
        users: [{
            username: "11",
            password: "111",
            phone: "12356",
            email: "1123@qq.com",
            name: "123",
            role: "平台管理员",
            status: "可用"
        }], //用户数据
    },
    mutations: {
        getUsersByPgae: (state, payload) => {
            Object.assign(state, payload) //合并操作 不能直接赋值 因为直接赋值会导致原有的state响应式get set 失效 因为后台返回的是一个普通对象
        },
        setEachPage: (state, eachPage) => {
            state.eachPage = eachPage
            state.currentPage = "1"
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage
        }
    },
    actions: {
        async getUserByPageAsync(context) {
            console.log(context.state);
            const { eachPage, currentPage } = context.state//解构得到state里面的两个值
            const data = await userService.getUserByPgae({ eachPage, currentPage })
            context.commit("getUsersByPgae",data)
        },
        async addUserAsync({ dispatch }, { username, password, phone, email, name, role }) {
            const data = { username, password, phone, email, name, role: role == "平台管理员" ? "0" : "1" }
            console.log(data);
            const result = await userService.addUser(data)
        }
    }
}