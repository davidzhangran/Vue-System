<template>
  <div>
    <el-table :data="storefrontInfo" border style="width: 100%">
      <el-table-column header-align="center" align="center" fixed prop="_id" label="门店编号"></el-table-column>
      <el-table-column header-align="center" align="center" prop="name" label="名称"></el-table-column>
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
            <div>
              <img
                style="width:80px;height:80px;"
                :key="item"
                v-for="item in scope.row.banner"
                :src="item"
                alt
              >
            </div>
            <img style="width:80px;height:80px;" :src="scope.row.banner[0]" alt>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="feature" label="特色"></el-table-column>
      <el-table-column width="120" header-align="center" align="center" label="店员属性">
        <el-button type="primary">店员详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="goodsId" label="商品id">
        <el-button type="primary">商品详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="serveId" label="服务id">
        <el-button type="primary">服务详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="petId" label="宠物id">
        <el-button type="primary">宠物详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改组件 -->
    <el-dialog title="修改门店信息" :visible.sync="dialogFormVisible">
      <el-form style="display: flex;flex-wrap: wrap;">
        <el-form-item label="门店编号" :label-width="formLabelWidth">
          <el-input v-model="tableData._id" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="tableData.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" :label-width="formLabelWidth">
          <el-input v-model="tableData.licensenumber" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="适用规格" :label-width="formLabelWidth">
          <el-input v-model="tableData.specification" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="营业地址" :label-width="formLabelWidth">
          <el-input v-model="tableData.site" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="定位" :label-width="formLabelWidth">
          <el-input v-model="tableData.location" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="法人" :label-width="formLabelWidth">
          <el-input v-model="tableData.person" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="tableData.phone" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="特色" :label-width="formLabelWidth">
          <el-input v-model="tableData.feature" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="佣金比例" :label-width="formLabelWidth">
          <el-input v-model="tableData.commission" style="width:300px"></el-input>
        </el-form-item>
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
    <!-- <h1>{{form.license}}</h1> -->
  </div>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "storefront"
);

export default {
  watch: {
    dialogFormVisible() {
      if (this.dialogFormVisible) return;
      this.tableData = [];
    }
  },
  computed: {
    ...mapState(["storefrontInfo"])
  },
  mounted() {
    this.getStorefrontByPageAsync();
  },
  methods: {
    ...mapActions(["getStorefrontByPageAsync"]),
    submitUpload() {
      this.$refs.license.submit();
      this.$refs.banner.submit();
      this.$refs.banner.clearFiles();
      this.dialogFormVisible = false;
    },
    handleClick(row) {
      this.tableData = {
        ...row,
        ...{ banner: this.fff(row) }
      };
      this.dialogFormVisible = true;
    },
    fff(row) {
      const temp = [];
      for (const item of row.banner) {
        temp.push({ url: item });
      }
      return temp;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    exceed() {
      this.$message.error("上传图片不能超过1张!");
    }
  },

  data() {
    return {
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
}
</style>