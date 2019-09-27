<template>
  <div class="box">
    <el-row>
      <el-col :span="14">
        <el-input placeholder="请输入数据源名称" prefix-icon="el-icon-search" v-model="name" style="width:20%" size="mini">
        </el-input>
        <el-select v-model="source" placeholder="请选择数据来源" size="mini">
          <el-option v-for="item in sources" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="target" placeholder="请选择数据库类型" size="mini">
          <el-option v-for="item in targets" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" circle plain size="mini" @click="search"></el-button>
      </el-col>
      <el-col :span="10" id="container">
        <div id="myChart" style="height:50px;">

        </div>
      </el-col>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" class="hei1" border :default-sort="{prop: 'dbUpdateTime', order: 'descending'}" v-loading="loading_tableData">
      <el-table-column prop="dbName" label="数据源名称" align="center">
      </el-table-column>
      <el-table-column prop="dbDescribe" label="描述" align="center">
      </el-table-column>
      <el-table-column prop="dbSource" label="数据来源" align="center">
      </el-table-column>
      <el-table-column prop="dbType" label="数据库类型" align="center">
      </el-table-column>
      <el-table-column prop="dbCapacity" label="容量大小(B)" align="center">
      </el-table-column>
      <el-table-column prop="dbTablesNum" label="表数量" align="center">
      </el-table-column>
      <el-table-column prop="dbOwner" label="拥有者" align="center">
      </el-table-column>
      <el-table-column prop="dbUpdateTime" label="最近修改时间" align="center" width="190" sortable>
      </el-table-column>
      <el-table-column prop="dbCreatTime" label="建库时间" align="center" width="190" sortable>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import "../../../static/js/macarons.js";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      loading_tableData: true,
      currentPage: 1, //当前页
      pagesize: 12, //每页条数
      total: 0, //总条数
      tableData: [],
      name: "",
      source: "",
      target: "",
      sources: [],
      targets: [
        {
          value: "druid",
          label: "Druid"
        },
        {
          value: "mysql",
          label: "Mysql"
        },
        {
          value: "hive",
          label: "Hive"
        }
      ],
      shapetotal: 0,
      series: [],
      normal: {
        show: true,
        position: "inside",
        distance: 1
      }
    };
  },
  mounted() {
    var that = this;
    axios
      .post("Lake/dataLake/dataLake", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          that.tableData = data.data.dbInformList;
          that.total = data.data.dbInformList.length;
          that.loading_tableData = false;

          var s = data.data.selectInform.dbSourceList;
          that.sources = [{ label: "", value: "" }];
          for (var i = 0; i < s.length; i++) {
            var obj = {};
            obj.value = s[i];
            obj.label = s[i];
            that.sources.push(obj);
          }
          console.log(that.sources);

          var t = data.data.selectInform.dbTypeCapacity;
          that.targets = [{ label: "", value: "" }];
          that.series = [];
          for (var i in t) {
            console.log(i, ":", t[i]);
            var obj = {};
            obj.value = i;
            obj.label = i;
            that.targets.push(obj);
            that.shapetotal += parseInt(t[i]);
          }
          console.log(that.targets);
          console.log(that.shapetotal);

          for (var i in t) {
            var n = {};
            n.normal = that.normal;
            var oobj = {};
            var arr = [];
            arr.push((parseInt(t[i]) / that.shapetotal * 100).toFixed(3));
            oobj.name = i;
            oobj.type = "bar";
            oobj.stack = "总量";
            oobj.barWidth = 30;
            oobj.barMinHeight = 40;
            oobj.label = n;
            oobj.data = arr;
            that.series.push(oobj);
          }
          console.log(that.series);
          that.drawLine();
        } else {
          that.$message.error(data.msg);
        }
      })
      .catch(function(error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
  },
  methods: {
    handleCurrentChange(val) {
      //切换页面时触发
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    drawLine() {
      var that = this;
      var option = {
        tooltip: {
          trigger: "item",
          position: "top",
          formatter: function(params, ticket, callback) {
            if (params.value == undefined || params.value !== params.value) {
              params.value = 0;
            }
            return (
              params.seriesName + // 数据名，类目名
              ":" +
              " <br />" +
              params.value +
              "%"
            );
          }
        },
        grid: {
          left: "10%",
          right: "10%",
          bottom: "0%",
          top: "0%",
          width: "300",
          containLabel: true
        },
        xAxis: {
          type: "value",
          show: false,
          max: 100
        },
        yAxis: {
          type: "category",
          show: false
        },
        series: this.series
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("myChart"),
        "macarons"
      );
      // 绘制图表
      myChart.setOption(option);
    },
    search() {
      var that = this;
      axios
        .post(
          "Lake/dataLake/dataLake",
          qs.stringify({
            dbName: this.name,
            dbType: this.target,
            dbSource: this.source
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.tableData = data.data.dbInformList;
            that.total = data.data.dbInformList.length;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    }
  }
};
</script>

<style>
.box {
  margin: 20px;
  margin-top: 60px;
}
.hei1 .el-table__body td {
  padding: 0px;
}
.pages {
  float: right;
  margin: 15px;
}
/* canvas{
  width: 433px !important;
} */
</style>