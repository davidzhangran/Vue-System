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
>>>>>>> 065fa2ceccd1ae84ecb26aa78f7c3e1626dccfb8
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
>>>>>>> 065fa2ceccd1ae84ecb26aa78f7c3e1626dccfb8
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
=======

>>>>>>> 065fa2ceccd1ae84ecb26aa78f7c3e1626dccfb8

export default {
    addPetMaster,
    getPetMasterByPage,
<<<<<<< HEAD
    updatePetMaster,
    delePetMaster
=======
    upDataPetMasterByPage,
    removePetMasterByPage
>>>>>>> 065fa2ceccd1ae84ecb26aa78f7c3e1626dccfb8
}