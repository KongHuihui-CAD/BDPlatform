<template>
  <div>
    <div class="rightStyle">
      <div class="preChose">
        <a>
          <i class="iconfont icon-fuhao"></i>
        </a>
        <span class="pretitle">数据源选择</span>
        <el-input
          placeholder="请输入数据源名称进行检索"
          v-model="searchtext"
          class="input-with-select"
          style="width:50%;margin-left:150px;"
        >
          <el-button slot="append" icon="el-icon-search" @click="findresult"></el-button>
        </el-input>
      </div>
      <!-- <div class="preChose">
        <span class="chose"><img id="img" style="width:20px;height:20px;margin-right:10px;" src="../../../static/img/chose.png">数据源选择</span>
        <el-input placeholder="请输入数据源名称进行检索" v-model="searchtext" class="input-with-select" style="width:50%;margin-left:150px;">
          <el-button slot="append" icon="el-icon-search" @click="findresult"></el-button>
        </el-input>
      </div>-->
      <div class="tableData">
        <el-table
          v-loading="loading"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="dataBir" label="数据表来源"></el-table-column>
          <el-table-column prop="dataName" label="数据表名称"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="isChange" label="是否更改"></el-table-column>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="preTableData(scope.row)">预览</el-button>
              <el-button size="mini" type="danger" @click="choseData(scope.row)">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <div class="pages">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-row>
    </div>

    <el-dialog title="数据源预览" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div class="content">
        <el-table
          v-loading="tableDatasLoading"
          :data="tableDatas"
          height="500"
          border
          style="border-radius: 10px;"
        >
          <el-table-column
            v-for="(item,index) in tablehead"
            :id="index"
            :prop="item.name"
            :label="item.name"
          ></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "dashboard",
  data() {
    return {
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 0, //总条数
      searchtext: "",
      dialogVisible: false,
      ind: 0,
      tableData: [],
      tableDatas: [],
      tablehead: [],
      loading: true,
      tableDatasLoading: true,
    };
  },
  components: {},
  mounted() {
    this.searchExcel();
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      //切换页面时触发
      this.currentPage = val;
    },
    searchExcel() {
      this.$http.get("CAD/tableProcess/all_table").then(response => {
        console.log(response);
        for (var i = 0; i < response.body.data.length; i++) {
          var obj = {
            id: i + 1,
            dataBir: "hive仓库",
            dataName: response.body.data[i],
            createTime: "2018-11-07",
            isChange: "否"
          };
          this.tableData.push(obj);
          this.total = response.body.data.length;
        }
        this.loading = false;
      }).catch((res) => {
        this.tableDatasLoading = true;
        this.$message.error('哎哟～出错了～');
      });
    },
    preTableData(row) {
      this.dialogVisible = true;
      this.tablehead = [];
      this.tableDatas = [];
      this.$http.get("CAD/file_preview?name=" + row.dataName).then(response => {
        var data = response.body;
        this.tablehead = data.schema.fields;
        console.log(this.tablehead);
        var newarray = [];
        for (var i = 0; i < data.data.length; i++) {
          var obj = data.data[i];
          var newobj = {};
          for (let key in obj) {
            newobj[key] = obj[key];
          }
          console.log(newobj);
          this.tableDatas.push(newobj);
        }
        this.tableDatasLoading = false;
      }).catch((res) => {
        this.tableDatasLoading = true;
        this.$message.error('哎哟～出错了～');
      });
    },
    findresult() { },
    choseData(row) {
      console.log(row.dataName);
      sessionStorage.setItem("dataName", row.dataName);
      this.$router.push({
        path: "/dataProcessing/proTaskboard"
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  }
};
</script>


<style scoped>
.tableData {
  padding: 0px 40px;
}
.chose {
  font-size: 20px;
  font-family: 微软雅黑;
  color: #00c1de;
  margin-left: 30px;
}
.preChose {
  width: 100%;
  height: 57px;
  line-height: 45px;
  padding: 3px 20px;
  background-color: #f5f7fa;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1),
    0 10px 12px 0 rgba(170, 182, 206, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
  margin-bottom: 20px;
}
.pretitle {
  font-size: 22px;
  font-family: 微软雅黑;
  color: rgb(71, 172, 253);
  margin-left: 30px;
}
.pages {
  float: right;
  margin: 15px;
}
.icon-fuhao {
  font-size: 23px;
  color: #89c7f9;
}
</style>
