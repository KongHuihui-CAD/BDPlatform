<template>
  <div class="box">
    <el-row>
      <el-col :span="8">
        <el-button icon="el-icon-arrow-left" size="mini" @click="back">返回</el-button>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="请输入表名" prefix-icon="el-icon-search" v-model="name" style="width:30%" size="mini">
        </el-input>
        <el-button type="primary" icon="el-icon-search" circle plain size="mini" @click="search"></el-button>
      </el-col>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;" class="hei1" border v-loading="loading_tableData">
      <el-table-column prop="tableName" label="数据表名称" align="center">
      </el-table-column>
      <el-table-column prop="tableDescribe" label="数据表描述" align="center">
      </el-table-column>
      <el-table-column prop="rowSize" label="数据表行数" align="center">
      </el-table-column>
      <el-table-column prop="action" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">查看示例数据</el-button>
          <el-button :icon="icons[scope.$index].icon" type="text" @click="update(scope.row,scope.$index)">更新信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <div class="pages">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-row>
    <!-- 查看示例数据弹窗 -->
    <el-dialog title="文件示例" :visible.sync="example" width="80%" :before-close="handleClose">
      <div style="margin-left:15px;margin-right:15px">
        <el-row>
          <b>{{tablename}}</b>表示例数据</el-row>
        </el-row>
        <br/>
        <el-row>
          <el-table :data="tableData2" style="width: 100%;" class="hei1" border height="350" v-loading="loading_example">

            <el-table-column v-for="(item,index) in columnList" :label="item" :property="item" align="center" min-width="200">
              <template scope="scope">
                <div style="height:100px;overflow:scroll;">
                  <p>{{tableData2[scope.$index][index]}}</p>
                </div>
              </template>
            </el-table-column>

          </el-table>

          <!-- <el-table :data="tableData2" style="width: 100%;" class="hei1" border height="400">
            <el-table-column prop="content1" label="列1" align="center">
            </el-table-column>
            <el-table-column prop="content2" label="列2" align="center">
            </el-table-column>
          </el-table> -->
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="example = false">关闭</el-button>
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
      loading_example: true,
      currentPage: 1, //当前页
      pagesize: 12, //每页条数
      total: 0, //总条数
      tableData: [],
      name: "",
      dbId: this.$route.params.id,
      dbName: this.$route.params.name,
      icons: [],
      tablename: "",
      example: false,
      tableData2: [],
      columnList: []
    };
  },
  mounted() {
    var that = this;
    axios
      .post(
        "HIVE/hive/db",
        qs.stringify({
          dbId: this.dbId
        })
      )
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          that.tableData = data.data;
          that.loading_tableData = false;
          that.total = data.data.length;
          for (var i = 0; i < that.total; i++) {
            var obj = {};
            obj.icon = "";
            that.icons.push(obj);
          }
          console.log(that.icons);
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
    search() {},
    back() {
      this.$router.back(-1);
    },
    update(row, index) {
      console.log(row.tableId);
      console.log(index);
      this.icons[index].icon = "el-icon-loading";
      console.log(this.icons);
      var that = this;
      axios
        .post(
          "HIVE/hive/syc_table_info",
          qs.stringify({
            dbId: this.dbId,
            dbName: this.dbName,
            tableName: row.tableName
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$message({
              message: "更新成功！",
              type: "success"
            });
            row.rowSize = data.data.rowSize;
            that.icons[index].icon = "";
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
      this.loading_example = true;
      this.tableData2 = [];
      this.columnList = [];
      this.tablename = row.tableName;
      this.example = true;
      var that = this;
      axios
        .post(
          "HIVE/hive/ware_data_demo",
          qs.stringify({
            dbName: this.dbName,
            tableName: row.tableName,
            rows: 5
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            for (var i = 1; i < data.data.length; i++) {
              that.tableData2.push(data.data[i]);
            }
            for (var i = 0; i < data.data[0].length; i++) {
              that.columnList.push(data.data[0][i]);
            }
            that.loading_example = false;
            console.log(that.columnList);
            console.log(that.tableData2);
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
.el-textarea__inner {
  text-align: center !important;
}
</style>