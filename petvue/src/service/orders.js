const addOrders = async (parm) => {
    return await fetch(`/orders/addOrders`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}
const getOrdersByPage = async ({ currentPage = 1, eachPage = 10, type, text, userId } = {}) => {
    if (type == undefined) {
        let data = await fetch(`/orders/getOrdersByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
            .then(response => response.json())
        return data
    } else {
        let data = await fetch(`/orders/getOrdersByPage?currentPage=${currentPage}&eachPage=${eachPage}
        &type=${type}&text=${text}&userId=${userId}`)
            .then(response => response.json())
        return data
    }
}
//删除
const removeOrders = async (parm) => {
    return await fetch(`/orders/removeOrders`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

const upDataOrders = async (parm) => {
    return await fetch(`/orders/upDataOrders`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

export default {
    addOrders,
    getOrdersByPage,
    removeOrders,
    upDataOrders
}