<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <!-- suffix-icon="el-icon-location" -->
        <template slot="title">
          <i class="el-icon-s-shop"></i>门店管理
        </template>
        <el-menu-item index="/userStore/storefront">门店列表</el-menu-item>
        <el-menu-item index="/userStore/addStorefront">申请门店</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-goods"></i>商品管理
        </template>
        <el-menu-item index="/userStore/commodity">新增商品</el-menu-item>
        <el-menu-item index="/userStore/commodityTab">商品列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/userStore/pet">
        <i class="el-icon-paperclip"></i>宠物管理
      </el-menu-item>
      <el-menu-item index="/userStore/servePet">
        <i class="el-icon-chicken"></i>服务管理
      </el-menu-item>
      <el-menu-item index="/userStore/orders">
        <i class="el-icon-shopping-cart-2"></i>订单管理
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-sort"></i>退出系统
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
    <div ref="main" :style="{width: '500px', height: '500px'}"></div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");

export default {
  name: "userStore",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    drawLine() {
      let myChart = echarts.init(this.$refs.main);
      // 绘制图表
      // myChart.setOption({
      //   title: { text: "ECharts 入门示例" },
      //   tooltip: {},
      //   xAxis: {
      //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //   },
      //   yAxis: {},
      //   series: [
      //     {
      //       name: "销量",
      //       type: "bar",
      //       data: [5, 20, 36, 10, 10, 20]
      //     }
      //   ]
      // });
      // var myChart = echarts.init(dom);
      var app = {};
      let option = null;

      var hours = [
        "12a",
        "1a",
        "2a",
        "3a",
        "4a",
        "5a",
        "6a",
        "7a",
        "8a",
        "9a",
        "10a",
        "11a",
        "12p",
        "1p",
        "2p",
        "3p",
        "4p",
        "5p",
        "6p",
        "7p",
        "8p",
        "9p",
        "10p",
        "11p"
      ];
      var days = [
        "Saturday",
        "Friday",
        "Thursday",
        "Wednesday",
        "Tuesday",
        "Monday",
        "Sunday"
      ];

      var data = [
        [0, 0, 5],
        [0, 1, 1],
        [0, 2, 0],
        [0, 3, 0],
        [0, 4, 0],
        [0, 5, 0],
        [0, 6, 0],
        [0, 7, 0],
        [0, 8, 0],
        [0, 9, 0],
        [0, 10, 0],
        [0, 11, 2],
        [0, 12, 4],
        [0, 13, 1],
        [0, 14, 1],
        [0, 15, 3],
        [0, 16, 4],
        [0, 17, 6],
        [0, 18, 4],
        [0, 19, 4],
        [0, 20, 3],
        [0, 21, 3],
        [0, 22, 2],
        [0, 23, 5],
        [1, 0, 7],
        [1, 1, 0],
        [1, 2, 0],
        [1, 3, 0],
        [1, 4, 0],
        [1, 5, 0],
        [1, 6, 0],
        [1, 7, 0],
        [1, 8, 0],
        [1, 9, 0],
        [1, 10, 5],
        [1, 11, 2],
        [1, 12, 2],
        [1, 13, 6],
        [1, 14, 9],
        [1, 15, 11],
        [1, 16, 6],
        [1, 17, 7],
        [1, 18, 8],
        [1, 19, 12],
        [1, 20, 5],
        [1, 21, 5],
        [1, 22, 7],
        [1, 23, 2],
        [2, 0, 1],
        [2, 1, 1],
        [2, 2, 0],
        [2, 3, 0],
        [2, 4, 0],
        [2, 5, 0],
        [2, 6, 0],
        [2, 7, 0],
        [2, 8, 0],
        [2, 9, 0],
        [2, 10, 3],
        [2, 11, 2],
        [2, 12, 1],
        [2, 13, 9],
        [2, 14, 8],
        [2, 15, 10],
        [2, 16, 6],
        [2, 17, 5],
        [2, 18, 5],
        [2, 19, 5],
        [2, 20, 7],
        [2, 21, 4],
        [2, 22, 2],
        [2, 23, 4],
        [3, 0, 7],
        [3, 1, 3],
        [3, 2, 0],
        [3, 3, 0],
        [3, 4, 0],
        [3, 5, 0],
        [3, 6, 0],
        [3, 7, 0],
        [3, 8, 1],
        [3, 9, 0],
        [3, 10, 5],
        [3, 11, 4],
        [3, 12, 7],
        [3, 13, 14],
        [3, 14, 13],
        [3, 15, 12],
        [3, 16, 9],
        [3, 17, 5],
        [3, 18, 5],
        [3, 19, 10],
        [3, 20, 6],
        [3, 21, 4],
        [3, 22, 4],
        [3, 23, 1],
        [4, 0, 1],
        [4, 1, 3],
        [4, 2, 0],
        [4, 3, 0],
        [4, 4, 0],
        [4, 5, 1],
        [4, 6, 0],
        [4, 7, 0],
        [4, 8, 0],
        [4, 9, 2],
        [4, 10, 4],
        [4, 11, 4],
        [4, 12, 2],
        [4, 13, 4],
        [4, 14, 4],
        [4, 15, 14],
        [4, 16, 12],
        [4, 17, 1],
        [4, 18, 8],
        [4, 19, 5],
        [4, 20, 3],
        [4, 21, 7],
        [4, 22, 3],
        [4, 23, 0],
        [5, 0, 2],
        [5, 1, 1],
        [5, 2, 0],
        [5, 3, 3],
        [5, 4, 0],
        [5, 5, 0],
        [5, 6, 0],
        [5, 7, 0],
        [5, 8, 2],
        [5, 9, 0],
        [5, 10, 4],
        [5, 11, 1],
        [5, 12, 5],
        [5, 13, 10],
        [5, 14, 5],
        [5, 15, 7],
        [5, 16, 11],
        [5, 17, 6],
        [5, 18, 0],
        [5, 19, 5],
        [5, 20, 3],
        [5, 21, 4],
        [5, 22, 2],
        [5, 23, 0],
        [6, 0, 1],
        [6, 1, 0],
        [6, 2, 0],
        [6, 3, 0],
        [6, 4, 0],
        [6, 5, 0],
        [6, 6, 0],
        [6, 7, 0],
        [6, 8, 0],
        [6, 9, 0],
        [6, 10, 1],
        [6, 11, 0],
        [6, 12, 2],
        [6, 13, 1],
        [6, 14, 3],
        [6, 15, 4],
        [6, 16, 0],
        [6, 17, 0],
        [6, 18, 0],
        [6, 19, 0],
        [6, 20, 1],
        [6, 21, 2],
        [6, 22, 2],
        [6, 23, 6]
      ];

      option = {
        title: {
          // text: "Punch Card of Github",
        },
        legend: {
          data: ["Punch Card"],
          left: "right"
        },
        polar: {},
        tooltip: {
          formatter: function(params) {
            return (
              params.value[2] +
              " commits in " +
              hours[params.value[1]] +
              " of " +
              days[params.value[0]]
            );
          }
        },
        angleAxis: {
          type: "category",
          data: hours,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: "#999",
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        radiusAxis: {
          type: "category",
          data: days,
          axisLine: {
            show: false
          },
          axisLabel: {
            rotate: 45
          }
        },
        series: [
          {
            name: "Punch Card",
            type: "scatter",
            coordinateSystem: "polar",
            symbolSize: function(val) {
              return val[2] * 2;
            },
            data: data,
            animationDelay: function(idx) {
              return idx * 5;
            }
          }
        ]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    }
  },
  mounted() {
    const data = document.cookie.match(
      new RegExp("(^| )" + "id" + "=([^;]*)(;|$)")
    )[2];
    this.drawLine();
    // console.log(this.$refs.main);

    // var myChart = echarts.init(this.$refs.main);
    // // 绘制图表
    // myChart.setOption({
    //   title: {
    //     text: "ECharts 入门示例"
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // });
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>