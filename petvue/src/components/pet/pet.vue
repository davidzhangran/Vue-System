<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="name1">
      <el-input v-model="label" placeholder="请输入内容"></el-input>
    </div>
    <el-button icon="el-icon-search" @click="search"></el-button>
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
          ref="images"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="exceed"
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
        <el-button type="primary" @click="add">确 定</el-button>
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
          ref="images"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="exceed"
          :file-list="pets.images"
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
        <el-button type="primary" @click="updata">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="pets" border style="width: 100%">
      <el-table-column fixed prop="images" label="照片" width="150" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.images" style="width:50px;height:50px"/>
        </template>
      </el-table-column>
      <el-table-column fixed prop="name" label="名称" width="150" align="center"></el-table-column>
      <el-table-column prop="category" label="宠物品种" width="120" align="center"></el-table-column>
      <el-table-column prop="color" label="毛色" width="120" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="120" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120" align="center"></el-table-column>
      <el-table-column prop="describe" label="描述" width="120" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" >
        <template slot-scope="scope">
          <el-button @click="hanleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pets.length"
    ></el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { privateDecrypt, constants } from "crypto";
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
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //删除
    handleDelete(row) {
      this.removePetAsync({
        _id: row._id
      });
    },
    hanleClick(row) {
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
    //新增
    add() {
      this.dialogFormVisible = false; //关闭窗口
      this.$refs.images.submit();
       this.$refs.images.clearFiles();
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
        describe
      });
      this.name = "";
      this.category = "";
      this.color = "";
      this.price = "";
      this.age = "";
      this.gender = "";
      this.images = "";
      this.describe = "";
    },
    updata(){
       this.$refs.images.submit();
       this.$refs.images.clearFiles();
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
      this.getPetsByPageAsync({
        type: this.value,
        text: this.label
      });
<<<<<<< HEAD
      this.value="";
      this.label="";
=======
>>>>>>> 0e0c70a96ed1b519bc17f346229aa82c4bcae2d4
    },
    exceed() {
      this.$message.error("上传图片不能超过1张!");
    },
    // 上传图片
    // bannerSuc(response) {
    //   this.images.push(response.data.url);
    // }
  },
  watch: {
    eachPage() {
      //监听eachPage，发生变化就会触发
      this.getPetsByPageAsync();
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
      this.getPetsByPageAsync();
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
    this.getPetsByPageAsync();
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
  width: 100px;
  display: inline-block;
}
</style>