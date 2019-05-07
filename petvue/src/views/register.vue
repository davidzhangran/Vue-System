<template>
  <el-card class="box-card">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
      <el-form-item label="登录名" prop="username">
        <el-input maxlength="16" class="username" placeholder="请输入8-16位登录名" prefix-icon="el-icon-mobile-phone" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input class="email" placeholder="请输入邮箱" prefix-icon="el-icon-mobile-phone" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input class="name" placeholder="请输入您的真实姓名" prefix-icon="el-icon-mobile-phone" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input maxlength="11" ref="phone" class="phone" placeholder="请输入11位手机号" prefix-icon="el-icon-mobile-phone" v-model.number="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="phoneCode">
        <el-input maxlength="6" class="phoneCode" placeholder="请输入6位验证码" prefix-icon="el-icon-warning-outline" v-model.number="ruleForm.phoneCode" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" prefix-icon="el-icon-key" maxlength="12"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off" prefix-icon="el-icon-key" maxlength="12"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addUserAsync(ruleForm)">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("users");

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
    ...mapActions(["addUserAsync"]),
    btn(event) {
      this.$refs[event].validate(valid => {
        if (valid) {
          // this.addUserAsync({
          //   username
          // });
          // const _this = this;
          const data = {
            username: this.resetForm.username,
            email: this.resetForm.email,
            name: this.resetForm.name,
            phone: this.ruleForm.phone,
            password: this.resetForm.password
          };

          console.log(this.resetForm.username);
          console.log(data);

          alert("注册成功，点击确定跳转到登陆页面");
          this.$router.push(`./login/${this.$refs.phone.value}`);
        } else {
          alert("不要乱搞，请重新注册");
          return false;
        }
      });
    },
    resetForm(event) {
      this.$refs[event].resetFields();
    }
  }
};
</script>

<style scope>
.box-card {
  margin: auto;
  width: 400px;
}

/* .unername {
  margin-bottom: 20px;
} */

/* .btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
} */
</style>