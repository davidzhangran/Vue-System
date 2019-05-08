import petService  from "../service/petService";

export default {
   //命名空间，防止不同的状态重名
    namespaced:true,
      state: {
       
      },
      mutations: {//同步方法
        
      },
    actions: {
        async addPetAsync(context,playlod) {
            const data = await petService.addPet(playlod)
            console.log(data);
        },
    
    },
  }