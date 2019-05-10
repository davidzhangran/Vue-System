
    <template>
  <div>
    <el-table :data="storefrontInfo" stripe style="width: 100%">
      <el-table-column prop="state" label="审核状态" ></el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="licensenumber" label="营业执照号码" ></el-table-column>
      <el-table-column prop="site" label="营业地址" ></el-table-column>
      <el-table-column prop="person" label="法人" ></el-table-column>
      <el-table-column prop="phone" label="联系电话" ></el-table-column>
      <el-table-column prop="feature" label="特色" ></el-table-column>
      <el-table-column label="营业执照"  prop="license">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <img :src="scope.row.license[0]" class="head_pic" width="300" height="200">
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

      <el-table-column label="门店图片" width="300" height="200" prop="banner">
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
              width="50"
              height="50"
              slot="reference"
            >
          </el-popover>
        </template>
      </el-table-column>
    <!-- 文字链接跳转，把状态给全局 -->
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
    ...mapState(["count", "storefrontInfo", "totalPage","eachPage","currentPage"]),
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



