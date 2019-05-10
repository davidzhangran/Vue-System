<template>
  <div class="wrap">
    <div class="left"></div>
    <div class="right"></div>
    <el-card class="box-card">
      <div class="img4">
        <img src="../assets/login/Sign UP.png" alt>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <div style="margin-bottom: 40px;">
          <el-form-item prop="phone">
            <el-input
              maxlength="11"
              class="phone"
              placeholder="请输入账号"
              prefix-icon="el-icon-s-custom"
              v-model="ruleForm.phone"
            ></el-input>
          </el-form-item>
        </div>
        <div style="margin-bottom: 40px;">
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <div class="btnImg" @click="login">
            <span class="span">登陆</span>
          </div>
          <div class="textBtn">
            <span>没有账号？</span>
            <p @click="register">点击注册</p>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <div>
      <img src="../assets/login/椭圆 3.png" alt class="img1">
      <img src="../assets/login/椭圆 3 拷贝.png" alt class="img2">
      <img src="../assets/login/背景.png" alt class="img3">
      <div class="text">
        <h1>爱宠邦后台管理系统</h1>
        <p>The Backstage Management</p>
      </div>
    </div>
    <WebWeb class="webweb"/>
  </div>
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
    console.log(from);

    if (to.name == "userSystem") {
      const { phone, password } = this.ruleForm;
      const result = await userService.loging({ phone, password });
      if (result.length > 0) {
        console.log(result);
        result[0].role == "1" ? next("/userStore") : next();
        document.cookie = `id=${result[0]._id}`;
        if (result[0].role == "1" && result[0].state == "2") {
          next("/userStore");
          this.$message({
            message: "登录成功",
            type: "success"
          });
        } else if (result[0].role == "0") {
          next();
           this.$message({
            message: "登录成功",
            type: "success"
          });
        } else {
          next("/");
          this.$message({
            message: "账号正在审核中，请稍后再试",
            type: "warning"
          });
        }
      } else {
        next(false);
        this.$message({
          message: "账号或密码错误，请重新登录",
          type: "warning"
        });
      }
    }
    // else if (to.name == "userStore") {
    //   next("/");
    //   this.$message({
    //     message: "调皮，不要妄想偷渡哦",
    //     type: "warning"
    //   });
    // }
    //  else if (to.name == "register") {
    //   next();
    // }
    // else if (to.name != "userSystem" || to.name != "userStore") {
    //   next("/");
    //   this.$message({
    //     message: "调皮，不要妄想偷渡哦",
    //     type: "warning"
    //   });
    // }
    else {
      next();
    }
  }
};
</script>

<style scoped>
.webweb {
  position: fixed;
  bottom: 140px;
  right: 240px;
}
/* .webweb{
  position: fixed;
  bottom: 140px;
  left: 150px;
} */
.text {
  color: white;
  text-align: center;
  position: fixed;
  margin-top: 280px;
  margin-left: 80px;
}
.text > h1 {
  font-size: 30px;
  font-weight: 400;
  letter-spacing: 4px;
  margin-bottom: 10px;
}
.textBtn > p {
  display: inline-block;
  color: #017cc3;
  font-size: 16px;
}
.textBtn > span {
  color: #ccc;
  font-size: 16px;
  margin-right: 5px;
}
.text > p {
  font-size: 18px;
}
.span {
  line-height: 60px;
  color: white;
  font-size: 18px;
  letter-spacing: 4px;
}
.btnImg {
  background: url("../assets/login/组 1.png") no-repeat center;
  background-size: cover;
  width: 300px;
  height: 60px;
  margin: 0 auto 25px;
}
.btnImg:hover {
  cursor: pointer;
}
.textBtn > p:hover {
  cursor: pointer;
}
.img4 {
  margin: 20px 0 60px 0;
}
.img4::after {
  content: " ";
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #017cc3;
  margin-left: 20px;
}
.img4::before {
  content: " ";
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #017cc3;
  margin-right: 20px;
}
.box-card {
  width: 500px;
  height: 500px;
  text-align: center;
  position: fixed;
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  border-radius: 5px;
  padding: 0 40px;
  box-sizing: border-box;
}
.img1 {
  position: absolute;
  right: 0;
  height: 60%;
  top: calc(50% - 300px);
  height: 380px;
}
.img2 {
  position: absolute;
  top: 15%;
  right: 20%;
  width: 40px;
}
.unername {
  margin-bottom: 20px;
}
.btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.left {
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  background: #017cc3;
}
.img3 {
  position: absolute;
  height: 90%;
}
</style>




