<template>
  <div>
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
        <div class="input">
          <div>
            登陆名：
            <el-form-item prop="username">
              <el-input
                maxlength="16"
                class="username"
                placeholder="请输入8-16位登录名"
                prefix-icon="el-icon-s-custom"
                v-model="ruleForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>

          <div>
            邮箱:
            <el-form-item prop="email">
              <el-input
                class="email"
                placeholder="请输入邮箱"
                prefix-icon="el-icon-s-platform"
                v-model="ruleForm.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>

          <div>
            真实姓名:
            <el-form-item prop="name">
              <el-input
                class="name"
                placeholder="请输入您的真实姓名"
                prefix-icon="el-icon-mobile-phone"
                v-model="ruleForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>

          <div>
            手机号:
            <el-form-item prop="phone">
              <el-input
                maxlength="11"
                ref="phone"
                class="phone"
                placeholder="请输入11位手机号"
                prefix-icon="el-icon-mobile-phone"
                v-model.number="ruleForm.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>

          <!-- <div>
            <el-form-item prop="phoneCode">
              <el-input
                maxlength="6"
                class="phoneCode"
                placeholder="请输入6位验证码"
                prefix-icon="el-icon-warning-outline"
                v-model.number="ruleForm.phoneCode"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>-->

          <div>
            密码：
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                prefix-icon="el-icon-lock"
                maxlength="12"
                show-password
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </div>

          <div>
            确认密码：
            <el-form-item prop="checkPassword">
              <el-input
                type="password"
                v-model="ruleForm.checkPassword"
                autocomplete="off"
                prefix-icon="el-icon-lock"
                maxlength="12"
                show-password
                placeholder="请再次输入密码"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <div class="btnImg" @click="toLogin(ruleForm)">
            <span class="span">注册</span>
          </div>
          <!-- <el-button type="primary" @click="toLogin(ruleForm)">注册</el-button> -->
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
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
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("register");
import userService from "../service/userManagement.js";
export default {
  data() {
    // 判断登录名
    let usernameValidatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("登录名不能为空"));
      } else {
        //登录名正则验证 8到16位数字与字母组合
        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)) {
          callback(new Error("请输入8-16位有效的登录名"));
        }
        callback();
      }
    };
    // 判断邮箱
    let emailValidatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        //邮箱正则验证
        if (
          !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
            value
          )
        ) {
          callback(new Error("请输入有效的邮箱"));
        }
        callback();
      }
    };

    // 判断姓名
    let nameValidatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else {
        //中文姓名正则验证
        if (!/^[\u4E00-\u9FA5]{2,4}$/.test(value)) {
          callback(new Error("请输入正确的姓名"));
        }
        callback();
      }
    };

    //   判断手机号
    let phoneValidatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("不能输入除数字外其他字符！"));
      } else {
        //手机号正则验证
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error("请输入11位有效的手机号码"));
        }
        callback();
      }
    };

    // 判断验证码
    let phoneCodeValidatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("不能输入除数字外其他字符！"));
      } else {
        if (!/^\d{6}$/.test(value)) {
          callback(new Error("验证码最少6位"));
        }
        callback();
      }
    };

    // 判断密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          // if (!this.$refs.ruleForm.validateField("checkPass")) {
          //   callback(new Error("密码必须包含6-12位数字或字母"));
          // }
          this.$refs.ruleForm.validateField("checkPass");
        } else if (!/^(\w){6,12}$/.test(value)) {
          callback(new Error("密码必须包含6-12位数字或字母"));
        }
        callback();
      }
    };

    // 判断二次输入的密码是否一致
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.checkPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        if (!/^(\w){6,12}$/.test(value)) {
          callback(new Error("密码必须包含6-12位数字或字母"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        fullscreenLoading: false,

        // username: "",
        // email: "",
        // name: "",
        // password: "",
        // checkPassword: "",
        // phone: "",
        // phoneCode: ""

        // 默认值 方便调试
        username: "a131231231231231",
        email: "xiangxinmaoge@qq.com",
        name: "张然",
        password: "111111",
        checkPassword: "111111",
        phone: 13566665555,
        phoneCode: 666666
      },
      rules: {
        username: [{ validator: usernameValidatePass, trigger: "blur" }],
        email: [{ validator: emailValidatePass, trigger: "blur" }],
        name: [{ validator: nameValidatePass, trigger: "blur" }],
        phone: [{ validator: phoneValidatePass, trigger: "blur" }],
        phoneCode: [{ validator: phoneCodeValidatePass, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(event) {
      this.$refs[event].resetFields();
    },
    async toLogin({ username, password, phone, email, name }) {
      //  
      const data = { username, password, phone, email, name, role: "1" };
      const result = await userService.addUser(data);
      if (result) {
        console.log(result);
        this.$alert("", "注册成功,管理员审核通过即可登陆！", {
          confirmButtonText: "跳转到登录页面",
          callback: action => {
            this.$router.push({ path: `/login/${phone}` });
          }
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "empty" || to.name == "login") {
      next();
    } else {
      next("/register");
      this.$message({ message: "调皮，不要妄想偷渡哦", type: "warning" });
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
.input {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.input > div {
  width: 270px;
  margin: 10px;
}
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
  text-align: center;
}
.btnImg:hover {
  cursor: pointer;
}
.textBtn > p:hover {
  cursor: pointer;
}
.img4 {
  margin: 20px auto 40px;
  width: 260px;
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
  width: 700px;
  height: 550px;
  /* text-align: center; */
  position: fixed;
  top: calc(50% - 275px);
  left: calc(50% - 350px);
  border-radius: 5px;
  /* padding: 0 40px; */
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