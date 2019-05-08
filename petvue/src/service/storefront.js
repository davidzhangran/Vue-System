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

const getStorefrontByPage = async ({ currentPage = 1, eachPage = 5 } = {}) => {
    let data = await fetch(`/storefront/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
        .then(response => response.json())
    return data
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

export default {
    addStorefront,
    getStorefrontByPage,
    addStaff
}