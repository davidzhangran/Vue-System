<template>
  <div class="add">
    <!-- <el-button type="primary" @click="dialogVisible = true">新增</el-button> -->
    <h1 class="font">新增商品</h1>
    <el-form :inline="true" :model="commodity" class="demo-form-inline">
      <el-form-item label="商品名称:">
        <el-input v-model="commodity.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="品类:" class="input">
        <el-input v-model="commodity.category" placeholder="品类"></el-input>
      </el-form-item>
      <el-form-item label="材质:" class="input">
        <el-input v-model="commodity.texture" placeholder="材质"></el-input>
      </el-form-item>
      <el-form-item label="适用规格:">
        <el-input v-model="commodity.specification" placeholder="适用规格"></el-input>
      </el-form-item>
      <el-form-item label="专属规格:">
        <el-input v-model="commodity.exclusive" placeholder="专属规格"></el-input>
      </el-form-item>
      <el-form-item label="包装规格:">
        <el-input v-model="commodity.pack" placeholder="包装规格"></el-input>
      </el-form-item>
      <el-form-item label="口味:" class="input">
        <el-input v-model="commodity.taste" placeholder="口味"></el-input>
      </el-form-item>
      <el-form-item label="特殊功用:">
        <el-input v-model="commodity.special" placeholder="特殊功用"></el-input>
      </el-form-item>
      <el-form-item label="产地:" class="input">
        <el-input v-model="commodity.origin" placeholder="产地"></el-input>
      </el-form-item>
      <el-form-item label="特色说明:">
        <el-input v-model="commodity.feature" placeholder="特色说明"></el-input>
      </el-form-item>
      <el-form-item label="价格:" class="input">
        <el-input v-model="commodity.price" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item label="保质期:" class="input1">
        <el-input v-model="commodity.expiration" placeholder="保质期"></el-input>
      </el-form-item>
      <el-form-item label="供应商:" class="input1">
        <el-input v-model="commodity.supplier" placeholder="供应商"></el-input>
      </el-form-item>
      <el-form-item label="出厂日期:">
        <el-date-picker
          v-model="commodity.production"
          type="date"
          placeholder="选择日期"
          format="yyyy年MM月dd日"
          value-format="yyyy年MM月dd日"
        ></el-date-picker>
      </el-form-item>
      <div class="imageDiv">
        <h1 class="imageH1">上传图片</h1>
        <el-upload
          action="/goods/addCommodityImg"
          list-type="picture-card"
          ref="upload"
          :on-preview="handlePictureCardPreview"
          :limit="10"
          :on-exceed="exceed"
          :on-success="licenseSuc"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisibleImage">
          <img width="100%" :src="url" alt>
        </el-dialog>
      </div>
    </el-form>
    <div class="go">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="Commodity ">确 定</el-button>
    </div>

    <!-- <CommodityCommodityTab /> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "commodity"
);
export default {
  name: "commodity",
  data() {
    return {
      //数据
      commoditys: [],
      dialogVisible: true,
      dialogImage: false,
      dialogVisibleImage: false,
      url: "",
      commodity: {
        name: "", // 名称
        category: "", // 品类
        texture: "", // 材质
        specification: "", //适用规格
        exclusive: "", //专属规格
        pack: "", //包装规格
        taste: "", //口味
        special: "", //特殊功用
        origin: "", //产地
        production: "", //出厂日期
        expiration: "", //保质期
        supplier: "", //供应商
        feature: "", //特色说明
        price: "", //价格
        images: [] //图片
      },
      src: ""
    };
  },
  methods: {
    ...mapActions(["getCommoditysAsync", "addCommodityAsync"]),
    ...mapMutations(["licenseCom", "bannerCom"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImage = true;
    },
    exceed() {
      this.$message.error("上传图片不能超过2张!");
    },
    // 上传图片
    licenseSuc(response) {
      this.commodity.images.push(response.data.url);  
    },
    Commodity() {
      this.$refs.upload.submit();
      setTimeout(()=>{this.addCommodity()},100)
    },
    cancel() {
      getValue(this);
    },
    addCommodity() {
      //所有 商品数据
      // console.log(this.commodity.production)
      const {
        name, // 名称
        category, // 品类
        texture, // 材质
        specification, //适用规格
        exclusive, //专属规格
        pack, //包装规格
        taste, //口味
        special, //特殊功用
        origin, //产地
        production, //出厂日期
        expiration, //保质期
        supplier, //供应商
        feature, //特色说明
        price, //价格
        images //图片
      } = this.commodity;
      getValue(this);

      this.addCommodityAsync({
        userId: document.cookie.match(
          new RegExp("(^|)" + "id" + "=([^;]*)(;|$)")
        )[2],
        name, // 名称
        category, // 品类
        texture, // 材质
        specification, //适用规格
        exclusive, //专属规格
        pack, //包装规格
        taste, //口味
        special, //特殊功用
        origin, //产地
        production, //出厂日期
        expiration, //保质期
        supplier, //供应商
        feature, //特色说明
        price,
        images
      });
      this.url = "";
    }
  }
};
function getValue(params) {
  params.commodity = {
    name: "", // 名称
    category: "", // 品类
    texture: "", // 材质
    specification: "", //适用规格
    exclusive: "", //专属规格
    pack: "", //包装规格
    taste: "", //口味
    special: "", //特殊功用
    origin: "", //产地
    production: "", //出厂日期
    expiration: "", //保质期
    supplier: "", //供应商
    feature: "", //特色说明
    price: "",
    images: [""] //价格
  };
}
</script>
<style>
.add {
  width: 80%;
  margin: auto;
}
.input {
  padding-left: 27px;
}
.input1 {
  padding-left: 15px;
}
.inputStyle {
  width: 178px;
  height: 178px;
  margin-left: 20px;
}
.imageDiv {
  width: 28%;
  margin: auto;
}
.font {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 32px;
  text-align: center;
  padding: 20px 0;
}
.imageH1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 24px;
  text-align: center;
  padding: 20px 0;
}
.go {
  width: 28%;
  margin: auto;
  margin-top: 30px;
}
</style>
