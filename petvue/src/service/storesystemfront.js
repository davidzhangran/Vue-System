// 申请门店
const addStorefront = async (parm) => {
    console.log(parm);
    return await fetch(`/storesystemfrontRouter/addStorefront`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

const getStorefrontByPage = async ({ currentPage, eachPage, value = "name", inputText = "", state,userId } = {}) => {
    if (inputText) {
        let data = await fetch(`/storesystemfrontRouter/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}&value=${value}&inputText=${inputText}&state=${state}
        &userId=${userId}`)
            .then(response => response.json())
        return data
    }
    let data = await fetch(`/storesystemfrontRouter/getStorefrontByPage?currentPage=${currentPage}&eachPage=${eachPage}&state=${state}
    &userId=${userId}`)
        .then(response => response.json())
    return data;
}

// 修改门店
const updateStorefront = async (parm) => {
    return await fetch(`/storesystemfrontRouter/updateStorefront`,
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