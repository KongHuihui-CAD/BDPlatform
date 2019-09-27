<template>
  <div id="graph-content">

    <div id="content">
      <div class="title">18同济交通夏令营录取情况</div>
      <div class="subtitle">{{university}}</div>

      <grid-layout :layout="layout" :col-num="12" :row-height="rowHeight" :is-draggable="draggable" :is-resizable="resizable" :vertical-compact="true" :use-css-transforms="true">
        <!-- <grid-item v-for="(item,index) in numberData" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :min-w="2" :min-h="2" :i="item.i" @resize="resize" @move="move" @resized="resized" @moved="moved" @update="update"> -->
        <number-display></number-display>
        <!-- </grid-item> -->
        <grid-item v-for="(item,index) in layout" :keys="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :min-w="2" :min-h="2" :i="item.i" @resize="resize" @move="move" @resized="resized" @moved="moved" @update="update">
          <test-element :option="newoption[index]" :fxdata="newfxdata" :data="newdata" :nodedata="newnodedata" :university="newuniversity" :alldata="newalldata" :id="item.i" :h="newHeight" :w="newWidth" v-on:headCallBack="headcal"></test-element>
        </grid-item>
      </grid-layout>
      <hr />
    </div>

  </div>
</template>

 <script>
import GridItem from "./GridItem.vue";
import GridLayout from "./GridLayout.vue";
import TestElement from "./TestElement.vue";
import CustomDragElement from "./CustomDragElement.vue";
import numberDisplay from "./numberDisplay.vue";

export default {
  name: "app",
  props: {
    fx: {
      type: Array
    },
    fxdata: {
      type: Array
    },
    data: {
      type: Object
    },
    nodedata: {
      type: Array
    },
    university: {
      type: String
    },
    alldata: {
      type: Array
    },
    option: {
      type: Array
    },
    testLayout: {
      type: Array
    },
    number: {
      type: Array
    }
  },
  components: {
    //ResponsiveGridLayout,
    GridLayout,
    GridItem,
    TestElement,
    CustomDragElement,
    numberDisplay
  },
  data() {
    return {
      // layout:[],
      // layout2:[],
      layout: JSON.parse(JSON.stringify(this.testLayout)),
      layout2: JSON.parse(JSON.stringify(this.testLayout)),
      // numberData: JSON.parse(JSON.stringify(this.number)),
      draggable: true,
      resizable: true,
      rowHeight: 30,
      newHeight: 310,
      newWidth: 530,
      colNum: 0,
      index: 0,
      newoption: [],
      newtestLayout: [],
      newfx: [],
      newfxdata: [],
      newdata: {},
      newnodedata: [],
      newuniversity: "",
      newalldata: []
      // option:[{"yAxis":{"name":"人数","type":"value"},"xAxis":{"name":"检查年份","type":"category","data":["1010","1984","1986","2001","2002","2004","2006","2007","2008","2009","2010","2011","2012","2013","2014"],"boundaryGap":true,"axisLabel":{"show":true,"interval":"0","inside":false}},"legend":{"data":["人数"]},"series":[{"type":"bar","name":"人数","stack":"0","color":null,"data":[1,1,1,1,1,1,1,1,5,234,96126,100248,296781,569599,476228],"areaStyle":null,"yAxisIndex":0,"xAxisIndex":0}],"tooltip":{"show":true,"trigger":"axis","formatter":""}},
      // {"yAxis":{"name":"哈哈","type":"value"},"xAxis":{"name":"压力","type":"category","data":["很大","很少","无压力","有一点","比较大","缺失"],"boundaryGap":true,"axisLabel":{"show":true,"interval":"0","inside":false}},"legend":{"data":["人数"]},"series":[{"type":"bar","name":"人数","stack":"0","color":null,"data":[19489,1091897,2871294,1037956,132437,56631],"areaStyle":null,"yAxisIndex":0,"xAxisIndex":0}],"tooltip":{"show":true,"trigger":"axis","formatter":""}},
      // {"yAxis":{"name":"比率","type":"value"},"xAxis":{"name":"年份","type":"category","data":["2010","2011","2012","2013","2014","2015","2016","2017"],"boundaryGap":true,"axisLabel":{"show":true,"interval":"0","inside":false}},"legend":{"data":["比率"]},"series":[{"type":"bar","name":"比率","stack":"0","color":null,"data":[0.01,0.05,0.07,0.09,0.1,0.11,0.11,0.11],"areaStyle":null,"yAxisIndex":0,"xAxisIndex":0}],"tooltip":{"show":true,"trigger":"axis","formatter":""}}]
    };
  },
  mounted: function() {
    this.index = this.layout.length;
    console.log("kkk" + this.option);
    console.log("ppp" + this.layout);
  },
  methods: {
    clicked: function() {
      window.alert("CLICK!");
    },
    increaseWidth: function(item) {
      var width = document.getElementById("content").offsetWidth;
      width += 20;
      document.getElementById("content").style.width = width + "px";
    },
    decreaseWidth: function(item) {
      var width = document.getElementById("content").offsetWidth;
      width -= 20;
      document.getElementById("content").style.width = width + "px";
    },
    removeItem: function(item) {
      //console.log("### REMOVE " + item.i);
      this.layout.splice(this.layout.indexOf(item), 1);
    },
    addItem: function() {
      var self = this;
      //console.log("### LENGTH: " + this.layout.length);
      var item = {
        x: 6,
        y: 0,
        w: 6,
        h: 6,
        i: this.index + "",
        whatever: "bbb"
      };
      this.index++;
      this.layout.push(item);
    },
    move: function(i, newX, newY) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resize: function(i, newH, newW, newHPx, newWPx) {
      console.log(
        "RESIZE i=" +
          i +
          ", H=" +
          newH +
          ", W=" +
          newW +
          ", H(px)=" +
          newHPx +
          ", W(px)=" +
          newWPx
      );
      this.newHeight = newHPx;
      this.newWidth = newWPx;
    },
    moved: function(i, newX, newY) {
      console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resized: function(i, newH, newW, newHPx, newWPx) {
      console.log(
        "### RESIZED i=" +
          i +
          ", H=" +
          newH +
          ", W=" +
          newW +
          ", H(px)=" +
          newHPx +
          ", W(px)=" +
          newWPx
      );
      this.newHeight = newHPx;
      this.newWidth = newWPx;
    },
    update: function(width) {
      this.newWidth = width;
    },
    /**
     * Add change direction button
     */
    changeDirection() {
      let documentDirection =
        document.dir != undefined
          ? document.dir
          : document.getElementsByTagName("html")[0].getAttribute("dir");
      let toggle = "";
      if (documentDirection == "rtl") {
        toggle = "ltr";
      } else {
        toggle = "rtl";
      }
      var html = document.getElementsByTagName("html")[0];
      html.setAttribute("dir", toggle);
      //eventBus.$emit('directionchange');
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
    headcal: function(msg) {
      //回调方法，接收子组件传的参数
      // alert("传值"+JSON.stringify(msg));
      this.message = msg;
      if (this.message != "") {
        this.newoption[0].series[0].data = this.message.data1;
        this.newoption[0].series[1].data = this.message.data2;
        this.newoption[2].series[0].data = this.message.nodedata;
        this.newoption[1].series[0].data = this.message.piedata;
        this.university = this.message.university;
      }
    }
  },
  watch: {
    option: {
      handler: function() {
        console.log("haha");
        console.log(this.option);
        this.newoption = this.option;
        // alert("变了"+JSON.stringify(this.newoption));
      },
      //深度观察
      deep: true
    },
    fxdata: {
      handler: function() {
        console.log("这是fxdata数据");
        console.log(this.fxdata);
        this.newfxdata = this.fxdata;
      },
      //深度观察
      deep: true
    },
    data: {
      handler: function() {
        console.log("这是data数据");
        console.log(this.data);
        this.newdata = this.data;
      },
      //深度观察
      deep: true
    },
    nodedata: {
      handler: function() {
        console.log("这是nodedata数据");
        console.log(this.nodedata);
        this.newnodedata = this.nodedata;
      },
      //深度观察
      deep: true
    },
    university: {
      handler: function() {
        console.log("这是university数据");
        console.log(this.university);
        this.newuniversity = this.university;
      },
      //深度观察
      deep: true
    },
    alldata: {
      handler: function() {
        console.log("这是alldata数据");
        console.log(this.alldata);
        this.newalldata = this.alldata;
      },
      //深度观察
      deep: true
    },
    testLayout: {
      handler: function() {
        console.log("hehe");
        console.log(this.testLayout);
        this.layout = JSON.parse(JSON.stringify(this.testLayout));
      },
      //深度观察
      deep: true
    },
    // number: {
    //   handler: function() {
    //     console.log("hehe");
    //     console.log(this.number);
    //     this.numberData = JSON.parse(JSON.stringify(this.number));
    //   },
    //   //深度观察
    //   deep: true
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#graph-content {
  margin: 0px 10px;
  background-color: #eeeeee;
  text-align: center;
  height: 1024px;
}
.title {
  font-size: 25px;
  font-weight: 800;
  padding-top: 10px;
}
.subtitle {
  font-size: 18px;
  font-weight: 500;
  color: #fb7777;
  padding: 10px;
}
</style>
