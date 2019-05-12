<template>
  <div>
    <div style="display: flex;justify-content: flex-end;padding-bottom:20px; padding-top:20px;">
      <el-button @click="whole" type="primary">全部</el-button>
      <el-select style="width:100px;text-align: center;" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input style="width:260px;" v-model="inputText" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="searchClick" icon="el-icon-search">搜索</el-button>
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
            <img style="width:80px;height:80px;" slot="reference" :src="scope.row.license" alt>
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
                style="width:80px;height:80px;"
                :key="item.value"
                v-for="item in scope.row.banner"
                :src="item"
                alt
              >
            </div>
            <img style="width:80px;height:80px;" slot="reference" :src="scope.row.banner[0]" alt>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="feature" label="特色"></el-table-column>
      <el-table-column width="120" header-align="center" align="center" label="店员">
        <template slot-scope="scope">
          <el-button @click="clerkDetails(scope.row)" type="primary">店员详情</el-button>
        </template>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="goodsId" label="商品">
        <el-button type="primary">商品详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="serveId" label="服务">
        <el-button type="primary">服务详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="petId" label="宠物">
        <el-button type="primary">宠物详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改组件 -->
    <el-dialog width="900px" title="修改门店信息" :visible.sync="dialogFormVisible">
      <el-form style="padding-right: 120px;">
        <div style="display: flex;justify-content: space-between;">
          <el-form-item label="门店编号" :label-width="formLabelWidth">
            <el-input v-model="tableData._id" disabled style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="tableData.name" style="width:300px"></el-input>
          </el-form-item>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <el-form-item label="营业执照号码" :label-width="formLabelWidth">
            <el-input v-model="tableData.licensenumber" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="营业地址" :label-width="formLabelWidth">
            <el-input v-model="tableData.site" style="width:300px"></el-input>
          </el-form-item>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <el-form-item label="法人" :label-width="formLabelWidth">
            <el-input v-model="tableData.person" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="tableData.phone" style="width:300px"></el-input>
          </el-form-item>
        </div>
        <div style="display: flex;justify-content: space-between;">
          <el-form-item label="特色" :label-width="formLabelWidth">
            <el-input v-model="tableData.feature" style="width:300px"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="营业执照图片" :label-width="formLabelWidth">
          <!-- 图片 -->
          <el-upload
            action="/storefront/addLicense2"
            list-type="picture-card"
            ref="license"
            :auto-upload="false"
            :limit="1"
            :on-exceed="exceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="tableData.license"
            :on-change="licenseCha"
            :on-success="licenseSuc"
            :before-upload="licenseUp"
            :on-progress="licensePro"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
          <!-- /图片 -->
        </el-form-item>
        <el-form-item label="头图" :label-width="formLabelWidth">
          <!-- 图片 -->
          <el-upload
            action="/storefront/addLicense2"
            list-type="picture-card"
            ref="banner"
            :auto-upload="false"
            :limit="3"
            :on-exceed="exceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="tableData.banner"
            :on-change="bannerCha"
            :on-success="bannerSuc"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
          <!-- /图片 -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /修改组件 -->
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage - 0"
      :page-sizes="[ 1, 2, 3, 4, 5]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
    <el-dialog title="店员详情" :visible.sync="clerkDialog">
      <el-table :data="clerkDate" border>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="date" label="入职日期"></el-table-column>
        <el-table-column property="site" label="住址"></el-table-column>
        <el-table-column property="phone" label="联系电话"></el-table-column>
        <el-table-column property="value" label="职位"></el-table-column>
      </el-table>
    </el-dialog>
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
      // this.tableData = [];
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
      this.getStorefrontByPageAsync();
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
    //点击确认修改按钮
    submitUpload() {
      this.$refs.license.submit();
      this.$refs.banner.submit();
      this.dialogFormVisible = false;
    },
    //点击修改按钮
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
          newState: 2,
          license: [row.license[0].url],
          banner: this.conversionUpdate(row)
        }
      };
    },
    conversionUpdate(row) {
      const temp = [];
      for (const item of row.banner) {
        temp.push(item.url);
      }
      console.log(temp);
      return temp;
    },
    conversion(row) {
      const temp = [];
      for (const item of row.banner) {
        temp.push({ url: item });
      }
      return temp;
    },
    handleRemove(file, fileList) {
      console.log(file.url);
      let data = [];
      data = this.tableData.banner = this.tableData.banner.filter(
        item => item.url != file.url
      );
      console.log(this.tableData.banner);
      this.tableData.banner = this.bannerDate = data;
      console.log(this.bannerDate);
      this.updateStorefrontAsync(this.updateFrontById(this.tableData));
    },
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
        this.getStorefrontByPageAsync();
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
        this.getStorefrontByPageAsync();
      } else {
        this.setCurrentPage(1);
      }
    },
    licenseSuc(response, file, fileList) {
      //营业执照上传成功的执行的函数
      this.tableData.license[0].url = response.data.url;
      this.updateStorefrontAsync(this.updateFrontById(this.tableData));
      this.tableData = [];
    },
    bannerSuc(response, file, fileList) {
      //头图上传成功的执行的函数
      console.log(this.tableData.banner);
      this.bannerDate.push({ url: response.data.url });
      this.tableData.banner = this.bannerDate;
      this.updateStorefrontAsync(this.updateFrontById(this.tableData));
      this.tableData = [];
    },
    licenseCha(file, fileList) {},
    bannerCha(file, fileList) {
      //头图片修改
    },
    licenseUp(file) {},
    licensePro(event, file, fileList) {},
    clerkDetails({ _id }) {
      //店员详情点击事件
      this.clerkDialog = true;
      const [newData] = this.storefrontInfo.filter(item => item._id == _id);
      this.clerkDate = newData.clerk;
    }
  },

  data() {
    return {
      bannerDate: [],
      flag: true, //IS 搜索 状态
      state: 2, //根据该状态显示当前页面的数据
      options: [
        //搜索框中的下拉列表
        {
          value: "name",
          label: "名称"
        },
        {
          value: "person",
          label: "法人"
        }
      ],
      value: "name", // 搜索框中下拉列表的值
      inputText: "", //搜索框中文本框的值
      dialogImageUrl: "",
      dialogVisible: false,
      tableData: {
        //
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      clerkDate: [],
      clerkDialog: false // 店员详情面板的状态
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
  justify-content: right;
  margin-bottom: 20px;
}
</style>