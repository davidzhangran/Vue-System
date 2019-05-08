<template>
  <el-card class="box-card">
    <!-- <div>
      <div>
        <el-input class="unername" v-model="unername" placeholder="请输入手机号" prefix-icon="el-icon-user-solid" maxlength="11" show-word-limit></el-input>
        <el-input class="paw" v-model="paw" placeholder="请输入密码" prefix-icon="el-icon-warning"></el-input>
      </div>

      <div class="btn">
        <el-button @click="login" class="login" type="primary">点击登陆</el-button>
        <el-button @click="register" class="reg" type="primary">点击注册</el-button>
      </div>
    </div>-->

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          maxlength="11"
          class="phone"
          placeholder="请输入11位手机号"
          prefix-icon="el-icon-mobile-phone"
          v-model="ruleForm.phone"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          prefix-icon="el-icon-key"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>




<script>
import userService from "../service/userManagement.js";
export default {
  name: "login",
  data() {
    // console.log(this);
    //   return {
    //     unername: "",
    //     paw: ""
    //   };
    // },

    let phoneValidatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        //手机号正则验证
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error("请输入11位有效的手机号码"));
        }
        callback();
      }
    };
    // 判断密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // 密码正则
        if (!/^(\w){6,12}$/.test(value)) {
          callback(new Error("密码必须包含6-12位数字或字母"));
        }
        callback();
      }
    };
    return {
      ruleForm: { phone: this.$route.params.phone, password: "" },
      rules: {
        phone: [{ validator: phoneValidatePass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    login: function(e) {
      this.$router.push("/userSystem");
    },
    register: function(e) {
      this.$router.push("/register");
    }
  },
  async beforeRouteLeave(to, from, next) {
    if (to.name == "userSystem") {
      const { phone, password } = this.ruleForm;
      const result = await userService.loging({ phone, password });
      console.log(result[0].role);
      
      if (result.length > 0) {
        result[0].role == "1"?  next("/userStore"):next("/userSystem")
        document.cookie = `id=${result[0]._id}`
      } else {
        next("/");
         this.$message({ message: "账号或密码错误，请重新登录", type: "warning" });
      }
    } else {
      next();
    }
  }
};
</script>

<style scope>
.box-card {
  margin: auto;
  width: 300px;
}

.unername {
  margin-bottom: 20px;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>




