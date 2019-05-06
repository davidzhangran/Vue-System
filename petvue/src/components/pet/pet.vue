<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
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
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="category" label="宠物品种" width="120"></el-table-column>
      <el-table-column prop="color" label="毛色" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
      <el-table-column prop="images" label="图片" width="300"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120"></el-table-column>
      <el-table-column prop="describe" label="描述" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "pet",
  methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  },
  data() {
    return {
      name:"",
      category:"",
      color:"",
      price:"",
      images:[],
      age:"",
      gender:"",
      describe:"",
      tableData: [
       
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false
    };
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
</style>