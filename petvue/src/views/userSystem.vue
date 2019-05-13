<template>
  <div>
    <el-menu
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/userSystem/userManagement">用户管理</el-menu-item>
      <el-menu-item index="/userSystem/petMaster">宠主管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">门店管理</template>
        <el-menu-item index="/userSystem/systemFront">门店列表</el-menu-item>
        <el-menu-item index="/userSystem/applyFront">申请列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">评论管理</el-menu-item>
      <el-menu-item  index="/">退出系统</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  computed: {},
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
  },
  mounted() {
    const data = document.cookie.match(
      new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
    )[2];
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-dropdown-link {
  cursor: pointer;
  color: rgb(255, 255, 255);
}
.demonstration {
  display: block;
  color: #8492a6;
}
</style>