<template>
  <div class="exothecium">
    <div class="h1">
      <h1>申请门店</h1>
    </div>
    <div class="wrap">
      <div>
        <div class="input">
          门店名称：
          <el-input suffix-icon="el-icon-date" v-model="uploadInfo.name"></el-input>
        </div>
        <div class="input">
          营业地址：
          <el-input suffix-icon="el-icon-date" v-model="uploadInfo.site"></el-input>
        </div>
        <div class="input">
          联系电话：
          <el-input suffix-icon="el-icon-date" v-model="uploadInfo.phone"></el-input>
        </div>
        <div class="input">
          特色：
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="uploadInfo.feature"
          ></el-input>
        </div>
      </div>

      <div>
        <div class="input">
          法人：
          <el-input suffix-icon="el-icon-date" v-model="uploadInfo.person"></el-input>
        </div>
        <div class="input">
          营业执照号码：
          <el-input suffix-icon="el-icon-date" v-model="uploadInfo.licensenumber"></el-input>
        </div>
        <div>
          营业执照：
          <!-- /storefront/addLicense -->
          <el-upload
            action="/storefront/addLicense2"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :limit="1"
            :on-exceed="exceed"
            :on-success="licenseSuc"
            :auto-upload="false"
            ref="license"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
        <div>
          头图：
          <el-upload
            action="/storefront/addLicense2"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :limit="5"
            :on-success="bannerSuc"
            :auto-upload="false"
            ref="banner"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "storefront"
);

export default {
  name: "storefront",
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      flag: false,
      uploadInfo: {
        name: "",
        site: "",
        phone: "",
        feature: "",
        person: "",
        licensenumber: "",
        license: [], //营业执照
        banner: [], //头图
        userId: document.cookie.match(
          new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
        )[2]
      }
    };
  },
  methods: {
    ...mapActions(["addStorefrontAsync"]),
    ...mapMutations(["exceed", "licenseSuc", "bannerSuc", "openFlag"]),
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    exceed() {
      this.$message.error("上传图片不能超过1张!");
    },
    // 上传图片
    licenseSuc(response) {
      this.uploadInfo.license.push(response.data.url);
    },
    bannerSuc(response) {
      this.uploadInfo.banner.push(response.data.url);

      
      if (this.flag) return;

      this.flag = true;
      Promise.resolve().then(() => {
        console.log(this.uploadInfo);
        this.addStorefrontAsync(this.uploadInfo);
      });
    },
    handleClick() {
      this.$refs.banner.submit();
      this.$refs.license.submit();
    },
    add() {
      const userId = document.cookie.match(
        new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
      )[2];
      const {
        name,
        site,
        person,
        licensenumber,
        phone,
        feature,
        license,
        banner
      } = this;
      this.addStorefrontAsync({
        name,
        site,
        licensenumber,
        person,
        feature,
        phone,
        license,
        banner,
        userId
      });
    }
  },
  computed: {
    // ...mapState(["flag"])
  }
};
</script>
<style scoped>
.h1 > h1 {
  font-size: 30px;
}
.h1 {
  width: 200px;
  margin: auto;
}
.input {
  width: 250px;
  margin-bottom: 20px;
}
.wrap {
  display: flex;
  width: 700px;
  margin: auto;
}
.wrap > div {
  margin-right: 40px;
  /* margin-left: 40px; */
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


