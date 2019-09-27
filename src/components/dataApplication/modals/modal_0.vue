<template>
    
    <div id="md0-container" >
  <!-- <div id="title" ><span id="text">如何实时展现数据?</span></div> -->
        <div class="md0-row" >
            <div class="left col-md-3 col-sm-3 col-xs-3">

                <div class='useless'></div>
                <div class="pic-left" >
                    
                    <div class="report-edit">
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
                                <button  class="buttonT"  @click="reLoad1">x</button>
                        <!-- </div> -->
                        <!-- <div class="edit-chart" id="edit-chart1" @drop='drop1($event)' @dragover='allowDrop($event)'>
                            
                                

                        </div> -->
                        <div style="width: 100%;height: 100%;" @drop='drop1($event)' @dragover='allowDrop($event)'>
                            <div class="edit-chart" id="edit-chart1"></div>
                        </div>

                    </div>
                </div>
                <div class='useless'></div>
                <div class="pic-left">
                    <div class="report-edit">
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
                                <button  class="buttonT" @click="reLoad2">x</button>
                        <!-- </div> -->

                        <!-- <div class="edit-chart" id="edit-chart2" @drop='drop2($event)' @dragover='allowDrop($event)'>

                        </div> -->
                        <div style="width: 100%;height: 100%;" @drop='drop2($event)' @dragover='allowDrop($event)'>
                            <div class="edit-chart" id="edit-chart2"></div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="middle col-md-6 col-sm-6 col-xs-6">
                <div class="pic">
                    <div class="titlen"><input id="text" type="text" class="addtitleType" v-model="DContent.title[2]" placeholder="添加报告标题"> </div>
                    <div class="block1">
                        <div class="titlen1"><input class="titleType" type="text" v-model="DContent.title[3]" placeholder="添加数据标题"></div>
                    </div>
                    <div class="block1">
                        <div class="nnum1"><input type="text" class="titleType" maxlength="12"  v-model="DContent.num[2]"></div>
                    </div>
                    <div class="block2">
                        <div class="block2-1">
                            <img src="../../../../static/img/largeScreen/baby.png" class="baby" id='baby'/>
                            <div>
                                <div class="titlen2"><input class="titleType" type="text" v-model="DContent.title[0]" placeholder="添加标题"></div>
                                <div class="nnum2"><input class="titleType" type="text" id='nnum2' v-model="DContent.num[0]" placeholder="添加数据"></div>
                            </div>
                        </div>
                        <div class="block2-2">
                            <img src="../../../../static/img/largeScreen/boy.png" class="baby"/>
                            <div>
                                <div class="titlen2"><input class="titleType" type="text" v-model="DContent.title[1]" placeholder="添加标题"></div>
                                <div class="nnum2"><input class="titleType" type="text" v-model="DContent.num[1]" placeholder="添加数据"></div>
                            </div>
                        </div>
                    </div>



                </div>
                <div class="pic1" >
                    <div class="report-edit">
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
                                <button  class="buttonT" @click="reLoad3">x</button>
                        <!-- </div> -->

                        <!-- <div class="edit-chart" id="edit-chart3" @drop='drop3($event)' @dragover='allowDrop($event)'>
                        
                        </div> -->
                        <div style="width: 100%;height: 100%;" @drop='drop3($event)' @dragover='allowDrop($event)'>
                            <div class="edit-chart" id="edit-chart3"></div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="right col-md-3 col-sm-3 col-xs-3">
                <div class="pic-right" >
                    <div class="report-edit">
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
                                <button  class="buttonT" @click="reLoad4">x</button>
                        <!-- </div> -->
                        <div style="width: 100%;height: 100%;" @drop='drop4($event)' @dragover='allowDrop($event)'>
                            <div class="edit-chart" id="edit-chart4"></div>
                        </div>

                        <!-- <div class="edit-chart" id="edit-chart4" @drop='drop4($event)' @dragover='allowDrop($event)'>

                        </div> -->

                    </div>
                </div>
                <div class='useless2'></div>
                <div class="pic-right">
                    <div class="report-edit">
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
                                <button  class="buttonT" @click="reLoad5">x</button>
                        <!-- </div> -->

                        <div style="width: 100%;height: 100%;" @drop='drop5($event)' @dragover='allowDrop($event)'>
                            <div class="edit-chart" id="edit-chart5"></div>
                        </div>

                    </div>
                </div>
                <div class='useless3'></div>
                <div class="pic-right" >
                    <div class="report-edit">
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
                                <button  class="buttonT" @click="reLoad6">x</button>
                        <!-- </div> -->
                        <div style="width: 100%;height: 100%;" @drop='drop6($event)' @dragover='allowDrop($event)'>
                            <div class="edit-chart" id="edit-chart6"></div>
                        </div>

                        <!-- <div class="edit-chart" id="edit-chart6" @drop='drop6($event)' @dragover='allowDrop($event)'>

                        </div> -->

                    </div>
                </div>
            </div>
        </div>

    </div>
    
</template>
<script>
import echarts from "echarts";
export default {
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
      myChart: {},
      Mcontent: {
        BoxId: "",
        choseOption: {}
      },
      Lcontent: [],
      DContent: {
        title: [],
        num: []
      }
    };
  },
  created() {
    this.getCache();
  },
  mounted() {
    this.drawR();
  },
  methods: {
    resetPieT(myChart, params, opt) {
      
      var geoCoordMap = {
        北京: [116.4, 39.9],
        天津: [117.2, 39.12],
        河北: [114.52, 38.05],
        山西: [112.55, 37.87],
        内蒙古: [111.73, 40.83],
        辽宁: [123.43, 41.8],
        吉林: [125.32, 43.9],
        黑龙江: [126.53, 45.8],
        上海: [121.47, 31.23],
        江苏: [118.78, 32.07],
        浙江: [120.15, 30.28],
        安徽: [117.25, 31.83],
        福建: [119.3, 26.08],
        江西: [115.85, 28.68],
        山东: [116.98, 36.67],
        河南: [113.62, 34.75],
        湖北: [114.3, 30.6],
        湖南: [112.93, 28.23],
        广东: [113.27, 23.13],
        广西: [108.37, 22.82],
        海南: [110.32, 20.03],
        重庆: [106.55, 29.57],
        四川: [104.07, 30.67],
        贵州: [106.63, 26.65],
        云南: [102.72, 25.05],
        西藏: [91.13, 29.65],
        陕西: [108.93, 34.27],
        甘肃: [103.82, 36.07],
        青海: [101.78, 36.62],
        宁夏: [106.28, 38.47],
        新疆: [87.62, 43.82],
        香港: [114.08, 22.2],
        澳门: [113.33, 22.13],
        台湾: [121.5, 25.03]
      };

      var op = opt;
      // myChart.setOption(op);
      for(var m =0;m<op.options.length;m++){

        var ops = op.options[m].series;
        ops.forEach(function(v, i) {
          if (i > 0) {
           
            var geoCoord = geoCoordMap[v.name];

            // var p = myChart.convertToPixel({ seriesIndex: '0' }, geoCoord);
            var p = myChart.convertToPixel({seriesIndex:'0'}, geoCoord);
            v.center = p;

            if (params != 0 && params.zoom) {
              v.radius = v.radius * params.zoom;
            }
            if (params != 0 && params.selected) {
              var rangeFirstNumber = params.selected[0];
              var rangeSecondNumber = params.selected[1];
              var pd = v.data[typeIndex].value;
              if (pd < rangeFirstNumber || pd > rangeSecondNumber) {
                v.itemStyle.normal.opacity = 0;
              } else {
                v.itemStyle.normal.opacity = 1;
              }
            }
          }
        });
      }
      myChart.setOption(op, true);
    },
    resetPie(myChart, params, opt) {
      var geoCoordMap = {
        北京: [116.4, 39.9],
        天津: [117.2, 39.12],
        河北: [114.52, 38.05],
        山西: [112.55, 37.87],
        内蒙古: [111.73, 40.83],
        辽宁: [123.43, 41.8],
        吉林: [125.32, 43.9],
        黑龙江: [126.53, 45.8],
        上海: [121.47, 31.23],
        江苏: [118.78, 32.07],
        浙江: [120.15, 30.28],
        安徽: [117.25, 31.83],
        福建: [119.3, 26.08],
        江西: [115.85, 28.68],
        山东: [116.98, 36.67],
        河南: [113.62, 34.75],
        湖北: [114.3, 30.6],
        湖南: [112.93, 28.23],
        广东: [113.27, 23.13],
        广西: [108.37, 22.82],
        海南: [110.32, 20.03],
        重庆: [106.55, 29.57],
        四川: [104.07, 30.67],
        贵州: [106.63, 26.65],
        云南: [102.72, 25.05],
        西藏: [91.13, 29.65],
        陕西: [108.93, 34.27],
        甘肃: [103.82, 36.07],
        青海: [101.78, 36.62],
        宁夏: [106.28, 38.47],
        新疆: [87.62, 43.82],
        香港: [114.08, 22.2],
        澳门: [113.33, 22.13],
        台湾: [121.5, 25.03]
      };
      var op = opt;

      var ops = op.series;
      ops.forEach(function(v, i) {
        if (i > 0) {
          var geoCoord = geoCoordMap[v.name];

          var p = myChart.convertToPixel({ seriesIndex: 0 }, geoCoord);
          v.center = p;

          if (params != 0 && params.zoom) {
            v.radius = v.radius * params.zoom;
          }
          if (params != 0 && params.selected) {
            var rangeFirstNumber = params.selected[0];
            var rangeSecondNumber = params.selected[1];
            var pd = v.data[typeIndex].value;
            if (pd < rangeFirstNumber || pd > rangeSecondNumber) {
              v.itemStyle.normal.opacity = 0;
            } else {
              v.itemStyle.normal.opacity = 1;
            }
          }
        }
      });
      myChart.setOption(op, true);
    },

    getCache: function() {
      var local = window.localStorage;
      // alert(this.reportId);
      if (!this.reportId) {
        // alert("no.0");
        var bigCache = JSON.parse(local.getItem("bigCache")) || [];
        // console.log(bigCache.length);
        if (bigCache.length !== 0) {
          this.Lcontent = bigCache.data;

          this.DContent = bigCache.content;
        }
      } else {
        // alert("yes.0");
        var bigCache = JSON.parse(local.getItem("bigCache")) || [];
        // console.log(bigCache0);
        if (bigCache.length !== 0) {
          // alert("000");
          this.Lcontent = bigCache.data;

          this.DContent = bigCache.content;
        } else {
          // alert("111");
          this.$http
            .get("largeScreen/user/getreportbyid?reportid=" + this.reportId)
            .then(response => {
              var data = response.body;
              // console.log(data);
              this.Lcontent = JSON.parse(data.DATA.reportData).result;
              this.DContent = JSON.parse(data.DATA.reportData).desc.content;
              // console.log(this.Lcontent);
              this.drawR();
              // var bigCache0 = {data: this.Lcontent,content:this.DContent,layer:1}
              // alert("order");
              // local.setItem('bigCache'+(this.reportId), JSON.stringify(bigCache0));
              // console.log(bigCache0);
            });
        }
      }
    },
    drawR: function() {
      for (var i = 0; i < this.Lcontent.length; i++) {
        // alert(this.Lcontent[i].BoxId)
        var dom = document.getElementById(this.Lcontent[i].BoxId);
        this.myChart = echarts.init(dom);
        if (
          this.Lcontent[i].choseOption.series !== undefined &&
          this.Lcontent[i].choseOption.series[1] !== undefined &&
          this.Lcontent[i].choseOption.series[1].type == "custom"
        ) {
          var opt = this.Lcontent[i].choseOption.series[1];
          opt["renderItem"] = renderItem;
          this.myChart.setOption(this.Lcontent[i].choseOption);
        } else {
          this.myChart.setOption(this.Lcontent[i].choseOption);
        }
        // this.myChart.setOption(this.Lcontent[i].choseOption);

        this.myChart.setOption(this.Lcontent[i].choseOption);
      }
    },
    reLoad1: function() {
      var el = $("#edit-chart1");
      var dom = document.getElementById("edit-chart1");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart1"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart1") {
          index = i;
        }
      }
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad2: function() {
      // alert("000");
      var el = $("#edit-chart2");
      var dom = document.getElementById("edit-chart2");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML =
        '<div class="edit-chart" id="edit-chart2" @drop="drop2($event)" @dragover="allowDrop($event)"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart2") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad3: function() {
      // alert("000");
      var el = $("#edit-chart3");
      var dom = document.getElementById("edit-chart3");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart3"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart3") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad4: function() {
      // alert("000");
      var el = $("#edit-chart4");
      var dom = document.getElementById("edit-chart4");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart4"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart4") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad5: function() {
      // alert("000");
      var el = $("#edit-chart5");
      var dom = document.getElementById("edit-chart5");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart5"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart5") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad6: function() {
      // alert("000");
      var el = $("#edit-chart6");
      var dom = document.getElementById("edit-chart6");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart6"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart6") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    tranData: function(boxID, option) {
      // alert("begin");
      var data1 = {};
      data1.BoxId = boxID;
      data1.choseOption = option;
      this.Lcontent.push(data1);
       console.log(this.Lcontent);
      this.$emit("putData", this.Lcontent);
      // alert('llll');
      // this.Mcontent.BoxId=boxID;
      // this.Mcontent.choseOption=option;
      // this.$emit('putData',this.Mcontent);
      // console.log(option);
      // console.log(boxID);
    },
    drop1(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart1");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        // console.log(dom);
        // console.log(this.chooseOption);
        this.myChart.setOption(this.chooseOption);
        // console.log(dom);
        this.tranData("edit-chart1", this.chooseOption);
      }
    },
    drop2(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart2");
      // console.log(dom);
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart2", this.chooseOption);
      }
    },
    drop3(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart3");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        if(this.chooseOption.baseOption){
          if (
            this.chooseOption.baseOption.series !== undefined &&
            this.chooseOption.baseOption.series[1] !== undefined &&
            this.chooseOption.baseOption.series[1].type == "pie"
            ){
             
            
              var opt = this.chooseOption;
              // this.myChart.setOption(this.reportOption[i].choseOption)
              this.resetPieT(this.myChart, 0, opt);
              window.addEventListener("resize", () => {
              this.myChart.resize();
              this.resetPieT(this.myChart, 0, opt);
            });
          }
        }
        var opt = this.chooseOption;
        if (
          opt.series !== undefined &&
          opt.series[1] !== undefined &&
          opt.series[1].type == "pie"
        ) {
          console.log("map");
          this.resetPie(this.myChart, 0, opt);
          window.addEventListener("resize", () => {
            this.myChart.resize();
            this.resetPie(this.myChart, 0, opt);
          });
        }
        this.tranData("edit-chart3", this.chooseOption);
      }
    },
    drop4(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart4");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart4", this.chooseOption);
      }
    },
    drop5(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart5");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart5", this.chooseOption);
      }
    },
    drop6(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart6");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart6", this.chooseOption);
      }
    },
    allowDrop(event) {
      event.preventDefault();
    }
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
  height: 88%;
  /*background-color: #404a59;*/
  background: url("../../../../static/img/largeScreen/background.jpg");
  repeat: no-repeat;
  background-attachment: fixed;
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
  -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  padding: 1%;
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
  /*margin-top: 10px;*/
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
  margin-top: -10px;
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