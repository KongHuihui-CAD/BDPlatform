<template>
  <!-- <div class="wrapper"> -->
  <div>
    <div class="rightStyle">
      <div class="view-header-wrap">
        <div class="view-header">
          <span class="btn-layer">
            <a>
              <el-button type="text" @click="dialogVisible = true">
                <span class="sum">
                  <i class="el-icon-document"></i>&nbsp;&nbsp;数据集成
                </span>
              </el-button>
            </a>
            <a @click="dataCleaning()">
              <span>
                <i class="iconfont icon-zidongshujuqingxijie"></i>&nbsp;&nbsp;数据清洗
              </span>
            </a>
            <a @click="statisticProcessing()">
              <span>
                <i class="iconfont icon-tongji"></i>&nbsp;&nbsp;统计处理
              </span>
            </a>
            <a>
              <el-button type="text" @click="dataChange">
                <span class="sum">
                  <i class="iconfont icon-shujubiangeng"></i>&nbsp;&nbsp;数据变换
                </span>
              </el-button>
            </a>
          </span>
        </div>
      </div>
      <hr>
      <div>
        <ul id="myTab" class="nav nav-tabs import-choose" role="tablist">
          <li class="active">
            <a href="#look-Data" data-toggle="tab" id="lookData">数据预览</a>
          </li>
          <!-- <li>
                        <a href="#rela-tion" data-toggle="tab" id='relation'>关联授权</a>
          </li>-->
          <li>
            <a href="#field-Setting" data-toggle="tab" id="fieldSetting">字段设置</a>
          </li>
          <li>
            <a href="#his-tory" data-toggle="tab" id="history">历史记录</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active from-in" id="look-Data">
            <div class="btn-drop">
              <!-- <el-dropdown size="small" split-button type="primary">
                                追加数据
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>批量添加</el-dropdown-item>
                                </el-dropdown-menu>
              </el-dropdown>-->
              <el-dropdown size="small" split-button type="primary">替换数据
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>替换部分数据</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown size="small" split-button type="primary">字段变换
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加字段</el-dropdown-item>
                  <el-dropdown-item>拆分字段</el-dropdown-item>
                  <!-- <el-dropdown-item>生成经纬字段</el-dropdown-item>
                  <el-dropdown-item>常用编码解析</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <span>{{name}}</span>
            <div class="tableHead">
              <el-table v-loading="tableData3Loading" :data="tableData3" height="500" border style="border-radius: 10px;">
                <el-table-column
                  v-for="(item,index) in tablehead"
                  :id="index"
                  :prop="item.name"
                  :label="item.name"
                ></el-table-column>
              </el-table>
            </div>
          </div>

          <!-- <div class="tab-pane fade from-in " id="rela-tion">
                        <span>这里是关联授权</span>
          </div>-->
          <div class="tab-pane fade from-in" id="his-tory">
            <el-table
              :data="logData"
              height="500"
              border
              style="border-radius: 10px;"
              :default-sort="{prop: 'changeTime', order: 'descending'}"
            >
              <el-table-column prop="date" label="更新时间" width="250" sortable></el-table-column>
              <el-table-column prop="taskinfo" label="更新日志"></el-table-column>
            </el-table>
          </div>
          <div class="tab-pane fade from-in" id="field-Setting">
            <div class="editStyle">
              <span @click="changeButton" v-if="editFlag">
                <i class="iconfont icon-bianji icon"></i>编辑
              </span>
            </div>
            <div class="editStyle">
              <span @click="saveButton" v-if="!editFlag" style="padding-right:15px">
                <i class="iconfont icon-- icon"></i>保存
              </span>
              <span @click="cancelButton" v-if="!editFlag">
                <i class="iconfont icon-quxiao icon"></i>取消
              </span>
            </div>
            <el-table :data="tableData4" height="500" border style="border-radius: 10px;">
              <el-table-column prop="oldDataName" label="原字段名" width="230"></el-table-column>

              <el-table-column prop="newDataName" label="新字段名" width="230">
                <template scope="scope">
                  <el-input
                    placeholder
                    size="mini"
                    v-model="tableData4[scope.$index].newDataName"
                    :disabled="tableData4[scope.$index].abled"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="dataType" label="字段类型">
                <template scope="scope">
                  <el-select
                    size="mini"
                    v-model="tableData4[scope.$index].dataType"
                    :disabled="tableData4[scope.$index].abled"
                  >
                    <el-option
                      v-for="item in option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="dataDes" label="字段描述">
                <template scope="scope">
                  <el-input
                    placeholder
                    size="mini"
                    v-model="tableData4[scope.$index].dataDes"
                    :disabled="tableData4[scope.$index].abled"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="请选择添加工作表方式"
      :visible.sync="dialogVisible"
      width="690px"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <div class="dialog-message" style="padding:0">
        <div class="upload-data">
          <div class="upload-operate">
            <h2 v-on:mouseover="changeActive($event)">
              <i class="bdp-icon ico-merge-table-gray upload-icon el-icon-document"></i>
              <span>多表关联</span>
            </h2>
            <p v-if="show1" class="tips">使用已有工作表进行关联合并，生成新的工作表以新建图表</p>
          </div>
          <div class="upload-operate">
            <h2 v-on:mouseover="changeActive1($event)">
              <i class="bdp-icon ico-merge-table-gray upload-icon el-icon-tickets"></i>
              <span>数据聚合</span>
            </h2>
            <p v-if="show2" class="tips">将已有工作表中某些字段进行数据聚合，生成新的工作表以新建图表</p>
          </div>
          <div class="upload-operate" @click="dataAppend()">
            <h2 v-on:mouseover="changeActive2($event)">
              <i class="bdp-icon ico-merge-table-gray upload-icon el-icon-menu"></i>
              <span>数据追加</span>
            </h2>
            <p v-if="show3" class="tips">将多个相同结构的工作表合并成一个新的工作表，以新建图表</p>
          </div>

          <div class="upload-operate">
            <h2 v-on:mouseover="changeActive3($event)">
              <i class="bdp-icon ico-merge-table-gray upload-icon el-icon-sold-out"></i>
              <span>字段合并</span>
            </h2>
            <p v-if="show4" class="tips">将已有工作表中某些字段进行字段合并，生成新的工作表以新建图表</p>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="数据变化"
      :visible.sync="dialogVisible1"
      width="47.98%"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <div class="dialog-message" style="padding:0">
        <el-steps :active="active" finish-status="success" width="80%" simple>
          <el-step title="选择 字段"></el-step>
          <el-step title="选择 函数"></el-step>
          <!-- <el-step title="更新 数据表"></el-step> -->
        </el-steps>
        <!-- 第一步：选择数据字段
                <br>
                第二步：选择函数（包括绝对值函数，区间缩放，自定义函数等）
                <br>
        第三步：对字段进行更新保存-->
        <div v-if="active =='0'" style="margin-top: 20px;">
          <span class="choseStyle">请选择字段进行函数变换</span>
          <div class="choseString">
            <div class="choseContent">
              <el-radio-group v-model="fieldRadio" v-for="(ele,index) in fieldRadioData">
                <el-radio :label="index">{{ele}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div v-if="active =='1'" style="margin-top: 20px;">
          <span class="choseStyle">请选择函数对数据进行变换</span>
          <div class="choseString">
            <div class="choseContent">
              <el-radio-group v-model="functionRadio" v-for="(fun,index) in functionRadioData">
                <el-radio :label="index">{{fun}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <!-- <div v-if="active =='2'" style="margin-top: 20px;">
          <span class="choseStyle">预览数据变换</span>
          <div class="choseString">
            <div class="changePre">变化前</div>
            <div class="changeLate">变化后</div>
          </div>
        </div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="last" v-if="active !='0'">上一步</el-button>
        <el-button @click="next" v-if="active !='1'">下一步</el-button>
        <el-button @click="finishChange" v-if="active =='1'">完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "dashboard",
  data() {
    return {
      editFlag: true,
      active: 0,
      tablehead: [],
      fieldRadio: 0,
      functionRadio: 0,
      functionRadioData: ["绝对值函数", "0～1缩放函数", "取整函数"],
      fieldRadioData: [],
      //全选选择框
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: ["上海", "北京", "广州", "深圳"],
      isIndeterminate: true,
      searchtext: "",
      dialogVisible: false,
      dialogVisible1: false,
      ind: 0,
      name: sessionStorage.getItem("dataName"),
      //历史记录数据
      logData: [

      ],
      tableData4: [
      ],
      tableData3: [
      ],
      option: [
        {
          value: "1",
          label: "字符串"
        },
        {
          value: "2",
          label: "数值"
        }
      ],
      options: [
        {
          value: "zhinan",
          label: "数据1.csv"
        },
        {
          value: "zhinan",
          label: "数据2.csv"
        }
      ],
      //数据变化的字段
      changeFiled: [],
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      //数据预览的加载
      tableData3Loading:true,
    };
  },
  components: {},
  mounted() {
    this.previewExcel();
    this.fieldSetting();
    this.changeLog();
  },
  computed: {},
  methods: {
    dataChange() {
      this.previewExcel();
      this.dialogVisible1 = true;
    },
    //更新日志
    changeLog() {
      this.$http.get("CAD/databaseProcess/searchAll?user=66").then(response => {
        console.log(response);
        // var data = eval("(" + response.body + ")");
        this.logData = response.body.data;
      });
    },
    //数据变换第一步
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
    finishChange() {
      var operation = "";
      if (this.functionRadio == 0) {
        operation = "abs";
      } else if (this.functionRadio == 1) {
        operation = "0to1";
      } else {
        operation = "round";
      }
      this.$http.get("CAD/datatrans?read_name=" + this.name + "&colname=" + this.changeFiled[this.fieldRadio] + "&operation=" + operation).then(response => {
        console.log(response.body);
        var data = eval("(" + response.body + ")");
        if (data.data == true) {
          this.dialogVisible1 = false;
          this.previewExcel();
        }
      });
    },
    //字段设置编辑
    changeButton() {
      this.editFlag = false;
      for (var i = 0; i < this.tableData4.length; i++) {
        this.tableData4[i].abled = false;
      }
    },
    //字段设置保存
    saveButton() {
      var set = "";
      for (var i = 0; i < this.tableData4.length; i++) {
        this.tableData4[i].abled = true;
        for (var key in this.tableData4[i]) {
          if (key != "abled" && key != "dataDes") {
            set = set + this.tableData4[i][key].toString().trim() + ",";
          } else if (key == "dataDes") {
            set = set + this.tableData4[i][key].toString().trim() + ";";
          }
        }
      }
      this.$http.get("CAD/columns_set?name=" + this.name + "&set=" + set).then(response => {
        console.log(response);
        if (response.body.state == "successful") {
          alert("字段修改成功！")
          this.previewExcel();
        }
      });
      this.editFlag = true;
      console.log(set);
    },
    //字段设置取消
    cancelButton() {
      this.editFlag = true;
      for (var i = 0; i < this.tableData4.length; i++) {
        this.tableData4[i].abled = true;
      }
      this.tableData4 = [];
      this.fieldSetting();
    },
    //字段设置
    fieldSetting() {
      this.$http.get("CAD/table_columns?name=" + this.name).then(response => {
        this.changeFiled = eval("(" + response.body.data + ")");
        var data = eval("(" + response.body.data + ")");
        var type = response.body.type;
        for (var i = 0; i < data.length; i++) {
          this.fieldRadioData.push(data[i]);
          var obj = {
            oldDataName: data[i],
            newDataName: data[i],
            dataType: type[i],
            dataDes: "",
            abled: true
          };
          this.tableData4.push(obj);
        }
      });
    },
    //数据预览
    previewExcel() {
      this.tablehead = [];
      this.tableData3 = [];
      this.$http.get("CAD/file_preview?name=" + this.name).then(response => {
        var data = response.body;
        this.tablehead = data.schema.fields;
        var newarray = [];
        for (var i = 0; i < data.data.length; i++) {
          var obj = data.data[i];
          var newobj = {};
          for (let key in obj) {
            newobj[key] = obj[key];
          }
          this.tableData3.push(newobj);
        }
        this.tableData3Loading = false;
      }).catch((res) => {
        this.tableDatasLoading = true;
        this.$message.error('哎哟～出错了～');
      });
    },
    //全选选择框的方法
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    selectTable(table, index) { },
    findresult() { },
    dataCleaning() {
      this.$router.push({ path: "/dataProcessing/dataCleaning" });
    },
    statisticProcessing() {
      this.$router.push({ path: "/dataProcessing/statisticProcessing" });
    },
    dataAppend() {
      this.$router.push({ path: "/dataProcessing/dataAppend" });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    changeActive($event) {
      this.show1 = true;
      this.show2 = false;
      this.show4 = false;
      this.show3 = false;
    },
    changeActive1($event) {
      this.show2 = true;
      this.show1 = false;
      this.show4 = false;
      this.show3 = false;
    },
    changeActive2($event) {
      this.show3 = true;
      this.show1 = false;
      this.show2 = false;
      this.show4 = false;
    },
    changeActive3($event) {
      this.show4 = true;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
    }
  }
};
</script>


<style scoped>
.rightStyle {
  background-color: #eee;
  height: 1500px;
}
.content {
  margin-left: 180px;
  bottom: 0;
  height: 680px;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.dashboard {
  position: fixed;
  /* margin-top: 30px; */
  top: 65px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.left {
  width: 240px;
  height: 100%;
  border-right: 1px rgb(227, 230, 232);
  position: absolute;
  top: 0;
  left: 0px;
  bottom: 0;
  background-color: #f0f2f3;
}
.table-name {
  font-size: 15px;
  color: #000;
  cursor: pointer;
  width: 100%;
  padding-top: 1px;
  text-align: center;
}
li {
  padding: 5px 10px;
}
.icon1-file-text {
  line-height: 3;
  font-style: normal;
  font-size: 13px;
}
.item-name {
  background-color: #d4d5d8;
  color: #fff;
  cursor: pointer;
}
.right {
  position: absolute;
  top: 0;
  left: 240px;
  right: 0;
  overflow: scroll;
  bottom: 0px;
  background-color: #eee;
}
.sidebar {
  display: block;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
.el-menu-item.is-active {
  color: #303133;
}
.view-header-wrap {
  margin: 0 24px;
  position: relative;
  height: 64px;
}
.view-header {
  background-color: transparent;
  box-shadow: none;
  padding-right: 350px;
  line-height: 64px;
  position: absolute;
  z-index: 2000;
  top: 10;
  width: 100%;
  height: 64px;
}
h2 {
  color: rgba(10, 18, 32, 0.64);
}
.nowrap {
  position: relative;
  line-height: 56px;
}
.view-header-wrap h2 {
  display: inline-block;
  position: relative;
  margin-left: 0;
}
.view-header h2 {
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, STHeitiSC-Light,
    WOL_SB, "Segoe UI Semibold", "Segoe UI", Tahoma, Helvetica,
    "Microsoft Yahei", sans-serif;
  font-size: 22px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.view-header .btn-layer {
  font-style: normal;
  position: absolute;
  /* top: 0; */
  right: 24px;
  width: auto;
  height: 48px;
  font-size: 17px;
}
.view-header .btn-layer a {
  display: inline-block;
  padding: 0 16px;
  color: rgba(10, 18, 32, 0.64);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}
.view-header .btn-layer a:hover {
  color: #5182e4;
}
.tab-content {
  width: 100%;
  padding: 10px 40px;
  margin: auto;
}
.btn-drop {
  float: right;
  padding-bottom: 10px;
}
.sum {
  font-size: 17px;
  color: rgba(10, 18, 32, 0.64);
}
.upload-data {
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  background: #f0f2f3;
  border-top: 1px solid transparent;
  overflow: hidden;
  padding-bottom: 36px;
}
.upload-operate {
  color: rgba(10, 18, 32, 0.64);
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  background: #f9f9fa;
  display: inline-block;
  float: left;
  border-right-style: none;
  width: 162.5px;
}
.upload-operate:hover {
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1),
    0 10px 12px 0 rgba(170, 182, 206, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
}
.upload-operate h2:hover {
  color: #409eff;
}
.upload-operate h2 {
  height: 150px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  position: relative;
  padding-top: 35px;
}
.bdp-icon.upload-icon {
  display: block;
  width: 44px;
  height: 44px;
  margin: 0 auto 20px;
}
.ico-merge-table-gray {
  background-position: -564px -1238px;
  width: 44px;
  height: 44px;
}
h2 .el-icon-document {
  font-size: 45px;
}
h2 .el-icon-menu {
  font-size: 45px;
}
h2 .el-icon-tickets {
  font-size: 45px;
}
h2 .el-icon-news {
  font-size: 45px;
}
h2 .el-icon-sold-out {
  font-size: 45px;
}
.tips {
  position: absolute;
  padding: 10px 12px;
  font-size: 12px;
  line-height: 16px;
  /* visibility : hidden; */
  text-align: center;
  white-space: nowrap;
  left: 0;
  width: 100%;
  text-align: center;
  color: rgba(10, 18, 32, 0.64);
}
.choseString {
  width: 95%;
  height: 300px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 20px;
}
.el-dialog {
  background: #eee !important;
}
.choseStyle {
  font-size: 15px;
  margin: 10px 20px;
}
.editStyle {
  padding: 10px;
  float: right;
  cursor: pointer;
}
.icon {
  padding-right: 5px;
}
.choseContent {
  padding: 20px;
}
.el-radio {
  margin-right: 20px;
}
.changePre {
  width: 40%;
  height: 250px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 20px;
}
.changeLate {
  width: 40%;
  height: 250px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 20px;
  position: absolute;
  top: 194px;
  left: 340px;
}
.el-table td,
.el-table th.is-leaf {
  padding: 5px !important;
}
</style>
