<template>
  <div>
    <div class="search">
      <el-button @click="whole" type="primary" size="small">全部</el-button>
      <el-select
        style="width:100px;text-align: center;"
        v-model="value"
        placeholder="请选择"
        size="small"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input style="width:260px;" v-model="inputText" placeholder="请输入内容" size="small"></el-input>
      <el-button type="primary" @click="searchClick" icon="el-icon-search" size="small">搜索</el-button>
    </div>
    <el-table :data="storefrontInfo" border style="width: 100%">
      <!-- <el-table-column header-align="center" align="center" fixed prop="_id" label="门店编号"></el-table-column> -->
      <el-table-column header-align="center" align="center" prop="name" label="门店名称"></el-table-column>
      <el-table-column header-align="center" align="center" prop="licensenumber" label="营业执照号码"></el-table-column>
      <el-table-column header-align="center" align="center" prop="license" label="营业执照图片">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <div>
              <img style="width:500px;height:400px;" slot="reference" :src="scope.row.license" alt>
            </div>
            <img style="width:50px;height:50px;" slot="reference" :src="scope.row.license" alt>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="site" label="营业地址"></el-table-column>
      <el-table-column header-align="center" align="center" prop="person" label="法人"></el-table-column>
      <el-table-column header-align="center" align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column header-align="center" align="center" prop="banner" label="头图">
        <template slot-scope="scope" style="display: flex;">
          <el-popover placement="bottom" trigger="click">
            <div style="text-align: center;">
              <img
                style="width:50px;height:50px;"
                :key="item"
                v-for="item in scope.row.banner"
                :src="item"
                alt
              >
            </div>
            <img style="width:50px;height:50px;" slot="reference" :src="scope.row.banner[0]" alt>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="feature" label="特色"></el-table-column>
      <el-table-column header-align="center" align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)" size="mini">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 审核组件 -->
    <el-dialog title="审核" width="400px" :visible.sync="dialogFormVisible">
      <!-- <el-input v-model="tableData.state" style="width:300px"></el-input> -->
      <el-radio v-model="tableData.state" label="2" border>通过</el-radio>
      <el-radio v-model="tableData.state" label="0" border>拒绝</el-radio>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /审核组件 -->
    <div class="block">
      <el-pagination
        @size-change="setEachPage"
        @current-change="setCurrentPage"
        :current-page="currentPage - 0"
        :page-sizes="[ 1, 2, 3, 4, 5]"
        :page-size="eachPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "storesystemfront"
);

export default {
  watch: {
    dialogFormVisible() {
      if (this.dialogFormVisible) return;
      this.tableData = [];
    },
    eachPage() {
      //监听eachPage，发生变化就会触发
      this.ISSearch();
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
      this.ISSearch();
    }
  },
  computed: {
    ...mapState(["storefrontInfo", "count"]),
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
    if (this.currentPage === 1) {
      this.getStorefrontByPageAsync({ state: this.state });
    } else {
      this.setCurrentPage(1);
    }
    this.flag = true;
  },
  methods: {
    ...mapActions(["getStorefrontByPageAsync", "updateStorefrontAsync"]),
    ...mapMutations(["setEachPage", "setCurrentPage"]),
    //点击搜索按钮触发
    searchClick() {
      this.flag = false;
      this.getStorefrontByPageAsync({
        value: this.value,
        inputText: this.inputText,
        state: this.state
      });
    },
    //点击确认审核按钮
    submitUpload() {
      this.updateStorefrontAsync(this.updateFrontById(this.tableData));
      this.dialogFormVisible = false;
      this.$notify({
          title: '成功',
          message: '审核状态成功！',
          type: 'success'
        });
    },
    //点击审核按钮
    handleClick(row) {
      this.tableData = {
        ...row,
        ...{ banner: this.conversion(row) },
        ...{ license: [{ url: row.license }] }
      };
      this.dialogFormVisible = true;
    },
    updateFrontById(row) {
      return {
        ...row,
        ...{
          newState: 1,
          license: [...row.license[0].url],
          banner: this.conversionUpdate(row)
        }
      };
    },
    conversionUpdate(row) {
      const temp = [];
      for (const item of row.banner) {
        temp.push(item.url);
      }
      return temp;
    },
    conversion(row) {
      const temp = [];
      for (const item of row.banner) {
        temp.push({ url: item });
      }
      return temp;
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    exceed() {
      this.$message.error("上传图片超出!");
    },
    ISSearch() {
      // 根据是不是搜索状态，发送不同带参数的请求
      if (this.flag) {
        this.getStorefrontByPageAsync({ state: this.state });
      } else {
        this.getStorefrontByPageAsync({
          value: this.value,
          inputText: this.inputText,
          state: this.state
        });
      }
    },
    whole() {
      //全部按钮点击事件
      this.flag = true;
      this.inputText = "";
      if (this.currentPage === 1) {
        this.getStorefrontByPageAsync({ state: this.state });
      } else {
        this.setCurrentPage(1);
      }
    }
  },

  data() {
    return {
      flag: true, //IS 搜索 状态
      state: 1,
      options: [
        {
          value: "name",
          label: "名称"
        },
        {
          value: "person",
          label: "法人"
        }
      ],
      value: "name",
      inputText: "",
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: {
        _id: "123456",
        name: "卖点狗粮",
        licensenumber: "111111",
        license: "../../../introduceBG.jpg",
        specification: "都适用",
        site: "上海市普陀区金沙江路 1518 弄",
        location: "定位",
        person: "小明",
        phone: "13547006776",
        banner: [
          {
            name: "",
            url: ""
          }
        ],
        feature: "超好吃的狗粮",
        vip: "心悦3",
        commission: "1:1",
        clerk: [
          {
            name: "张三",
            age: 18
          },
          {
            name: "李四",
            age: 15
          }
        ],
        goodsId: [
          {
            _id: "001",
            name: "超好吃的狗粮"
          }
        ],
        serveId: [
          {
            _id: "001",
            name: "洗澡澡"
          }
        ],
        petId: [
          {
            _id: "001",
            name: "山野一号"
          }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  }
};
</script>

<style>
.sa {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-right: "120px";
  text-align: center;
  /* justify-content: right; */
  margin-bottom: 20px;
}
.search {
  display: flex;
  /* height: 28px; */
}
.block {
  text-align: center;
}
</style>