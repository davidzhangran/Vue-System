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

export default {
    addStorefront,
    getStorefrontByPage
}