<template>
  <div class="box">
    <el-row>
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="数据源选择"></el-step>
        <el-step title="数据表字段抽取"></el-step>
        <el-step title="数据目的地配置"></el-step>
      </el-steps>
    </el-row>

    <!-- 数据源选择 -->
    <div v-if="active =='0'" :key="0" style="margin-left:100px;margin-right:100px;margin-top:30px;">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in source" :key="item.id">
          <div @click="choose(item)" class="hpanel">
            <el-card class="panel-body h-200 photo card">
              <a href="#">
                <img :src="item.img" class="picture">
                <span v-if="item.flag==1" style="padding-top: 80%;padding-left: 45%;padding-right: 45%;padding-bottom: 45%;">
                  <i class="iconfont icon-xuanze1"></i>
                </span>
                <span v-if="item.flag==0" style="padding-top: 80%;padding-left: 35%;padding-right: 45%;padding-bottom: 45%;">
                  暂未开放！
                </span>
              </a>
              <hr style="margin-bottom:12px;" />
              <p>{{item.name}}</p>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 数据表字段抽取 -->
    <div v-if="active=='1'" style="margin:50px;" :key="1">
      <el-row :gutter="30">
        <el-col :span="6">
          <el-table :data="tableData1" style="width: 100%" border height="450" @row-click="detail" v-loading="loading1">
            <el-table-column prop="list" label="请选择一张表" align="center" style="cursor:pointer;">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="18">
          <el-table :data="tableData2" style="width: 100%" border v-loading="loading2">
            <el-table-column prop="name" label="字段名称" align="center">
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center">
            </el-table-column>
            <el-table-column prop="action" label="选择" align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="tableData2[scope.$index].ifkeep" @change="handleCheckedChange(scope.$index)"></el-checkbox>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="serect" label="是否加密" align="center" width="100">
              <template slot-scope="scope">
                <el-checkbox v-model="tableData2[scope.$index].ifserect"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="rule" label="过滤规则" align="center">
              <template slot-scope="scope">
                <el-input v-model="tableData2[scope.$index].rule" placeholder="请输入过滤规则"></el-input>
              </template>
            </el-table-column> -->
          </el-table>
          <!-- <el-row>
            <div class="pages">
              <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </el-row> -->
        </el-col>
      </el-row>
    </div>
    <!-- 目的地配置 -->
    <div v-if="active=='2'" :key="2" style="margin-left:100px;margin-right:100px;margin-top:30px;">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in target" :key="item.id">
          <div @click="choosetar(item)" class="hpanel">
            <el-card class="panel-body h-200 photo card">
              <a href="#">
                <img :src="item.img" class="picture">
                <span v-if="item.flag==1" style="padding-top: 80%;padding-left: 45%;padding-right: 45%;padding-bottom: 45%;">
                  <i class="iconfont icon-xuanze1"></i>
                </span>
                <span v-if="item.flag==0" style="padding-top: 80%;padding-left: 35%;padding-right: 45%;padding-bottom: 45%;">
                  暂未开放！
                </span>
              </a>
              <hr style="margin-bottom:12px;" />
              <p>{{item.name}}</p>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 按钮组 -->
    <el-row class="botm">
      <el-button style="margin-top: 12px;" @click="last" v-if="active !='0'">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next" v-if="active =='1'&&columns!=''">下一步</el-button>
      <el-button style="margin-top: 12px;" @click="finish = true;" v-if="active =='2'">完成</el-button>
    </el-row>

    <!-- 数据源弹窗 -->
    <el-dialog :title='"新建数据源--"+choosename' :visible.sync="mysqlhive" width="40%" :before-close="handleClose">
      <div style="margin-left:40px;margin-right:40px">
        <!-- <el-input placeholder="请输入数据源名称" v-model="sname">
          <template slot="prepend">数据源名称</template>
        </el-input> 
        <div style="height:20px;"></div>-->
        <!-- <el-input placeholder="请输入数据库表名称" v-model="tablename">
          <template slot="prepend">数据库表名称</template>
        </el-input> 
        <div style="height:20px;"></div>-->
        <el-input placeholder="请输入服务器地址(例:123.207.123.231)" v-model="service">
          <template slot="prepend">服务器地址</template>
        </el-input>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入端口(例:3306)" v-model="port">
          <template slot="prepend">端口</template>
        </el-input>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入用户名" v-model="username">
          <template slot="prepend">用户名</template>
        </el-input>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入密码" v-model="psd" type="password">
          <template slot="prepend">密码</template>
        </el-input>
        <div style="height:20px;"></div>
        <div style="text-align:center;">
          <el-button type="primary" @click="connect">连接</el-button>
        </div>
        <div style="height:20px;"></div>
        <el-autocomplete class="inline-input" v-model="canname" :fetch-suggestions="querySearch" placeholder="请输入数据库名称" :style="sourcestyle">
          <template slot="prepend">数据库名称</template>
        </el-autocomplete>
      </div>
      <div slot="footer" class="dialog-footer" :style="sourcefootstyle">
        <el-button @click="mysqlhive = false">取消</el-button>
        <el-button type="primary" @click="sourceyes">确定</el-button>
      </div>
    </el-dialog>
    <!-- csvexcel弹窗 -->
    <!-- <el-dialog title="新建数据源" :visible.sync="csvexcel" width="40%" :before-close="handleClose">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="8" style="margin-top:10px;">数据源名称：</el-col>
          <el-col :span="16">
            <el-input v-model="sname" placeholder="请输入数据源名称"></el-input>
          </el-col>
        </el-row>
        <div style="height:20px;"></div>
        <el-row>
          <el-col :span="8" style="margin-top:10px;">文件编码：</el-col>
          <el-col :span="16">
            <el-select v-model="code" placeholder="请选择文件编码" style="width:100%;">
              <el-option label="UTF-8" value="utf"></el-option>
              <el-option label="GBK" value="gbk"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div style="height:20px;"></div>
        <el-row>
          <el-col :span="8" style="margin-top:10px;">分隔符号：</el-col>
          <el-col :span="16">
            <el-select v-model="split" placeholder="请选择分隔符号" style="width:100%;">
              <el-option label="," value="0"></el-option>
              <el-option label="空格" value="1"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="csvexcel = false">取消</el-button>
        <el-button type="primary" @click="csvexcel = false">连接</el-button>
      </div>
    </el-dialog> -->
    <!-- 目的地配置弹窗 -->
    <el-dialog :title='"目的地配置--"+targetname' :visible.sync="targetchuang" width="40%" :before-close="handleClose">
      <div style="margin-left:40px;margin-right:40px">
        <!-- <el-input placeholder="请输入数据源名称" v-model="t_sname">
          <template slot="prepend">数据源名称</template>
        </el-input>
        <div style="height:20px;"></div> -->
        <el-input placeholder="请输入服务器地址(例:123.207.123.231)" v-model="t_service">
          <template slot="prepend">服务器地址</template>
        </el-input>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入端口(例:3306)" v-model="t_port">
          <template slot="prepend">端口</template>
        </el-input>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入用户名" v-model="t_username">
          <template slot="prepend">用户名</template>
        </el-input>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入密码" v-model="t_psd" type="password">
          <template slot="prepend">密码</template>
        </el-input>
        <div style="height:20px;"></div>
        <div style="text-align:center;">
          <el-button type="primary" @click="targettest">连接</el-button>
        </div>
        <div style="height:20px;"></div>
        <el-autocomplete class="inline-input" v-model="t_canname" :fetch-suggestions="t_querySearch" placeholder="请输入数据库名称" :style="targetstyle">
          <template slot="prepend">数据库名称</template>
        </el-autocomplete>
        <div style="height:20px;"></div>
        <el-input placeholder="请输入数据库表名称，不可以全为数字" v-model="t_tablename" :style="targetfootstyle">
          <template slot="prepend">数据库表名称</template>
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer" :style="targetfootstyle">
        <el-button @click="targetchuang = false">取消</el-button>
        <el-button type="primary" @click="targetyes">确认</el-button>
      </div>
    </el-dialog>
    <!-- finish弹窗 -->
    <el-dialog title="ETL收集任务保存" :visible.sync="finish" width="40%" :before-close="handleClose">
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
        <el-button type="primary" @click="save" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      loading1: true,
      loading2: true,
      currentPage: 1, //当前页
      pagesize: 6, //每页条数
      total: 0, //总条数
      active: 0,
      mysqlhive: false,
      csvexcel: false,
      targetchuang: false,
      finish: false,
      sname: "",
      code: "",
      split: "",
      canname: "",
      cannames: [], //输入--下拉框中数据库名字
      cannameS: [], //输入--所有数据库名字
      tablename: "",
      service: "",
      port: "",
      username: "",
      psd: "",
      t_sname: "",
      t_canname: "",
      t_cannames: [], //输出--下拉框中数据库名字
      t_cannameS: [], //输出--所有数据库名字
      t_tablename: "",
      t_service: "",
      t_port: "",
      t_username: "",
      t_psd: "",
      tableData1: [],
      tableData2: [],
      taskname: "",
      source: [
        {
          id: 1,
          name: "MySQL",
          img: "/static/img/mysql.png",
          flag: 1
        },
        {
          id: 2,
          name: "MongoDB",
          img: "/static/img/mongodb.png",
          flag: 1
        },
        {
          id: 3,
          name: "Hive",
          img: "/static/img/hive.png",
          flag: 1
        },
        {
          id: 4,
          name: "SQLServer",
          img: "/static/img/sqlserver.png",
          flag: 0
        },
        {
          id: 5,
          name: "ACCESS",
          img: "/static/img/access.png",
          flag: 0
        },
        {
          id: 6,
          name: "Neo4j",
          img: "/static/img/neo4j.png",
          flag: 0
        },
        {
          id: 7,
          name: "Druid",
          img: "/static/img/druid.png",
          flag: 0
        },
        {
          id: 8,
          name: "Hbase",
          img: "/static/img/hbase.png",
          flag: 0
        },
        // {
        //   id: 9,
        //   name: "Talkingdata统计",
        //   img: "/static/img/talkingdata.png",
        //   flag: 0
        // },
        {
          id: 10,
          name: "Excel",
          img: "/static/img/excel.png",
          flag: 0
        },
        {
          id: 11,
          name: "CSV",
          img: "/static/img/csv.png",
          flag: 0
        },
        {
          id: 12,
          name: "OpenAPI",
          img: "/static/img/openapi.png",
          flag: 0
        }
      ],
      target: [
        {
          id: 1,
          name: "Hive",
          img: "/static/img/hive.png",
          flag: 1
        },
        {
          id: 2,
          name: "Druid",
          img: "/static/img/druid.png",
          flag: 1
        },
        {
          id: 3,
          name: "MySQL",
          img: "/static/img/mysql.png",
          flag: 0
        },

        {
          id: 4,
          name: "MongoDB",
          img: "/static/img/mongodb.png",
          flag: 0
        }
      ],
      choosename: "",
      targetname: "",
      columns: "",
      sourcetab: "",
      sourcestyle: "width:100%;display:none;",
      sourcefootstyle: "display:none;",
      targetstyle: "width:100%;display:none;",
      targetfootstyle: "display:none;"
    };
  },
  mounted() {},

  methods: {
    handleCurrentChange(val) {
      //切换页面时触发
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    next() {
      if (this.active < 2) {
        this.active++;
      } else {
        this.active = 2;
      }
    },
    last() {
      if (this.active > 0) {
        this.active--;
      } else {
        this.active = 0;
      }
    },
    save() {
      this.fullscreenLoading = true;
      var column = "";
      for (var i = 0; i < this.tableData2.length; i++) {
        if (this.tableData2[i].ifkeep == true) {
          column += this.tableData2[i].name + ",";
        }
      }
      console.log(column);

      this.$http
        .get(
          "Etl/mysqlparttohive?columns=" +
            column +
            "&tname=" +
            this.taskname +
            "&stype=" +
            this.choosename.toLowerCase() +
            "&sip=" +
            this.service +
            "&sport=" +
            this.port +
            "&sdb=" +
            this.canname +
            "&stab=" +
            this.sourcetab +
            "&susr=" +
            this.username +
            "&spwd=" +
            this.psd +
            "&dtype=" +
            this.targetname.toLowerCase() +
            "&dip=" +
            this.t_service +
            "&dport=" +
            this.t_port +
            "&ddb=" +
            this.t_canname +
            "&dtab=" +
            this.t_tablename +
            "&dusr=" +
            this.t_username +
            "&dpwd=" +
            this.t_psd
        )
        .then(response => {
          var data = response.body;
          console.log(data);
          if (data.flag == "success") {
            this.goon();
            // alert("任务创建成功！");
            // this.finish = false;
            // this.$router.push({ name: "etlList" });
          } else {
            this.$message.error(data.flag + "!" + data.reason);
          }
        });
    },
    goon() {
      this.$http
        .get(
          "Etl/inctohive?tname=" +
            this.taskname +
            "&stype=" +
            this.choosename.toLowerCase() +
            "&sip=" +
            this.service +
            "&sport=" +
            this.port +
            "&sdb=" +
            this.canname +
            "&stab=" +
            this.sourcetab +
            "&susr=" +
            this.username +
            "&spwd=" +
            this.psd +
            "&dtype=" +
            this.targetname.toLowerCase() +
            "&dip=" +
            this.t_service +
            "&dport=" +
            this.t_port +
            "&ddb=" +
            this.t_canname +
            "&dtab=" +
            this.t_tablename +
            "&dusr=" +
            this.t_username +
            "&dpwd=" +
            this.t_psd
        )
        .then(response => {
          var data = response.body;
          console.log(data);
          if (data.flag == "success") {
            this.$message({
              message: "任务创建成功！",
              type: "success"
            });
            this.fullscreenLoading = false;
            this.finish = false;
            this.$router.push({ name: "etlList" });
            this.lake();
          } else {
            this.$message.error(data.flag);
            return false;
          }
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    choose(item) {
      if (item.flag == 1) {
        this.mysqlhive = true;
        this.choosename = item.name;
      } else {
        this.$message({
          message: "暂未开放！",
          type: "warning"
        });
      }
    },
    choosetar(item) {
      if (item.flag == 1) {
        this.targetchuang = true;
        this.targetname = item.name;
      } else {
        this.$message({
          message: "暂未开放！",
          type: "warning"
        });
      }
    },
    connect() {
      this.$http
        .get(
          "Etl/checksource?ip=" +
            this.service +
            "&port=" +
            this.port +
            "&usr=" +
            this.username +
            "&pwd=" +
            this.psd +
            "&type=" +
            this.choosename.toLowerCase()
        )
        .then(response => {
          var data = response.body;
          console.log(data);
          if (data.flag == "success") {
            this.$message({
              message: "连接成功！请选择数据库！",
              type: "success"
            });
            this.sourcestyle = "width:100%;";
            this.sourcefootstyle = "";
            this.cannameS = data.tabname;
            for (var i = 0; i < this.cannameS.length; i++) {
              var obj = { value: "" };
              obj.value = this.cannameS[i];
              this.cannames.push(obj);
            }
          } else {
            this.$message.error(data.flag);
          }
        });
    },
    gettable() {
      this.$http
        .get(
          "Etl/mysqltabname?db=" +
            this.canname +
            "&ip=" +
            this.service +
            "&port=" +
            this.port +
            "&usr=" +
            this.username +
            "&pwd=" +
            this.psd
        )
        .then(response => {
          var tableList = [];
          var data = response.body;
          console.log(data);
          if (data.flag == "success") {
            for (var i = 0; i < data.tabname.length; i++) {
              var obj = {};
              obj.list = data.tabname[i];
              tableList.push(obj);
            }
            console.log(tableList);
            this.tableData1 = tableList;
            this.loading1 = false;
          } else {
            this.$message.error(data.flag);
          }
        });
    },
    detail(row, event, column) {
      this.tableData2 = [];
      console.log(row, event, column);
      console.log(row.list);
      this.sourcetab = row.list;
      this.$http
        .get(
          "Etl/mytabcolumns?db=" +
            this.canname +
            "&tab=" +
            row.list +
            "&ip=" +
            this.service +
            "&port=" +
            this.port +
            "&usr=" +
            this.username +
            "&pwd=" +
            this.psd
        )
        .then(response => {
          var data = response.body;
          console.log(data);
          if (data.flag == "success") {
            var table = [];
            for (var i in data.result) {
              var obj = {};
              obj.name = i;
              obj.type = data.result[i];
              obj.ifkeep = false;
              table.push(obj);
            }
            console.log(table);
            this.tableData2 = table;
            this.total = table.length;
            this.loading2 = false;
          }
        });
    },
    targettest() {
      this.$http
        .get(
          "Etl/checkdest?ip=" +
            this.t_service +
            "&port=" +
            this.t_port +
            "&usr=" +
            this.t_username +
            "&pwd=" +
            this.t_psd +
            "&type='hive'"
        )
        .then(response => {
          var data = response.body;
          console.log(data);
          if (data.flag == "success") {
            this.$message({
              message: "连接成功！请设置数据目的地！",
              type: "success"
            });
            this.targetstyle = "width:100%;";
            this.targetfootstyle = "";
            this.t_cannameS = data.tabname;
            for (var i = 0; i < this.t_cannameS.length; i++) {
              var obj = { value: "" };
              obj.value = this.t_cannameS[i];
              this.t_cannames.push(obj);
            }
          } else {
            this.$message.error(data.flag);
          }
        });
    },
    handleCheckedChange(index) {
      this.columns = "";
      for (var i = 0; i < this.tableData2.length; i++) {
        if (this.tableData2[i].ifkeep == true) {
          this.columns += this.tableData2[i].name + " ";
        }
      }
    },
    querySearch(queryString, cb) {
      cb(this.cannames);
    },
    t_querySearch(queryString, cb) {
      cb(this.t_cannames);
    },
    sourceyes() {
      this.$message({
        message: "数据源创建成功！",
        type: "success"
      });
      this.mysqlhive = false;
      this.active = 1;
      this.gettable();
    },
    targetyes() {
      this.$message({
        message: "数据目的地创建成功！",
        type: "success"
      });
      this.targetchuang = false;
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
    canname: {
      handler: function() {
        this.cannames = [];
        var len = this.cannameS.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
          //进行模糊匹配
          if (this.cannameS[i].indexOf(this.canname) >= 0) {
            arr.push(this.cannameS[i]); //符合条件的值都放入arr中
          }
        }
        console.log(arr);

        //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
        for (var i = 0; i < arr.length; i++) {
          var obj = { value: "" };
          obj.value = arr[i];
          this.cannames.push(obj);
        }
      }
    },
    t_canname: {
      handler: function() {
        this.t_cannames = [];
        var len = this.t_cannameS.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
          //进行模糊匹配
          if (this.t_cannameS[i].indexOf(this.t_canname) >= 0) {
            arr.push(this.t_cannameS[i]); //符合条件的值都放入arr中
          }
        }
        console.log(arr);

        //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
        for (var i = 0; i < arr.length; i++) {
          var obj = { value: "" };
          obj.value = arr[i];
          this.t_cannames.push(obj);
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
.botm {
  text-align: right;
  margin-top: 50px;
  margin-right: 100px;
}
.input-with-select .el-input-group__append {
  background-color: #fff;
}
.pages {
  float: right;
  margin: 15px;
}
.picture {
  width: 100%;
}

.photo a:hover {
  border: 1px solid #fff;
  text-decoration: none;
}
.photo a span {
  display: none;
  cursor: hand;
  font: bold 12px/30px Verdana, Arial;
}
.photo a:hover span {
  width: 356px;
  height: 267px;
  margin: 0 0px;
  background: rgb(221, 228, 227);
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  color: black;
  filter: alpha(opacity=60);
  -moz-opacity: 0.6;
  opacity: 0.6;
}
.photo a img {
  transition: all 0.6s;
}
.photo a:hover img {
  transform: scale(1.2);
}
.photo {
  overflow: hidden;
}
.hpanel {
  border: 1px solid #70b9b0;
  border-radius: 5px;
  background-color: none;
  border: none;
  box-shadow: none;
}
.panel-footer {
  font-size: 20px;
  font-style: normal;
  text-align: center;
}
.panel-body {
  padding: 0px !important;
}
.h-200 {
  min-height: 200px;
}
.text-center {
  text-align: center;
}
.hpanel > .panel-heading {
  color: inherit;
  font-weight: 600;
  padding: 10px 4px;
  transition: all 0.3s;
  border: 1px solid transparent;
}

.hpanel .hbuilt.panel-heading {
  border-bottom: none;
}

.hpanel > .panel-footer,
.hpanel > .panel-section {
  color: inherit;
  border: 1px solid #e4e5e7;
  border-top: none;
  font-size: 90%;
  background: #f7f9fa;
  padding: 10px 15px;
}

.hpanel .hbuilt,
.hpanel.panel-collapse > .panel-heading {
  background: #fff;
  border: 1px solid #e4e5e7;
  padding: 10px;
  border-radius: 2px;
}

.hpanel .panel-body {
  background: #fff;
  border: 1px solid #e4e5e7;
  border-radius: 2px;
  padding: 20px;
  position: relative;
}

.hpanel.panel-group .panel-body:first-child {
  border-top: 1px solid #e4e5e7;
}

.hpanel.panel-group .panel-body {
  border-top: none;
}

.panel-collapse .panel-body {
  border: none;
}

.hpanel .alert {
  margin-bottom: 0;
  border-radius: 0;
  border: 1px solid #e4e5e7;
  border-bottom: none;
}

.card {
  height: 200px;
  cursor: pointer;
  margin-top: 30px;
  width: 100%;
}

.el-table .cell {
  cursor: pointer;
}
</style>