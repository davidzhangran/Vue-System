<template>
  <div>
    <el-tabs :tab-position="tabPosition" :stretch="stretch">
      <el-tab-pane label="商品列表">
        <el-button type="primary" @click="dialogVisibleGoods = true">添加商品</el-button>
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

        <el-dialog title="添加商品" :visible.sync="dialogVisibleGoods">
          <div class="goods">
            <div>
              <p>商品名称：</p>
              <el-select v-model="value" placeholder="请选择" @change="changeGodds(value)">
                <el-option
                  v-for="item in user.goodsId"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </div>
            <div>
              品类:
              <el-input v-model="category" placeholder="品类"></el-input>
            </div>
            <div>
              供应商:
              <el-input v-model="supplier" placeholder="供应商"></el-input>
            </div>
            <div>
              出厂日期:
              <el-input v-model="production" placeholder="出厂日期"></el-input>
            </div>
            <div>
              产地:
              <el-input v-model="origin" placeholder="产地"></el-input>
            </div>
            <div>
              价格:
              <el-input v-model="price" placeholder="价格"></el-input>
            </div>
            <div>
              适用规格:
              <el-input v-model="specification" placeholder="适用规格"></el-input>
            </div>
            <div>
              专属规格:
              <el-input v-model="exclusive" placeholder="专属规格"></el-input>
            </div>
            <div>
              口味:
              <el-input v-model="taste" placeholder="口味"></el-input>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleGoods = false">取 消</el-button>
            <el-button type="primary" @click="addGoods">确 定</el-button>
          </span>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="服务列表">
        <el-button type="primary" @click="dialogVisibleServe = true">添加服务</el-button>
        <div>
          <el-table :data="moreSf.serveId" border style="width: 100%">
            <el-table-column align="center" fixed prop="name" label="服务类型" width="150"></el-table-column>
            <el-table-column align="center" prop="category" label="品类" width="120"></el-table-column>
            <el-table-column align="center" prop="schedule" label="排期" width="120"></el-table-column>
            <el-table-column align="center" prop="specification" label="适用规格" width="120"></el-table-column>
            <el-table-column align="center" prop="service" label="服务规格" width="120"></el-table-column>
            <el-table-column align="center" prop="consuming" label="耗时" width="120"></el-table-column>
            <el-table-column align="center" prop="grade" label="服务员等级" width="120"></el-table-column>
            <el-table-column align="center" prop="price" label="价格" width="120"></el-table-column>
            <el-table-column align="center" fixed="right" label="操作" width="250">
              <template slot-scope="scope">
                <el-button type="danger" plain @click="handleDelete(scope.row)" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="添加服务" :visible.sync="dialogVisibleServe">
            <div class="goods">
              <div>
                <p>服务名称：</p>
                <el-select v-model="value" placeholder="请选择" @change="changeServe(value)">
                  <el-option
                    v-for="item in user.serveId"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </div>
              <div>
                服务类型:
                <el-input v-model="serve.name" placeholder="服务类型"></el-input>
              </div>
              <div>
                品类:
                <el-input v-model="serve.category" placeholder="品类"></el-input>
              </div>
              <div>
                排期:
                <el-input v-model="serve.schedule" placeholder=" 排期"></el-input>
              </div>
              <div>
                适用规格:
                <el-input v-model="serve.specification" placeholder="适用规格"></el-input>
              </div>
              <div>
                服务规格:
                <el-input v-model="serve.service" placeholder="服务规格"></el-input>
              </div>
              <div>
                价格:
                <el-input v-model="serve.price" placeholder="价格"></el-input>
              </div>
              <div>
                耗时:
                <el-input v-model="serve.consuming" placeholder="耗时"></el-input>
              </div>
              <div>
                服务员等级:
                <el-input v-model="serve.grade" placeholder="服务员等级"></el-input>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleServe = false">取 消</el-button>
              <el-button type="primary" @click="addServe">确 定</el-button>
            </span>
          </el-dialog>
        </div>
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
      dialogVisibleGoods: false,
      dialogVisibleServe: false,
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
      value: "",
      category: "",
      production: "",
      origin: "",
      price: "",
      supplier: "",
      specification: "",
      exclusive: "",
      taste: "",
      _id: "",
      serve: {
        name: "", // 名称
        category: "", // 品类
        schedule: "", // 排期
        specification: "", //适用规格
        service: "", //服务规格
        consuming: "", //耗时
        grade: "", //服务员等级
        price: "" //价格
      }
    };
  },
  methods: {
    ...mapActions([
      "addStaffAsync",
      "addGoodsAsync",
      "addServeAsync",
      "addPetAsync"
    ]),
    handleClick() {
      console.log(this.moreSf);
    },
    handleDelete() {},
    changeGodds(value) {
      const [data] = this.user.goodsId.filter(item => item._id == value);
      const {
        category,
        production,
        supplier,
        price,
        origin,
        taste,
        exclusive,
        specification,
        _id
      } = data;
      // 更新商品信息
      this.category = category;
      this.production = production;
      this.supplier = supplier;
      this.price = price;
      this.origin = origin;
      this.specification = specification;
      this.exclusive = exclusive;
      this.taste = taste;
      this._id = _id;
    },
    changeServe(value) {},
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
    },
    addGoods() {
      this.dialogVisibleGoods = false;
      this.addGoodsAsync({ _id: this._id });
    },
    addServe(){
       this.dialogVisibleServe = false;
    }
  },
  computed: {
    //拿到当前门店的信息
    ...mapState(["moreSf", "user"])
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.goods > div {
  width: 210px;
  margin: 10px;
}
</style>

