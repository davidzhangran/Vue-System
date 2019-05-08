<template>
  <div>
    <el-button type="primary" @click="dialogVisible=true" size="small">增加订单</el-button>
    <el-dialog title="增加订单" :visible.sync="dialogVisible" width="80%">
      <el-form :inline="true" :model="orders" class="demo-form-inline">
        <el-form-item label="用户:">
          <!-- <el-input v-model="orders.user" placeholder="用户"></el-input> -->
          <el-select v-model="userId" placeholder="请选择">
            <el-option v-for="item in user" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品:" class="input">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in adc" :key="item.value" :label="tem.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店:" class="input">
          <el-input v-model="orders.storefront" placeholder="材质"></el-input>
        </el-form-item>
        <el-form-item label="服务:">
          <el-input v-model="orders.serve" placeholder="适用规格"></el-input>
        </el-form-item>
        <el-form-item label="宠物:">
          <el-input v-model="orders.pet" placeholder="专属规格"></el-input>
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
export default {
  name: "orders",
  data() {
    return {
      dialogVisible: false,
      value: "",
      userId: "",
      orders: {
        user: "",
        commodity: "",
        storefront: "",
        serve: "",
        pet: "",
        price: ""
      },
      user: [
        {
          id: "name",
          name: "商品名称"
        },
        {
          id: "category",
          name: "商品类别"
        },
        {
          id: "texture",
          name: "商品材质"
        },
        {
          id: "price",
          name: "价格"
        }
      ]
    };
  },
  methods: {
    addOrders() {},
    adc() {
      return [
        {
          id: "name",
          name: "商品名称"
        },
        {
          id: "category",
          name: "商品类别"
        },
        {
          id: "texture",
          name: "商品材质"
        },
        {
          id: "price",
          name: "价格"
        }
      ];
    }
  }
};
</script>