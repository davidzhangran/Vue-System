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
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage"
      :page-sizes="[2,5, 7, 10,]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
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
      commodity: [
        {
          name: "1", // 名称
          category: "2", // 品类
          texture: "3", // 材质
          specification: "4", //适用规格
          exclusive: "5", //专属规格
          pack: "6", //包装规格
          taste: "7", //口味
          special: "8", //特殊功用
          origin: "9", //产地
          production: "10", //出厂日期
          expiration: "11", //保质期
          supplier: "12", //供应商
          feature: "13", //特色说明
          price: "14", //价格
          images: ["/imgags/goodsImg/imgags/50b13395b924a.jpg"] //图片
        }
      ]
    };
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
    ...mapMutations(["setCurrentPage", "setEachPage"])
  },
  mounted() {
    this.getCommoditysAsync();
  }
};
</script>