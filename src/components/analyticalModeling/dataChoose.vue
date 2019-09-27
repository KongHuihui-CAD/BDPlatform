<template>
  <div>
    <div class="rightStyle">
      <div class="preChose prehd">
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
      <div class="tableData">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          class="tdStyle"
          stripe
          style="width: 100%"
          v-loading="tableDataLoading"
        >
          <el-table-column prop="id" label="ID" width="130"></el-table-column>
          <el-table-column prop="fileName" label="数据表名称" width="200"></el-table-column>
          <el-table-column prop="fileUrl" label="数据表路径"></el-table-column>
          <el-table-column prop="fileType" label="数据表类型"></el-table-column>
          <el-table-column prop="operate" label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="preTableData(scope.row)">预览</el-button>
              <el-button size="mini" type="primary" @click="choseData(scope.row)">选择</el-button>
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
    <el-dialog title="数据源预览" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
      <div>
        <el-table
          v-loading="tableDatasLoading"
          :data="tableDatas"
          height="500"
          border
          style="border-radius: 5px;"
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
    <el-dialog
      title="选择模型视图"
      :visible.sync="viewDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="content">
        <el-radio v-model="modelView" label="1" border>显示所有字段的模型视图</el-radio>
        <el-radio v-model="modelView" label="2" border>显示cube主题的模型视图</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="modelViewNo">取 消</el-button>
        <el-button size="small" type="primary" @click="modelViewYes">确 定</el-button>
      </span>
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
      viewDialogVisible: false,
      cubeVisible: false,
      ind: 0,
      tableData: [

      ],
      fileUrl: "",
      fileName: "",
      fileType: '',
      //模型视图
      modelView: "1",
      //选择主题还是单表
      isActive: true,
      itemNameList: [],
      tableId: "",
      tableDataLoading: true,
      //数据预览
      tableDatasLoading: true,
      tableDatas: [],
      tablehead: []
    };
  },
  components: {},
  mounted() {
    this.$http.get("analysis/getDataSource").then(response => {
      console.log(response);
      this.tableData = response.body.datum;
      this.total = response.body.datum.length;
      this.tableDataLoading = false
    }).catch((res) => {
      this.tableDataLoading = true;
      this.$message.error('哎哟～出错了～');
    });
    // this.searchExcel();
  },
  computed: {},
  methods: {
    preTableData(row) {
       this.tableDatasLoading = true;
      this.dialogVisible = true;
      this.tablehead = [];
      this.tableDatas = [];
      this.$http.get("analysis/previewData?fileName=" + row.fileName + "&fileUrl=" + row.fileUrl + "&fileType=" + row.fileType).then(response => {
        var data = response.body.datum;
        console.log(data);
        for (let key in data[0]) {
          var head = { name: '' }
          head.name = key
          this.tablehead.push(head);
        }
        for (var i = 0; i < data.length; i++) {
          var obj = data[i];
          var newobj = {};
          for (let key in obj) {
            newobj[key] = obj[key];
          }
          this.tableDatas.push(newobj);
        }
        // this.tableDatas = this.tableDatas.toString();
        console.log(this.tablehead);
        console.log(this.tableDatas);
        this.tableDatasLoading = false;
      }).catch((res) => {
        this.tableDatasLoading = true;
        this.$message.error('哎哟～出错了～');
      });
    },
    handleCurrentChange(val) {
      //切换页面时触发
      this.currentPage = val;
    },
    findresult() { },
    choseData(row) {
      console.log(row.fileName);
      this.fileUrl = row.fileUrl;
      this.fileName = row.fileName;
      this.fileType = row.fileType;
      this.tableId = row.id;
      if (row.fileType == "FALT") {
        this.viewDialogVisible = true;
      } else {
        sessionStorage.setItem("fileUrl", this.fileUrl);
        sessionStorage.setItem("fileName", this.fileName);
        sessionStorage.setItem("fileType", this.fileType);
        sessionStorage.setItem("id", this.tableId);
        sessionStorage.setItem("modelView", "3")
        this.$router.push({ path: "/analyticalModeling/exploratoryAnalysis" });
      }
    },
    //确定是哪一种模型视图
    modelViewYes() {
      //显示所有字段的模型视图
      if (this.modelView == "1") {
        // alert(this.fileName)
        sessionStorage.setItem("fileUrl", this.fileUrl);
        sessionStorage.setItem("fileName", this.fileName);
        sessionStorage.setItem("fileType", this.fileType);
        sessionStorage.setItem("id", this.tableId)
        sessionStorage.setItem("modelView", this.modelView)
        this.$router.push({ path: "/analyticalModeling/exploratoryAnalysis" });
      } else {
        //显示cube主题的模型视图
        sessionStorage.setItem("fileUrl", this.fileUrl);
        sessionStorage.setItem("fileName", this.fileName);
        sessionStorage.setItem("fileType", this.fileType);
        sessionStorage.setItem("id", this.tableId)
        sessionStorage.setItem("modelView", this.modelView)
        this.$router.push({ path: "/analyticalModeling/exploratoryAnalysis" });
      }
    },
    modelViewNo() {
      this.viewDialogVisible = false;
      this.modelView = "1";
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
.icon-xuanze {
  font-size: 24px;
}
.tableData {
  padding: 10px 40px;
}
.chose {
  font-size: 20px;
  font-family: 微软雅黑;
  color: #00c1de;
  margin-left: 30px;
}
.content {
  margin-left: 100px;
}
.el-table .cell {
  height: 40px !important;
  overflow: scroll !important;
}
.tdStyle .el-table__body td {
  padding: 0px !important;
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
.icon-fuhao {
  font-size: 23px;
  color: #89c7f9;
}
.pages {
  float: right;
  margin: 15px;
}
</style>

