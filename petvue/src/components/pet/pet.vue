<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-select v-model="value" style="width:100px;" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="name1">
      <el-input v-model="label" style placeholder="请输入内容"></el-input>
    </div>
    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form class="form">
        <div class="name">
          <el-form-item label="宠物姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="宠物品种">
            <el-input v-model="category"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="毛色">
            <el-input v-model="color"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="价格">
            <el-input v-model="price"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="年龄">
            <el-input v-model="age"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="性别">
            <el-input v-model="gender"></el-input>
          </el-form-item>
        </div>
        <el-upload
          class="footer"
          action="/pet/addPImage"
          list-type="picture-card"
          ref="upload"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="exceed"
          :on-success="bannerSuc"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
        <el-input class="footer" type="textarea" placeholder="描述" v-model="describe"></el-input>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogTableVisible">
      <el-form class="form">
        <div class="name">
          <el-form-item label="宠物姓名">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="宠物品种">
            <el-input v-model="category"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="毛色">
            <el-input v-model="color"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="价格">
            <el-input v-model="price"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="年龄">
            <el-input v-model="age"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="性别">
            <el-input v-model="gender"></el-input>
          </el-form-item>
        </div>
        <el-upload
          class="footer"
          action="/pet/addPImage"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="exceed"
          :file-list="fileList"
          ref="upload1"
          :auto-upload="false"
          limit:1
          :on-success="success"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
        <el-input class="footer" type="textarea" placeholder="描述" v-model="describe"></el-input>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload1">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="pets" border style="width: 100%">
      <el-table-column fixed prop="images" label="照片" width="150" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.images[0]" style="width:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="名称" width="150" align="center"></el-table-column>
      <el-table-column prop="category" label="宠物品种" width="120" align="center"></el-table-column>
      <el-table-column prop="color" label="毛色" width="120" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="120" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120" align="center"></el-table-column>
      <el-table-column prop="describe" label="描述" width="120" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="success" plain @click="hanleClick(scope.row)" size="small">修改</el-button>
          <el-button type="danger" plain @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage-0"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { setInterval } from "timers";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("pet");
export default {
  name: "pet",
  data() {
    return {
      _id: "",
      name: "",
      category: "",
      color: "",
      price: "",
      images: [],
      age: "",
      gender: "",
      describe: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      flag: true,
      fileList: [{ name: "", url: "" }],
      options: [
        {
          value: "name",
          label: "宠物名称"
        },
        {
          value: "category",
          label: "宠物品种"
        },
        {
          value: "color",
          label: "颜色"
        },
        {
          value: "price",
          label: "价格"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "gender",
          label: "性别"
        }
      ],
      value: "",
      label: ""
    };
  },
  methods: {
    ...mapActions([
      "addPetAsync",
      "getPetsByPageAsync",
      "removePetAsync",
      "updatePetAsync"
    ]),
    ...mapMutations(["setEachPage", "setCurrentPage"]),
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除
    handleDelete(row) {
      const that = this;
      this.removePetAsync({
        _id: row._id
      }).then(() => {
        that.open3();
      });
    },
    hanleClick(row) {
      this.fileList[0].url = row.images[0];
      this.images = row.images;
      this.dialogTableVisible = true;
      const {
        name,
        category,
        color,
        price,
        age,
        gender,
        images,
        describe
      } = row;
      this.name = name;
      this.category = category;
      this.color = color;
      this.price = price;
      this.age = age;
      this.gender = gender;
      this.describe = describe;
      this._id = row._id;
    },
    bannerSuc(response) {
      this.images.push(response.data.url);
      this.add();
    },
    success(response) {
      this.images[0] = response.data.url;
      this.updata();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitUpload1() {
      if (this.images[0] != "") {
        this.updata();
      }
      this.$refs.upload1.submit();
    },
    //新增
    add() {
      this.dialogFormVisible = false; //关闭窗口
      // this.images.push(response.data.url);
      const {
        name,
        category,
        color,
        price,
        age,
        gender,
        images,
        describe
      } = this;

      this.addPetAsync({
        name,
        category,
        color,
        price,
        age,
        gender,
        images,
        describe,
        userId: document.cookie.match(
          new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
        )[2]
      });
      this.name = "";
      this.category = "";
      this.color = "";
      this.price = "";
      this.age = "";
      this.gender = "";
      this.images = "";
      this.describe = "";
      this.$refs.upload.clearFiles();
    },
    updata() {
      this.dialogTableVisible = false; //关闭窗口
      const {
        name,
        category,
        color,
        price,
        age,
        gender,
        images,
        describe
      } = this;
      this.updatePetAsync({
        _id: this._id,
        name,
        category,
        color,
        price,
        age,
        gender,
        images,
        describe
      });
    },
    search() {
      this.flag = false;
      this.getPetsByPageAsync({
        type: this.value,
        text: this.label
      });
    },
    exceed() {
      this.$message.error("上传图片不能超过1张!");
    },
    //删除成功之后的提示
    async open3() {
      await this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success"
      });
    },
    async open2() {
      await this.$message({
        message: "新增成功!",
        type: "success"
      });
    }
    // 上传图片
    // bannerSuc(response) {
    //   this.images.push(response.data.url);
    // }
  },
  watch: {
    eachPage() {
      //监听eachPage，发生变化就会触发
      if (this.flag) {
        this.getPetsByPageAsync();
      } else {
        this.getPetsByPageAsync({
          type: this.value,
          text: this.label
        });
      }
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
      if (this.flag) {
        this.getPetsByPageAsync();
      } else {
        this.getPetsByPageAsync({
          type: this.value,
          text: this.label
        });
      }
    }
  },
  computed: {
    ...mapState(["maxPage", "pets", "total"]),
    eachPage: {
      get: mapState(["eachPage"]).eachPage, //返回eachPage
      set: mapMutations(["setEachPage"]).setEachPage //setEachPage方法调用
    },
    currentPage: {
      get: mapState(["currentPage"]).currentPage,
      set: mapMutations(["setCurrentPage"]).setCurrentPage
    }
  },
  mounted() {
    this.flag = true;
    this.getPetsByPageAsync({
      userId: document.cookie.match(
        new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.name {
  width: 200px;
}
.footer {
  margin-bottom: 10px;
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.name1 {
  width: 120px;
  height: 30px;
  display: inline-block;
}
</style>