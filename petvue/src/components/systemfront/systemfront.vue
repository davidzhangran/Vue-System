<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column header-align="center" align="center" fixed prop="_id" label="门店编号"></el-table-column>
      <el-table-column header-align="center" align="center" prop="name" label="名称"></el-table-column>
      <el-table-column header-align="center" align="center" prop="licensenumber" label="营业执照号码"></el-table-column>
      <el-table-column header-align="center" align="center" prop="license" label="营业执照图片"></el-table-column>
      <el-table-column header-align="center" align="center" prop="specification" label="适用规格"></el-table-column>
      <el-table-column header-align="center" align="center" prop="site" label="营业地址"></el-table-column>
      <el-table-column header-align="center" align="center" prop="location" label="定位"></el-table-column>
      <el-table-column header-align="center" align="center" prop="person" label="法人"></el-table-column>
      <el-table-column header-align="center" align="center" prop="phone" label="联系电话"></el-table-column>
      <el-table-column header-align="center" align="center" prop="banner" label="头图"></el-table-column>
      <el-table-column header-align="center" align="center" prop="feature" label="特色"></el-table-column>
      <el-table-column header-align="center" align="center" prop="vip" label="VIP等级"></el-table-column>
      <el-table-column header-align="center" align="center" prop="commission" label="佣金比列"></el-table-column>
      <el-table-column width="120" header-align="center" align="center" label="店员属性">
        <el-button type="primary">店员详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="goodsId" label="商品id">
        <el-button type="primary">商品详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="serveId" label="服务id">
        <el-button type="primary">服务详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" prop="petId" label="宠物id">
        <el-button type="primary">宠物详情</el-button>
      </el-table-column>
      <el-table-column width="120" header-align="center" align="center" fixed="right" label="操作">
        <!-- <template slot-scope="scope"> -->
        <el-button type="text" @click="handleClick">修改</el-button>
        <!-- </template> -->
      </el-table-column>
    </el-table>
    <!-- 修改组件 -->
    <el-dialog title="修改门店信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="display: flex;flex-wrap: wrap;">
        <el-form-item label="门店编号" :label-width="formLabelWidth">
          <el-input v-model="form.name" disabled style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="适用规格" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="营业地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="定位" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="法人" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="特色" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="佣金比例" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="营业执照图片" :label-width="formLabelWidth">
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /修改组件 -->
    <img width="260" height="200" :src="form.license" />
    <!-- <h1>{{form.license}}</h1> -->
  </div>
</template>


<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
        this.dialogFormVisible = true;
      }
    },

    data() {
      return {
        tableData: [
          {
            _id: "123456",
            name: "卖点狗粮",
            licensenumber: "111111",
            license: "../../../introduceBG.jpg",
            specification: "都适用",
            site: "上海市普陀区金沙江路 1518 弄",
            location: "定位",
            person: "小明",
            phone: "13547006776",
            banner: "../storeFront/img/头图.png",
            feature: "超好吃的狗粮",
            vip: "心悦3",
            commission: "1:1",
            clerk: [
              {
                name: "张三",
                age: 18
              },
              {
                name: "李四",
                age: 15
              }
            ],
            goodsId: [
              {
                _id: "001",
                name: "超好吃的狗粮"
              }
            ],
            serveId: [
              {
                _id: "001",
                name: "洗澡澡"
              }
            ],
            petId: [
              {
                _id: "001",
                name: "山野一号"
              }
            ]
          }
        ],
        dialogFormVisible: false,
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: "",
          license: require('../../../../../introduceBG.jpg')
        },
        formLabelWidth: "120px"
      };
    }
  };
</script>

<style>
  .sa {
    display: flex;
    flex-wrap: wrap;
  }
</style>