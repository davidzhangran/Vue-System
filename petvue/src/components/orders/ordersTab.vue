<template>
  <div>
    <el-table :data="orders" border style="width: 100%">
      <el-table-column prop="petMemberId.name" label="客户" align="center"></el-table-column>
      <el-table-column prop="goodsId[0].name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="storefrontId.name" label="萌店名称" align="center"></el-table-column>
      <el-table-column prop="serveId[0].name" label="服务" align="center"></el-table-column>
      <el-table-column prop="petId[0].name" label="宠物" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="hanleClick(scope.row)" size="small">修改</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<div class="block">
      <el-pagination
      @size-change="setEachPage"
      @current-change="setCurrentPage"
      :current-page="currentPage-0"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    ></el-pagination>
</div>
    <!-- 修改 -->
    <div>
      <el-dialog title="修改订单" :visible.sync="dialogVisible" width="80%">
        <el-form :inline="true" :model="order" class="demo-form-inline">
          <el-form-item label="用户:">
            <el-autocomplete
              v-model="petUser"
              :fetch-suggestions="petInfoAsync"
              placeholder="请输入内容"
              @select="handlePetInfo"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="商品:" class="input">
            <el-autocomplete
              v-model="commodity"
              :fetch-suggestions="commodityAsync"
              placeholder="请输入内容"
              @select="handleCom"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="门店:" class="input">
            <el-autocomplete
              v-model="storeFont"
              :fetch-suggestions="storefrontInfoAsync"
              placeholder="请输入内容"
              @select="handleStorefrontInfo"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="服务:">
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="severAsync"
              placeholder="请输入内容"
              @select="handleSever"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="宠物:">
            <el-autocomplete
              v-model="pet"
              :fetch-suggestions="petAsync"
              placeholder="请输入内容"
              @select="handlePet"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="价格:" class="input">
            <el-input v-model="order.price" placeholder="价格"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click=" upDataOrder">确 定</el-button>
        </span>
      </el-dialog>
    </div>
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
      dialogVisible: false,
      pet: "",
      user: "",
      petUser: "",
      commodity: "",
      state: "",
      storeFont: "",
      price: "",
      order: {
        _id: "",
        petMemberId: "",
        goodsId: "",
        storefrontId: "",
        serveId: "",
        petId: "",
        price: ""
      },
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
      this.getOrdersAsync();
    },
    currentPage() {
      //监听eachPage，发生变化就会触发
      this.getOrdersAsync();
    }
  },
  methods: {
    ...mapMutations(["setCurrentPage", "setEachPage"]),
    ...mapActions([
      "getOrdersAsync",
      "addOrdersAsync",
      "removeOrdersAsync",
      "getCommoditysAsync",
      "getPetsByPageAsync",
      "getServesByPageAsync",
      "getStorefrontByPageAsync",
      "getPetMasterByPageAsync",
      "upDataOrdersAsync"
    ]),
    //删除
    handleDelete(row) {
      this.removeOrdersAsync({ _id: row._id });
      this.$notify({
        title: "成功",
        message: "删除成功！",
        type: "success"
      });
    },
    //修改
    hanleClick(row) {
      this.dialogVisible = true;
      this.commodity = row.goodsId[0].name;
      this.order.goodsId = row.goodsId[0]._id;
      this.petUser = row.petMemberId.name;
      this.order.petMemberId = row.petMemberId._id;
      this.storeFont = row.storefrontId.name;
      this.order.storefrontId = row.storefrontId._id;
      this.state = row.serveId[0].name;
      this.order.serveId = row.serveId[0]._id;
      this.pet = row.petId[0].name;
      this.order.petId = row.petId[0]._id;
      this.order.price = row.price;
      this.order._id = row._id;
      this.$notify({
        title: "成功",
        message: "修改成功！",
        type: "success"
      });
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
    },
    //修改
    //商品数据转换
    commodityAsync(queryString, cb) {
      let commodity = this.commoditys.map(item => {
        //value:名称,address:_id
        return { value: item.name, address: item._id };
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(commodity);
      }, 1000 * Math.random());
    },
    handleCom(item) {
      this.order.commodityId = item.address;
    },
    //宠物数据转换
    petAsync(queryString, cb) {
      let commodity = this.pets.map(item => {
        //value:名称,address:_id
        return { value: item.name, address: item._id };
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(commodity);
      }, 1000 * Math.random());
    },
    handlePet(item) {
      this.order.petId = item.address;
    },
    //服务数据转换
    severAsync(queryString, cb) {
      let commodity = this.serves.map(item => {
        //value:名称,address:_id
        return { value: item.name, address: item._id };
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(commodity);
      }, 1000 * Math.random());
    },
    handleSever(item) {
      this.order.serveId = item.address;
    },
    // 门店数据转换
    storefrontInfoAsync(queryString, cb) {
      let commodity = this.storefrontInfo.map(item => {
        //value:名称,address:_id
        return { value: item.name, address: item._id };
      });
      console.log(commodity)
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(commodity);
      }, 1000 * Math.random());
    },
    handleStorefrontInfo(item) {
      this.order.storefrontId = item.address;
    },
    petInfoAsync(queryString, cb) {
      let commodity = this.petMasterUsers.map(item => {
        //value:名称,address:_id
        return { value: item.name, address: item._id };
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(commodity);
      }, 1000 * Math.random());
    },
    handlePetInfo(item) {
      this.order.storefrontId = item.address;
    },
    upDataOrder() {
      this.upDataOrdersAsync({ ...this.order });
      this.dialogVisible = false;
    }
  },
  computed: {
    ...mapState([
      "count",
      "totalPage",
      "currentPage",
      "orders",
      "commoditys",
      "pets",
      "serves",
      "storefrontInfo",
      "petMasterUsers"
    ]),

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
.block{
  text-align: center;
}
</style>
