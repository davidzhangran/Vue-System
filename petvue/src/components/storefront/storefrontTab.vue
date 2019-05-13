
    <template>
  <div>
    <el-table
      :data="storefrontInfo"
      stripe
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      v-loading="loading"
    >
      <el-table-column prop="state" label="审核状态" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="licensenumber" show-overflow-tooltip label="营业执照号码" align="center"></el-table-column>
      <el-table-column prop="site" show-overflow-tooltip label="营业地址" align="center"></el-table-column>
      <el-table-column prop="person" label="法人" align="center"></el-table-column>
      <el-table-column prop="phone" show-overflow-tooltip label="联系电话" align="center"></el-table-column>
      <el-table-column prop="feature"  show-overflow-tooltip label="特色" align="center"></el-table-column>
      <el-table-column label="营业执照" prop="license" align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <img :src="scope.row.license[0]" class="head_pic" width="500" height="400">
            <img
              :src="scope.row.license[0]"
              class="head_pic"
              width="50"
              height="50"
              slot="reference"
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="门店图片" prop="banner" align="center">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <el-carousel :interval="5000" arrow="always" style="width:500px;">
              <el-carousel-item v-for="item in scope.row.banner" :key="item">
                <img :src="item">
              </el-carousel-item>
            </el-carousel>

            <img :src="scope.row.banner[0]" width="50" height="50" slot="reference">
          </el-popover>
        </template>
      </el-table-column>
      <!-- 文字链接跳转，把状态给全局 -->
      <el-table-column label="更多" align="center">
        <template slot-scope="scope">
          <div  @click="moreInfo(scope.row)">
          <el-link href="/#/userStore/moreSf">
            查看
            <i class="el-icon-more el-icon--right" ></i>
          </el-link>
          </div>
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
    handleCurrentChange(val) {
      // console.log(val);
      this.currentRow = val;
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
    ...mapState([
      "count",
      "storefrontInfo",
      "totalPage",
      "eachPage",
      "currentPage",
      "loading"
    ])
    // eachPage: {
    //   get: mapState(["eachPage"]).eachPage, //返回eachPage
    //   set: mapMutations(["setEachPage"]).setEachPage //setEachPage方法调用
    // },
    // currentPage: {
    //   get: mapState(["currentPage"]).currentPage,
    //   set: mapMutations(["setCurrentPage"]).setCurrentPage
    // }
  },
  mounted() {
    this.getStorefrontByPageAsync();
  }
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>




