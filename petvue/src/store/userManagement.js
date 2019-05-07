import userService from '../service/userManagement'

export default {
    namespaced: true,
    state: {
        currentPage: "1", //当前页码
        eachPage: 3, //每页显示的条数
        totalPage: 10, //总页数
        count: 0, //总条数
        users: [{
            username:"11",
            password:"111",
            phone:"12356",
            email:"1123@qq.com",
            name:"123",
            role:"平台管理员",
            status:"可用"
        }], //用户数据
    },
    mutations: {

    },
    actions:{
        async addUserAsync({dispatch}, {username, password, phone, email, name, role}) {
            console.log(role);
            const data = {username, password, phone, email, name, role}
            console.log(data);
            const result = await userService.addUser(data)
        }
    }
}