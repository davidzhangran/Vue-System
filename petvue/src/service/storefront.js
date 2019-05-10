// 申请门店


const addStorefront = async (parm) => {
    return await fetch(`/storefront/addStorefront`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

const getStorefrontByPage = async ({ currentPage = 1, eachPage = 5, value = "name", inputText = "", userId = "" } = {}) => {
    // if (inputText) {
    //     let data = await fetch(`/storefront/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}&value=${value}&inputText=${inputText}&userId=${userId}`)
    //         .then(response => response.json())
    //     return data
    // }
    let data = await fetch(`/storefront/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}&userId=${userId}`)
        .then(response => response.json())
    return data;
}

// 修改门店
const updateStorefront = async (parm) => {
    return await fetch(`/storefront/updateStorefront`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}


// 增加店员
const addStaff = async (parm) => {
    console.log(parm);

    return await fetch(`/storefront/addStaff`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

const addGoods = async ({ _id, goodsId }) => {
    return await fetch(`/storefront/addGoods?_id=${_id}&goodsId=${goodsId}`)
        .then(response => response.json())
}
const addServe = async ({ _id, serveId }) => {
    return await fetch(`/storefront/addServe?_id=${_id}&serveId=${serveId}`)
        .then(response => response.json())
}
const addPet = async ({ _id, petId }) => {
    return await fetch(`/storefront/addPet?_id=${_id}&petId=${petId}`)
        .then(response => response.json())
}
const remove = async ({ _id, typeId, type }) => {
    return await fetch(`/storefront/remove?_id=${_id}&typeId=${typeId}&type=${type}`)
        .then(response => response.json())
}
const removeStaff = async ({ _id,  phone }) => {
    return await fetch(`/storefront/removeStaff?_id=${_id}&phone=${phone}`)
        .then(response => response.json())
}

export default {
    addStorefront,
    getStorefrontByPage,
    addStaff,
    updateStorefront,
    addGoods,
    addServe,
    addPet,
    remove,
    removeStaff
}

