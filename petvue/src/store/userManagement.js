import userService from '../service/userManagement'

export default {
    namespaced: true,
    state: {
        currentPage: 1, //当前页码
        eachPage: 3, //每页显示的条数
        totalPage: 10, //总页数
        count: 0, //总条数
        users: [], //用户数据
    },
    mutations: {
        getUsersByPgae: (state, payload) => {
            Object.assign(state, payload) //合并操作 不能直接赋值 因为直接赋值会导致原有的state响应式get set 失效 因为后台返回的是一个普通对象
        },
        setEachPage: (state, eachPage) => {
            state.eachPage = eachPage
            if (state.currentPage == state.totalPage) {
                state.currentPage = 1
            }
        },
        setCurrentPage: (state, currentPage) => {
            state.currentPage = currentPage
        }
    },
    actions: {
        //通过当前页和每页条数获取用户信息
        async getUserByPageAsync(context) {
            const { eachPage, currentPage } = context.state//解构得到state里面的两个值
            const data = await userService.getUserByPgae({ eachPage, currentPage })
            data.users.map(item => {
                if (item.state == "1") {
                    return item.state = "申请中"
                } else if (item.state == "2") {
                    return item.state = "可用"
                } else {
                    return item.state = "不可用"
                }
            })
            data.users.map(item => {
                if (item.role == "1") {
                    return item.role = "门户管理员"
                }
                return item.role = "平台管理员"
            })
            context.commit("getUsersByPgae", data)
        },
        //新增用户
        async addUserAsync({ dispatch }, { username, password, phone, email, name, role }) {
            const data = { username, password, phone, email, name, role: role == "平台管理员" ? "0" : "1" }
            const result = await userService.addUser(data)
            console.log(result);
        },
        //修改用户
        async upDataUserAsync({ dispatch }, {_id, state}) {
            const result = await userService.upDataUser({_id, state})
            dispatch("getUserByPageAsync")
        },
        //删除用户
        async deleteUserAsync({dispatch}, _id) {
            const result = await userService.deleteUser({_id})
            dispatch("getUserByPageAsync")
        }
    }
}