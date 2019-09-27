<template>
  <div class="box">
    <el-row>
      <el-input placeholder="请输入库名" prefix-icon="el-icon-search" v-model="name" style="width:30%" size="mini">
      </el-input>
      <el-button type="primary" icon="el-icon-search" circle plain size="mini" @click="search"></el-button>
    </el-row>
    <br/>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" @row-click="detail" style="width: 100%;cursor:pointer;" class="hei1" border :default-sort="{prop: 'dbUpdate_time', order: 'descending'}" v-loading="loading_tableData">
      <el-table-column prop="dbName" label="数据库名称" align="center" width="150">
      </el-table-column>
      <el-table-column prop="dbDescribe" label="描述" align="center">
      </el-table-column>
      <el-table-column prop="dbSource" label="数据来源" align="center">
      </el-table-column>
      <el-table-column prop="dbType" label="数据库类型" align="center">
      </el-table-column>
      <el-table-column prop="dbCapacity" label="容量大小(B)" align="center">
      </el-table-column>
      <el-table-column prop="dbTables_num" label="表数量" align="center">
      </el-table-column>
      <el-table-column prop="dbOwner" label="拥有者" align="center">
      </el-table-column>
      <el-table-column prop="dbUpdate_time" label="最近修改时间" align="center" width="180" sortable>
      </el-table-column>
      <el-table-column prop="dbCreat_time" label="建库时间" align="center" width="180" sortable>
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
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pagesize: 12, //每页条数
      total: 0, //总条数
      tableData: [],
      name: "",
      loading_tableData: true
    };
  },
  mounted() {
    var that = this;
    axios
      .post("HIVE/hive/warehouse", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
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
    detail(row, event, column) {
      console.log(row.dbId);
      this.$router.push({
        name: "hiveTables",
        params: {
          id: row.dbId,
          name: row.dbName
        }
      });
    },
    search() {
      //   var that = this;
      //   axios
      //     .post("Lake/dataLake", qs.stringify({}))
      //     .then(function(response) {
      //       console.log(response);
      //       var data = response.data;
      //       if (data.code == 200) {
      //         console.log(data.data);
      //       } else {
      //         alert(data.msg);
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //       alert("error!");
      //     });
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