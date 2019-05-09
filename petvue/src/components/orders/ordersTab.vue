<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="name1">
      <el-input v-model="label" placeholder="请输入内容"></el-input>
    </div>
    <el-button icon="el-icon-search" @click="search"></el-button>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column prop="petMemberId.name" label="客户" align="center"></el-table-column>
      <el-table-column prop="goodsId[0].name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="storefrontId.name" label="萌店名称" align="center"></el-table-column>
      <el-table-column prop="serveId[0].name" label="服务" align="center"></el-table-column>
      <el-table-column prop="petId[0].name" label="宠物" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" plain @click="hanleClick(scope.row)" size="small">修改</el-button>
          <el-button type="danger" plain @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage-0"
      :page-sizes="[1, 5, 7, 10]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "orders"
);
export default {
  name: "orderTab",
  data() {
    return {
      order: [{}],
      options: [
        {
          value: "goodsId",
          label: "商品名称"
        },
        {
          value: "petMemberId",
          label: "客户"
        },
        {
          value: "storefrontId",
          label: "门店"
        },
        {
          value: "serveId",
          label: "服务"
        },
        {
          value: "petId",
          label: "宠物"
        },
        {
          value: "price",
          label: "价格"
        }
      ],
      value: "",
      label: ""
    };
  },
  watch: {
    eachPage() {
     
      //监听eachPage，发生变化就会触发
     this.getOrdersAsync({
       
      userId: document.cookie.match(
        new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
    },
    currentPage() {
  //监听eachPage，发生变化就会触发
     this.getOrdersAsync({
      userId: document.cookie.match(
        new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
    }
  },
  methods: {
    ...mapMutations(["setCurrentPage", "setEachPage"]),
    ...mapActions(["getOrdersAsync", "addOrdersAsync", "removeOrdersAsync"]),
    //删除
    handleDelete(row) {
      this.removeOrdersAsync({ _id: row._id });
    },
    //修改
    hanleClick(row) {
      console.log("xiugai", row);
    },
    search() {
      //   //     console.log(this.orders)
      //   console.log(this.value);
      //   console.log(this.label);
      //   const orders = this.orders;
      // orders.map(item => {
      //     //   console.log(item)
      //     if (item[this.value]) {
      //     }
      //     console.log(item[this.value]);
      //   });
    }
  },
  computed: {
    ...mapState(["count", "totalPage", "currentPage", "orders"]),

    eachPage: {
      get: mapState(["eachPage"]).eachPage,
      set: mapMutations(["setEachPage"]).setEachPage
    }
  },
  mounted() {
    this.getOrdersAsync({
      userId: document.cookie.match(
        new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
  }
};
</script>
<style>
</style>
