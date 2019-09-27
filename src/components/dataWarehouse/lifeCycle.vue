<template>
  <div class="box">
    <el-row>
      <el-input placeholder="请输入任务名称" prefix-icon="el-icon-search" v-model="sname" style="width:15%" size="medium">
      </el-input>
      <el-select v-model="stype" placeholder="请选择任务类型" size="medium" style="width:15%">
        <el-option label="数据融合" value="1"></el-option>
        <el-option label="数据同步" value="0"></el-option>
        <el-option label="数据填充" value="2"></el-option>
      </el-select>
      <el-select v-model="sstatus" placeholder="请选择任务状态" size="medium" style="width:15%">
        <el-option label="已完成" value="100"></el-option>
        <el-option label="进行中" value="0"></el-option>
        <el-option label="失败" value="-1"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" circle plain @click="search"></el-button>
      <el-button type="primary" icon="el-icon-plus" style="float:right;" @click="addyuan" size="medium">新建元数据治理任务</el-button>
      <el-button type="primary" icon="el-icon-plus" style="float:right;" @click="addzhu" size="medium">新建主数据治理任务</el-button>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" class="heig" v-loading="loading" :default-sort="{prop: 'taskDate', order: 'descending'}">
      <el-table-column prop="taskType" label="任务类型" align="center">
      </el-table-column>
      <el-table-column prop="taskName" label="任务名称" align="center">
      </el-table-column>
      <el-table-column prop="taskDescribe" label="任务描述" align="center" :show-overflow-tooltip=true>
      </el-table-column>
      <el-table-column prop="taskDate" label="创建日期" align="center" sortable>
      </el-table-column>
      <el-table-column prop="taskState" label="状态" align="center">
        <template scope="scope">
          <el-progress :percentage="test(scope.$index,scope.row)" :status="test1(scope.$index,scope.row)"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="detailtask(scope.row)">详情</el-button>
          <el-button type="text" @click="deletetask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
    <!-- 融合详情弹窗 -->
    <el-dialog title="数据融合任务详情" :visible.sync="finish" width="40%">
      <div style="margin-left:40px;margin-right:40px;height:450px;overflow: scroll;">
        <el-row>
          任务名称：{{detail.taskName}}
        </el-row>
        <el-row>
          任务描述：{{detail.taskDescribe}}
        </el-row>
        <el-row>
          任务创建时间：{{detail.taskDate}}
        </el-row>
        <hr/>
        <br/>
        <el-row>
          数据库类型：{{detail.dbType}}
        </el-row>
        <br/>
        <el-row>
          事实表数据库名称：{{detail.factDbName}}
        </el-row>
        <el-row>
          事实表表名：{{detail.factTableName}}
        </el-row>
        <el-row>
          <el-col :span="4">选择属性：</el-col>
          <el-col :span="12">{{factattr[0]}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="4" v-for="item in factattr1">
            {{item}}
          </el-col>
        </el-row>
        <br/>
        <div v-for="(item,index) in fusionConnectionList" :key="index">
          <el-row>
            维度表数据库名称：{{item.latitudeDbName}}
          </el-row>
          <el-row>
            维度表表名：{{item.latitudeTableName}}
          </el-row>
          <el-row>
            <el-col :span="4">选择属性：</el-col>
            <el-col :span="12">{{fusionAttrList[index][0]}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12" :offset="4" v-for="it in fusionAttrList[index].slice(1)">
              {{it}}
            </el-col>
          </el-row>
          <el-row>
            连接属性：{{detail.factTableName}}.{{item.factTableColName}}={{item.latitudeTableName}}.{{item.latitudeTableColName}}
          </el-row>
          <br/>
        </div>
        <hr/>
        <br/>
        <el-row>
          融合后表名：{{detail.fusionTableName}}
        </el-row>
        <el-row>
          融合后表所在数据库：{{detail.storageDbName}}
        </el-row>
        <el-row>
          <el-col :span="6">融合后表格属性：</el-col>
          <el-col :span="12">{{attr[0]}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6" v-for="item in attr.slice(1)">
            {{item}}
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="finish = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 填充详情弹窗 -->
    <el-dialog title="数据填充任务详情" :visible.sync="tianchong" width="40%">
      <div style="margin-left:40px;margin-right:40px;">
        <el-row>
          任务名称：{{tian.taskName}}
        </el-row>
        <el-row>
          任务描述：{{tian.taskDescribe}}
        </el-row>
        <el-row>
          任务创建时间：{{tian.taskDate}}
        </el-row>
        <hr/>
        <br/>
        <el-row>
          数据库类型：{{tian.dbType}}
        </el-row>
        <br/>
        <el-row>
          填充数据库名称：{{tianchai.dbname}}
        </el-row>
        <el-row>
          填充数据表名称：{{tianchai.tablename}}
        </el-row>
        <el-row>
          填充数据列：{{tianchai.columnname}}
        </el-row>
        <el-row>
          填充值：{{tian.fillingContent}}
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tianchong = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 同步详情弹窗 -->
    <el-dialog title="数据同步任务详情" :visible.sync="tongbu" width="40%">
      <div style="margin-left:40px;margin-right:40px;">
        <el-row>
          任务名称：{{tong.taskName}}
        </el-row>
        <el-row>
          任务描述：{{tong.taskDescribe}}
        </el-row>
        <el-row>
          任务创建时间：{{tong.taskDate}}
        </el-row>
        <hr/>
        <br/>
        <el-row>
          数据库类型：{{tong.dbType}}
        </el-row>
        <br/>
        <el-row>
          同步数据库名称：{{tong.dbname}}
        </el-row>
        <el-row v-if="tong.taskName=='列同步'">
          同步数据表名称：{{tong.tablename}}
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tongbu = false">取消</el-button>
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
      finish: false,
      tianchong: false,
      tongbu: false,
      loading: true,
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 0, //总条数
      tableData: [],
      dataFusionTasks: [],
      dataGovernanceTasks: [],
      dataSynchroTasks: [],
      sname: "",
      stype: "",
      sstatus: "",
      detail: {},
      fusionConnectionList: [],
      fusionAttrList: [],
      factattr: [],
      factattr1: [],
      attr: [],
      tian: {},
      tianchai: {},
      tong: {}
    };
  },
  mounted() {
    var that = this;
    axios
      .post(
        "Lake/taskManage/selectTaskList",
        qs.stringify({
          taskName: "",
          taskType: "",
          taskState: ""
        })
      )
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          that.load(data.data);
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
    addyuan() {
      this.$router.push({ name: "metadata" });
    },
    addzhu() {
      this.$router.push({ name: "maindata" });
    },
    load(data) {
      console.log(data);
      this.dataFusionTasks = data.dataFusionTasks;
      this.dataGovernanceTasks = data.dataGovernanceTasks;
      this.dataSynchroTasks = data.dataSynchroTasks;
      if (this.dataFusionTasks) {
        for (var i = 0; i < this.dataFusionTasks.length; i++) {
          this.dataFusionTasks[i].taskType = "数据融合";
          var type1 = 1;
          if (this.dataFusionTasks[i].taskState == 100) {
            this.dataFusionTasks[i].processStatus = "success";
          } else if (this.dataFusionTasks[i].taskState == -1) {
            // this.dataFusionTasks[i].taskState = 100;
            this.dataFusionTasks[i].processStatus = "exception";
          } else {
            if (this.dataFusionTasks[i].taskState == null) {
              this.dataFusionTasks[i].taskState = 0;
            }
            this.repeat(this.dataFusionTasks[i].taskId, type1);
          }
          this.tableData.push(this.dataFusionTasks[i]);
        }
        this.total += this.dataFusionTasks.length;
      }
      if (this.dataGovernanceTasks) {
        for (var i = 0; i < this.dataGovernanceTasks.length; i++) {
          this.dataGovernanceTasks[i].taskType = "数据填充";
          var type2 = 2;
          if (this.dataGovernanceTasks[i].taskState == 100) {
            this.dataGovernanceTasks[i].processStatus = "success";
          } else if (this.dataGovernanceTasks[i].taskState == -1) {
            this.dataGovernanceTasks[i].processStatus = "exception";
          } else {
            if (this.dataGovernanceTasks[i].taskState == null) {
              this.dataGovernanceTasks[i].taskState = 0;
            }
            this.repeat(this.dataGovernanceTasks[i].taskId, type2);
          }
          this.tableData.push(this.dataGovernanceTasks[i]);
        }
        this.total += this.dataGovernanceTasks.length;
      }
      if (this.dataSynchroTasks) {
        for (var i = 0; i < this.dataSynchroTasks.length; i++) {
          this.dataSynchroTasks[i].taskType = "数据同步";
          var type3 = 0;
          if (this.dataSynchroTasks[i].taskState == 100) {
            this.dataSynchroTasks[i].processStatus = "success";
          } else if (this.dataSynchroTasks[i].taskState == -1) {
            this.dataSynchroTasks[i].processStatus = "exception";
          } else {
            if (this.dataSynchroTasks[i].taskState == null) {
              this.dataSynchroTasks[i].taskState = 0;
            }
            this.repeat(this.dataSynchroTasks[i].taskId, type3);
          }
          this.tableData.push(this.dataSynchroTasks[i]);
        }
        this.total += this.dataSynchroTasks.length;
      }
      this.loading = false;
    },
    search() {
      var that = this;
      this.tableData = [];
      this.total = 0;
      axios
        .post(
          "Lake/taskManage/selectTaskList",
          qs.stringify({
            taskName: this.sname,
            taskType: this.stype,
            taskState: this.sstatus
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            that.load(data.data);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    repeat(id, type) {
      this.timerHostLog = setInterval(() => {
        var that = this;
        axios
          .post(
            "Lake/taskManage/selectTaskProcess",
            qs.stringify({
              taskId: id,
              taskType: type
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              for (var i = 0; i < that.tableData.length; i++) {
                if (that.tableData[i].taskId == id) {
                  that.tableData[i].taskState = data.data.taskState;
                }
              }
              if (data.data.taskState == 100) {
                for (var i = 0; i < that.tableData.length; i++) {
                  if (that.tableData[i].taskId == id) {
                    that.tableData[i].processStatus = "success";
                    clearInterval(that.timerHostLog);
                  }
                }
              }
              if (data.data.taskState == null) {
                for (var i = 0; i < that.tableData.length; i++) {
                  if (that.tableData[i].taskId == id) {
                    that.tableData[i].taskState = 0;
                  }
                }
              }
              if (data.data.taskState == -1) {
                for (var i = 0; i < that.tableData.length; i++) {
                  if (that.tableData[i].taskId == id) {
                    that.tableData[i].processStatus = "exception";
                    clearInterval(that.timerHostLog);
                  }
                }
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
      }, 1000);
    },
    test(index, row) {
      console.log(row);
      if (row.taskState == -1) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].taskId == row.taskId) {
            this.tableData[i].taskState = 100;
          }
        }
      }
      if (row.taskState == null) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].taskId == row.taskId) {
            this.tableData[i].taskState = 0;
          }
        }
      }
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].taskId == row.taskId) {
          return Number(this.tableData[i].taskState.toFixed(1));
        }
      }
    },
    test1(index, row) {
      if (row.taskState == -1) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].taskId == row.taskId) {
            this.tableData[i].processStatus = "exception";
            return "exception";
          }
        }
      }
      if (row.taskState == 100) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].taskId == row.taskId) {
            this.tableData[i].processStatus = "success";
            return "success";
          }
        }
      }
    },
    deletetask(row) {
      if (row.taskType == "数据填充") {
        var type = 2;
      }
      if (row.taskType == "数据融合") {
        var type = 1;
      }
      if (row.taskType == "数据同步") {
        var type = 0;
      }
      var that = this;
      axios
        .post(
          "Lake/taskManage/deleteTask",
          qs.stringify({
            taskId: row.taskId,
            taskType: type
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$message({
              message: "删除成功！",
              type: "success"
            });
            that.tableData = [];
            that.total = 0;
            axios
              .post(
                "Lake/taskManage/selectTaskList",
                qs.stringify({
                  taskName: "",
                  taskType: "",
                  taskState: ""
                })
              )
              .then(function(response) {
                console.log(response);
                var data = response.data;
                if (data.code == 200) {
                  that.load(data.data);
                } else {
                  that.$message.error(data.msg);
                }
              })
              .catch(function(error) {
                console.log(error);
                that.$message.error("出错啦～");
              });
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    detailtask(row) {
      console.log(row);
      if (row.taskType == "数据填充") {
        var type = 2;
        this.tianchong = true;
        var that = this;
        axios
          .post(
            "Lake/taskManage/selectTaskDetails",
            qs.stringify({
              taskId: row.taskId,
              taskType: type
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.tian = data.data;
              that.tianchai.dbname = that.tian.dbTableColName.split(".")[0];
              that.tianchai.tablename = that.tian.dbTableColName.split(".")[1];
              that.tianchai.columnname = that.tian.dbTableColName.split(".")[2];
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
      if (row.taskType == "数据融合") {
        var type = 1;
        this.finish = true;
        this.attr = [];
        var that = this;
        axios
          .post(
            "Lake/taskManage/selectTaskDetails",
            qs.stringify({
              taskId: row.taskId,
              taskType: type
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.detail = data.data.dataFusionTask;
              that.factattr = that.detail.factTablePropertyName.split(";");
              that.factattr1 = that.factattr.slice(1);
              for (var p = 0; p < that.factattr.length - 1; p++) {
                var str =
                  that.detail.factDbName +
                  "_" +
                  that.detail.factTableName +
                  "_" +
                  that.factattr[p];
                that.attr.push(str);
              }
              that.fusionConnectionList = data.data.fusionConnectionList;
              for (var j = 0; j < that.fusionConnectionList.length; j++) {
                that.fusionAttrList[j] = that.fusionConnectionList[
                  j
                ].latitudeTablePropertyName.split(";");
                for (var p = 0; p < that.fusionAttrList[j].length - 1; p++) {
                  var str =
                    that.fusionConnectionList[j].latitudeDbName +
                    "_" +
                    that.fusionConnectionList[j].latitudeTableName +
                    "_" +
                    that.fusionAttrList[j][p];
                  that.attr.push(str);
                }
              }
              console.log(that.attr);
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
      if (row.taskType == "数据同步") {
        var type = 0;
        this.tongbu = true;
        console.log(row);
        this.tong.taskName = row.taskName;
        this.tong.taskDescribe = row.taskDescribe;
        this.tong.taskDate = row.taskDate;
        this.tong.dbType = row.taskDescribe.match(/在([\s\S]+?)类型/)[1];
        if (this.tong.taskName == "列同步") {
          this.tong.dbname = row.taskDescribe.match(/对([\s\S]+?)\./)[1];
          this.tong.tablename = row.taskDescribe.match(/\.([\s\S]+?)表/)[1];
        }
        if (this.tong.taskName == "表同步") {
          this.tong.dbname = row.taskDescribe.match(/对([\s\S]+?)库/)[1];
        }
      }
    }
    // addwen() {
    //   this.$router.push({ name: "unstructuredDataPreprocessing" });
    //   $(".first-menu-wrapper")
    //     .children("li:eq(1)")
    //     .find("ul")
    //     .children("li:eq(1)")
    //     .find("div")
    //     .removeClass("submenu-active");
    //   $(".first-menu-wrapper")
    //     .children("li:eq(1)")
    //     .find("ul")
    //     .css('display','none');
    //   $(".first-menu-wrapper")
    //     .children("li:eq(2)")
    //     .find("ul")
    //     .css('display','');
    //   $(".first-menu-wrapper")
    //     .children("li:eq(2)")
    //     .find("ul")
    //     .children("li:eq(0)")
    //     .find("div")
    //     .addClass("submenu-active");
    // }
  }
};
</script>

<style>
.box {
  margin: 20px;
  margin-top: 60px;
}
.heig .el-table__body td {
  padding: 0px;
}
.pages {
  float: right;
  margin: 15px;
}
</style>