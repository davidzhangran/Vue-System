
    <template>
  <div>
    <el-table :data="storefrontInfo" border style="width: 100%">
      <el-table-column prop="state" label="审核状态" width="120"></el-table-column>
      <el-table-column prop="name" label="名称" width="120"></el-table-column>
      <el-table-column prop="licensenumber" label="营业执照号码" width="120"></el-table-column>
      <el-table-column prop="site" label="营业地址" width="120"></el-table-column>
      <el-table-column prop="person" label="法人" width="120"></el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
      <el-table-column prop="feature" label="特色" width="120"></el-table-column>
      <el-table-column label="营业执照" width="120" prop="license">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <img :src="scope.row.license[0]" class="head_pic" width="500" height="400">
            <img
              :src="scope.row.license[0]"
              class="head_pic"
              width="80"
              height="80"
              slot="reference"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="门店图片" width="120" prop="banner">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <div class="block">
              <img
                v-for="item in scope.row.banner"
                :src="item"
                class="head_pic"
                width="80"
                height="80"
                :key="item"
              >
            </div>
            <img
              :src="scope.row.banner[0]"
              class="head_pic"
              width="80"
              height="80"
              slot="reference"
            >
          </el-popover>
        </template>
      </el-table-column>
      <!-- 内嵌的服务表格 -->
      <!-- <el-table-column label="服务" width="100" prop="state">
        <template slot-scope="scope">
          <el-button type="primary" @click="dialogTableVisible = true">服务列表</el-button>

          <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="gridData">
              <el-table-column property="date" label="商品名称" width="150"></el-table-column>
              <el-table-column property="name" label="商品类别" width="200"></el-table-column>
              <el-table-column property="address" label="价格"></el-table-column>
            </el-table>
          <el-button @click="handleClick(scope.row)" type="text" size="small">商品列表</el-button>
          </el-dialog>

        </template>
      </el-table-column>-->

      <!-- <el-table-column label="商品" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">商品列表</el-button>
        </template>
      </el-table-column>-->
      <el-table-column label="更多" width="100">
        <template slot-scope="scope">
          <el-button @click="moreInfo(scope.row)" type="text">
            <el-link
              :underline="false"
              icon="el-icon-s-promotion"
              @click="moreInfo(scope.row)"
              href="/#/userStore/moreSf"
            >更多信息</el-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-sizes="[1, 5, 8]"
        :page-size="5"
        :current-page="currentPage - 0"
        @size-change="setEachPage"
        @current-change="setCurrentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>



<script>
// :current-page="this.currentPage - 0",当前页数默认值加上
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "storefront"
);

export default {
  name: "storefrontTab",
  methods: {
    ...mapActions(["getStorefrontByPageAsync"]),
    ...mapMutations(["setEachPage", "setCurrentPage", "moreInfo"]),
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
     
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  watch: {
    eachPage() {
      //监听eachPage，发生变化就会触发
      this.getStorefrontByPageAsync();
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
      this.getStorefrontByPageAsync();
    }
  },
  computed: {
    ...mapState(["count", "storefrontInfo", "totalPage"]),
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
    this.getStorefrontByPageAsync();
    
  }
};
</script>



