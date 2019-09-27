<template>
  <div class="box">
    <el-row>
      <el-input placeholder="请输入任务名称" prefix-icon="el-icon-search" v-model="s_name" style="width:30%">
      </el-input>
      <el-select v-model="s_status" placeholder="请选择任务状态">
        <el-option label="已创建" value="0"></el-option>
        <el-option label="进行中" value="1"></el-option>
        <el-option label="已完成" value="2"></el-option>
        <el-option label="中断" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" circle plain></el-button>
      <el-button type="primary" icon="el-icon-plus" style="float:right;" @click="newadd = true" size="medium">新建任务</el-button>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" class="hei" :default-sort="{prop: 'createTime', order: 'descending'}" v-loading="loading_tableData">
      <el-table-column prop="name" label="任务名称" align="center">
      </el-table-column>
      <el-table-column prop="url" label="URL" align="center" width="150">
      </el-table-column>
      <!-- <el-table-column prop="properties" label="参数" align="center">
            </el-table-column> -->
      <el-table-column prop="crawlerDescribe" label="任务描述" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="number" label="当前数据量" align="center" sortable>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" sortable width="100">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" align="center" sortable width="100">
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template scope="scope">
          <el-button v-show="scope.row.status=='进行中'" type="text" @click="stop(scope.row)">暂停</el-button>
          <el-button v-show="scope.row.status=='已创建'" type="text" @click="start(scope.row)">启动</el-button>
          <el-button v-show="scope.row.status=='进行中'" type="text" @click="update(scope.row)">更新</el-button>
          <el-button v-show="scope.row.status=='中断'" type="text" @click="restart(scope.row)">重启</el-button>
          <el-button v-show="scope.row.status=='进行中'||scope.row.status=='已完成'||scope.row.status=='中断'" type="text" @click="detail(scope.row)">详情</el-button>
          <el-button v-show="scope.row.status=='已创建'||scope.row.status=='中断'" type="text" @click="deletetask(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
    <!-- 新建任务弹窗 -->
    <el-dialog title="新建任务" :visible.sync="newadd" width="60%" :before-close="handleClose">
      <div style="margin-left:15px;margin-right:15px">
        <el-row>
          <el-col :span="5" :offset="1">
            <p>任务名称：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="namenew" placeholder="请输入任务名称"></el-input>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>任务描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="desnew" placeholder="请输入任务描述" type="textarea" :rows="2"></el-input>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>URL：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="urlnew" placeholder="请输入URL"></el-input>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>保存路径：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="savePath" placeholder="请输入保存路径"></el-input>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数设置：</p>
          </el-col>
          <el-col :span="15">
            <el-button class="btn" type="primary" icon="el-icon-plus" size="mini" v-on:click="add"></el-button>
            <div style="height:5px;"></div>
            <el-table :data="c_tableData" border>
              <el-table-column prop="value1" label="参数">
                <template scope="scope">
                  <el-input v-model="c_tableData[scope.$index].value1"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="30">
                <template scope="scope">
                  =
                </template>
              </el-table-column>
              <el-table-column prop="value2" label="值">
                <template scope="scope">
                  <el-input v-model="c_tableData[scope.$index].value2"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template scope="scope">
                  <el-button type="text" @click="del(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newadd = false">取消</el-button>
        <el-button type="primary" @click="yes">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      loading_tableData: true,
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 0, //总条数
      tableData: [],
      s_name: "",
      s_status: "",
      newadd: false,
      namenew: "",
      desnew: "",
      urlnew: "",
      c_tableData: [],
      savePath: ""
    };
  },
  mounted() {
    var that = this;
    axios
      .post("DATA/crawler/list", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].status == 0) {
              data.data[i].status = "已创建";
            }
            if (data.data[i].status == 1) {
              data.data[i].status = "进行中";
            }
            if (data.data[i].status == 2) {
              data.data[i].status = "已完成";
            }
            if (data.data[i].status == 3) {
              data.data[i].status = "中断";
            }
          }
          that.tableData = data.data;
          that.total = data.data.length;
          that.loading_tableData = false;
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
    restart(row) {
      var that = this;
      axios
        .post(
          "DATA/crawler/restart",
          qs.stringify({
            crawlerId: row.crawlerId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            that.$message({
              message: data.msg,
              type: "success"
            });
            axios
              .post("DATA/crawler/list", qs.stringify({}))
              .then(function(response) {
                console.log(response);
                var data = response.data;
                if (data.code == 200) {
                  console.log(data.data);
                  for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].status == 0) {
                      data.data[i].status = "已创建";
                    }
                    if (data.data[i].status == 1) {
                      data.data[i].status = "进行中";
                    }
                    if (data.data[i].status == 2) {
                      data.data[i].status = "已完成";
                    }
                    if (data.data[i].status == 3) {
                      data.data[i].status = "中断";
                    }
                  }
                  that.tableData = data.data;
                  that.total = data.data.length;
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
    start(row) {
      var that = this;
      axios
        .post(
          "DATA/crawler/create",
          qs.stringify({
            name: row.name,
            describe: row.describe,
            url: row.url,
            properties: row.properties,
            processor: "IT桔子",
            savePath: row.savePath
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            that.$message({
              message: data.msg,
              type: "success"
            });
            axios
              .post("DATA/crawler/list", qs.stringify({}))
              .then(function(response) {
                console.log(response);
                var data = response.data;
                if (data.code == 200) {
                  console.log(data.data);
                  for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].status == 0) {
                      data.data[i].status = "已创建";
                    }
                    if (data.data[i].status == 1) {
                      data.data[i].status = "进行中";
                    }
                    if (data.data[i].status == 2) {
                      data.data[i].status = "已完成";
                    }
                    if (data.data[i].status == 3) {
                      data.data[i].status = "中断";
                    }
                  }
                  that.tableData = data.data;
                  that.total = data.data.length;
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
    stop(row) {
      var that = this;
      axios
        .post(
          "DATA/crawler/stop",
          qs.stringify({
            crawlerId: row.crawlerId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            that.$message({
              message: data.msg,
              type: "success"
            });
            axios
              .post("DATA/crawler/list", qs.stringify({}))
              .then(function(response) {
                console.log(response);
                var data = response.data;
                if (data.code == 200) {
                  console.log(data.data);
                  for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].status == 0) {
                      data.data[i].status = "已创建";
                    }
                    if (data.data[i].status == 1) {
                      data.data[i].status = "进行中";
                    }
                    if (data.data[i].status == 2) {
                      data.data[i].status = "已完成";
                    }
                    if (data.data[i].status == 3) {
                      data.data[i].status = "中断";
                    }
                  }
                  that.tableData = data.data;
                  that.total = data.data.length;
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
    update(row) {
      console.log(row);
      axios
        .post(
          "DATA/crawler/status",
          qs.stringify({
            crawlerId: row.crawlerId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            row.number = data.data.number;
            if (data.data.status == 0) {
              row.status = "已创建";
            }
            if (data.data.status == 1) {
              row.status = "进行中";
            }
            if (data.data.status == 2) {
              row.status = "已完成";
            }
            if (data.data.status == 3) {
              row.status = "中断";
            }
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    deletetask(row) {
      var that = this;
      axios
        .post(
          "DATA/crawler/delete",
          qs.stringify({
            crawlerId: row.crawlerId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            that.$message({
              message: data.msg,
              type: "success"
            });
            axios
              .post("DATA/crawler/list", qs.stringify({}))
              .then(function(response) {
                console.log(response);
                var data = response.data;
                if (data.code == 200) {
                  console.log(data.data);
                  for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].status == 0) {
                      data.data[i].status = "已创建";
                    }
                    if (data.data[i].status == 1) {
                      data.data[i].status = "进行中";
                    }
                    if (data.data[i].status == 2) {
                      data.data[i].status = "已完成";
                    }
                    if (data.data[i].status == 3) {
                      data.data[i].status = "中断";
                    }
                  }
                  that.tableData = data.data;
                  that.total = data.data.length;
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
    detail(row) {
      console.log(row.crawlerId);
      var that = this;
      axios
        .post(
          "DATA/crawler/detail",
          qs.stringify({
            crawlerId: row.crawlerId
          }),
          {
            headers: {
              "cache-control": "no-cache"
            }
          }
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$router.push({
              name: "Qdetail",
              params: { name: row.name, data: data.data }
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    yes() {
      console.log(this.c_tableData);
      if (
        this.namenew == "" ||
        this.desnew == "" ||
        this.urlnew == "" ||
        this.c_tableData.length == 0
      ) {
        this.$message({
          message: "请填写完整！",
          type: "warning"
        });
        return false;
      }
      var properties = "{";
      for (var i = 0; i < this.c_tableData.length - 1; i++) {
        properties +=
          '"' +
          this.c_tableData[i].value1 +
          '"' +
          ":" +
          '"' +
          this.c_tableData[i].value2 +
          '"' +
          ",";
      }
      properties +=
        '"' +
        this.c_tableData[this.c_tableData.length - 1].value1 +
        '"' +
        ":" +
        '"' +
        this.c_tableData[this.c_tableData.length - 1].value2 +
        '"' +
        "}";
      console.log(properties);
      var that = this;
      axios
        .post(
          "DATA/crawler/create",
          qs.stringify({
            name: this.namenew,
            describe: this.desnew,
            url: this.urlnew,
            properties: properties,
            processor: "IT桔子",
            savePath: this.savePath
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            that.$message({
              message: data.msg,
              type: "success"
            });
            axios
              .post("DATA/crawler/list", qs.stringify({}))
              .then(function(response) {
                console.log(response);
                var data = response.data;
                if (data.code == 200) {
                  console.log(data.data);
                  for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].status == 0) {
                      data.data[i].status = "已创建";
                    }
                    if (data.data[i].status == 1) {
                      data.data[i].status = "进行中";
                    }
                    if (data.data[i].status == 2) {
                      data.data[i].status = "已完成";
                    }
                    if (data.data[i].status == 3) {
                      data.data[i].status = "中断";
                    }
                  }
                  that.tableData = data.data;
                  that.total = data.data.length;
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

      this.newadd = false;
      this.namenew = "";
      this.desnew = "";
      this.urlnew = "";
      this.c_tableData = [];
    },
    add() {
      var _data = {
        value1: "",
        value2: ""
      };
      this.c_tableData.push(_data);
    },
    del(index) {
      console.log(index);
      this.c_tableData.splice(index, 1);
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