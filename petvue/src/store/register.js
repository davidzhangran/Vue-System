import userService from '../service/userManagement'

export default {
    namespaced: true,
    state: {
        users: [{
            username: "11",
            password: "111",
            phone: "12356",
            email: "1123@qq.com",
            name: "123",
            status: "可用"
        }], //用户数据
    },
    mutations: {
        getUsersByPgae: (state, payload) => {
            Object.assign(state, payload) //合并操作 不能直接赋值 因为直接赋值会导致原有的state响应式get set 失效 因为后台返回的是一个普通对象
        },
      
    },
    actions: {
        async addUserAsync({ dispatch }, { username, password, phone, email, name }) {
            // const data = { username, password, phone, email, name}
            // console.log(data);
            // const result = await userService.addUser(data)
        }
    }
}