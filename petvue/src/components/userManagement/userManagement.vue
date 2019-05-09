<template>
  <div style>
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="用户列表">
        <div class="user">
          <el-table v-loading="loading" :data="users" style="width: 100%">
            <el-table-column type="index" label="ID"></el-table-column>
            <el-table-column prop="username" label="登录名" width="200"></el-table-column>
            <el-table-column prop="password" label="密码" width="120"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="190"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="role" label="角色" width="120"></el-table-column>
            <el-table-column prop="state" label="状态" width="120"></el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="mini">修改</el-button>
                <el-button type="danger" @click="deleteUserAsync(scope.row._id)" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="updata">
              <el-form-item label="登录名" :label-width="formLabelWidth">
                <el-input v-model="updata.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="updata.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" :label-width="formLabelWidth">
                <el-input v-model="updata.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="updata.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="审核状态" :label-width="formLabelWidth">
                <el-select v-model="updata.state" placeholder="请审批">
                  <el-option label="审核中" value="1"></el-option>
                  <el-option label="可用" value="2"></el-option>
                  <el-option label="不可用" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
<<<<<<< HEAD
              <el-button type="primary" @click="upDataUserAsync(updata)">确 定</el-button>
            </div>
          </el-dialog>

=======
              <el-button type="primary" @click="comfirm(updata)">确 定</el-button>
            </div>
          </el-dialog>
>>>>>>> 46b87e1246369eb638edb089b32abcb2f79d66d5
          <div class="block">
            <el-pagination @size-change="setEachPage" 
            @current-change="setCurrentPage" 
            :current-page="currentPage - 0" 
            :page-sizes="[3, 5, 10, 15]" 
            :page-size="3" 
            layout="total, sizes, prev, pager, next, jumper" 
            :total="count"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新增用户">
        <div class="user addUser">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="登录名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-radio-group v-model="form.role">
                <el-radio label="平台管理员"></el-radio>
                <el-radio label="门户管理员"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addUserAsync(form)">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState, mapActions } = createNamespacedHelpers("users");

export default {
  computed: {
<<<<<<< HEAD
    ...mapState(["users", "totalPage", "count"]),
=======
    ...mapState(["users", "totalPage", "count", "loading"]),
>>>>>>> 46b87e1246369eb638edb089b32abcb2f79d66d5
    eachPage: {
      get: mapState(["eachPage"]).eachPage, //获取每页显示页数
      set: mapMutations(["setEachPage"]).setEachPage //通过input框去修改每页显示页数
    },
    currentPage: {
      get: mapState(["currentPage"]).currentPage,
      set: mapMutations(["setCurrentPage"]).setCurrentPage
    }
  },
  methods: {
    handleClick(row) {
<<<<<<< HEAD
      this.updata._id = row._id;
      (this.updata.phone = row.phone), (this.updata.state = row.state);
=======
      this.updata = row;
>>>>>>> 46b87e1246369eb638edb089b32abcb2f79d66d5
      this.dialogFormVisible = true;
      console.log(row);
    },
    comfirm(form) {
      this.dialogFormVisible = false;
      this.upDataUserAsync(form);
    },
    ...mapActions([
      "addUserAsync",
      "getUserByPageAsync",
      "upDataUserAsync",
      "deleteUserAsync"
    ]),
    ...mapMutations(["setEachPage", "setCurrentPage"])
  },
  watch: {
    //监听器当数据发生改变就调用异步方法更新数据
    eachPage() {
      
      this.getUserByPageAsync();
    },
    currentPage() {
      
      this.getUserByPageAsync();
    }
  },
  mounted() {
    //生命周期 可以访问真实节点阶段
    this.getUserByPageAsync();
  },
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      tabPosition: "top",
      form: {
        username: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        role: ""
      },
      updata: {
        phone: "",
        state: "",
        _id: ""
      }
    };
  }
};
</script>
<style>
.user {
  padding: 20px;
}
.addUser {
  width: 500px;
}
</style>
