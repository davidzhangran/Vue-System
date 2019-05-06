<template>
  <div>
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">门店管理</el-menu-item>
      <el-menu-item index="2">商品管理</el-menu-item>
      <el-menu-item index="3">宠物管理</el-menu-item>
      <el-menu-item index="4">服务管理</el-menu-item>
      <el-menu-item index="3">订单管理</el-menu-item>
    </el-menu>
  </div>
</template>


<script>
export default {
  name: "system",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
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