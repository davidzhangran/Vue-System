//商品

const getcommoditysByPage = async ({ currentPage = 1, eachPage = 10 } = {}) =>
    await fetch(`/goods/getcommoditysByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
        .then(response => response.json())



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


export default {
    addCommodity,
    getcommoditysByPage
}