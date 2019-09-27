<template>
  <div>
    <div class="left">
      <div style="margin:0px 20px">
        <el-tabs v-model="story" @tab-click="handleClick">
          <el-tab-pane label="故事" name="first">
            <div>
              <span class="graphList">新建故事</span>
              <div style="padding:5px 0px">
                <el-button
                  style="padding:6px 35px"
                  size="mini"
                  type="primary"
                  plain
                  @click="addStory"
                >新建</el-button>
              </div>
            </div>
            <hr>
            <div class="storyDom">
              <span class="graphList">新建故事点</span>
              <div style="padding:5px 0px">
                <el-button style="padding:6px" size="mini" @click="addTab">空白</el-button>
                <el-button style="padding:6px" size="mini" @click="copyTab">复制</el-button>
              </div>
            </div>
            <hr>
            <div class="storyDom graghStyle">
              <span class="graphList">图表列表</span>
              <ul class="table-name">
                <li v-for="(table,index) in tableNameList" class="graph">
                  <el-popover placement="right" width="320" trigger="hover">
                    <div
                      :id="'graph'+index"
                      class="warpper"
                      draggable="true"
                      @dragstart="drag1($event)"
                    ></div>
                    <i
                      class="iconfont icon-tubiao"
                      :id="'name'+index"
                      @mouseover="showName(index,table.graphTitle)"
                      slot="reference"
                    >&nbsp;{{table.graphTitle}}</i>
                  </el-popover>
                </li>
              </ul>
            </div>
            <div class="storyDom graghStyle">
              <span class="graphList">仪表盘列表</span>
              <ul class="table-name">
                <!-- <li v-for="(table,index) in tableNameList" class="graph">
                  <el-popover placement="right" width="320" trigger="hover">
                    <div
                      :id="'graph'+index"
                      class="warpper"
                      draggable="true"
                      @dragstart="drag1($event)"
                    ></div>
                    <i
                      class="iconfont icon-tubiao"
                      :id="'name'+index"
                      @mouseover="showName(index,table.graphTitle)"
                      slot="reference"
                    >&nbsp;{{table.graphTitle}}</i>
                  </el-popover>
                </li>-->
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="布 局" name="second">
            <el-checkbox v-model="isShowTitle">显示标题</el-checkbox>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right">
      <dl class="creat clearfix">
        <dt class="label">
          <label>故事名称</label>
        </dt>
        <dd class="creat-form-input">
          <p>
            <input class="w1" v-model="storyName" placeholder="请输入故事名称" type="text">
          </p>
        </dd>
        <dd>
          <p class="save">
            <a>
              <el-button type="success" size="small" icon="el-icon-check" @click="saveStory">保存</el-button>
            </a>
          </p>
        </dd>
      </dl>
      <div class="tabStyle">
        <div v-if="tableLength >= 2" class="icon1" @click="next">
          <i class="iconfont icon-ene_mon_are_left"></i>
        </div>
        <div class="text">
          <span v-for="(item,index) in tabs" @mouseover="touch(index)" @mouseleave="leave()">
            <textarea
              class="contentStyle"
              :class="{active:index == num}"
              @click="tab(index)"
              :placeholder="item.placeholder"
              v-model="item.content"
            ></textarea>
            <span
              v-if="deleteNum"
              v-show="index+1 == deleteNum"
              class="delete"
              @click="deleteTabs(index)"
            >X</span>
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
  </div>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
import qs from "qs";
import "../../../static/js/macarons.js";
export default {
  data() {
    return {
      tabs: [
        { placeholder: "添加说明", content: '' }
      ],
      num: 0,
      story: 'first',
      tableNameList: [],
      //画图
      myChart: {},
      visible: false,
      chart: "",
      dragContent: "",
      //选择的图表
      chooseOption: "",
      //选择的图表ID
      choseId: '',
      tableLength: 1,
      //存储图表option
      saveOption: [{ option: {} }],
      deleteNum: 0,
      isShowTitle: true,
      //故事名称
      storyName: '',
      //保存ID的数组
      diagramId: [{ id: '' }],
      //故事列表编辑按钮传过来的option和描述
      graphContent: sessionStorage.getItem("content"),
      //是列表传过来的还是新建的标识位
      flag: sessionStorage.getItem('flag'),
      //故事列表传过来的故事id
      storyId: sessionStorage.getItem('storyId'),
      updateStoryName: sessionStorage.getItem('storyName'),
      mTime:'',
      index:0,
    }
  },
  created() {
  },
  mounted() {
    this.initConfig()
    this.getData();
    this.$http.get("analysis/getDiagramByUserId?userId=1").then(response => {
      var data = response.body.datum;
      for (var i = 0; i < data.length; i++) {
        this.tableNameList.push({ graphTitle: data[i].diagramName, graphOption: data[i].option, diagramId: data[i].diagramId });
      }
      this.$nextTick(() => {
        for (var i = 0; i < this.tableNameList.length; i++) {
          $("#graph" + i).css('height', '200px');
          $('#graph' + i).css('width', '300px');
          this.myChart = echarts.init(
            document.getElementById("graph" + i), "macarons"
          );
          this.myChart.setOption(this.tableNameList[i].graphOption);
          this.init();
        }
      })
    }).catch((res) => {
      this.$message.error('哎哟～出错了～');
    });
  },
  methods: {

    initConfig() {
      this.tabs = [{ placeholder: "添加说明", content: '' }]
      this.saveOption = [{ option: {} }]
      this.diagramId = [{ id: '' }]
      this.storyName = ''
    },
    getData() {
      if (this.flag === "true") {
        var data = eval("(" + this.graphContent + ")");
        this.tabs = []
        this.saveOption = []
        this.diagramId = []
        this.storyName = this.updateStoryName;
        for (var i = 0; i < data.length; i++) {
          this.tabs.push({ placeholder: "添加说明", content: data[i].description });
          this.diagramId.push({ id: data[i].diagramId })
          this.saveOption.push({ option: data[i].option });
        }
        this.$nextTick(() => {
          for (var i = 0; i < this.saveOption.length; i++) {
            $("#" + i).css('width', document.documentElement.clientWidth - 600 + "px");
            $("#" + i).css('height', document.documentElement.clientHeight - 200 + "px");
            var dom = document.getElementById(i);
            this.myChart = echarts.init(dom, "macarons");
            this.myChart.setOption(this.saveOption[i].option, true);
            this.init();
          }
        })
      }
    },
    //初始化
    init() {
      window.addEventListener(
        "resize",
        function () {
          this.myChart.resize();
        }.bind(this)
      );
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
    //点击空白添加说明
    addTab() {
      var str = { placeholder: "添加说明", content: '' }
      this.tabs.push(str);
      // this.tableLength = this.tabs.length;
      var option = { option: {} };
      this.saveOption.push(option);
      this.diagramId.push({ id: '' });
    },
    copyTab() {
      this.tabs.push(this._deepCopy(this.tabs[this.num]));
      console.log(this.tabs);
      this.saveOption.push({ option: this.saveOption[this.num].option });
      this.diagramId.push({ id: this.diagramId[this.num].id });
      this.num = this.saveOption.length - 1;
      //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM。
      this.$nextTick(() => {
        this.drawGraph(this.num, this.saveOption[this.saveOption.length - 1].option);
      })
    },
    drawGraph(value, option) {
      clearInterval(this.mTime);
      var dom = document.getElementById(value);
      this.myChart = echarts.init(dom, "macarons");
      this.myChart.setOption(option, true);
      this.init();
      var datalen = option.series[0].data.length
      this.index = 0; //播放所在下标
      // var self = this
      this.mTime = setInterval(()=> {
        // debugger;
        // 取消之前高亮的图形
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.index
        });

        // console.log(currentIndex);
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
        if (this.index > datalen) {
          this.index = 0;
        }
      }, 1000);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    drag1(event) {
      //通过复制被拖拽节点，使原来的位置上仍保存节点
      this.chart = event.currentTarget;
      this.dragContent = this.chart.cloneNode(true);
      this.dragContent.setAttribute("draggable", "false");
      var str = this.dragContent.id.substring(5);
      this.chooseOption = this.tableNameList[str].graphOption;
      this.choseId = this.tableNameList[str].diagramId;
    },
    drop(ev) {
      ev.preventDefault();
      this.drawGraph(this.num, this.chooseOption);
      this.saveOption[this.num].option = this.chooseOption;
      this.diagramId[this.num].id = this.choseId;
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    touch(index) {
      //当鼠标一上去的时候显示X因为deleteNum为负不显示，所以加一
      this.deleteNum = index + 1;
      if (this.tabs.length == 1) {
        this.deleteNum = -1;
      }
    },
    leave() {
      //当鼠标离开让deleteNum赋值为负，表示不显示X
      this.deleteNum = -1;
    },
    //删除tabs
    deleteTabs(index) {
      //删除的时候对应把文本框和图表option都删除
      this.tabs.splice(index, 1);
      this.saveOption.splice(index, 1);
      this.diagramId.splice(index, 1);
      //重新画图表
      for (var i = 0; i < this.saveOption.length; i++) {
        this.drawGraph(i, this.saveOption[i].option);
      }
      //文本框与图表对应显示
      if (this.num >= index) {
        if (this.num != 0) {
          this.num = this.num - 1;
        }
      }
    },
    showName(index, name) {
      $("#name" + index).attr("title", name);
    },
    //新建故事
    addStory() {
      this.tabs = [{ placeholder: "添加说明", content: '' }];
      this.saveOption = [{ option: {} }]
      this.drawGraph(0, this.saveOption[0].option)
      this.num = 0;
      this.diagramId = [{ id: '' }];
      this.storyName = '';
    },
    //保存故事
    saveStory() {
      var story = []
      for (var i = 0; i < this.saveOption.length; i++) {
        story.push({ diagramId: this.diagramId[i].id, description: this.tabs[i].content })
      }
      var that = this;
      if (this.flag == "true") {
        axios
          .post(
            "analysis/updateStory",
            qs.stringify({
              userId: 1,
              storyId: this.storyId,
              content: JSON.stringify(story),
              storyName: this.storyName,
            })
          )
          .then(function (response) {
            console.log(response.data);
            that.$notify({
              title: '编辑成功',
              type: 'success'
            });
            that.$router.push({ path: "/dataApplication/storyList" });
            sessionStorage.removeItem('flag');
            that.flag = "false";
          }).catch((res) => {
            that.$message.error('哎哟～出错了～');
          });
      } else {
        axios
          .post(
            "analysis/createStory",
            qs.stringify({
              userId: 1,
              content: JSON.stringify(story),
              storyName: this.storyName,
            })
          )
          .then(function (response) {
            console.log(response.data);
            that.$notify({
              title: '保存成功',
              type: 'success'
            });
            that.$router.push({ path: "/dataApplication/storyList" });
          }).catch((res) => {
            that.$message.error('哎哟～出错了～');
          });
      }
    },
    _deepCopy(obj) {
      let str, newobj;
      str = newobj = obj instanceof Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj) // 系列化对象
        newobj = JSON.parse(str) // 还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? _deepCopy(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
  },
  watch: {
    tabs: {
      handler: function () {
        this.tableLength = this.tabs.length;
      },
      //深度观察
      deep: true
    },
  }
}
</script>
<style scoped>
.tabStyle {
  width: 100%;
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
.left {
  width: 140px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0px;
  bottom: 0;
  background-color: #fff;
}
.right {
  position: absolute;
  top: 0;
  left: 150px;
  right: 0;
  overflow: scroll;
  bottom: 0px;
  background-color: #eee;
}
.panel {
  border: 1px solid #eee;
  border-radius: 5px;
  width: 90%;
  height: 80%;
  margin: 80px 50px;
  padding: 20px;
}
.table-name {
  margin-top: 10px;
}
.graph {
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrapper {
  height: 200px;
  width: 300px;
}
.saveButton {
  float: right;
  margin-right: 30px;
}
.delete {
  margin-left: -15px;
}
.creat {
  width: 484px;
  margin: 0 auto;
  margin-bottom: 8px;
  margin-top: 20px;
}
.clearfix {
  zoom: 1;
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
.save {
  margin-left: 500px;
}
.w1 {
  width: 100% !important;
}
.storyDom {
  margin-top: 10px;
}
.graphList {
  font-size: 16px;
  font-weight: 500;
  color: #87a8d0;
}
.graghStyle {
  height: 270px;
  overflow: scroll;
}
</style>
