<template>
  <div class="box">
    <el-row>
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="数据源选择"></el-step>
        <el-step title="数据表选择"></el-step>
        <el-step title="元数据治理"></el-step>
      </el-steps>
    </el-row>
    <!-- 数据源选择 -->
    <div v-if="active =='0'" style="margin:50px;margin-top:30px;" :key="0">
      <el-table :data="tableData1.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)" style="width: 100%" class="heig" :default-sort="{prop: 'date', order: 'descending'}" v-loading="loading1">
        <el-table-column prop="dbName" label="数据源名称" align="center">
        </el-table-column>
        <el-table-column prop="dbType" label="数据源类型" align="center">
        </el-table-column>
        <el-table-column prop="dbDescribe" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="dbOwner" label="拥有者" align="center">
        </el-table-column>
        <el-table-column prop="dbCreatTime" label="建库时间" align="center" width="200" sortable>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" @click="chooseku(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="pages">
          <el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size="pagesize1" layout="total, prev, pager, next, jumper" :total="total1">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 数据表选择 -->
    <div v-if="active =='1'" style="margin:50px;margin-top:30px;" :key="1">
      <el-row>
        已选数据库：{{database}}
        <el-button type="primary" icon="el-icon-refresh" style="float:right;" size="medium" @click="biaotongbu" :disabled="biaotongbustyle">元数据表同步</el-button>
      </el-row>
      <br/>
      <el-tabs type="border-card" @tab-click="chart">
        <el-tab-pane label="表格模式">
          <el-table :data="tableData2.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%" class="heig" :default-sort="{prop: 'num', order: 'descending'}" v-loading="loading2">
            <el-table-column prop="tableName" label="数据表名称" align="center">
            </el-table-column>
            <el-table-column prop="tableDescribe" label="描述" align="center">
            </el-table-column>
            <el-table-column prop="rowSize" label="记录数" align="center" sortable>
            </el-table-column>
            <el-table-column prop="action" label="操作" align="center">
              <template scope="scope">
                <el-button type="text" @click="choosebiao(scope.row)">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <div class="pages">
              <el-pagination @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pagesize2" layout="total, prev, pager, next, jumper" :total="total2">
              </el-pagination>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="柱状图模式">
          <div id="myChart" :style="{width: '930px', height: '400px'}"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 元数据治理 -->
    <div v-if="active =='2'" style="margin:50px;margin-top:30px;" :key="2">
      <el-row>
        已选数据库：{{database}}，已选数据表：{{datatable}}
        <el-button type="primary" icon="el-icon-refresh" style="float:right;" size="medium" @click="lietongbu" :disabled="lietongbustyle">元数据列同步</el-button>
      </el-row>
      <br/>
      <el-table :data="tableData3.slice((currentPage3-1)*pagesize3,currentPage3*pagesize3)" style="width: 100%" class="heig" v-loading="loading3">
        <el-table-column prop="colInformName" label="列名" align="center">
        </el-table-column>
        <el-table-column prop="colInformType" label="SQL数据类型" align="center" :show-overflow-tooltip=true>
        </el-table-column>
        <el-table-column prop="deletionNum" label="缺失值" align="center">
        </el-table-column>
        <el-table-column prop="dis" label="列描述" align="center" width="250">
          <template scope="scope">
            <el-input placeholder="" v-model="tableData3[scope.$index].colInformDescribe" :disabled="tableData3[scope.$index].abled">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" @click="mod(scope.row)">{{tableData3[scope.$index].bottom}}</el-button>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="pages">
          <el-pagination @current-change="handleCurrentChange3" :current-page="currentPage3" :page-size="pagesize3" layout="total, prev, pager, next, jumper" :total="total3">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 按钮组 -->
    <el-row class="botm">
      <el-button style="margin-top: 12px;" @click="last" v-if="active !='0'">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="finish = true;" v-if="active =='2'">完成</el-button>
    </el-row>
    <!-- finish弹窗 -->
    <el-dialog title="元数据治理任务保存" :visible.sync="finish" width="40%" :before-close="handleClose">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="8" style="margin-top:10px;">任务名称：</el-col>
          <el-col :span="16">
            <el-input v-model="taskname" placeholder="请输入任务名称"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="finish = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import echarts from "echarts";
import "../../../static/js/macarons.js";
export default {
  data() {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      currentPage1: 1, //当前页
      pagesize1: 10, //每页条数
      total1: 0, //总条数
      currentPage2: 1, //当前页
      pagesize2: 10, //每页条数
      total2: 0, //总条数
      currentPage3: 1, //当前页
      pagesize3: 10, //每页条数
      total3: 0, //总条数
      taskname: "",
      finish: false,
      active: 0,
      tableData1: [],
      tableData2: [],
      x_data: [],
      y_data: [],
      tableData3: [],
      database: "",
      dbid: "",
      datatable: "",
      tableid: "",
      biaotongbustyle: false,
      lietongbustyle: false
    };
  },
  mounted() {
    var that = this;
    axios
      .post("Lake/dataLake/getDbInformList", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          that.tableData1 = data.data;
          that.total1 = data.data.length;
          that.loading1 = false;
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
    handleCurrentChange1(val) {
      //切换页面时触发
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange2(val) {
      //切换页面时触发
      this.currentPage2 = val;
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange3(val) {
      //切换页面时触发
      this.currentPage3 = val;
      console.log(`当前页: ${val}`);
    },
    last() {
      if (this.active > 0) {
        this.active--;
      } else {
        this.active = 0;
      }
    },
    chooseku(row) {
      this.active = 1;
      console.log(row);
      this.database = row.dbName;
      this.dbid = row.dbId;
      var that = this;
      axios
        .post(
          "Lake/metadataGovernance/getTableInformList",
          qs.stringify({
            dbId: row.dbId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.x_data = [];
            that.y_data = [];
            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].rowSize == -1) {
                data.data[i].rowSize = "未同步";
              }
              that.x_data.push(data.data[i].tableName);
              that.y_data.push(data.data[i].rowSize);
            }
            that.tableData2 = data.data;
            that.total2 = data.data.length;
            that.loading2 = false;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    choosebiao(row) {
      this.active = 2;
      console.log(row);
      this.datatable = row.tableName;
      this.tableid = row.tableId;
      var that = this;
      axios
        .post(
          "Lake/metadataGovernance/getColInformList",
          qs.stringify({
            dbId: row.dbId,
            tableId: row.tableId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            for (var i = 0; i < data.data.length; i++) {
              data.data[i].abled = true;
              data.data[i].bottom = "修改";
              if (data.data[i].deletionNum == -1) {
                data.data[i].deletionNum = "未同步";
              }
            }
            that.tableData3 = data.data;
            that.total3 = data.data.length;
            that.loading3 = false;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    mod(row) {
      console.log(row);
      if (row.abled == true) {
        //点修改
        row.abled = false;
        row.bottom = "保存";
      } else {
        //点保存
        var that = this;
        axios
          .post(
            "Lake/metadataGovernance/updateColDescribe",
            qs.stringify({
              colInformId: row.colInformId,
              colInformDescribe: row.colInformDescribe
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.$message({
                message: "修改成功！",
                type: "success"
              });
              row.abled = true;
              row.bottom = "修改";
            } else {
              that.$message.error(data.msg);
              return false;
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
    },
    del(row) {
      console.log(row);
    },
    save() {
      this.finish = false;
      this.$router.push({ name: "lifeCycle" });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    biaotongbu() {
      var that = this;
      axios
        .post(
          "Lake/metadataGovernance/tableMetadataSynchronization",
          qs.stringify({
            dbId: this.dbid
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$notify({
              title: "同步任务创建成功",
              message: "表同步开始，可在生命周期管理中查看进度！",
              type: "success"
            });
            // that.biaotongbustyle = true;
            // that.repeatbiao();
          } else {
            that.$message.error(data.msg);
            return false;
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    repeatbiao() {
      this.timerHostLog = setInterval(() => {
        var that = this;
        axios
          .post(
            "Lake/metadataGovernance/gettableMetadataSynchronization",
            qs.stringify({})
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              if (data.data.synchronizationRun == false) {
                that.biaotongbustyle = false;
                clearInterval(that.timerHostLog);
                axios
                  .post(
                    "Lake/metadataGovernance/getTableInformList",
                    qs.stringify({
                      dbId: that.dbid
                    })
                  )
                  .then(function(response) {
                    console.log(response);
                    var data = response.data;
                    if (data.code == 200) {
                      console.log(data.data);
                      that.x_data = [];
                      that.y_data = [];
                      for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].rowSize == -1) {
                          data.data[i].rowSize = "未同步";
                        }
                        that.x_data.push(data.data[i].tableName);
                        that.y_data.push(data.data[i].rowSize);
                      }
                      that.tableData2 = data.data;
                      that.total2 = data.data.length;
                      that.loading2 = false;
                      that.openbiaotongbu();
                    } else {
                      that.$message.error(data.msg);
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                    that.$message.error("出错啦～");
                  });
              }
            } else {
              that.$message.error(data.msg);
              return false;
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }, 3000);
    },
    openbiaotongbu() {
      this.$notify({
        title: "同步成功",
        message: "元数据表同步已完成！",
        type: "success"
      });
    },
    lietongbu() {
      var that = this;
      axios
        .post(
          "Lake/metadataGovernance/colMetadataSynchronization",
          qs.stringify({
            dbId: this.dbid,
            tableId: this.tableid
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$notify({
              title: "同步任务创建成功",
              message: "列同步开始，可在生命周期管理中查看进度！",
              type: "success"
            });
            // that.lietongbustyle = true;
            // that.repeatlie();
          } else {
            that.$message.error(data.msg);
            return false;
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    repeatlie() {
      this.timerHostLog1 = setInterval(() => {
        var that = this;
        axios
          .post(
            "Lake/metadataGovernance/getcolMetadataSynchronization",
            qs.stringify({})
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              if (data.data.synchronizationRun == false) {
                that.lietongbustyle = false;
                clearInterval(that.timerHostLog1);
                axios
                  .post(
                    "Lake/metadataGovernance/getColInformList",
                    qs.stringify({
                      dbId: that.dbid,
                      tableId: that.tableid
                    })
                  )
                  .then(function(response) {
                    console.log(response);
                    var data = response.data;
                    if (data.code == 200) {
                      console.log(data.data);
                      for (var i = 0; i < data.data.length; i++) {
                        data.data[i].abled = true;
                        data.data[i].bottom = "修改";
                        if (data.data[i].deletionNum == -1) {
                          data.data[i].deletionNum = "未同步";
                        }
                      }
                      that.tableData3 = data.data;
                      that.total3 = data.data.length;
                      that.loading3 = false;
                      that.openlietongbu();
                    } else {
                      that.$message.error(data.msg);
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                    that.$message.error("出错啦～");
                  });
              }
            } else {
              that.$message.error(data.msg);
              return false;
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }, 5000);
    },
    openlietongbu() {
      this.$notify({
        title: "同步成功",
        message: "元数据列同步已完成！",
        type: "success"
      });
    },
    chart() {
      this.drawLine();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var aa = document.getElementById("myChart");
      let myChart = echarts.init(aa, "macarons");
      // 绘制图表
      myChart.setOption({
        title: { text: "" },
        tooltip: {},
        xAxis: {
          data: this.x_data,
          name: "数据表名称",
          nameLocation: "end", //坐标轴名称显示位置。
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45"
          }
        },
        yAxis: {
          name: "记录数"
        },
        series: [
          {
            name: "记录数",
            type: "bar",
            data: this.y_data,
            barMinHeight: 5
          }
        ],
        grid: {
          bottom: "20%"
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            start: 94,
            end: 100,
            handleSize: 8
          },
          {
            type: "inside",
            start: 94,
            end: 100
          },
          {
            type: "slider",
            show: true,
            yAxisIndex: 0,
            filterMode: "empty",
            width: 12,
            height: "70%",
            handleSize: 8,
            showDataShadow: false,
            left: "93%"
          }
        ]
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
.botm {
  text-align: right;
  margin-top: 50px;
  margin-right: 100px;
}
.heig .el-table__body td {
  padding: 0px;
}
.el-input.is-disabled .el-input__inner {
  color: #303133;
}
.pages {
  float: right;
  margin: 15px;
}
</style>
