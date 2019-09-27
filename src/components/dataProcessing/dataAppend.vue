<template>
  <div>
    <div class="prehd">
      <a>
        <i class="iconfont icon-fanhui" @click="back()"></i>
      </a>
      <span class="pretitle">数据追加</span>
    </div>
    <div class="left">
      <div class="sidebar">
        <dl class="creatExcel clearfix">
          <dt class="label">
            <label>工作表</label>
          </dt>
          <dd class="creat-input">
            <!-- <i class="iconfont icon-xingtaiduICON_sousuo---copy"></i> -->
            <p>
              <input class="w1" placeholder="搜索" type="text">
              <span class="err-font"></span>
            </p>
          </dd>
        </dl>
        <ul class="table-name">
          <draggable
            v-model="tableNameList"
            class="block__list tabName block__list_words"
            :options="{group:'people2'}"
          >
            <li v-for="(table,index) in tableNameList" :class="{'item-name':ind === index}">
              <i class="iconfont icon-EXCEL" :id="index">
                <span>{{table}}</span>
              </i>
            </li>
          </draggable>
        </ul>
      </div>
    </div>
    <div class="right">
      <dl class="creat clearfix">
        <dt class="label">
          <label>工作表名称</label>
        </dt>
        <dd class="creat-form-input">
          <p>
            <input class="w1" v-model="newTableName" placeholder="请输入工作表名称" type="text">
            <span class="err-font"></span>
          </p>
        </dd>
        <dd>
          <p class="save">
            <a>
              <el-button type="text" @click="saveNewTable">
                <span class="sum">
                  <i class="el-icon-document"></i>&nbsp;&nbsp;保存
                </span>
              </el-button>
            </a>
          </p>
        </dd>
      </dl>
      <draggable
        v-model="tableList"
        class="canvas"
        :options="{group:'people2'}"
        @start="drag=true"
        @end="drag=false"
      >
        <div v-for="(table,index) in tableList" style="padding:10px 20px">{{table}}</div>
      </draggable>

      <el-dialog
        title="请选择要追加的字段"
        :visible.sync="dialogVisible"
        width="690px;"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <div class="dialog-message" style="padding:0">
          <div class="upload-data">
            <div style="margin: -10px 550px;">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
            </div>
            <div class="choseString">
              <div class="choseContent">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="yes">确定</el-button>
        </span>
      </el-dialog>

      <div class="footer">
        <el-tabs type="border-card" v-model="activeIndex" @tab-click="datapreview">
          <el-tab-pane label="数据预览">
            <el-table :data="preData" height="250" border style="border-radius: 10px;">
              <el-table-column v-for="item in preDataHead" :prop="item.name" :label="item.name"></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="过滤条件">过滤条件</el-tab-pane>
          <el-tab-pane label="更新配置">更新配置</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  data() {
    return {
      //选择数据表跳出来的弹窗显示字段
      activeIndex: "0",
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: true,
      ind: 0,
      postValue: [],
      dialogVisible: false,
      tableList: [],
      lastTableName: "",
      items: [
        {
          collaspe: false,
          icon: "el-icon-date",
          index: "/dashboards",
          title: "工作表列表",
          subs: ["网站订单分析", "销售业绩分析", "网站用户分析"]
        }
      ],
      tableNameList: ["人口分析", "商业分析", "地产分析"],
      tableName: "人口分析",
      preData: [

      ],
      //查询所有数据表的长度
      len: "",
      //保存的新的数据表名称
      newTableName: "",
      //新的数据表头
      preDataHead: [],
    };
  },
  mounted() {
    this.searchExcel();
    this.len = this.tableList.length;
    // alert(this.len);
  },
  methods: {
    //查询所有数据表
    searchExcel() {
      this.$http.get("CAD/tableProcess/all_table").then(response => {
        this.tableNameList = response.body.data;
      });
    },
    //查询数据表字段
    searchFiled() { },
    //全选框
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //选择字段进行确定
    yes() {
      var obj = {
        str: "",
        filed: []
      };
      obj.str = this.lastTableName;
      obj.filed = this.checkedCities;
      this.postValue.push(obj);
      console.log(this.postValue);
      this.dialogVisible = false;
      var len1 = this.checkedCities.length;
    },
    //数据预览
    datapreview(activeIndex) {
      var arr = [];
      // console.log(this.activeIndex);
      if (this.activeIndex == 0) {
        for (var i = 0; i < this.tableList.length; i++) {
          for (var j = 0; j < this.postValue.length; j++) {
            if (this.tableList[i] == this.postValue[j].str) {
              arr.push(this.postValue[j]);
            }
          }
        }
        console.log(arr);
        //调用接口
        var set = "";
        for (var i = 0; i < arr.length; i++) {
          for (var key in arr[i]) {
            if (key == "str") {
              set = set + arr[i][key].toString().trim() + ":";
            }
            if (key == "filed") {
              for (var j = 0; j < arr[i][key].length - 1; j++) {
                set = set + arr[i][key][j].toString().trim() + ",";
              }
              var len = arr[i][key].length;
              set = set + arr[i][key][len - 1].toString().trim() + ";";
            }
          }
        }
        console.log(set);
        this.$http.get("CAD/tableProcess/merge?order=" + set).then(response => {
          console.log(response.body.data);
          var data = eval("(" + response.body.data + ")");
          console.log(data);

          for (var key in data[0]) {
            var obj = {
              name: ""
            }
            obj.name = key;
            this.preDataHead.push(obj);
          }
          this.preData = data;
          console.log(this.preData);
        });
      }
    },
    saveNewTable() {
      alert(this.newTableName);
      //调用接口
      // this.$http.get("CAD/tableProcess/all_table?").then(response => {
      //   this.tableNameList = response.body.data;
      // });
    }
  },
  components: {
    draggable
  },
  watch: {
    tableList: {
      handler: function () {
        this.checkedCities = [];
        if (this.tableList.length > this.len) {
          this.dialogVisible = true;
          this.lastTableName = this.tableList[this.tableList.length - 1];
          this.$http
            .get("CAD/table_columns?name=" + this.lastTableName)
            .then(response => {
              var data = eval("(" + response.body.data + ")");
              this.cities = data;
            });
          this.len = this.tableList.length - 1;
        }
        if (this.tableList.length == 0) {
          this.len = 0;
        }
      },
      //深度观察
      deep: true
    }
    // tableNameList: {
    //   handler: function() {
    //      if(this.tableNameList.length > this.len){
    //        this.dialogVisible = false;
    //      }
    //   },
    //   //深度观察
    //   deep: true
    // }
  }
};
</script>
<style scoped>
.body {
  background-color: #eee;
  /* position: absolute; */
  height: 100%;
}
.right {
  position: absolute;
  top: 59px;
  left: 180px;
  right: 0;
  overflow: scroll;
  bottom: 0px;
  background-color: #e6ebed;
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
.left {
  width: 180px;
  /* height: 100%; */
  border-right: 1px solid #dbe0e2;
  position: absolute;
  top: 59px;
  left: 0px;
  bottom: 0;
  background-color: #f0f2f3;
}
.table-name {
  font-size: 5px;
  color: rgba(10, 18, 32, 0.64);
  cursor: pointer;
  width: 100%;
  /* text-align: center; */
}
.tabName {
  height: 75vh;
  overflow: scroll;
  width: 140px;
  margin-left: 20px;
  display: inline-block;
}
li {
  padding: 5px;
  font-size: 5px;
}
.icon-EXCEL {
  font-size: 13px;
  /* float: left; */
}
.el-submenu__title {
  font-size: 12px !important;
}
.label {
  float: left;
  width: 76px;
  line-height: 32px;
  text-align: right;
  color: #797e86;
}
.creat-form-input {
  float: left;
  width: 284px;
  margin: 0 8px 0 16px;
  line-height: 32px;
  vertical-align: top;
}
.creat-input {
  float: left;
  width: 74px;
  margin: 0 8px 0 16px;
  line-height: 32px;
  vertical-align: top;
}
input {
  font-size: 12px;
  box-sizing: content-box;
  height: 24px;
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, STHeitiSC-Light,
    "Microsoft yahei", Tahoma, Verdana, Arial, sans-serif;
  color: rgba(10, 18, 32, 0.87);
  box-shadow: 0 -1px 0 0 rgba(81, 130, 228, 0.5) inset;
  border: 0;
  background-color: transparent;
}
.w1 {
  width: 100% !important;
}
.creat {
  width: 384px;
  margin: 0 auto;
  margin-bottom: 8px;
  margin-top: 20px;
}
.creatExcel {
  width: 174px;
  margin: 0 auto;
  margin-bottom: 8px;
  margin-top: 20px;
}
.clearfix {
  zoom: 1;
}
.save {
  margin-left: 500px;
}
.canvas {
  margin: 20px;
  height: 45%;
  background-color: #f2f5f6;
}
.footer {
  margin: 20px;
  margin-top: -22px;
}
.prehd {
  width: 100%;
  height: 55px;
  /* border-bottom: 1px solid #bbb; */
  line-height: 45px;
  padding: 5px 20px;
  background-color: #f0f2f3;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1),
    0 10px 12px 0 rgba(170, 182, 206, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
}
.pretitle {
  font-size: 22px;
  font-family: 微软雅黑;
  color: rgb(71, 172, 253);
  margin-left: 30px;
}
.icon-fanhui {
  font-size: 23px;
  color: #89c7f9;
}
.excel {
  padding-right: 16px;
  height: 32px;
  padding: 0 0 0 16px;
  position: absolute;
  width: 100%;
  top: 16px;
  font-weight: 700;
  line-height: 32px;
}
.choseString {
  width: 95%;
  height: 300px;
  overflow: scroll;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 20px;
}
.choseContent {
  padding: 20px;
}
.el-dialog__body {
  padding: 5px 20px;
}
</style>
