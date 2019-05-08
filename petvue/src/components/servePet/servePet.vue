<template>
  <div>
   <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <el-dialog
    title="新增"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <el-form  label-width="80px" size="mini">
  <el-form-item label="活动名称">
    <el-input ></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select  placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col >
      <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" >-</el-col>
    <el-col >
      <el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="服务类型"
      width="150">
    </el-table-column>
    <el-table-column
      prop="category"
      label="品类"
      width="120">
    </el-table-column>
    <el-table-column
      prop="schedule"
      label="排期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="specification"
      label="适用规格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="service"
      label="服务规格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="consuming"
      label="耗时"
      width="120">
    </el-table-column>
     <el-table-column
      prop="grade"
      label="服务员等级"
      width="120">
    </el-table-column>
     <el-table-column
      prop="price"
      label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: "pet",
    data(){
     return{
        dialogVisible:false,
        tableData:[]
     }
 }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.name {
  width: 200px;
}

</style>