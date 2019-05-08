<template>
  <div>
    <el-table :data="commoditys" border style="width: 100%">
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column label="商品图片" align="center" width="200">
        <template slot-scope="scope">
          <el-popover placement="bottom" trigger="click">
            <img :src="scope.row.images[0]" class="head_pic">
            <img
              :src="scope.row.images[0]"
              class="head_pic"
              width="80"
              height="80"
              slot="reference"
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="商品类别" align="center"></el-table-column>
      <el-table-column prop="texture" label="商品材质" align="center"></el-table-column>
      <el-table-column prop="specification" label="适用宠物" align="center"></el-table-column>
      <el-table-column prop="exclusive" label="专属宠物" align="center"></el-table-column>
      <el-table-column prop="pack" label="包装规格" align="center"></el-table-column>
      <el-table-column prop="taste" label="口味" align="center"></el-table-column>
      <el-table-column prop="special" label="特殊功用" align="center"></el-table-column>
      <el-table-column prop="origin" label="产地" align="center"></el-table-column>
      <el-table-column prop="production" label="生产日期" align="center"></el-table-column>
      <el-table-column prop="expiration" label="保质期" align="center"></el-table-column>
      <el-table-column prop="supplier" label="供应商" align="center"></el-table-column>
      <el-table-column prop="feature" label="特色说明" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="hanleClick(scope.row)" size="small">修改</el-button>
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
    <!-- 修改商品 -->
    <div>
      <el-dialog title="修改商品" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
        <el-form :inline="true" :model="commodity" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="commodity.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="品类">
            <el-input v-model="commodity.category" placeholder="品类"></el-input>
          </el-form-item>
          <el-form-item label="材质">
            <el-input v-model="commodity.texture" placeholder="材质"></el-input>
          </el-form-item>
          <el-form-item label="适用规格">
            <el-input v-model="commodity.specification" placeholder="适用规格"></el-input>
          </el-form-item>
          <el-form-item label="专属规格">
            <el-input v-model="commodity.exclusive" placeholder="专属规格"></el-input>
          </el-form-item>
          <el-form-item label="包装规格">
            <el-input v-model="commodity.pack" placeholder="包装规格"></el-input>
          </el-form-item>
          <el-form-item label="口味">
            <el-input v-model="commodity.taste" placeholder="口味"></el-input>
          </el-form-item>
          <el-form-item label="特殊功用">
            <el-input v-model="commodity.special" placeholder="特殊功用"></el-input>
          </el-form-item>

          <el-form-item label="产地">
            <el-input v-model="commodity.origin" placeholder="产地"></el-input>
          </el-form-item>

          <el-form-item label="出厂日期">
            <el-input v-model="commodity.production" placeholder="出厂日期"></el-input>
          </el-form-item>

          <el-form-item label="保质期">
            <el-input v-model="commodity.expiration" placeholder="保质期"></el-input>
          </el-form-item>

          <el-form-item label="供应商">
            <el-input v-model="commodity.supplier" placeholder="供应商"></el-input>
          </el-form-item>
          <el-form-item label="特色说明">
            <el-input v-model="commodity.feature" placeholder="特色说明"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="commodity.price" placeholder="价格"></el-input>
          </el-form-item>
          <h1>上传图片</h1>
          <div class="imageDiv">
            <el-upload
              action="/goods/addCommodityImg"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :limit="2"
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="upDataCommodity ">确 定</el-button>
        </span>
      </el-dialog>
    </div>
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
      _id: "",
      url: "",
      commodity: {
        _id: "",
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
      dialogVisible: false,
      dialogImage: false,
      dialogVisibleImage: false
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
    ...mapActions(["getCommoditysAsync", "upDataCommodityAsync","removeCommodityAsync"]),
    ...mapMutations(["setCurrentPage", "setEachPage"]),
    hanleClick(row) {
      this.dialogVisible = true;
      const {
        name,
        category,
        texture,
        specification,
        exclusive,
        pack,
        taste,
        special,
        origin,
        production,
        expiration,
        supplier,
        feature,
        price,
        images
      } = row;

      this._id = row._id;
      this.commodity = {
        name,
        category,
        texture,
        specification,
        exclusive,
        pack,
        taste,
        special,
        origin,
        production,
        expiration,
        supplier,
        feature,
        price,
        images
      };
    },
    upDataCommodity() {
      const {
        name,
        category,
        texture,
        specification,
        exclusive,
        pack,
        taste,
        special,
        origin,
        production,
        expiration,
        supplier,
        feature,
        price,
        images
      } = this.commodity;
      this.upDataCommodityAsync({
        _id: this._id,
        name,
        category,
        texture,
        specification,
        exclusive,
        pack,
        taste,
        special,
        origin,
        production,
        expiration,
        supplier,
        feature,
        price,
        images
      });
      this.dialogVisible = false;
    },
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
      this.$message.error("上传图片不能超过1张!");
    },
    // 上传图片
    licenseSuc(response) {
      this.commodity.images.push(response.data.url);
    },
    //删除
    handleDelete(row) {
      console.log(row._id)
      this.removeCommodityAsync({_id:row._id})
    }
  },
  mounted() {
    this.getCommoditysAsync();
  }
};
</script>