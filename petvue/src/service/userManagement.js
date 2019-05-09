//获取用户
const getUserByPgae = async ({ currentPage = 1, eachPage = 10 } = {}) => await fetch(`/users/getUserByPage?currentPage=${currentPage}&eachPage=${eachPage}`).then(response => response.json())
//用户登录
const loging = async (params) => await fetch("/users/loging", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type":"application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())
//新增用户
const addUser = async (params) => await fetch("/users/addUser", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type":"application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())
//修改用户
const upDataUser = async (params) => await fetch("/users/upDataUser", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type":"application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())
//删除用户
const deleteUser = async (params) => await fetch("/users/deleteUser", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type":"application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())

export default { //用对象暴露 因为后续需要在里面写多个异步请求
    getUserByPgae,
    addUser,
    loging,
    upDataUser,
    deleteUser
}