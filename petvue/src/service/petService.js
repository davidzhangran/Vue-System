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

export default {
    addPet
}