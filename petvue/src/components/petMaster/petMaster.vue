<template>
  <div>
    <el-button size="small" type="success" @click="open">新增宠主</el-button>
    <el-dialog title="新增宠主详情" :before-close="close" :visible="dialogTableVisible" width="30%">
      <el-form status-icon v-model="petMaster" label-width="auto" class="petMaster">
        <el-form-item label="头像" prop="banner">
          <el-upload
            action="/petMember/addPetMasterPicture"
            list-type="picture-card"
            :limit="1"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="remove"
            :auto-upload="false"
            ref="upload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model="petMaster.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称：" prop="username">
          <el-input v-model="petMaster.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="petMaster.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在城市：" prop="city">
          <el-input v-model="petMaster.city" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在城市区：" prop="area">
          <el-input v-model="petMaster.area" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="具体地址：" prop="site">
          <el-input v-model="petMaster.site" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="积分：" prop="integral">
          <el-input v-model="petMaster.integral" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitUpload">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      highlight-current-row
      stripe
      :data="petMasterUsers"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="banner" label="头像" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.banner[0]" style="width:50px;height:50px">
        </template>
      </el-table-column>
      <el-table-column prop="phone" show-overflow-tooltip label="电话号码"></el-table-column>
      <el-table-column prop="username" show-overflow-tooltip label="昵称"></el-table-column>
      <el-table-column prop="name" label="真实姓名"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="area" label="区域"></el-table-column>
      <el-table-column prop="site" show-overflow-tooltip label="送货地址"></el-table-column>
      <el-table-column prop="integral" label="积分" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
          <el-button type="danger"  @click="delePetMasterAsync(scope.row._id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改宠主详情" :before-close="closeUpdate" :visible="updateVisible" width="30%">
      <el-form status-icon v-model="updatePetMaster" label-width="auto" class="petMaster">
        <el-form-item label="头像" prop="banner">
          <div :style="showImg" class="UpdatePic">
            <img width="100%" :src="updatePetMaster.banner[0]" alt>
          </div>
          <el-upload
            action="/petMember/addPetMasterPicture"
            list-type="picture-card"
            :limit="1"
            :on-preview="updateHandlePreview"
            :on-success="updateHandleSuccess"
            :on-remove="updateRemove"
            :auto-upload="false"
            :on-change="updateChande"
            ref="updateUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model="updatePetMaster.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称：" prop="username">
          <el-input v-model="updatePetMaster.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="updatePetMaster.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在城市：" prop="city">
          <el-input v-model="updatePetMaster.city" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在城市区：" prop="area">
          <el-input v-model="updatePetMaster.area" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="具体地址：" prop="site">
          <el-input v-model="updatePetMaster.site" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="积分：" prop="integral">
          <el-input v-model="updatePetMaster.integral" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirmUpdate">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="block">
      <el-pagination
        background
        @size-change="setEachPage"
        @current-change="setCurrentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="3"
        :current-page="~~currentPage"
        layout="prev, pager, next, sizes, total"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations, mapState, mapActions } = createNamespacedHelpers(
  "petMaster"
);

export default {
  methods: {
    ...mapMutations(["open", "setEachPage", "setCurrentPage", "close"]),
    ...mapActions([
      "addPetMasterAsync",
      "getPetMasterByPageAsync",
      "updateMasterByIdAsync",
      "delePetMasterAsync"
    ]),
    handleClick(row) {
      this.showImg = "display:block";
      this.updateVisible = true;
      this.UpdatepicVisible = true;
      this.updatePetMaster = { ...row };
    },
    closeUpdate() {
      this.updateVisible = false;
    },
    handlePreview(file) {
      console.log(file);
    },
    async confirmUpdate() {
      this.updateVisible = false;
      if(this.showImg == "display:none") {
        this.$refs.updateUpload.submit();
      } else {
         await this.updateMasterByIdAsync(this.updatePetMaster);
      }
      // this.$refs.updateUpload.submit();
      // this.updateMasterByIdAsync()
    },
    updateHandlePreview() {},
    async updateHandleSuccess(file, row) {
      this.updatePetMaster.banner = [];
      this.updatePetMaster.banner.push(file.data.url);
      await this.updateMasterByIdAsync(this.updatePetMaster);
      this.updatePetMaster.banner = [];
      this.$refs.updateUpload.clearFiles();
    },
    updateRemove() {
      this.showImg = "display:block";
    },
    updateChande() {
      this.showImg = "display:none";
    },
    async handleSuccess(file, row) {
      this.petMaster.banner.push(file.data.url);
      console.log(this.petMaster.banner);

      await this.addPetMasterAsync(this.petMaster);
      this.petMaster.banner = [];
      this.$refs.upload.clearFiles();
    },
    remove(file, fileList) {},
    submitUpload() {
      this.$refs.upload.submit();
    }
  },
  computed: {
    ...mapState([
      "petMasterUsers",
      "dialogTableVisible",
      "currentPage",
      "eachPage",
      "count",
      "loading",
      "autoUpload"
    ])
  },
  watch: {
    currentPage() {
      this.getPetMasterByPageAsync();
    },
    eachPage() {
      this.getPetMasterByPageAsync();
    }
  },
  data() {
    return {
      showImg: "display:block",
      UpdatepicVisible: false,
      updateVisible: false,
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
      tableData: [],
      petMaster: {
        banner: [], //头像
        phone: "18998998881", //电话
        username: "相信毛哥相信爱", //昵称
        name: "张然", //真实姓名
        city: "达州", //所在城市
        area: "大州区", //所在城市区域
        site: "成都青羊区抚琴西南路朗沃人才培训中心 ", //具体地址
        integral: "999999" //积分
      },
      updatePetMaster: {
        banner: [], //头像
        phone: "", //电话
        username: "", //昵称
        name: "", //真实姓名
        city: "", //所在城市
        area: "", //所在城市区域
        site: "", //具体地址
        integral: "" //积分
      }
    };
  },
  mounted() {
    this.getPetMasterByPageAsync();
  }
};
</script>
<style>
.UpdatePic > img {
  width: 146px;
  height: 146px;
  border-radius: 5px;
}

.block {
  text-align: center;
  margin-top: 50px;
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























