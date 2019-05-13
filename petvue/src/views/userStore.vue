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
      <el-submenu index="1" >
        <!-- suffix-icon="el-icon-location" -->
        <template slot="title" > <i class="el-icon-s-shop"></i>门店管理</template>
        <el-menu-item index="/userStore/storefront" >门店列表</el-menu-item>
        <el-menu-item index="/userStore/addStorefront">申请门店</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
        <el-menu-item index="/userStore/commodity">新增商品</el-menu-item>
        <el-menu-item index="/userStore/commodityTab">商品列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/userStore/pet" ><i class="el-icon-paperclip"></i>宠物管理</el-menu-item>
      <el-menu-item index="/userStore/servePet"  ><i class="el-icon-chicken"></i>服务管理</el-menu-item>
      <el-menu-item index="/userStore/orders"><i class="el-icon-shopping-cart-2"></i>订单管理</el-menu-item>
      <el-menu-item index="/"><i class="el-icon-sort"></i>退出系统</el-menu-item>
    </el-menu>
    <router-view></router-view>
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
  },
  mounted() {
   const data =  document.cookie.match(new RegExp("(^| )" + "id" + "=([^;]*)(;|$)"))[2]
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>