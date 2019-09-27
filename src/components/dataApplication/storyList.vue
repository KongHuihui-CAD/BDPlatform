<template>
  <div>
    <div class="rightStyle">
      <div class="preChose">
        <a>
          <i class="iconfont icon-fuhao"></i>
        </a>
        <span class="pretitle">故事列表</span>
        <el-input
          placeholder="请输入故事名字进行检索"
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
          stripe
          style="width: 100%"
          v-loading="tableDataLoading"
        >
          <el-table-column prop="id" width="120" label="ID"></el-table-column>
          <el-table-column prop="storyName" label="故事名称"></el-table-column>
          <el-table-column prop="operate" width="250" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                icon="el-icon-check"
                circle
                @click="checkData(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-edit"
                type="primary"
                circle
                @click="editData(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="deleteDialog(scope.row)"
              ></el-button>
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
    <el-dialog :visible.sync="deleteDialogVisible" width="25%" :before-close="handleClose" center>
      <div class="content">
        <span>你确定要删除此故事吗？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="deleteData()">确 定</el-button>
      </span>
    </el-dialog>
    <fullscreen ref="fullscreen" @change="fullscreenChange">
      <div v-if="fullscreen == true">
        <!-- <div style="color:#fff;font-size:40px;font-weight:500">{{storyNameFullscreen}}</div> -->
        <div class="tabStyle">
          <div v-if="tableLength >= 2" class="icon1" @click="next">
            <i class="iconfont icon-ene_mon_are_left"></i>
          </div>
          <div class="text">
            <span v-for="(item,index) in tabs">
              <textarea
                readonly="readonly"
                class="contentStyle"
                :class="{active:index == num}"
                @click="tab(index)"
                :placeholder="item.placeholder"
                v-model="item.content"
              ></textarea>
            </span>
          </div>
          <div v-if="tableLength >= 2" class="icon2" @click="pre">
            <i class="iconfont icon-ene_mon_are_right"></i>
          </div>
        </div>
        <div
          class="panel"
          v-for="(itemCon,index) in saveOption"
          v-show="index == num"
          :id="index"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        ></div>
      </div>
    </fullscreen>
  </div>
</template>


<script>
import fullscreen from "vue-fullscreen";
import "../../../static/js/macarons.js";
import echarts from "echarts";
export default {
  name: "dashboard",
  data() {
    return {
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 0, //总条数
      searchtext: "",
      tableData: [],
      deleteDialogVisible: false,
      //删除的故事id
      storyID: '',
      flag: false,
      tabs: [
      ],
      saveOption: [],
      num: 0,
      tableLength: 1,
      storyNameFullscreen: '',
      fullscreen: '',
      tableDataLoading: true,
      mTime: '',
      index: 0,
      datalen: '',
    };
  },
  mounted() {
    this.searchStory();
  },
  methods: {
    toggle() {
      this.$refs["fullscreen"].toggle(); // recommended
    },
    fullscreenChange(fullscreen) {
      console.log(fullscreen);
      this.fullscreen = fullscreen;
      if (fullscreen == true) {
        this.$nextTick(() => {
          for (var i = 0; i < this.saveOption.length; i++) {
            $("#" + i).css('width', document.documentElement.clientWidth - 100 + "px");
            $("#" + i).css('height', document.documentElement.clientHeight - 200 + "px");
            var dom = document.getElementById(i);
            this.myChart = echarts.init(dom, "macarons");
            this.myChart.setOption(this.saveOption[i].option, true);
            // this.init();
            this.datalen = this.saveOption[i].option.series[0].data.length
          }
        })
        this.index = 0; //播放所在下标
        this.mTime = setInterval(() => {
          // 取消之前高亮的图形
          this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.index
          });
          // 高亮当前图形
          this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: this.index
          });
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.index
          });
          this.index++;
          if (this.index > this.datalen) {
            this.index = 0;
          }
        }, 1000);
      }
    },
    handleCurrentChange(val) {
      //切换页面时触发
      this.currentPage = val;
    },
    findresult() {

    },
    searchStory() {
      this.tableData = [];
      this.$http.get("analysis/findAllStory?userId=1").then(response => {
        console.log(response);
        for (var i = 0; i < response.body.datum.length; i++) {
          var obj = {
            id: response.body.datum[i].storyId,
            storyName: response.body.datum[i].storyName,
            content: response.body.datum[i].content,
          };
          this.tableData.push(obj);
          this.total = response.body.datum.length;
          this.tableDataLoading = false
        }
      }).catch((res) => {
        this.$message.error('哎哟～出错了～');
      });
    },
    editData(row) {
      console.log(row)
      sessionStorage.setItem("content", JSON.stringify(row.content));
      sessionStorage.setItem("flag", true);
      sessionStorage.setItem("storyId", row.id);
      sessionStorage.setItem("storyName", row.storyName);
      this.$router.push({
        path: "/dataApplication/Story"
      });
    },
    checkData(row) {
      console.log(row);
      this.tabs = [];
      this.saveOption = [];
      var data = row.content;
      this.storyNameFullscreen = row.storyName;
      for (var i = 0; i < data.length; i++) {
        this.tabs.push({ placeholder: "添加说明", content: data[i].description });
        this.saveOption.push({ option: data[i].option });
      }
      this.tableLength = this.tabs.length;
      console.log(this.saveOption);
      this.flag = true;
      this.toggle()
    },
    tab(index) {
      this.num = index;
    },
    //往前点击
    next() {
      this.num = this.num - 1;
      if (this.num < 0) {
        this.num = this.tabs.length - 1;
      }
    },
    //往后点击
    pre() {
      this.num = this.num + 1;
      if (this.num > this.tabs.length - 1) {
        this.num = 0
      }
    },
    deleteDialog(row) {
      this.deleteDialogVisible = true;
      this.storyID = row.id;
    },
    deleteData() {
      this.$http.get("analysis/delectStory?userId=1&storyId=" + this.storyID).then(response => {
        if (response.body.result == true) {
          this.$message({
            message: '恭喜你，删除成功！',
            type: 'success'
          });
          this.deleteDialogVisible = false;
          this.searchStory();
        } else {
          this.$message.error('哎哟～出错了～');
        }
      }).catch((res) => {
        this.$message.error('哎哟～出错了～');
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
  height: 53px;
  line-height: 45px;
  padding: 1px 20px;
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
.content {
  font-weight: 500;
}
.panel {
  border: 1px solid #eee;
  border-radius: 5px;
  width: 90%;
  height: 80%;
  margin: 80px 50px;
  padding: 20px;
  top: 60px;
  position: absolute;
}
.tabStyle {
  width: 100%;
  top: 50px;
  position: relative;
}
.text {
  position: absolute;
  left: 45px;
  right: 100px;
  width: 70%;
  white-space: nowrap;
  overflow-x: scroll;
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10px;
  display: inline-block;
}
.icon1 {
  position: absolute;
  margin-top: 10px;
  left: 90px;
}
.icon2 {
  position: absolute;
  margin-top: 10px;
  right: 90px;
}
.icon-ene_mon_are_left,
.icon-ene_mon_are_right {
  font-size: 32px;
  color: #409eff;
}
.active {
  border: 1px solid #00c4e2;
  background-color: #ebeef5;
}
.contentStyle {
  margin: 0px 15px;
  border-radius: 3px;
  width: 80px;
}
</style>
