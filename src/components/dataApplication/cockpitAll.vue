<template>
  <div>
    <div class="left">
      <div class="storyDom graghStyle">
        <span class="graphList">图表列表</span>
        <ul class="table-name">
          <li v-for="(table,index) in tableNameList" class="graph">
            <el-popover placement="right" width="320" trigger="hover">
              <div :id="'graph'+index" class="warpper" draggable="true" @dragstart="drag1($event)"></div>
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
    </div>
    <div class="right">
      <div class="tabStyle">
        <div class="panel" @drop="drop($event)" @dragover="allowDrop($event)">
          <vue-draggable-resizable
            v-for="(item,index) in dashboard"
            :key="'item'+index"
            @resizing="onResize"
            @dragging="onDragging"
            @activated="active(index)"
            @deactivated="deactivate()"
            :w="item.w"
            :h="item.h"
            :x="item.x"
            :y="item.y"
            :parent="true"
          >
            <div
              :id="index"
              @mouseover="showGraphName(index,item)"
              style="width:100%;height:100% !important;border: 1px solid #dfdcf5;border-radius: 5px;background: #fff;"
            ></div>
          </vue-draggable-resizable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import axios from "axios";
import qs from "qs";
import "../../../static/js/macarons.js";
import VueDraggableResizable from "vue-draggable-resizable";
export default {
  data() {
    return {
      tableNameList: [],
      //画图
      myChart: {},
      dashboard: [],
      dragContent: '',
      //选择的图表
      chooseOption: "",
      //选择的图表ID
      choseId: '',
      //存储图表option
      saveOption: [{ option: {} }],
      //保存ID的数组
      diagramId: [{ id: '' }],
      //dashboard里面的每个数据的id
      count: -1,
      //存放dom的数组
      charts: [],
      active_index: '',
    }
  },
  mounted() {
    this.$http.get("analysis/getDiagramByUserId?userId=1").then(response => {
      var data = response.body.datum;
      for (var i = 0; i < data.length; i++) {
        this.tableNameList.push({ graphTitle: data[i].diagramName, graphOption: data[i].option, diagramId: data[i].diagramId });
      }
      this.$nextTick(() => {
        for (var i = 0; i < this.tableNameList.length; i++) {
          $("#graph" + i).css('height', '200px');
          $('#graph' + i).css('width', '300px');
          if (this.tableNameList[i].graphOption.title != undefined) {
            // this.myChart.dispose()
            this.myChart = echarts.init(
              document.getElementById("graph" + i), "macarons"
            );
            this.myChart.setOption(this.tableNameList[i].graphOption, true);
            this.init();
          } else {
            var newdiv = document.getElementById("graph" + i)
            newdiv.innerHTML = "<div class=\"graphValue\">" + this.tableNameList[i].graphOption.name + "</div><div class=\"cardGraphValue\">" + this.tableNameList[i].graphOption.value + "</div>";
          }
        }
      })
    }).catch((res) => {
      this.$message.error('哎哟～出错了～');
    });
  },
  methods: {
    //初始化
    init() {
      window.addEventListener(
        "resize",
        function () {
          this.myChart.resize();
        }.bind(this)
      );
    },
    showName(index, name) {
      $("#name" + index).attr("title", name);
    },
    showGraphName(index, name) {
      console.log(name);
      if (name.choseOption.name != undefined) {
        $("#" + index).attr("title", name.choseOption.value);
      }
    },
    _deepCopy(obj) {
      let str, newobj;
      str = newobj = obj instanceof Array ? [] : {};
      if (typeof obj !== "object") {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj); // 系列化对象
        newobj = JSON.parse(str); // 还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === "object" ? _deepCopy(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    onResize(x, y, width, height) {
      if (this.dashboard[this.active_index]) {
        console.log(this.dashboard[this.active_index]);
        if (this.dashboard[this.active_index].choseOption.title != undefined) {
          this.charts[this.active_index].resize();
          this.dashboard[this.active_index].x = x;
          this.dashboard[this.active_index].y = y;
          this.dashboard[this.active_index].w = width;
          this.dashboard[this.active_index].h = height;
        } else {
          this.dashboard[this.active_index].x = x;
          this.dashboard[this.active_index].y = y;
          this.dashboard[this.active_index].w = width;
          this.dashboard[this.active_index].h = height;
        }
        console.log(this.dashboard);
        // this.$emit("putData", this.dashboard);
      } else {
        console.log("chart 未初始化");
      }
    },
    onDragging(x, y) {
      console.log(this.active_index)
      this.dashboard[this.active_index].x = x;
      this.dashboard[this.active_index].y = y;
      console.log(this.dashboard);
      //   this.$emit("putData", this.screen);
    },
    active(index) {
      console.log(index);
      this.active_index = index;
    },
    deactivate() {
      this.active_index = -1;
      console.log(this.active_index);
    },
    drawGraph(value, option) {

      console.log(option)
      $(".dimValue").remove()
      $(".cardValue").remove()
      if (option.title != undefined) {
        // this.myChart.dispose();
        console.log(value);
        var dom = document.getElementById(value);
        this.myChart = echarts.init(dom, "macarons");
        this.myChart.setOption(option, true);
        this.charts.push(this.myChart);
      } else {
        var newdiv = document.getElementById(value);
        newdiv.innerHTML = "<div class=\"drawGraphValue\">" + option.name + "</div><div class=\"drawCardGraphValue\">" + option.value + "</div>";
        this.charts.push(newdiv);
      }
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
      var data = {};
      console.log((document.documentElement.clientWidth-700)/2)
      data.x = (document.documentElement.clientWidth-700)/2;
      data.y = (document.documentElement.clientHeight-200)/2;
      data.w = 200;
      data.h = 100;
      data["choseOption"] = this.chooseOption;
      data.tag = this.count;
      this.dashboard.push(data);
      this.count++;
      console.log(this.dashboard);
      this.$nextTick(() => {
        console.log(this.count);
        this.drawGraph(this.count, this.chooseOption);
      })

    },
    allowDrop(ev) {
      ev.preventDefault();
    },
  },
  components: {
    "vue-draggable-resizable": VueDraggableResizable
  },
}
</script>
<style scoped>
.left {
  width: 140px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0px;
  bottom: 0;
  background-color: #fff;
}
.tabStyle {
  width: 100%;
  position: relative;
  height: 100%;
}
.right {
  position: absolute;
  top: 0;
  left: 150px;
  right: 0;
  overflow: scroll;
  bottom: 0px;
  padding: 20px;
  background: #eee !important;
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
  height: 470px;
  overflow: scroll;
  padding-left: 20px;
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
.panel {
  /* border: 1px solid #eee; */
  background: #eee !important;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  /* margin: 80px 50px; */
  /* padding: 20px; */
}
</style>
