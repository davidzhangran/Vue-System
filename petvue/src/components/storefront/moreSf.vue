<template>
  <div>
    <el-tabs :tab-position="tabPosition" :stretch="stretch">
      <el-tab-pane label="商品列表">
        <el-table :data="moreSf.goodsId" border style="width: 100%">
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
      </el-tab-pane>
      <el-tab-pane label="服务列表">
        <div>123</div>
      </el-tab-pane>
      <el-tab-pane label="宠物列表">
        <div>66</div>
      </el-tab-pane>
      <el-tab-pane label="员工列表">
        <template>
          <el-button type="primary" @click="dialogVisible = true">新增员工</el-button>
          <el-table :data="moreSf.clerk" border style="width: 100%">
            <el-table-column fixed prop="date" label="入职日期" width="150"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="value" label="职级" width="120"></el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
            <el-table-column prop="site" label="地址" width="300"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="新增员工" :visible.sync="dialogVisible" width="30%">
          <el-form label-width="auto">
            <el-form-item label="入职日期">
              <el-date-picker
                v-model="date"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="职级">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input prefix-icon="el-icon-date" v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input prefix-icon="el-icon-date" v-model="phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input style="width:200px" prefix-icon="el-icon-date" v-model="site"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addStaff">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
   

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  "storefront"
);
export default {
  name: "moreSf",
  data() {
    return {
      tabPosition: "top",
      stretch: true,
      dialogVisible: false,
      name: "",
      date: "",
      phone: "",
      site: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      options: [
        {
          value: "普通员工",
          label: "普通员工"
        },
        {
          value: "店长",
          label: "店长"
        },
        {
          value: "经理",
          label: "经理"
        }
      ],
      value: ""
    };
  },
  methods: {
    ...mapActions(["addStaffAsync"]),
    handleClick() {
      console.log(this.moreSf);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addStaff() {
      this.dialogVisible = false;
      const { name, phone, date, site, value } = this;
      this.addStaffAsync({
        _id: this.moreSf._id,
        staff: { name, phone, date, site, value }
      });
    }
  },
  computed: {
    //拿到当前门店的信息
    ...mapState(["moreSf"])
  }
};
</script>


