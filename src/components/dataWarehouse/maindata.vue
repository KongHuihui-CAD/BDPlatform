<template>
    <div class="box">
        <el-row>
            <el-steps :active="active" align-center finish-status="success">
                <el-step title="数据源选择"></el-step>
                <el-step title="数据表选择"></el-step>
                <el-step title="主数据治理"></el-step>
            </el-steps>
        </el-row>
        <!-- 数据源选择 -->
        <div v-if="active =='0'" style="margin:50px;margin-top:20px;" :key="0">
            <el-row>
                <el-button type="primary" icon="el-icon-edit-outline" style="float:right;" size="medium" @click="mixkua = true;">跨库融合</el-button>
            </el-row>
            <el-table :data="tableData1.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)" style="width: 100%" class="heig" :default-sort="{prop: 'dbCreatTime', order: 'descending'}" v-loading="loading1">
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
        <div v-if="active =='1'" style="margin:50px;margin-top:20px;" :key="1">
            <el-row>
                <el-col :span="6" style="margin-top:20px;">已选数据库：{{database}}</el-col>
                <el-button type="primary" icon="el-icon-edit-outline" style="float:right;" size="medium" @click="mixduo = true;">多表融合</el-button>
            </el-row>
            <br/>
            <el-tabs type="border-card" @tab-click="chart">
                <el-tab-pane label="表格模式">
                    <el-table :data="tableData2.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%" class="heig" v-loading="loading2">
                        <el-table-column prop="tableName" label="数据表名称" align="center">
                        </el-table-column>
                        <el-table-column prop="tableDescribe" label="描述" align="center">
                        </el-table-column>
                        <el-table-column prop="rowSize" label="记录数" align="center">
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
        <!-- 主数据治理 -->
        <div v-if="active =='2'" style="margin:50px;margin-top:30px;" :key="2">
            <el-row>
                已选数据库：{{database}}，已选数据表：{{datatable}}
            </el-row>
            <br/>
            <el-tabs type="border-card" @tab-click="chart3">
                <el-tab-pane label="表格模式">
                    <el-table :data="tableData3.slice((currentPage3-1)*pagesize3,currentPage3*pagesize3)" style="width: 100%" class="heig" v-loading="loading3">
                        <el-table-column prop="colInformName" label="属性名称" align="center">
                        </el-table-column>
                        <el-table-column prop="colInformType" label="类型" align="center" :show-overflow-tooltip=true>
                        </el-table-column>
                        <el-table-column prop="deletionNum" label="缺失数" align="center">
                        </el-table-column>
                        <el-table-column prop="deletionPro" label="缺失率" align="center">
                        </el-table-column>
                        <el-table-column prop="action" label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" @click="rules(scope.row)">设置规则</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row>
                        <div class="pages">
                            <el-pagination @current-change="handleCurrentChange3" :current-page="currentPage3" :page-size="pagesize3" layout="total, prev, pager, next, jumper" :total="total3">
                            </el-pagination>
                        </div>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="柱状图模式">
                    <div id="myChart3" :style="{width: '930px', height: '400px'}"></div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 按钮组 -->
        <el-row class="botm">
            <el-button style="margin-top: 12px;" @click="last" v-if="active !='0'">上一步</el-button>
            <el-button style="margin-top: 12px;" @click="finish = true;" v-if="active =='2'">完成</el-button>
        </el-row>
        <!-- finish弹窗 -->
        <el-dialog title="主数据治理任务保存" :visible.sync="finish" width="40%" :before-close="handleClose">
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
        <!-- rules弹窗 -->
        <el-dialog title="设置填充规则" :visible.sync="rulestan" width="40%" :before-close="handleClose">
            <div style="margin-left:40px;margin-right:40px">
                <el-row>
                    当前选择列：{{checkedname}}<br/> 类型：{{checkedtype}}
                    <br/> 描述：{{checkeddes}}
                    <br/> 缺失率：{{checkedlost}}
                    <br/>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="8" style="margin-top:10px;">设置填充规则：</el-col>
                    <el-col :span="16">
                        <el-select v-model="tianempty" placeholder="请选择填充规则">
                            <el-option label="按中位数填充" value="0"></el-option>
                            <el-option label="按最小值填充" value="1"></el-option>
                            <el-option label="按最大值填充" value="2"></el-option>
                            <el-option label="按-1填充" value="-1"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rulestan = false">取消</el-button>
                <el-button type="primary" @click="yes">保存</el-button>
            </div>
        </el-dialog>
        <!-- 跨库融合弹窗 -->
        <el-dialog title="跨库融合" :visible.sync="mixkua" width="40%" :before-close="handleClose">
            <div style="margin-left:40px;margin-right:40px">
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">数据库1名称：</el-col>
                    <el-col :span="18">
                        <el-select v-model="database1" placeholder="请选择数据库" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">数据表1名称：</el-col>
                    <el-col :span="18">
                        <el-select v-model="table1" placeholder="请选择数据表" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">数据库2名称：</el-col>
                    <el-col :span="18">
                        <el-select v-model="database2" placeholder="请选择数据库" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">数据表2名称：</el-col>
                    <el-col :span="18">
                        <el-select v-model="table2" placeholder="请选择数据表" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">融合主属性：</el-col>
                    <el-col :span="8">
                        <el-select v-model="attr1" placeholder="请选择表1属性">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" style="margin-top:10px;text-align:center;">=</el-col>
                    <el-col :span="8">
                        <el-select v-model="attr2" placeholder="请选择表2属性">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">融合后新表名称：</el-col>
                    <el-col :span="18">
                        <el-input v-model="newtablename" placeholder="请输入新表名称"></el-input>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">新表存储位置：</el-col>
                    <el-col :span="18">
                        <el-select v-model="newdatabase" placeholder="请选择数据库" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="mixkua = false">取消</el-button>
                <el-button type="primary" @click="kuayes">保存</el-button>
            </div>
        </el-dialog>
        <!-- 多表融合弹窗 -->
        <el-dialog title="多表融合" :visible.sync="mixduo" width="40%" :before-close="handleClose">
            <div style="margin-left:40px;margin-right:40px">
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">数据表1名称：</el-col>
                    <el-col :span="18">
                        <el-select v-model="duotable1" placeholder="请选择数据表" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">数据表2名称：</el-col>
                    <el-col :span="18">
                        <el-select v-model="duotable2" placeholder="请选择数据表" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">融合主属性：</el-col>
                    <el-col :span="8">
                        <el-select v-model="duoattr1" placeholder="请选择表1属性">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" style="margin-top:10px;text-align:center;">=</el-col>
                    <el-col :span="8">
                        <el-select v-model="duoattr2" placeholder="请选择表2属性">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">融合后新表名称：</el-col>
                    <el-col :span="18">
                        <el-input v-model="duonewtablename" placeholder="请输入新表名称"></el-input>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">新表存储位置：</el-col>
                    <el-col :span="18">
                        <el-select v-model="duonewdatabase" placeholder="请选择数据库" style="width:100%;">
                            <el-option label="1" value="0"></el-option>
                            <el-option label="2" value="1"></el-option>
                            <el-option label="3" value="2"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="mixduo = false">取消</el-button>
                <el-button type="primary" @click="duoyes">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import qs from "qs";
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
      active: 0,
      mixkua: false,
      mixduo: false,
      finish: false,
      rulestan: false,
      checkedname: "",
      checkedtype: "",
      checkeddes: "",
      checkedid: "",
      checkedlost: "",
      tianempty: "",
      taskname: "",
      database: "",
      datatable: "",
      tableData1: [],
      tableData2: [],
      tableData3: [],
      database1: "",
      table1: "",
      database2: "",
      table2: "",
      attr1: "",
      attr2: "",
      newtablename: "",
      newdatabase: "",
      duotable1: "",
      duotable2: "",
      duoattr1: "",
      duoattr2: "",
      duonewtablename: "",
      duonewdatabase: "",
      x_data1: [],
      y_data1: [],
      x_data2: [],
      y_data2: []
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
    save() {
      //保存任务
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
    chooseku(row) {
      this.active = 1;
      console.log(row);
      this.database = row.dbName;
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
            that.x_data1 = [];
            that.y_data1 = [];
            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].rowSize == -1) {
                data.data[i].rowSize = "未同步";
              }
              that.x_data1.push(data.data[i].tableName);
              that.y_data1.push(data.data[i].rowSize);
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
            that.x_data2 = [];
            that.y_data2 = [];
            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].deletionNum == -1) {
                data.data[i].deletionNum = "未同步";
                data.data[i].deletionPro = "未同步";
              } else {
                data.data[i].deletionPro =
                  (data.data[i].deletionNum / row.rowSize * 100).toFixed(2) +
                  "%";
                data.data[i].deletionProtu = (
                  data.data[i].deletionNum /
                  row.rowSize *
                  100
                ).toFixed(2);
                that.x_data2.push(data.data[i].colInformName);
                that.y_data2.push(data.data[i].deletionProtu);
              }
            }
            console.log(that.x_data2);
            console.log(that.y_data2);
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
    rules(row) {
      console.log(row);
      this.rulestan = true;
      this.checkedname = row.colInformName;
      this.checkedlost = row.deletionPro;
      this.checkeddes = row.colInformDescribe;
      this.checkedtype = row.colInformType;
      this.checkedid = row.colInformId;
    },
    yes() {
      //保存规则
      var that = this;
      axios
        .post(
          "Lake/masterDataGovernanceController/doDataFillTask",
          qs.stringify({
            fillType: this.tianempty,
            colId: this.checkedid
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$notify({
              title: "填充任务创建成功",
              message: "列填充开始，可在生命周期管理中查看进度！",
              type: "success"
            });
            that.rulestan = false;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    kuayes() {
      //跨库融合保存
      this.mixkua = false;
      this.$router.push({ name: "lifeCycle" });
    },
    duoyes() {
      //多表融合保存
      this.mixduo = false;
      this.$router.push({ name: "lifeCycle" });
    },
    chart() {
      this.drawLine();
    },
    chart3() {
      this.drawLine3();
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
          data: this.x_data1,
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
            data: this.y_data1,
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
    },
    drawLine3() {
      // 基于准备好的dom，初始化echarts实例
      var aa = document.getElementById("myChart3");
      let myChart3 = echarts.init(aa, "macarons");
      // 绘制图表
      myChart3.setOption({
        title: { text: "" },
        tooltip: {},
        xAxis: {
          name: "属性名称",
          data: this.x_data2,
          nameLocation: "end", //坐标轴名称显示位置。
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45"
          }
        },
        yAxis: {
          name: "缺失率（%）"
        },
        series: [
          {
            name: "缺失率",
            type: "bar",
            data: this.y_data2,
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
.pages {
  float: right;
  margin: 15px;
}
.heig .el-table__body td {
  padding: 0px;
}
</style>
