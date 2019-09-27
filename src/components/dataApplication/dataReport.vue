 <template>
  <div class="container-main">
    <div class="main-view">
      <div class="main-title">
        <span class="title-tg"></span>可视化报告
      </div>
      <div class="view-area">
        <div class="=dashboard-v" v-show="dataReady">
          <el-table :data="tableData1" style="width: 80%;margin-left: 10%">
            <el-table-column prop="id" label="报告标识">
            </el-table-column>
            <el-table-column prop="title" label="报告名称">
              <template slot-scope="scope">

                <label style="vertical-align:middle;">{{scope.row.title}}</label>
                <el-button style="border: none;" @click="editName(scope.row)"><span class="glyphicon glyphicon-pencil"></span></el-button>
                <!-- <el-button type="text" size="small" @click="handleGoods(scope.row)" v-else>{{scope.row.goods_count}}</el-button>    -->
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300px">
              <template slot-scope="scope">
                <el-button class="startRow" type="primary" size="small" @click="showIt(scope.row)">查看</el-button>
                <el-button class="startRow" type="primary" size="small" @click="editIt(scope.row)">编辑</el-button>
                <el-button class="deleteRow" type="danger" size="small" @click="deleteIt(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="更新报告名称" :visible.sync="flagEdit" style="text-align: center;">
          <el-form>
            <el-form-item label="可视化报告名称" label-width=110px>
              <el-input v-model="titleEdit"></el-input>
            </el-form-item>
            <!--  <p style="float: left;">提示：报告名称不能为空</p> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="flagEdit = false">取 消</el-button>
            <el-button type="primary" @click="saveNew">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      tranID: [],
      tableData1: [],
      tableData2: [
        {
          id: 22,
          title: "7777",
          optionDraw: {}
        },
        {
          id: 22,
          title: "7777",
          optionDraw: {}
        }
      ],
      dataReady: false,
      flagEdit: false,
      titleEdit: "",
      IDEdit: "",
      reportEdit: {}
    };
  },
  created() {
    // this.dataReady = false;
    // this.tableData1={};
    //
    // this.getReport();
  },
  mounted() {
    this.getReport();
  },

  methods: {
    tran: function(reportData) {
      var data1 = JSON.parse(reportData.desc);
      var title = data1.title;
      return title;
    },
    getReport: function() {
      this.tableData = [];
      this.tableData1 = [];
      this.dataReady = false;
      this.$http
        .get("largeScreen/user/getallreport?userid=" + "1")
        .then(response => {
          // alert("mem");
          var data = response.body;
          this.tableData = data.DATA;
          console.log(this.tableData);

          for (var i = 0; i < this.tableData.length; i++) {
            var data1 = JSON.parse(this.tableData[i].reportData);
            var infor = {};
            infor.id = this.tableData[i].id;
            infor.title = data1.desc.title;
            infor.type = data1.Type;
            infor.content = data1.desc.content;
            infor.optionDraw = data1.result;
            // console.log(infor);
            this.tableData1.push(infor);
          }
          this.dataReady = true;
          console.log(this.tableData1);
        });
    },
    showIt: function(row) {
      // console.log(row);
      // console.log(row.optionDraw);
      // var row1= JSON.parse(row);
      this.tranID = row.id;
      var index = row.type;

      // console.log(this.tranID);

      if (index == 0) {
        this.$router.push({
          path: "/dataApplication/preView?id=" + this.tranID
        });
        // this.$router.push({path:'/preView',query:{id:this.tranID}});
      } else if (index == 1) {
        this.$router.push({
          path: "/dataApplication/preView1?id=" + this.tranID
        });
      } else if (index == 2) {
        this.$router.push({
          path: "/dataApplication/preView2?id=" + this.tranID
        });
      } else if (index == 3) {
        this.$router.push({
          path: "/dataApplication/preView3?id=" + this.tranID
        });
      } else if (index == 4) {
        this.$router.push({
          path: "/dataApplication/preview4?id=" + this.tranID
        });
      } else if (index == 5) {
        this.$router.push({
          path: "/dataApplication/preview5?id=" + this.tranID
        });
      } else if (index == 6) {
        this.$router.push({
          path: "/dataApplication/preview6?id=" + this.tranID
        })
      }
      // this.$router.push({path:'/preView',query:{data:this.tranID}});
    },
    deleteIt: function(row) {
      // console.log(row);
      var id = row.id;
      this.$http
        .get("largeScreen/user/deletereport?reportid=" + row.id)
        .then(response => {
          // console.log(response);
          alert("删除成功");
          this.$nextTick(() => {
            this.dataReady = false;
            this.tableData1 = [];
            this.getReport();
            // console.log(this.tableData1);
          });
        });
    },
    editIt: function(row) {
      // console.log(row);
      var id = row.id;
      var reportType = row.type;
      this.$router.push({
        path: "/dataApplication/createMod",
        query: { id: reportType, reportId: id }
      });
    },
    editName: function(row) {
      this.titleEdit = "";
      // console.log(row);
      this.IDEdit = row.id;
      this.$http
        .get("largeScreen/user/getreportbyid?reportid=" + this.IDEdit)
        .then(response => {
          var data = response.body;
          this.$nextTick(() => {
            this.reportEdit = JSON.parse(data.DATA.reportData);
            // console.log(this.reportEdit);
            this.flagEdit = true;
          });
        });
    },
    // blur:function(name){
    //   if (name === '') {
    //     this.beDisabled = true;
    //   }
    //   else{
    //     this.beDisabled = false;
    //   }

    // },
    saveNew: function() {
      if (this.titleEdit == "") {
        alert("报告名称不能为空");
      } else {
        this.reportEdit.desc.title = this.titleEdit;
        // console.log(this.reportEdit.desc.title);
        this.$http
          .post(
             "largeScreen/user/updatereport",
            {
              userid: "1",
              report: JSON.stringify(this.reportEdit),
              reportid: JSON.stringify(this.IDEdit)
            },
            {
              emulateJSON: true
            }
          )
          .then(
            response => {
              // console.log(response);

              this.dataReady = false;
              this.tableData1 = [];
              this.getReport();
              this.flagEdit = false;
              // alert("保存成功");
            },
            response => {
              console.log("提交失败了");
              alert("提交DATA失败，请刷新重试哦");
            }
          );
      }
    }
  },
  watch: {
    $route(to, from) {
      alert("ooo");
      this.getReport();
    }
  }
};
</script>
<style scoped>
* {
  font-family: "microsoft yahei";
}
body,
h1,
h2,
h3,
h4,
p,
span,
div {
  font-family: "microsoft yahei";
  font-size: 16px;
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
html {
  height: 100%;
}
body {
  background: #eff0f4;
}
.container-main {
  margin-left: 0px;
  height: 100%;
  width: 100%;
  /* background: #fff; */
  /*box-shadow: 0 1px 3px #d0d0d0;*/
}
.container-main .main-title {
  color: #1f2425;
  width: 100%;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  background-color: #fff;
  border-bottom: 2px solid #ddd;
  font-size: 20px;
  font-weight: bold;
}
.container-main .main-title .title-tg {
  display: inline-block;
  float: left;
  margin: 17px;
  width: 16px;
  height: 16px;
  /* background: url('../images/main-title.png') no-repeat;*/
}
.container-main .main-view {
  background-color: #fff;
  height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  /*display: none;*/
  /*layer*/
}

.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
.dashboard-v {
  position: fixed;
  top: 60px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.tips-v {
  clear: right;
  margin-left: 10%;
  padding-top: 30px;
  display: flex;
}
.tips-v p {
  text-align: left;
  color: #3987ad;
}
</style>