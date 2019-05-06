<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">申请门店</el-button>
    <el-dialog title="申请门店" :visible.sync="dialogFormVisible">
      <div class="wrap">
        <div>
          <div class="input">
            门店名称：
            <el-input suffix-icon="el-icon-date" v-model="name"></el-input>
          </div>
          <div class="input">
            营业地址：
            <el-input suffix-icon="el-icon-date" v-model="site"></el-input>
          </div>
          <div class="input">
            联系电话：
            <el-input suffix-icon="el-icon-date" v-model="phone"></el-input>
          </div>
          <div class="input">
            特色：
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="feature"
            ></el-input>
          </div>
        </div>
        <div>
          <div class="input">
            法人：
            <el-input suffix-icon="el-icon-date" v-model="person"></el-input>
          </div>
          <div class="input">
            营业执照号码：
            <el-input suffix-icon="el-icon-date" v-model="licensenumber"></el-input>
          </div>
          <div>
            营业执照：
            <el-upload
              action="http://localhost:3000/images/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <StorefrontStorefrontTab />
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
      name: "",
      site: "",
      phone: "",
      feature: "",
      person: "",
      licensenumber: ""
    };
  },
  methods: {
    ...mapActions(["addStorefrontAsync"]),
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    add() {
      this.dialogFormVisible = false; //关闭窗口
      const { name, site, person, licensenumber, phone, feature } = this;
      this.addStorefrontAsync({
        name,
        site,
        licensenumber,
        person,
        feature,
        phone
      });
    }
  }
};
</script>
<style scoped>
.input {
  width: 250px;
  margin-bottom: 20px;
}
.wrap {
  display: flex;
  /* flex-wrap: wrap; */
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


