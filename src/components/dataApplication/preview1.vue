<template>
    <div id="container">
        <div class="row row1">
            <div class="centertitle">
				<p id="text1" class="addtitleType">{{DContent.title[8]}}</p>
                <!-- <p id="text">我是标题数据</p> -->
            </div>
            <!-- <div class='box2'>
                <div class='btn btn-defualt button-publish'>发布</div>
    
                <div class='btn btn-defualt button-back'>返回</div>
            </div> -->
        </div>
        <div class="row row2">
            <div class="left col-md-3 col-sm-3 col-xs-3">
                <div class="firtitle">
                <!-- <p id="btitle1"  v-model="DContent.title[6]">标题（点击这里进行修改）</p> -->
                    <p id="btitle1" style='color:white;font-size:20px;'>{{DContent.title[6]}}</p>
                </div>
				<div class="pic-left0">
				   <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title' name="title1" id='title1'>
                            {{DContent.title[0]}}
                        </div>
                        <div class='num' name="num1" id='num1'>
                            {{DContent.num[0]}}
                        </div>
                    </div>
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title' name="title1" id='title2'>
                           {{DContent.title[1]}}
                        </div>
                        <div class='num' name="num1" id='num2'>
                           {{DContent.num[1]}}
                        </div>
                    </div>
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title' name="title1" id='title3'>
                           {{DContent.title[2]}}
                        </div>
                        <div class='num' name="num1" id='num3'>
                           {{DContent.num[2]}}
                        </div>
    
                    </div>
    
                    <!-- <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title1'>
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num1'>
                        </div>
                    </div>
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title2'>
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num2'>
                        </div>
                    </div>
                    <div class='box-left' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title3'>
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num3'>
                        </div>
    
                    </div> -->
    
                </div>
    
                <div class='useless'></div>
                <div class="pic-left1">
                    <div class="report-edit">
						<div class="edit-chart" id="edit-chart11"></div>
                    </div>
                </div>
    
    
                <div class="pic-left2">
                    <div class="report-edit">
						<div class="edit-chart" id="edit-chart12"></div>
                    </div>
                </div>
            </div>
            <div class="middle col-md-6 col-sm-6 col-xs-6">
                <div class="toptitle">
    
                    <div class="block1">
                        <div class="nnum1" v-for="item in Snum">{{item}}</div>
                    </div>
                </div>
    
                <div class="pic11">
                    <div class="report-edit">
						<div class="edit-chart" id="edit-chart13"></div>
                    </div>
                </div>
            </div>
            <div class="right col-md-3 col-sm-3 col-xs-3">
                <div class="firtitle2">
                    <p id="btitle1" style='color:white;font-size:20px;'>{{DContent.title[7]}}</p>
                </div>
                <div class="pic-left3" >
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title' name="title1" id='title4'>
                           {{DContent.title[3]}}
                        </div>
                        <div class='num' name="num1" id='num4'>
                            {{DContent.num[3]}}
                        </div>
                    </div>
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title' name="title1" id='title5'>
                            {{DContent.title[4]}}
                        </div>
                        <div class='num' name="num1" id='num5'>
                            {{DContent.num[4]}}
                        </div>
                    </div>
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title' name="title1" id='title6'>
                            {{DContent.title[5]}}
                        </div>
                        <div class='num' name="num1" id='num5'>
                            {{DContent.num[5]}}
                        </div>
                    </div>
    
                    <!-- <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title4'>
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num4'>
                        </div>
                    </div>
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title5'>
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num5'>
                        </div>
                    </div>
                    <div class='box-right' style='margin-bottom:10px;'>
                        <div class='title'>
                            <input type="text" name="title1" id='title6'>
                        </div>
                        <div class='num'>
                            <input type="text" name="num1" id='num6'>
                        </div>
                    </div>
     -->
    
                </div>
    
                <div class='useless'></div>
                <div class="pic-left4">
                    <div class="report-edit">
						<div class="edit-chart" id="edit-chart14"></div>
    
                    </div>
                </div>
    
                <div class="pic-left5">
                    <div class="report-edit">
    
						<div class="edit-chart" id="edit-chart15"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      reportOption: [],
      myChart1: "",
      DContent: {
        title: [],
        num: []
      },
      Snum: [],
      tx:[]
    };
  },
  created: function() {
    $.get("./../../static/json/guangdong.json", function(geoJson) {
      echarts.registerMap("guangdong", geoJson);
    });
    $.get("./../../static/json/china.json", function(geoJson) {
      echarts.registerMap("china", geoJson);
      // alert("true00");
    });
    this.id = this.$route.query.id;
    // console.log(this.id);
    if (this.id) {
      // 查看报告
      this.$http
        .get("largeScreen/user/getreportbyid?reportid=" + this.id)
        .then(response => {
          // alert("mem");
          var data = response.body;
          this.reportOption = JSON.parse(data.DATA.reportData).result;
          this.DContent = JSON.parse(data.DATA.reportData).desc.content;
          if (this.DContent.num[6] === undefined) {
            this.Snum = [];
          } else {
            this.Snum = this.DContent.num[6].split("");
          }
          this.drawReport();
        });
    } else {
      // 预览报告
      this.reportOption = this.$route.query.data;
      this.DContent = this.$route.query.content;
      if (this.DContent.num[6] === undefined) {
        this.Snum = [];
      } else {
        this.Snum = this.DContent.num[6].split("");
      }
      // alert("111");
      // console.log(this.reportOption);
      // this.$nextTick(() => {
      // 	alert("222");
      //    this.drawReport();
      // });
    }
  },
  mounted() {

    this.drawReport();
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
    drawReport: function() {
      var id0 = -1;
      var list = [];
      var listO =[];

      for (var i = 0; i < this.reportOption.length; i++) {
        //alert(this.reportOption1[i+1].BoxId)
        var dom = document.getElementById(this.reportOption[i].BoxId);
        this.myChart1 = echarts.init(dom);
        if (
          this.reportOption[i].choseOption.series !== undefined &&
          this.reportOption[i].choseOption.series[1] !== undefined &&
          this.reportOption[i].choseOption.series[1].type == "custom"
        ) {
          var opt = this.reportOption[i].choseOption.series[1];
          opt["renderItem"] = renderItem;
          console.log(opt);
          this.myChart1.setOption(this.reportOption[i].choseOption);
        } else {
          this.myChart1.setOption(this.reportOption[i].choseOption);
        }
        if(this.reportOption[i].choseOption.baseOption){
          if (
            this.reportOption[i].choseOption.baseOption.series !== undefined &&
            this.reportOption[i].choseOption.baseOption.series[1] !== undefined &&
            this.reportOption[i].choseOption.baseOption.series[1].type == "pie"
            ){
             
            
              var opt = this.reportOption[i].choseOption;
              // this.myChart1.setOption(this.reportOption[i].choseOption)
              this.resetPieT(this.myChart1, 0, opt);
              window.addEventListener("resize", () => {
              this.myChart1.resize();
              this.resetPieT(this.myChart1, 0, opt);
            });
          }
        }
        // this.myChart1.setOption(this.reportOption[i].choseOption);
        var opt = this.reportOption[i].choseOption;
        if (
          opt.series !== undefined &&
          opt.series[1] !== undefined &&
          opt.series[1].type == "pie"
        ) {
          this.resetPie(this.myChart1, 0, opt);
          window.addEventListener("resize", () => {
            this.myChart.resize();
            this.resetPie(this.myChart1, 0, opt);
          });
        }
        if(opt.series !== undefined && opt.series[0] !== undefined ){
          

          if(opt.series[0].type == "pie" )
          {
            id0 = id0 +1;
            this.myChart1.setOption(opt);
            list[id0] = this.myChart1;
            listO[id0] = opt;
          }else if(opt.series[0].type == "bar" )
          {
            id0=id0+1;
            this.myChart1.setOption(opt);
            list[id0] = this.myChart1;
            listO[id0] = opt;
          }

        }
      }
      var that = this;
      for(var e=0; e<list.length;e++){
          (function (lockedInIndex) {
            var currentIndex = -1;
            that.tx[e] =setInterval(function () {
              console.log(e);
                var dataLen = listO[lockedInIndex].series[0].data.length;
                // 取消之前高亮的图形
                list[lockedInIndex].dispatchAction({  
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // console.log(currentIndex);
                // 高亮当前图形
                list[lockedInIndex].dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                // 显示 tooltip
                list[lockedInIndex].dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            }, 2000);
            

        })(e);
        
      }
    }
  },
  destroyed: function(){
    for(var m = 0; m<this.tx.length; m++){
      window.clearInterval(this.tx[m]);
   }
  }
};
</script>
<style scoped>
* {
  font-family: "微软雅黑";
}
#container {
  height: 100vh;
  width: 100%;
  background: url("../../../static/img/largeScreen/background.png") no-repeat;
  background-position: center center;

  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;

  /* 让背景图基于容器大小伸缩 */
  background-size: cover;

  padding: 1%;
}

.buttonT {
  float: right;
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
  background: url("../../../static/img/largeScreen/left.png") no-repeat;
  background-size: 100% 100%;
}
.pic-left3 {
  height: 15%;
  background: url("../../../static/img/largeScreen/lefttwo.png") no-repeat;
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
  margin-top:10px;
  /*margin-left: 5%;*/
}
.box-right {
  width: 30%;
  height: 40%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  float: right;
  margin-top:10px;
  /*margin-left: 5%;*/
}
.title {
  width: 100%;
  height: 100%;
  background-color: transparent;
}
.num {
  height: 100%;
  width: 100%;
  border-radius: 3px;
  padding: 1px;
}
#text1{
	font-size:30px;
	font-weight:bold;
	padding-top:10px;
	color:white;
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
  font-size: 16px;
  font-weight: lighter;
  color: white;
  padding-top: 15px;
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
  text-align:center;
  padding-top: 15px;
}
.firtitle {
  height: 6%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  /*color: #c4933c;*/
  color:#fff;
  font-size: 20px;
  font-weight:lighter;
  margin-bottom:10px;
}
.firtitle2 {
  height: 6%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  /*color: #c4933c;*/
  color: #fff;
  font-size: 20px;
  font-weight:lighter;
  margin-bottom:10px;
}
.firtitle1 {
  height: 10%;
  width: 100%;
  background-color: transparent;
  position: relative;
  padding-left: 2%;
  display: flex;
  align-items: center;
  /*color: #c4933c;*/
  color:#fff;
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
  /*color: #c4933c;*/
  color:#fff;
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
  border-image-source: url("../../../static/img/largeScreen/lefttwo.png");
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
  border-image-source: url("../../../static/img/largeScreen/righttwo.png");
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
  border-image-source: url("../../../static/img/largeScreen/leftthree.png");
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
  border-image-source: url("../../../static/img/largeScreen/rightthree.png");
  border-image-slice: 37 8 12 26 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  margin-top: 8%;
}
.centertitle {
  color: white;
  /*font-size: 30px;*/
  text-align: center;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-image: url("../../../static/img/largeScreen/title.png");
  background-size: 100% 100%;
}
.block1 {
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;
}
.nnum1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  color: #f7e17f;
  font-size: 34px;
  background: #503654;
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
  background: url("../../../static/img/largeScreen/close.gif") no-repeat;
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