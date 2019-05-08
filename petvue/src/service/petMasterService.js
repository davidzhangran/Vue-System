//宠主

// const getcommoditysByPage = async ({ currentPage = 1, eachPage = 10 } = {}) =>
//     await fetch(`/goods/getcommoditysByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
//         .then(response => response.json())



// 新增
const addPetMaster = async (parm) => {
    let data = await fetch(`/petMember/addPetMaster`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
    console.log(data);
    return data;
}


export default {
    addPetMaster
}