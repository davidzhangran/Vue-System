//宠主

// const getcommoditysByPage = async ({ currentPage = 1, eachPage = 10 } = {}) =>
//     await fetch(`/goods/getcommoditysByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
//         .then(response => response.json())





const addPetMaster = async (params) => await fetch("/petMember/addPetMaster", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type":"application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())


export default {
    addPetMaster
}