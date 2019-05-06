import storefrontService  from "../service/storefront";

export default {
    namespaced: true,//命名空间，防止不同的状态重名
      state: {
       
      },
      mutations: {//同步方法
        
    },
    actions: {
        async addStorefrontAsync(context,plo) {
            const data = await storefrontService.addStorefront(plo)
            console.log(data);
        },
    
    },
  }