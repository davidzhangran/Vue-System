// 获取宠主
const getPetMasterByPage = async ({ currentPage = 1, eachPage = 10 } = {}) =>
    await fetch(`/petMember/getPetMasterByPage?currentPage=${currentPage}&eachPage=${eachPage}`)
        .then(response => response.json())
// 增加宠主
const addPetMaster = async (params) => await fetch("/petMember/addPetMaster", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())

// 修改
const updatePetMaster = async (params) => await fetch("/petMember/updatePetMaster", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())

// 删除宠主
const delePetMaster = async (params) => await fetch("/petMember/removePetMaster", {
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())

export default {
    addPetMaster,
    getPetMasterByPage,
    updatePetMaster,
    delePetMaster
}