<template>
  <div id="md0-container" @drop="drop($event)" @dragover="allowDrop($event)">
    <vue-draggable-resizable v-for="(item,index) in screen" :key="'item'+index" @resizing="onResize" @dragging="onDragging" @activated="active(index)" @deactivated="deactivate()" :w="item.w" :h="item.h" :x="item.x" :y="item.y" :parent="true" :droppable=false>
      <div :id="'edit-chart' + index" style="width:100%;height:100% !important;" v-if="item.type===0"></div>
      <div :id="'edit-chart' + index" v-if="item.type===1" :style="item.textstyle" draggable="false">{{item.text}}</div>
      <img :id="'edit-chart' + index" v-if="item.type===2" :src='item.url' style="width:100%;height:100%" draggable="false" />
    </vue-draggable-resizable>
  </div>
</template>
<script>
import echarts from "echarts";
import VueDraggableResizable from "vue-draggable-resizable";
import bus from '../bus.js'
export default {
  components: {
    "vue-draggable-resizable": VueDraggableResizable
  },
  props: {
    dragContent: {
      type: HTMLDivElement
    },
    chooseOption: {
      type: Object
    },
    reportId: {}
  },
  data() {
    return {
      Mcontent: {
        BoxId: "",
        choseOption: {}
      },
      Lcontent: [],
      DContent: {
        title: [],
        num: []
      },
      screen: [],
      activeName: "first",
      count: -1,
      active_index: -1,
      charts: [],
      // textstyle: {} // 标题样式
    };
  },
  created() {
    this.getCache();
    let that = this;
    bus.$on('addTextandPic', function (type, textstyle) {
      if (type === 1) {
        var data = {textstyle:{}};
        that.count++;
        data.type = 1;
        if (!textstyle.text) {
          data.text = '我是标题';
        } else {
          data.text = textstyle.text;
        }
        data.x = 0;
        data.y = 0;
        data.w = 100;
        data.h = 40;
        data.BoxId = 'edit-chart' + that.count;  // BoxId是用来编辑图表的时候需要的逻辑
        if (!textstyle.fontsize) {
          data.textstyle['font-size'] = 24 + 'px';
        } else { data.textstyle['font-size'] = textstyle.fontsize + 'px' }
        if (!textstyle.color) {
          data.textstyle['color'] = '#fff';
        } else { data.textstyle['color'] = textstyle.color }
      } else if (type === 2) {
        var data = {};
        that.count++;
        data.type = 2;
        data.url = '../../../../static/img/largeScreen/title.png';
        data.x = 0;
        data.y = 0;
        data.w = 100;
        data.h = 40;
        data.BoxId = 'edit-chart' + that.count;
      }
      that.screen.push(data)
      that.charts.push(null)
      that.$emit('putData', that.screen)
    })
    bus.$on('editTextandPic', function (type, id, textstyle) {
      for (var i = 0; i < that.screen.length; i++) {
        // console.log(textstyle)
        console.log(id)
        if (that.screen[i].BoxId && that.screen[i].BoxId === id) {
          that.screen[i].textstyle['font-size'] = textstyle.fontsize + 'px'
          that.screen[i].textstyle['color'] = textstyle.color
          that.screen[i].text = textstyle.text
        }
      }
      that.$emit('putData', that.screen)
    })
    this.count = this.screen.length - 1
  },
  mounted() {
    if (this.screen.length > 0)
      this.drawR();
  },
  methods: {
    getCache: function () {
      var local = window.localStorage;
      if (!this.reportId) {
        // 预览返回
        var bigCache = JSON.parse(local.getItem("bigCache")) || [];
        if (bigCache.length !== 0) {
          this.Lcontent = bigCache.data;
          this.DContent = bigCache.content;
          this.screen = this.Lcontent;
          for (var i = 0; i < this.Lcontent.length; i++) {
            if (this.Lcontent[i].type === 1) {
              this.screen[i].textstyle['font-size'] = this.Lcontent[i].textstyle['font-size']
              this.screen[i].textstyle['color'] = this.Lcontent[i].textstyle.color
              console.log(this.Lcontent[i].textstyle['font-size'])
              console.log(this.Lcontent[i].textstyle.color)
            }
          }
        }
        console.log(this.Lcontent)
      } else {
        // alert("yes.0");
        var bigCache = JSON.parse(local.getItem("bigCache")) || [];
        console.log(bigCache);
        if (bigCache.length !== 0) {
          this.Lcontent = bigCache.data;
          this.DContent = bigCache.content;
        } else {
          this.$http
            .get("largeScreen/user/getreportbyid?reportid=" + this.reportId)
            .then(response => {
              var data = response.body;
              // console.log(data);
              this.Lcontent = JSON.parse(data.DATA.reportData).result;
              this.DContent = JSON.parse(data.DATA.reportData).desc.content;
              this.drawR();
            });
        }
      }
    },
    drawR: function () {
      for (var i = 0; i < this.screen.length; i++) {
        var dom = document.getElementById("edit-chart" + i); // before
        if (dom && this.screen[i].type === 0) {
          var myChart = echarts.init(dom);
          if (
            this.screen[i].choseOption.series !== undefined &&
            this.screen[i].choseOption.series[1] !== undefined &&
            this.screen[i].choseOption.series[1].type == "custom"
          ) {
            var opt = this.screen[i].choseOption.series[1];
            opt["renderItem"] = renderItem;
            myChart.setOption(this.screen[i].choseOption);
          } else {
            myChart.setOption(this.screen[i].choseOption);
          }
          myChart.setOption(this.screen[i].choseOption);
          this.charts.push(myChart);
        } else {
          this.charts.push(null);
        }
      }
    },
    drop(event) {
      event.preventDefault();
      this.count++;
      var data = {};
      data.x = 0;
      data.y = 0;
      data.w = 200;
      data.h = 200;
      data.type = 0; // echarts图表类型
      data["choseOption"] = this.chooseOption;
      data.BoxId = "edit-chart" + this.count;
      this.screen.push(data);
      this.$emit("putData", this.screen);
      var that = this;
      var timer = null;
      //  检查dom是否执行完成
      function check() {
        let dom = document.getElementById("edit-chart" + that.count);
        if (dom) {
          //  执行dom加载完成后的操作，例如echart的初始化操作
          var mychart = echarts.init(dom);
          mychart.setOption(that.chooseOption);
          //   console.log(self.option);
          that.charts.push(mychart);
          // that.tranData("edit-chart" + that.count, that.chooseOption);
          //  清除定时器
          if (!timer) {
            clearTimeout(timer);
          }
        } else {
          //  自我调用
          timer = setTimeout(check, 0);
        }
      }
      //  首次执行
      check();
    },
    onResize(x, y, width, height) {
      if (this.screen[this.active_index]) {
        if (this.screen[this.active_index].type === 0) {
          this.charts[this.active_index].resize();
        }
        this.screen[this.active_index].x = x;
        this.screen[this.active_index].y = y;
        this.screen[this.active_index].w = width;
        this.screen[this.active_index].h = height;
        this.$emit("putData", this.screen);
      } else {
        // console.log("chart 未初始化");
      }
    },
    onDragging(x, y) {
      this.screen[this.active_index].x = x;
      this.screen[this.active_index].y = y;
      // console.log(this.screen);
      this.$emit("putData", this.screen);
    },
    active(index) {
      // console.log(index);
      this.active_index = index;
    },
    deactivate() {
      this.active_index = -1;
      // console.log(this.active_index);
    },
    allowDrop(event) {
      event.preventDefault();
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
  },
  watch: {
    DContent: {
      handler(curVal, oldVal) {
        this.$emit("putcontent", this.DContent);
      },
      deep: true
    }
  }
};
</script>
<style scoped>
* {
  font-family: "微软雅黑";
}
.addtitleType {
  background-color: transparent;
  border: none;
  text-align: center;
  /*border-bottom:1px solid white;*/
  height: 100%;
  width: 70%;
  /*font-size:14px;
    font-weight: bold;*/
}
.titleType {
  background-color: transparent;
  text-align: center;
  border: none;
  height: 100%;
  width: 70%;
}

#md0-container {
  position: absolute;
  width: 1440px;
  height: 790px;
  transform: scale(0.65) translate(0px, 0px);
  transform-origin: 0 0;
  background: url("../../../../static/img/largeScreen/background.jpg");
}
#title {
  height: 15%;
  width: 100%;
  background-color: #01324c;
  border-left: 3px solid white;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
}
#text {
  font-size: 24px;
  font-weight: bold;
  /*padding-top:18px;*/
  color: white;
}
.md0-row {
  height: 95%;
  box-sizing: border-box;
  margin: 10px;
  margin-bottom: 0px;
}
.left,
.right,
.middle {
  height: 100%;
  padding: 0;
}
.useless {
  height: 4%;
}
.pic-left {
  height: 46%;
  position: relative;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/border.png");
  border-image-slice: 16 17 17 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
}

.pic {
  height: 30%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding-right: 5%;
}
.picSub {
  height: 100%;
  width: 100%;
}
.pic1 {
  height: 60%;
  width: 97%;
  margin-left: 10px;
  box-sizing: border-box;
  position: relative;
  padding: 3%;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/border.png");
  border-image-slice: 16 17 17 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  margin-top: 10%;
}
.pic-right {
  height: 31%;
  position: relative;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/border.png");
  border-image-slice: 16 17 17 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
}
.useless2 {
  height: 4%;
}
.useless3 {
  height: 3%;
}

#title1,
#title2,
#title3,
#title4,
#title5 {
  background-color: #01324c;
  border: none;
  border-bottom: 3px solid white;
  height: 100%;
  width: 90%;
  font-size: 18px;
  font-weight: bold;
  color: white;
}
.num {
  height: 35px;
  width: 90%;
  margin-top: 5%;
  border: 2px solid #143f67;
  border-radius: 3px;
  padding: 1px;
}
#num1,
#num2,
#num3,
#num4,
#num5 {
  width: 70%;
  height: 100%;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: none;
}
.fang {
  height: 29px;
  width: 29px;
  background-color: #77e2fe;
  float: right;
  border-radius: 3px;
}

.report-edit {
  width: 100%;
  height: 100%;
}
.report-edit .edit-chart {
  width: 100%;
  height: 80%;
}
.report-edit .edit-chart .chart-con {
  width: 100%;
  height: 100%;
}
.report-edit .edit-chart .chart-con .chart-con-view {
  width: 100%;
  height: 100%;
}
.report-edit .edit-chart .chart-con .chart-con-add {
  font-size: 80px;
  color: #b1b2c4;
  height: 80px;
  width: 80px;
  line-height: 80px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.view-area-box {
  height: 103%;
  width: 100%;
  /*position: absolute;*/
  /*top:-20px;*/
}

.button-publish {
  background-color: #f75e02;
  color: #fff;
  border: none;
  float: right;
}
.box2 {
  padding-right: 3%;
  margin-top: 10px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999;
}

/*.chart-con-view{*/
/*padding-right: 5px;*/
/*}*/

.titlen {
  display: flex;
  justify-content: center;
}
.titlen p {
  color: #ffffff;
  font-size: 31px;
}
.block1 {
  display: flex;
  justify-content: center;
  /*margin-bottom: 12px;*/
  margin-top: 20px;
}
.titlen1 {
  font-size: 16px;
  color: #f75e02;
  margin-top: 0px;
}
.nnum1 {
  color: #f75e02;
  font-size: 20px;
  background: #341344;
  margin: 0 5px;
  padding: 0 5px;
}
.titlen2 {
  font-size: 10px;
  color: #f75e02;
  margin-left: 10px;
}
.nnum2 {
  color: #f75e02;
  font-size: 20px;
  margin-left: 10px;
}
#nnum2 {
  /*margin-left: -20px;*/
  width: 100px;
}
.block2 {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  position: relative;
}
.block2-1,
.block2-2 {
  width: 40%;
}
.block2-1 {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
}
.baby {
  float: left;
  width: 38px;
  height: 38px;
  /*margin-right: 10px;*/
}
#baby {
  margin-right: -10px;
}
.buttonT {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  background: #0a054d;
  border: #0a054d;
  color: #4f4e5c;
}
.buttonT:hover {
  color: white;
}
</style>