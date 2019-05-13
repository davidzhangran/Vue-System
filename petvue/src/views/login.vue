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
            <div>
              <span>没有账号？</span>
              <p @click="register">点击注册</p>
            </div>
            <p @click="distinguish">人脸登陆</p>
            <!-- <canvas ref="canvas" width="534" height="400"></canvas> -->
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
    <!-- 人脸弹窗 -->
    <canvas ref="canvas" width="534" height="400" class="canvas"></canvas>
    <el-dialog title="人脸扫描" :visible.sync="dialogVisible" width="580px">
      <video ref="video" src width="534" height="400" autoplay></video>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <WebWeb class="webweb"/>
  </div>
</template>




<script>
import userService from "../service/userManagement.js";
import recognitionSer from "../service/recognition";
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState, mapActions } = createNamespacedHelpers(
  "recognition"
);
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
      },
      dialogVisible: false,
      img: ""
    };
  },
  methods: {
    login: function(e) {
      this.$router.push("/userSystem");
    },
    register: function(e) {
      this.$router.push("/register");
    },
    distinguish() {
      let mediaStreamTrack;
      this.dialogVisible = true;
      setTimeout(() => {
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;
        // 拿到画笔
        const context = canvas.getContext("2d");
        const getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
        getUserMedia.call(
          navigator,
          {
            video: true,
            audio: false
          },
          function(localMediaStream) {
            try {
              //调用摄像头的媒体数据传递给video标签对象
              video.src = window.URL.createObjectURL(localMediaStream);
            } catch (e) {
              
              video.srcObject = localMediaStream;
            }
          },
          function(e) {
            console.log(e);
          }
        );
        setTimeout(() => {
          //获取图片
          context.drawImage(video, 0, 0, 534, 400);
          const img = canvas.toDataURL("image/png");
          const data = recognitionSer.recognition({ img });
          // MediaStream.getTracks()[1].stop();
          data.then(({ result }) => {
            // console.log(result);
            // console.log(result.score);
            if (!result) {
              this.$message({
                message: "没有识别到人脸，请从新识别。",
                type: "warning"
              });
            } else if (result.score > 90) {
          
              this.dialogVisible = false;
              this.ruleForm = { phone: "13566665522", password: "111111" };
              // document.cookie = `id=5cd8ccd0c143795d14ac8085`;
              // document.cookie = `id=5cd8ccd0c143795d14ac8085`;
              this.$router.push("/userSystem");
            } else {
              this.$message({
                message: "人脸不匹配。",
                type: "warning"
              });
            }
          });
        }, 4000);
      }, 100);},
    getCookie() {
      const arr = document.cookie.match(
        new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
      );
      if (arr) {
        return arr[2];
      }
      return null;
    }
  },
  async beforeRouteLeave(to, from, next) {
    console.log(to);

    console.log(from);
    if (to.name == "userSystem") {
      // if (this.getCookie() == null) {
      // } else {
      //   this.$message({ message: "调皮，不要妄想偷渡哦", type: "warning" });
      //   next(false);
      // }
      const { phone, password } = this.ruleForm;
      const result = await userService.loging({ phone, password });
      if (result.length > 0) {
        document.cookie = `id=${result[0]._id}`;
        console.log(result);
        result[0].role == "1" ? next("/userStore") : next();
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
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.canvas {
  position: absolute;
  z-index: -1;
}
.webweb {
  position: fixed;
  bottom: 140px;
  right: 240px;
}
.distinguish {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
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
.textBtn > div > p {
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




