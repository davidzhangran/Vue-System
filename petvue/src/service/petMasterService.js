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
<<<<<<< HEAD
const updatePetMaster = async (params) => await fetch("/petMember/updatePetMaster", {
=======
const upDataPetMasterByPage = async (params) => await fetch("/petMember/updatePetMaster", {
>>>>>>> 3d0079e4fbe13c92a167cfdd90d85e36881d9827
>>>>>>> 3e0e6fc633e3cbec3a1ae996b3fb820fab3f1210
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
<<<<<<< HEAD
const delePetMaster = async (params) => await fetch("/petMember/removePetMaster", {
=======
const removePetMasterByPage = async (params) => await fetch("/petMember/removePetMaster", {
>>>>>>> 3d0079e4fbe13c92a167cfdd90d85e36881d9827
>>>>>>> 3e0e6fc633e3cbec3a1ae996b3fb820fab3f1210
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
<<<<<<< HEAD
=======
=======
    upDataPetMasterByPage,
    removePetMasterByPage
>>>>>>> 3d0079e4fbe13c92a167cfdd90d85e36881d9827
>>>>>>> 3e0e6fc633e3cbec3a1ae996b3fb820fab3f1210
}