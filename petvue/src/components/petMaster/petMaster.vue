<template slot-scope="scope">
  <div>
    <el-button @click="dialogTableVisible = true">新增宠主</el-button>
    <el-dialog title="新增宠主详情" :visible.sync="dialogTableVisible" width="30%">
      <el-form status-icon v-model="petMaster" label-width="auto" class="petMaster">

        <!-- 头像上传 -->
        <el-form-item label="头像：" prop="banner">
          <!-- <el-upload action="/petMember/addPetMaster" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog >
            <img width="100%"  alt="">
          </el-dialog> -->
        </el-form-item>

        <el-form-item label="电话：" prop="phone">
          <el-input v-model="petMaster.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称：" prop="username">
          <el-input v-model="petMaster.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="petMaster.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在城市：" prop="city">
          <el-input v-model="petMaster.city" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所在城市区：" prop="area">
          <el-input v-model="petMaster.area" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="具体地址：" prop="site">
          <el-input v-model="petMaster.site" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="积分：" prop="integral">
          <el-input v-model="petMaster.integral" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addpetMaster(petMaster)">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table :data="petMarterData" border style="width: 100%">
      <el-table-column prop="banner" label="头像" width="120">
      </el-table-column>
      <el-table-column fixed prop="phone" label="电话号码" width="150">
      </el-table-column>
      <el-table-column prop="username" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="100">
      </el-table-column>
      <el-table-column prop="area" label="区域" width="100">
      </el-table-column>
      <el-table-column prop="site" label="送货地址" width="220">
      </el-table-column>
      <el-table-column prop="integral" label="积分" width="100">
      </el-table-column>

      <!-- 查看拥有宠物的详情 -->
      <el-table-column prop="owned" label="订单信息" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogFormVisible = true">查看详情</el-button>
          <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
            <el-table :data="owned">
              <el-table-column property="petName" label="宠物名字" width="80"></el-table-column>
              <el-table-column property="petCategory" label="宠物种类" width="80"></el-table-column>
              <el-table-column property="petType" label="宠物品种" width="80"></el-table-column>
              <el-table-column property="petColor" label="宠物颜色" width="70"></el-table-column>
              <el-table-column property="petDateOfBirth" label="宠物出生时间" width="120"></el-table-column>
              <el-table-column property="petCharacter" label="宠物性格"></el-table-column>
            </el-table>
          </el-dialog>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button @click="seepetMaster(scope.row)" type="text" size="small">查看</el-button> -->

          <!-- 修改宠主资料 -->
          <el-button @click="editpetMaster(scope.row)" type="text" size="small">修改宠主资料</el-button>

        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"; //命名空间的辅助函数
const { mapActions, addPetMasterAsync } = createNamespacedHelpers("petMaster"); //具体到某一个仓库

export default {
  methods: {
    ...mapActions(["addPetMasterAsync"]),

    editpetMaster(row) {
      console.log(row);
    },
    // 点击提交新增宠主信息
    addpetMaster(row) {
      //   console.log(row);
      this.addPetMasterAsync(row);
    },
    // // 头像上传相关
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // }
  },
  data() {
    return (
      {
        // 添加宠主数据
        petMaster: {
          banner: "", //头像
          phone: "18998998888", //电话
          username: "相信毛哥相信爱", //昵称
          name: "张然", //真实姓名
          city: "达州", //所在城市
          area: "大州区", //所在城市区域
          site: "成都青羊区抚琴西南路朗沃人才培训中心 ", //具体地址
          integral: "999999" //积分
        },

        // 默认值
        petMarterData: [
          {
            banner: "", //头像
            phone: "13566666666", //电话
            username: "相信毛哥", //昵称
            name: "王小虎", //真实姓名
            city: "成都", //所在城市
            area: "青羊区", //所在城市区域
            site: "成都青羊区抚琴西南路朗沃人才培训中心 ", //具体地址
            integral: "999999" //积分
          }
        ],
        dialogFormVisible: false,
        dialogTableVisible: false,
        //拥有的宠物
        owned: [
          {
            petName: "然然", //宠物名字
            petCategory: "猫", //宠物种类
            petType: "英国短尾猫", //宠物品种
            petColor: "白色", //宠物颜色
            petDateOfBirth: "2019年5月8日", //宠物出生时间
            petCharacter: "攻击性" //宠物性格
          }
        ],

      }
      
    );
  }
};
</script>
<style scoped>
.petMaster {
  width: 350px;
}
</style>