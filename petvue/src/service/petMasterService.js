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
<<<<<<< HEAD
//修改宠主
const updatePetMaster = async (params) => await fetch("/petMember/updatePetMaster", {
=======

// 修改
const upDataPetMasterByPage = async (params) => await fetch("/petMember/updatePetMaster", {
>>>>>>> 3d0079e4fbe13c92a167cfdd90d85e36881d9827
    method: "POST",
    mode: "cors",
    headers: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
}
).then(response => response.json())
<<<<<<< HEAD
//删除宠主
const delePetMaster = async (params) => await fetch("/petMember/removePetMaster", {
=======

// 删除宠主
const removePetMasterByPage = async (params) => await fetch("/petMember/removePetMaster", {
>>>>>>> 3d0079e4fbe13c92a167cfdd90d85e36881d9827
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
<<<<<<< HEAD
    updatePetMaster,
    delePetMaster
=======
    upDataPetMasterByPage,
    removePetMasterByPage
>>>>>>> 3d0079e4fbe13c92a167cfdd90d85e36881d9827
}