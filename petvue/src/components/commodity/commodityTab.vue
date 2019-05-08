<template>
  <div>
    <el-table :data="commoditys" border style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="images[0]" label="商品图片"></el-table-column>
      <el-table-column prop="category" label="商品类别"></el-table-column>
      <el-table-column prop="texture" label="商品材质"></el-table-column>
      <el-table-column prop="specification" label="适用宠物"></el-table-column>
      <el-table-column prop="exclusive" label="专属宠物"></el-table-column>
      <el-table-column prop="pack" label="包装规格"></el-table-column>
      <el-table-column prop="taste" label="口味"></el-table-column>
      <el-table-column prop="special" label="特殊功用"></el-table-column>
      <el-table-column prop="origin" label="产地"></el-table-column>
      <el-table-column prop="production" label="生产日期"></el-table-column>
      <el-table-column prop="expiration" label="保质期"></el-table-column>
      <el-table-column prop="supplier" label="供应商"></el-table-column>
      <el-table-column prop="feature" label="特色说明"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column label="服务" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="hanleClick(scope.row)"  size="small">修改</el-button>
          <el-button type="primary" @click="handleDelete(scope.row)" size="small">删除</el-button>
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
      :total="count"
    ></el-pagination>
    <!-- <CommodityCommodity/> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "commodity"
);
export default {
  name: "commodityTab",
  data() {
    return {
      state1: "",
      commodity: [],
      dialogVisible: false
    };
  },
  watch: {
    eachPage() {
      //监听eachPage，发生变化就会触发
      this.getCommoditysAsync();
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
      this.getCommoditysAsync();
    }
  },
  computed: {
    ...mapState(["count", "totalPage", "currentPage", "commoditys"]),

    eachPage: {
      get: mapState(["eachPage"]).eachPage,
      set: mapMutations(["setEachPage"]).setEachPage
    }
  },
  methods: {
    ...mapActions(["getCommoditysAsync"]),
    ...mapMutations(["setCurrentPage", "setEachPage"]),
    hanleClick(row) {
      this.dialogVisible = true;
      console.log(row._id);
    },
    handleDelete(row) {
      console.log(row._id);
    }
  },
  mounted() {
    this.getCommoditysAsync();
  }
};
</script>