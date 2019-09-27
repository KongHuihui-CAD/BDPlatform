<template>
  <div class="box">
    <el-row>
      <el-col :span="6" style="margin-top:20px;">HDFS文件夹：</el-col>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" class="heig" :default-sort="{prop: 'dbUpdate_time', order: 'descending'}" v-loading="loading_tableData">
      <el-table-column prop="dbName" label="文件夹名称" align="center">
      </el-table-column>
      <el-table-column prop="dbDescribe" label="描述" align="center">
      </el-table-column>
      <el-table-column prop="dbUrl" label="URL" align="center" width="150">
      </el-table-column>
      <el-table-column prop="dbCapacity" label="容量(MB)" align="center">
      </el-table-column>
      <el-table-column prop="dbSource" label="来源" align="center">
      </el-table-column>
      <el-table-column prop="dbUser" label="用户" align="center">
      </el-table-column>
      <el-table-column prop="dbUpdate_time" label="更新时间" align="center" sortable width="200">
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="detail(scope.row)">查看文件示例</el-button>
          <el-button type="text" @click="create(scope.row)">建仓</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
    <!-- 查看文件示例弹窗 -->
    <el-dialog title="文件示例" :visible.sync="example" width="80%" :before-close="handleClose">
      <div style="margin-left:15px;margin-right:15px">
        <el-row>
          <b>{{examplename}}</b>文件夹文件示例</el-row>
        </el-row>
        <br/>
        <el-row>
          <json-viewer :value="jsonData" :expand-depth=2 boxed v-loading="loading_example"></json-viewer>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="example = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 建仓弹窗 -->
    <el-dialog title="建仓" :visible.sync="addnew" width="95%" :before-close="handleClose">
      <div style="margin-left:15px;margin-right:15px">
        <el-row>
          <b>{{addnewname}}</b>文件夹建仓
        </el-row>
        <br/>
        <el-row :gutter="10">
          <el-col :span="9">
            <json-viewer :value="jsonData1" :expand-depth=2 boxed v-loading="loading_addnew1"></json-viewer>
          </el-col>
          <!-- <el-col :span="8">
                        <json-viewer :value="jsonData2" :expand-depth=2 boxed></json-viewer>
                    </el-col> -->
          <el-col :span="9">
            <el-card class="box-card" v-loading="loading_addnew2">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="height:15px;"></div>
              <el-checkbox-group v-model="jsonitemChecked" @change="handleCheckedChange">
                <div v-for="(o, index) in jsonitem">
                  <el-checkbox :label="o" :key="o" style="display:block;margin-left:0px;" @change="chooseitem(index)">
                    {{o}}
                    <el-input v-model="inputitem[index]" :style="show[index].style" size="mini" placeholder="请重新命名"></el-input>
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card" style="height:400px;">
              <el-row>
                <el-col :span="8">
                  <p style="margin-top:9px;">Hive库名：</p>
                </el-col>
                <el-col :span="16">
                  <el-autocomplete class="inline-input" v-model="newdbname" :fetch-suggestions="querySearch" placeholder="请输入Hive库名">
                  </el-autocomplete>
                </el-col>
              </el-row>
              <br/><br/>
              <el-row>
                <el-col :span="8">
                  <p style="margin-top:9px;">新Hive表名：</p>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="newhivename" placeholder="请输入新Hive表名"></el-input>
                </el-col>
              </el-row>
              <br/><br/>
              <el-row>
                <el-col :span="8">
                  <p style="margin-top:9px;">Hive表描述：</p>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="newhivedes" placeholder="请输入Hive表描述"></el-input>
                </el-col>
              </el-row>
              <br/><br/>
              <el-row>
                <el-col :span="8">
                  <p style="margin-top:9px;">用户名：</p>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="newhiveusername" placeholder="请输入用户名"></el-input>
                </el-col>
              </el-row>
              <br/><br/>
              <el-row>
                <el-col :span="8">
                  <p style="margin-top:9px;">密码：</p>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="newhivepassword" placeholder="请输入密码" type="password"></el-input>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <br/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yes">建仓</el-button>
        <el-button @click="addnew = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import data from "./24.json";
export default {
  data() {
    return {
      loading_example: true,
      loading_addnew1: true,
      loading_addnew2: true,
      loading_tableData: true,
      currentPage: 1, //当前页
      pagesize: 5, //每页条数
      total: 0, //总条数
      tableData: [],
      example: false,
      examplename: "",
      jsonData: data,
      jsonData1: data,
      jsonData2: data,
      jsonitem: [],
      inputitem: [],
      typeitem: [],
      show: [],
      addnew: false,
      addnewname: "",
      newdbname: "",
      newhivename: "",
      newhivedes: "",
      newhiveusername: "",
      newhivepassword: "",
      checkAll: false,
      jsonitemChecked: [],
      isIndeterminate: true,
      hivetable: [],
      xialahivetable: [],
      createurl: ""
    };
  },
  mounted() {
    var that = this;
    axios
      .post("HIVE/hdfs/warehouse", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          for (var i = 0; i < data.data.length; i++) {
            data.data[i].dbCapacity = (data.data[i].dbCapacity / 1024).toFixed(
              2
            );
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

    axios
      .post("HIVE/hive/warehouse", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          for (var i = 0; i < data.data.length; i++) {
            that.hivetable.push(data.data[i].dbName);
            var obj = { value: "" };
            obj.value = data.data[i].dbName;
            that.xialahivetable.push(obj);
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
  methods: {
    querySearch(queryString, cb) {
      cb(this.xialahivetable);
    },
    handleCurrentChange(val) {
      //切换页面时触发
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCheckAllChange(val) {
      console.log(val);
      this.jsonitemChecked = val ? this.jsonitem : [];
      this.isIndeterminate = false;
      if (val) {
        for (var i = 0; i < this.show.length; i++) {
          this.show[i].style = "display:block;";
          this.show[i].flag = true;
        }
      } else {
        for (var i = 0; i < this.show.length; i++) {
          this.show[i].style = "display:none;";
          this.show[i].flag = false;
          this.inputitem[i] = this.jsonitem[i];
        }
      }
    },
    handleCheckedChange(value) {
      console.log(this.jsonitemChecked);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.jsonitem.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.jsonitem.length;
    },
    chooseitem(index) {
      console.log(index);
      if (this.show[index].flag == false) {
        this.show[index].style = "display:block;";
        this.show[index].flag = true;
      } else {
        this.show[index].style = "display:none;";
        this.show[index].flag = false;
        this.inputitem[index] = this.jsonitem[index];
      }
    },
    detail(row) {
      this.loading_example = true;
      this.jsonData = {};
      console.log(row.dbId);
      this.example = true;
      this.examplename = row.dbName;
      var that = this;
      axios
        .post(
          "HIVE/hdfs/get_hdfs_file",
          qs.stringify({
            dbId: row.dbId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.jsonData = JSON.parse(data.data);
            that.loading_example = false;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    create(row) {
      this.loading_addnew1 = true;
      this.loading_addnew2 = true;
      this.jsonitemChecked = [];
      this.jsonitem = [];
      this.inputitem = [];
      this.show = [];
      this.newdbname = "";
      this.newhivename = "";
      this.newhivedes = "";
      this.newhiveusername = "";
      this.newhivepassword = "";
      this.jsonData1 = {};
      this.jsonData2 = {};
      this.createurl = row.dbUrl;

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      var comType = ["object", "array"];
      function plat(o, prekey, resobj, preobj) {
        var keys = Object.keys(o);
        keys.forEach(function(item) {
          var tmpobj = preobj.slice(0);
          var v = o[item];
          var type = typeof v;
          if (type == "object" && v instanceof Array) {
            type = "array";
          }
          tmpobj.push(type);
          if (v && comType.indexOf(type) != -1) {
            // console.log(v.length)
            if (v.length == 0) {
              resobj[prekey ? prekey + "." + item : item] = tmpobj;
            }
            if (isNumber(item) && tmpobj[tmpobj.length - 2] === "array") {
              // tmpobj.pop();
              plat(v, prekey, resobj, tmpobj);
            } else {
              plat(v, prekey ? prekey + "." + item : item, resobj, tmpobj);
            }
          } else {
            resobj[prekey ? prekey + "." + item : item] = tmpobj;
          }
        });
      }

      // this.jsonData1 = data;
      // var result = {};
      // plat(this.jsonData1, "", result, []);
      // this.jsonData2 = result;
      // console.log(result);
      // for (var i in this.jsonData2) {
      //   this.jsonitem.push(i);
      //   this.inputitem.push(i);
      //   this.typeitem.push(this.jsonData2[i]);
      //   this.show.push({ style: "display:none;", flag: false });
      // }

      this.addnew = true;
      this.addnewname = row.dbName;

      var that = this;
      axios
        .post(
          "HIVE/hdfs/get_hdfs_file",
          qs.stringify({
            dbId: row.dbId
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.jsonData1 = JSON.parse(data.data);
            console.log(that.jsonData1);
            var result = {};
            plat(that.jsonData1, "", result, []);
            that.jsonData2 = result;
            for (var i in that.jsonData2) {
              that.jsonitem.push(i);
              that.inputitem.push(i);
              that.typeitem.push(that.jsonData2[i]);
              that.show.push({ style: "display:none;", flag: false });
              that.loading_addnew1 = false;
              that.loading_addnew2 = false;
            }
            console.log(that.jsonitem);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    yes() {
      console.log(this.jsonitemChecked);
      console.log(this.jsonitem);
      console.log(this.inputitem);
      var result = [];
      // this.addnew = false;
      for (var i = 0; i < this.jsonitem.length; i++) {
        var obj = {
          oldname: "",
          newname: "",
          type: []
        };
        if (this.jsonitemChecked.indexOf(this.jsonitem[i]) != -1) {
          obj.oldname = this.jsonitem[i];
          obj.newname = this.inputitem[i];
          obj.type = this.typeitem[i];
          result.push(obj);
        }
      }
      console.log(JSON.stringify(result));
      var that = this;
      axios
        .post(
          "HIVE/hdfs/create_hive_table",
          qs.stringify({
            tableName: this.newhivename,
            dbName: this.newdbname,
            dbDescribe: this.newhivedes,
            dbUser: this.newhiveusername,
            dbPassword: this.newhivepassword,
            content: JSON.stringify(result),
            hdfsUrl: this.createurl
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$message({
              message: "创建成功！",
              type: "success"
            });
            that.addnew = false;
            that.lake();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    lake() {
      var that = this;
      axios
        .post("Lake/dataLake/dataLake", qs.stringify({}))
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    }
  },
  watch: {
    newdbname: {
      handler: function() {
        this.xialahivetable = [];
        var len = this.hivetable.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
          //进行模糊匹配
          if (this.hivetable[i].indexOf(this.newdbname) >= 0) {
            arr.push(this.hivetable[i]); //符合条件的值都放入arr中
          }
        }
        console.log(arr);

        //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
        for (var i = 0; i < arr.length; i++) {
          var obj = { value: "" };
          obj.value = arr[i];
          this.xialahivetable.push(obj);
        }
      }
    }
  }
};
</script>

<style>
.box {
  margin: 20px;
  margin-top: 60px;
}
.pages {
  float: right;
  margin: 15px;
}
.box-card {
  max-height: 400px;
  overflow: scroll;
}
.jv-container .jv-code {
  max-height: 400px !important;
  overflow: scroll !important;
}
.jv-more {
  display: none !important;
}
</style>
