<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/userStore/storefront">门店管理</el-menu-item>
      <el-menu-item index="2">商品管理</el-menu-item>
      <el-menu-item index="/userStore/pet">宠物管理</el-menu-item>
      <el-menu-item index="4">服务管理</el-menu-item>
<<<<<<< HEAD
      <el-menu-item index="5" >订单管理</el-menu-item>
    </el-menu>
     <router-view></router-view>
=======
      <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>
    <router-view></router-view>
>>>>>>> 2aa8cbc1b2bafff63f593a34860f3a061fa4934c
  </div>
</template>


<script>
export default {
  name: "userStore",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>