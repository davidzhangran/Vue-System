// 申请门店
const addStorefront = async (parm) => {
    console.log(parm);
    return await fetch(`/storefront/addStorefront`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

const getStorefrontByPage = async ({ currentPage = 1, eachPage = 5, value = "name", inputText = "" } = {}) => {
    if (inputText) {
        let data = await fetch(`/storefront/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}&value=${value}&inputText=${inputText}`)
            .then(response => response.json())
        return data
    }
    let data = await fetch(`/storefront/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
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

export default {
    addStorefront,
    getStorefrontByPage,
    updateStorefront
}