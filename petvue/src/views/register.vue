<template>
  <el-card class="box-card">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input maxlength="11" ref="phone" class="phone" placeholder="请输入11位手机号" prefix-icon="el-icon-mobile-phone" v-model.number="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="phoneCode">
        <el-input maxlength="6" class="phoneCode" placeholder="请输入6位验证码" prefix-icon="el-icon-warning-outline" v-model.number="ruleForm.phoneCode" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" prefix-icon="el-icon-key" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" prefix-icon="el-icon-key" maxlength="12"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="btn('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
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
      } else if (value !== this.ruleForm.pass) {
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
        pass: "",
        checkPass: "",
        phone: "",
        phoneCode: ""
      },
      rules: {
        phone: [{ validator: phoneValidatePass, trigger: "blur" }],
        phoneCode: [{ validator: phoneCodeValidatePass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    btn(event) {
      this.$refs[event].validate(valid => {
        if (valid) {
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
  width: 300px;
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