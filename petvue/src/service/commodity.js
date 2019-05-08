//商品

const getcommoditysByPage = async ({ currentPage = 1, eachPage = 10, type, text } = {}) => {
    if (type == undefined) {
        let data = await fetch(`/goods/getcommoditysByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
            .then(response => response.json())
        return data
    } else {
        let data = await fetch(`/goods/getcommoditysByPage?currentPage=${currentPage}&eachPage=${eachPage}&type=${type}&text=${text}`)
            .then(response => response.json())
        return data
    }
}




// 新增上平
const addCommodity = async (parm) => {
    return await fetch(`/goods/addCommodity`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}
//修改
const upDataCommodity = async (parm) => {
    return await fetch(`/goods/upDataCommodity`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}
//删除
const removeCommodity = async (parm) => {
    return await fetch(`/goods/removeCommodity`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}
export default {
    addCommodity,
    getcommoditysByPage,
    upDataCommodity,
    removeCommodity
}