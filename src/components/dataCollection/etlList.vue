<template>
  <div class="box">
    <el-row>
      <el-input placeholder="请输入任务名称" prefix-icon="el-icon-search" v-model="name" style="width:20%">
      </el-input>
      <el-select v-model="source" placeholder="请选择数据源类型">
        <el-option label="MySQL" value="0"></el-option>
        <el-option label="MongoDB" value="1"></el-option>
        <el-option label="Hive" value="2"></el-option>
        <el-option label="SQLServer" value="3"></el-option>
      </el-select>
      <el-select v-model="target" placeholder="请选择数据目的地类型">
        <el-option label="Hive" value="0"></el-option>
        <el-option label="Druid" value="1"></el-option>
        <el-option label="MySQL" value="2"></el-option>
        <el-option label="MongoDB" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" circle plain></el-button>
      <el-button type="primary" icon="el-icon-plus" style="float:right;" @click="addnew" size="medium">新建任务</el-button>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" class="hei" v-loading="loading_tableData">
      <el-table-column prop="taskname" label="任务名称" align="center">
      </el-table-column>
      <el-table-column prop="sourcetype" label="数据源类型" align="center">
      </el-table-column>
      <el-table-column prop="desttype" label="数据目的地类型" align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column prop="status" label="是否开启实时监控" align="center">
        <template scope="scope">
          <el-switch v-model="tableData[scope.$index].status" active-color="#13ce66" inactive-color="#ff4949" @change="change(scope.$index,scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="detail(scope.row)">详情</el-button>
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
    <!-- 详情弹窗 -->
    <el-dialog title="任务详情" :visible.sync="finish" width="40%" :before-close="handleClose">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          任务名称：{{task.taskname}}
        </el-row>
        <hr/>
        <br/>
        <el-row>
          数据源类型：{{task.sourcetype}}
        </el-row>
        <el-row>
          数据源ip：{{task.sourceip}}
        </el-row>
        <el-row>
          数据源端口：{{task.sourceport}}
        </el-row>
        <el-row>
          源数据库：{{task.sourcedb}}
        </el-row>
        <el-row>
          源数据表：{{task.sourcetab}}
        </el-row>
        <hr/>
        <br/>
        <el-row>
          数据目的地类型：{{task.desttype}}
        </el-row>
        <el-row>
          数据目的地ip：{{task.destip}}
        </el-row>
        <el-row>
          数据目的地端口：{{task.destport}}
        </el-row>
        <el-row>
          目的数据库：{{task.destdb}}
        </el-row>
        <el-row>
          目的数据表：{{task.desttab}}
        </el-row>
        <hr/>
        <br/>
        <el-row>
          实时开启状态：{{task.status}}
        </el-row>
        <el-row>
          创建时间：{{task.createtime}}
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="finish = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading_tableData: true,
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 0, //总条数
      tableData: [{ status: true }],
      name: "",
      source: "",
      target: "",
      finish: false,
      task: {}
    };
  },
  mounted() {
    this.$http.get("Etl/showtasklist").then(response => {
      var data = response.body;
      console.log(data);
      if (data.flag == "success") {
        var data = data.result;
        for (var i = 0; i < data.length; i++) {
          if (data[i].status == "start") {
            data[i].status = true;
          } else {
            data[i].status = false;
          }
          this.tableData = data;
          this.total = data.length;
          this.loading_tableData = false;
        }
      } else {
        this.$message.error(data.flag);
      }
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCurrentChange(val) {
      //切换页面时触发
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    addnew() {
      this.$router.push({ name: "etlCollection" });
    },
    change(index, row) {
      console.log(index);
      if (this.tableData[index].status == false) {
        this.$http
          .get("Etl/stoptask?tname=" + this.tableData[index].taskname)
          .then(response => {
            var data = response.body;
            console.log(data);
            if (data.flag == "success") {
              this.$message({
                message: "关闭实时成功！",
                type: "success"
              });
            } else {
              this.$message.error(data.flag);
              return false;
            }
          });
      } else {
        this.$http
          .get("Etl/starttask?tname=" + this.tableData[index].taskname)
          .then(response => {
            var data = response.body;
            console.log(data);
            if (data.flag == "success") {
              this.$message({
                message: "打开实时成功！",
                type: "success"
              });
            } else {
              this.$message.error(data.flag);
              return false;
            }
          });
      }
    },
    deletetask(row) {
      this.$http.get("Etl/deletetask?tname=" + row.taskname).then(response => {
        var data = response.body;
        console.log(data);
        if (data.flag == "success") {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.$http.get("Etl/showtasklist").then(response => {
            var data = response.body;
            console.log(data);
            if (data.flag == "success") {
              var data = data.result;
              for (var i = 0; i < data.length; i++) {
                if (data[i].status == "start") {
                  data[i].status = true;
                } else {
                  data[i].status = false;
                }
                this.tableData = data;
                this.total = data.length;
                this.loading_tableData = false;
              }
            } else {
              this.$message.error(data.flag);
            }
          });
        } else {
          this.$message.error(data.flag);
        }
      });
    },
    detail(row) {
      this.finish = true;
      this.$http.get("Etl/showtask?tname=" + row.taskname).then(response => {
        var data = response.body;
        console.log(data);
        if (data.flag == "success") {
          this.task = data;
        } else {
          this.$message.error(data.flag);
        }
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
.hei .el-table__body td {
  padding: 0px;
}
.pages {
  float: right;
  margin: 15px;
}
</style>