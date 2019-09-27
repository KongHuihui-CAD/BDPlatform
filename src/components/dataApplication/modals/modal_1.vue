<template>
    <div id="container">
        <div class="row row1">
            <div class="centertitle">
                <input class="addtitleType" type="text" id="text" placeholder="添加报告标题" v-model="DContent.title[8]">
            </div>
            <!-- <div class='box2'>
                <div class='btn btn-defualt button-publish'>发布</div>
    
                <div class='btn btn-defualt button-back'>返回</div>
            </div> -->
        </div>
        <div class="row row2">
            <div class="left col-md-3 col-sm-3 col-xs-3">
                <div class="firtitle">
                    <input type="text" class="titleType" id="btitle1" v-model="DContent.title[6]" placeholder="添加标题">
                    <!-- <p id="btitle1"  v-model="DContent.title[6]">标题（点击这里进行修改）</p> -->
                </div>
                <div class="pic-left0"  >
    
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title1' v-model="DContent.title[0]">
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num1' v-model="DContent.num[0]">
                        </div>
                    </div>
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title2' v-model="DContent.title[1]">
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num2' v-model="DContent.num[1]">
                        </div>
                    </div>
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title3' v-model="DContent.title[2]">
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num3' v-model="DContent.num[2]">
                        </div>
    
                    </div>
    
                </div>
    
                <div class='useless'></div>
                <div class="pic-left1">
                    <div class="report-edit">
	
					<!-- <div  style="width=20px;height:4%;z-index:999"> -->
						<button  class="buttonT" @click="reLoad11">x</button>
					<!-- </div> -->
					<div style="width: 100%;height: 100%;" @drop='drop11($event)' @dragover='allowDrop($event)'>
						<div class="edit-chart" id="edit-chart11"></div>
					</div>
    
                    </div>
                </div>
    
    
                <div class="pic-left2">
                    <div class="report-edit">
    
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
							<button  class="buttonT" @click="reLoad12">x</button>
						<!-- </div> -->
						<div style="width: 100%;height: 100%;" @drop='drop12($event)' @dragover='allowDrop($event)'>
							<div class="edit-chart" id="edit-chart12"></div>
						</div>
    
                    </div>
                </div>
            </div>
            <div class="middle col-md-6 col-sm-6 col-xs-6">
                <div class="toptitle">
    
                    <div class="block1">
                        <div class="nnum1"><input type="text" class="titleType" v-model="DContent.num[6]" maxlength="12"></div>
                    </div>
                </div>
    
                <div class="pic11">
                    <div class="report-edit">
    
                        <!-- <div  style="width=20px;height:4%;z-index:999"> -->
							<button  class="buttonT" @click="reLoad13">x</button>
						<!-- </div> -->
						<div style="width: 100%;height: 100%;" @drop='drop13($event)' @dragover='allowDrop($event)'>
							<div class="edit-chart" id="edit-chart13"></div>
						</div>
    
                    </div>
                </div>
            </div>
            <div class="right col-md-3 col-sm-3 col-xs-3">
                <div class="firtitle2">
                    <input type="text" class="titleType" id="btitle1" v-model="DContent.title[7]" placeholder="添加标题">
                    <!-- <p id="btitle3" contenteditable="true" v-model="DContent.title[7]">标题（点击这里进行修改）</p> -->
                </div>
                <div class="pic-left3">
    
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title4' v-model="DContent.title[3]">
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num4' v-model="DContent.num[3]">
                        </div>
                    </div>
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title5' v-model="DContent.title[4]">
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num5' v-model="DContent.num[4]">
                        </div>
                    </div>
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title6' v-model="DContent.title[5]">
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num6' v-model="DContent.num[5]">
                        </div>
                    </div>
    
    
                </div>
    
                <div class='useless'></div>
                <div class="pic-left4">
                    <div class="report-edit">
    
						<!-- <div  style="width=20px;height:4%;z-index:999"> -->
							<button  class="buttonT" @click="reLoad14">x</button>
						<!-- </div> -->
						<div style="width: 100%;height: 100%;" @drop='drop14($event)' @dragover='allowDrop($event)'>
							<div class="edit-chart" id="edit-chart14"></div>
						</div>
    
                    </div>
                </div>
    
                <div class="pic-left5">
                    <div class="report-edit">
    
						<!-- <div  style="width=20px;height:4%;z-index:999"> -->
							<button  class="buttonT" @click="reLoad15">x</button>
						<!-- </div> -->
						<div style="width: 100%;height: 100%;" @drop='drop15($event)' @dragover='allowDrop($event)'>
							<div class="edit-chart" id="edit-chart15"></div>
						</div>
    
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
      }
    },
    reLoad11: function() {
      var el = $("#edit-chart11");
      var dom = document.getElementById("edit-chart11");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart11"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart11") {
          index = i;
        }
      }
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad12: function() {
      var el = $("#edit-chart12");
      var dom = document.getElementById("edit-chart12");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart12"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart12") {
          index = i;
        }
      }
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad13: function() {
      var el = $("#edit-chart13");
      var dom = document.getElementById("edit-chart13");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart13"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart13") {
          index = i;
        }
      }
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad14: function() {
      var el = $("#edit-chart14");
      var dom = document.getElementById("edit-chart14");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart14"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart14") {
          index = i;
        }
      }
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad15: function() {
      var el = $("#edit-chart15");
      var dom = document.getElementById("edit-chart15");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart15"></div>';
      // console.log("this"+dom);
      var length = this.Lcontent.length;
      // console.log(length);
      var index = 0;
      for (var i = 0; i < length; i++) {
        // console.log(i);
        if (this.Lcontent[i].BoxId == "edit-chart15") {
          index = i;
        }
      }
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    tranData: function(boxID, option) {
      // alert("begin");
      var data2 = {};
      data2.BoxId = boxID;
      data2.choseOption = option;
      this.Lcontent.push(data2);
      // console.log(this.Lcontent);
      this.$emit("putData", this.Lcontent);
      // alert('llll');
      // this.Mcontent.BoxId=boxID;
      // this.Mcontent.choseOption=option;
      // this.$emit('putData',this.Mcontent);
      // console.log(option);
      // console.log(boxID);
    },
    drop11(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart11");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        // console.log(dom);
        // console.log(this.chooseOption);
        this.myChart.setOption(this.chooseOption);
        // console.log(dom);
        this.tranData("edit-chart11", this.chooseOption);
      }
    },
    drop12(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart12");
      // console.log(dom);
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart12", this.chooseOption);
      }
    },
    drop13(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart13");
      // console.log(dom);
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
        this.tranData("edit-chart13", this.chooseOption);
      }
    },
    drop14(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart14");
      // console.log(dom);
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart14", this.chooseOption);
      }
    },
    drop15(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart15");
      // console.log(dom);
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart15", this.chooseOption);
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
.titleType {
  background-color: transparent;
  border: none;
  /*border-bottom:1px solid white;*/
  height: 100%;
  width: 70%;
  /*font-size:14px;
    font-weight: bold;*/
}
.addtitleType {
  background-color: transparent;
  border: none;
  text-align: center;
  /*border-bottom:1px solid white;*/
  height: 100%;
  width: 70%;
  font-size: 100%;
  margin-top: -25px;
}
#container {
  height: 100%;
  background: url("../../../../static/img/largeScreen/background.png") no-repeat;
  background-position: center center;

  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;

  /* 让背景图基于容器大小伸缩 */
  background-size: cover;

  padding: 1%;
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
.row1 {
  height: 15%;
  box-sizing: border-box;
  margin: 10px -5px 0px -5px !important;
  position: relative;
}
.row2 {
  height: 75%;
  box-sizing: border-box;
  margin: 10px -5px 0px -5px !important;
}
.left {
  width: 28%;
  margin-left: 2%;
}
.right {
  width: 28%;
  margin-left: 2%;
}
.middle {
  width: 38%;
}
.left,
.right,
.middle {
  height: 100%;
  /* width: 100%; */
  padding: 0;
}
.pic-left0 {
  height: 15%;
  background: url("../../../../static/img/largeScreen/left.png") no-repeat;
  background-size: 100% 100%;
}
.pic-left3 {
  height: 15%;
  background: url("../../../../static/img/largeScreen/lefttwo.png") no-repeat;
  background-size: 100% 100%;
}
.leftimg1 {
  margin-top: 20%;
}
.box-left {
  width: 30%;
  height: 40%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  float: right;
  /*margin-left: 5%;*/
}
.box-right {
  width: 30%;
  height: 40%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  float: right;
  /*margin-left: 5%;*/
}
.title {
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 5px 0px;
}
.num {
  height: 100%;
  width: 100%;
  margin-top: 2%;
  border-radius: 3px;
  padding: 1px;
}
#title1,
#title2,
#title3,
#title4,
#title5,
#title6 {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  height: 100%;
  width: 70%;
  font-size: 14px;
  font-weight: bold;
  color: white;
}
#num1,
#num2,
#num3,
#num4,
#num5,
#num6 {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  height: 100%;
  width: 70%;
  font-size: 18px;
  font-weight: bold;
  color: #c4933c;
}
.firtitle {
  height: 6%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  color: #c4933c;
  font-size: 18px;
}
.firtitle2 {
  height: 6%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  color: #c4933c;
  font-size: 18px;
}
.firtitle1 {
  height: 10%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  color: #c4933c;
  font-size: 18px;
  margin-top: 10px;
}
.firtitle3 {
  height: 10%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  color: #c4933c;
  font-size: 18px;
  margin-top: 10px;
}
.report-edit {
  width: 100%;
  height: 100%;
}
.report-edit .edit-chart {
  width: 100%;
  height: 100%;
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
.pic-left1 {
  height: 38%;
  position: relative;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/lefttwo.png");
  border-image-slice: 19 20 30 30 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  margin-top: -5%;
}
.pic-left4 {
  height: 38%;
  position: relative;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/righttwo.png");
  border-image-slice: 19 20 30 30 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  margin-top: -5%;
}
.useless {
  height: 7%;
}
.pic-left2 {
  height: 35%;
  position: relative;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/leftthree.png");
  border-image-slice: 37 18 17 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  margin-top: 8%;
}
.pic-left5 {
  height: 35%;
  position: relative;
  border-style: solid;
  border-width: 16px 17px 17px;
  border-image-source: url("../../../../static/img/largeScreen/rightthree.png");
  border-image-slice: 37 8 12 26 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  margin-top: 8%;
}
.centertitle {
  color: white;
  font-size: 100%;
  text-align: center;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-image: url("../../../../static/img/largeScreen/title.png");
  background-size: 100% 100%;
}
.block1 {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.nnum1 {
  color: #f7e17f;
  font-size: 34px;
  background: #503654;
  margin: 0 5px;
  padding: 0 5px;
}
.pic11 {
  height: 90%;
  width: 100%;
  position: relative;
  /*border: 1px solid white;*/

  margin-top: 5%;
}

.popup-report {
  display: none;
}
.popup .popup-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.edit-popup {
  width: 750px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
}
.edit-popup .popup-tl {
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background-color: #f3f4f9;
  padding-left: 10px;
  font-size: 20px;
  line-height: 60px;
  color: #8c9098;
  position: relative;
}
.edit-popup .popup-tl .goback {
  cursor: pointer;
}
.edit-popup .popup-tl .goback:hover {
  text-decoration: underline;
}
.edit-popup .popup-tl .popup-cl {
  width: 20px;
  height: 20px;
  border: 2px solid #8c9098;
  border-radius: 50%;
  background: url("../../../../static/img/largeScreen/close.gif") no-repeat;
  background-position: 50% 50%;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
}

.edit-popup .popup-con {
  height: 360px;
  padding-top: 20px;
}
.edit-popup .popup-con .cache-box {
  width: 100%;
}
.edit-popup .popup-con .data-cache,
.edit-popup .popup-con .view-cache {
  height: 100px;
  width: 50%;
  margin: 30px auto 0;
  line-height: 100px;
  text-align: center;
  color: #4a86c5;
  border: 1px solid #4a86c5;
  cursor: pointer;
}
.edit-popup .popup-con .view-cache-box {
  display: none;
}
.edit-popup .popup-con .data-cache-box {
  display: none;
}

.edit-popup .popup-con .form-group {
  clear: both;
  display: block;
  padding: 10px 0;
  vertical-align: middle;
}
.edit-popup .popup-con .form-group .form-t {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.edit-popup .popup-btn {
  height: 80px;
  line-height: 80px;
  background-color: #5f93e1;
  color: #fff;
  text-align: center;
}
.edit-popup .popup-btn .btn-add {
  display: inline-block;
  *display: inline; /* Fix for IE7 */
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  border-radius: 10px;
  border: 2px solid #fff;
  font-size: 18px;
  cursor: pointer;
}
.edit-popup .popup-btn .btn-cancel {
  color: #f0f0f0;
  text-decoration: underline;
  cursor: pointer;
}

.view-area-box {
  height: 103%;
  width: 100%;
}
.box2 {
  position: absolute;
  top: 5px;
  right: 5px;
}
.button-publish {
  background-color: #2b1f58;
  color: #fff;
  border: none;
}
.button-back {
  background-color: #2b1f58;
  color: #fff;
  border: none;
}
</style>