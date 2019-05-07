
    <template>
  <div>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="zip" label="审核状态" width="120"></el-table-column>
    <el-table-column prop="name" label="名称" width="120"></el-table-column>
    <el-table-column prop="province" label="营业执照号码" width="120"></el-table-column>
    <el-table-column prop="city" label="营业地址" width="120"></el-table-column>
    <el-table-column prop="address" label="法人" width="300"></el-table-column>
    <el-table-column prop="zip" label="联系电话" width="120"></el-table-column>
    <el-table-column prop="zip" label="特色" width="120"></el-table-column>
    <el-table-column label="服务" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">服务列表</el-button>
      </template>
    </el-table-column>
    <el-table-column label="商品" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">商品列表</el-button>
      </template>
    </el-table-column>
    <el-table-column label="宠物" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">宠物列表</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>



<script>
export default {
  name: "storefrontTab",
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>

