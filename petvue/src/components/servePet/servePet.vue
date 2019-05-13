<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true"  size="small">新增</el-button>
    <el-select v-model="value" style="width:100px;" placeholder="请选择"  size="small">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="name1">
      <el-input v-model="label" style placeholder="请输入内容"  size="small"></el-input>
    </div>
    <el-button type="primary" icon="el-icon-search" @click="search"  size="small">搜索</el-button>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <el-form class="f" label-width="100px" size="mini">
        <div class="name">
          <el-form-item label="服务类型">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="品类">
            <el-input v-model="category"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="适用规格">
            <el-input v-model="specification"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="服务规格">
            <el-input v-model="service"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="耗时">
            <el-input v-model="consuming"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="服务员等级">
            <el-input v-model="grade"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="价格">
            <el-input v-model="price"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="排期">
            <el-date-picker
              v-model="schedule"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogVisible1" width="50%">
      <el-form class="f" label-width="100px" size="mini">
        <div class="name">
          <el-form-item label="服务类型">
            <el-input v-model="name"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="品类">
            <el-input v-model="category"></el-input>
          </el-form-item>
        </div>

        <div class="name">
          <el-form-item label="适用规格">
            <el-input v-model="specification"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="服务规格">
            <el-input v-model="service"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="耗时">
            <el-input v-model="consuming"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="服务员等级">
            <el-input v-model="grade"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="价格">
            <el-input v-model="price"></el-input>
          </el-form-item>
        </div>
        <div class="name">
          <el-form-item label="排期">
            <el-date-picker
              v-model="schedule"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updata">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="serves"
      border
      style="width: 100%"
      :default-sort="{prop:'schedule', order: 'descending'}"
    >
      <el-table-column align="center" fixed prop="name" label="服务类型" ></el-table-column>
      <el-table-column align="center" prop="category" label="品类" ></el-table-column>
      <el-table-column align="center" prop="schedule" label="排期"  sortable></el-table-column>
      <el-table-column align="center" prop="specification" label="适用规格" ></el-table-column>
      <el-table-column align="center" prop="service" label="服务规格" ></el-table-column>
      <el-table-column align="center" prop="consuming" label="耗时" ></el-table-column>
      <el-table-column align="center" prop="grade" label="服务员等级" ></el-table-column>
      <el-table-column align="center" prop="price" label="价格" ></el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="success"  @click="hanleClick(scope.row)" size="small">修改</el-button>
          <el-button type="danger"  @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <div class="block">
      <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="serves.length"
    ></el-pagination>
   </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "servePet"
);
export default {
  name: "serve",
  data() {
    return {
      label: "",
      value: "",
      name: "",
      category: "",
      schedule: "",
      specification: "",
      service: "",
      consuming: "",
      grade: "",
      price: "",
      _id: "",
      options: [
        {
          value: "name",
          label: "服务类型"
        },
        {
          value: "category",
          label: "品类"
        },
        {
          value: "schedule",
          label: "排期"
        },
        {
          value: "specification",
          label: "适用规格"
        },
        {
          value: "service",
          label: "服务规格"
        },
        {
          value: "consuming",
          label: "耗时"
        },
        {
          value: "price",
          label: "价格"
        }
      ],
        dialogVisible1:false,
        dialogVisible:false,
        flag:true,
          pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
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
    //新增
    add() {
      this.dialogVisible = false; //关闭窗口
      const {
        name,
        category,
        schedule,
        specification,
        service,
        consuming,
        grade,
        price
      } = this;
      this.addPetAsync({
        name,
        category,
        schedule,
        specification,
        service,
        consuming,
        grade,
        price,
        userId: document.cookie.match(
          new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
        )[2]
      });
      this.name = "";
      this.category = "";
      this.schedule = "";
      this.specification = "";
      this.service = "";
      this.consuming = "";
      this.grade = "";
      this.price = "";
      this.open2();
    },
    //删除
    handleDelete(row) {
      const that=this;
      this.removePetAsync({
        _id: row._id
      }).then(()=>{
         that.open3();
      });
    },
    search() {
      this.flag=false;
      this.getPetsByPageAsync({
        type: this.value,
        text: this.label
      });
    },
    async open3() {
      await this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });
    },
    async open2() {
      await this.$message({
          message: '新增成功!',
          type: 'success'
        });
      },
    hanleClick(row) {
      this.dialogVisible1 = true;
      const {
        name,
        category,
        schedule,
        specification,
        service,
        grade,
        price,
        consuming
      } = row;
      this.name = name;
      this.category = category;
      this.schedule = schedule;
      this.specification = specification;
      this.service = service;
      this.grade = grade;
      this.price = price;
      this._id = row._id;
      this.schedule=schedule;
      this.consuming=consuming;
    },
    updata() {
      this.dialogVisible1 = false; //关闭窗口
      const {
        name,
        category,
        schedule,
        specification,
        service,
        consuming,
        grade,
        price
      } = this;
      this.updatePetAsync({
        _id: this._id,
        name,
        category,
        schedule,
        specification,
        service,
        consuming,
        grade,
        price
      });
    },
 },
 mounted(){
    this.flag=true;
    this.getPetsByPageAsync({
      userId: document.cookie.match(
        new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
  },
  watch: {
    eachPage() {
      //监听eachPage，发生变化就会触发
      if(this.flag){
         this.getPetsByPageAsync();
      }else{
         this.getPetsByPageAsync({
        type: this.value,
        text: this.label
      });
      } 
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
        if(this.flag){
         this.getPetsByPageAsync();
      }else{
         this.getPetsByPageAsync({
        type: this.value,
        text: this.label
      });
      } 
    }
  },
  computed: {
    ...mapState(["maxPage", "serves", "total"]),
    eachPage: {
      get: mapState(["eachPage"]).eachPage, //返回eachPage
      set: mapMutations(["setEachPage"]).setEachPage //setEachPage方法调用
    },
    currentPage: {
      get: mapState(["currentPage"]).currentPage,
      set: mapMutations(["setCurrentPage"]).setCurrentPage
    }
  }
};
</script>

<style scoped>
.block{
  text-align: center;
}
.name {
  width: 300px;
  margin-top: 10px;
}
.f {
  display: flex;
  flex-wrap: wrap;
}
.demonstration {
  margin-left: 50px;
}
.name1 {
  /* width: 120px; */
  /* height: 30px; */
  display: inline-block;
}
</style>