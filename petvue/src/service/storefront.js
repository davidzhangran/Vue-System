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

export default {
    addStorefront
}