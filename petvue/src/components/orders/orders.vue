<template>
  <div>
    <el-button type="primary" @click="dialogVisible=true" size="small">增加订单</el-button>
      <el-select v-model="value" style="width:100px;" size="small" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div class="name1">
      <el-input v-model="label" placeholder="请输入内容" size="small"></el-input>
    </div>
    <el-button type="primary" icon="el-icon-search"  size="small">搜索</el-button>
    <OrdersOrdersTab/>

    <el-dialog title="增加订单" :visible.sync="dialogVisible" width="80%">
      <el-form :inline="true" :model="orders" class="demo-form-inline">
        <el-form-item label="用户:">
          <el-autocomplete
            v-model="value1"
            :fetch-suggestions="petInfoAsync"
            placeholder="请输入内容"
            @select="handlePetInfo"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="商品:" class="input">
          <el-autocomplete
            v-model="value"
            :fetch-suggestions="commodityAsync"
            placeholder="请输入内容"
            @select="handleCom"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="门店:" class="input">
          <el-autocomplete
            v-model="restaurants"
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
            v-model="commodity"
            :fetch-suggestions="petAsync"
            placeholder="请输入内容"
            @select="handlePet"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="价格:" class="input">
          <el-input v-model="orders.price" placeholder="价格"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=" addOrders">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "orders"
);
export default {
  name: "orders",
  data() {
    return {
      dialogVisible: false,
      value: "",
      value1:"",
      commodity: "",
      state: "",
      label:"",
      orders: {
        userId: "",
        commodityId: "",
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
      restaurants: "",

    };
  },
  methods: {
    ...mapActions([
      "getCommoditysAsync",
      "addOrdersAsync",
      "getPetsByPageAsync",
      "getServesByPageAsync",
      "getStorefrontByPageAsync",
      "getPetMasterByPageAsync"
    ]),
    addOrders() {
      this.addOrdersAsync({
        petMemberId: "5cd3c38fec6c4e3dfc08ffcd",
        goodsId: this.orders.commodityId,
        storefrontId: this.orders.storefrontId,
        serveId: this.orders.serveId,
        petId: this.orders.petId,
        price: this.orders.price //价格
      });
      this.dialogVisible =false;
      this.value= "";
      this.value1="";
      this.commodity= "";
      this.state= "";
      this.orders.price = "";
      this.restaurants="";

    },
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
      this.orders.commodityId = item.address;
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
      this.orders.petId = item.address;
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
      this.orders.serveId = item.address;
    },
    // 门店数据转换
    storefrontInfoAsync(queryString, cb) {
      let commodity = this.storefrontInfo.map(item => {
        //value:名称,address:_id
        return { value: item.name, address: item._id };
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(commodity);
      }, 1000 * Math.random());
    },
    handleStorefrontInfo(item) {
      this.orders.storefrontId = item.address;
    },
    petInfoAsync(queryString, cb) {
      console.log(this.petMasterUsers)
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
      this.orders.storefrontId = item.address;
    }
  },
  computed: {
    ...mapState([
      "commoditys",
      "pets",
      "serves",
      "storefrontInfo",
      "petMasterUsers"
    ])
  },

  mounted() {
    this.getCommoditysAsync({
      userId: document.cookie.match(
        new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
    this.getPetsByPageAsync({
      userId: document.cookie.match(
        new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
    this.getServesByPageAsync({
      userId: document.cookie.match(
        new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
      )[2]
    });
    this.getStorefrontByPageAsync();
    this.getPetMasterByPageAsync();
  }
};
</script>