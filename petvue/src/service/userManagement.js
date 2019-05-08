const getUserByPgae = async ({ currentPage = 1, eachPage = 10 } = {}) => await fetch(`/users/getUserByPage?currentPage=${currentPage}&eachPage=${eachPage}`).then(response => response.json())

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



export default { //用对象暴露 因为后续需要在里面写多个异步请求
    getUserByPgae,
    addUser,
    loging
}