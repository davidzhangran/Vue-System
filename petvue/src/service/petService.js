// 新增宠物
const addPet = async (parm) => {
    return await fetch(`/pet/addPet`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}
//分页
const getPetsByPageSer = async ({ currentPage = 1, eachPage = 3,type,text,userId } = {}) => {
    if(type!=undefined){
        let data = await fetch(`/pet/getPetsByPage?currentPage=${currentPage}&eachPage=${eachPage}&type=${type}&text=${text}&userId=${userId}`)
        .then(response => response.json())
        return data
    }else{
        let data = await fetch(`/pet/getPetsByPage?currentPage=${currentPage}&eachPage=${eachPage}&userId=${userId}`)
        .then(response => response.json())
        return data
    }
}
//删除
const removePet = async (parm) => {
    return await fetch(`/pet/removePetById`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}
//修改
const updatePet = async (parm) => {
    return await fetch(`/pet/updatePetById`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(parm)//参数是json格式
        }).then(response => response.json())
}

export default {
    addPet,
    getPetsByPageSer,
    removePet,
    updatePet
}