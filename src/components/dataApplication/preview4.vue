<template>
    <div id='container'>
        <div class='topleft'></div>
        <div class='topright'></div>
        <div class='bottomleft'></div>
        <div class='bottomright'></div>
        <!--第一行-->
        <div class='row first'>
            <div class='main'>
                <div class='leftimg'></div>
            </div>
            <div class='main1'>
                <div class='centertitle'>
		                <p class='addtitleType' id='text4'>{{DContent.title[0]}}</p>
                </div>
            </div>
            <div class='main1'>
                <div class='rightimg'></div>
            </div>
            <div class='bottomimg'></div>
        </div>
        <!--第二行-->
        <div class='row second'>
            <div class='left col-md-3 col-sm-3 col-xs-3'>
                <div class='toptitle1' v-show='DContent.title[1]'>
                    <p class='addtitleType' id='ttitle1'>{{DContent.title[1]}}</p>
                </div>
                <div class='picleft'>
                    <div class='img11' v-show='DContent.title[2] || DContent.num[0]'>
                        <div class='box1'>
                            <div class='title1'>
                                <p name='title1' id='t1'>{{DContent.title[2]}}</p>
                            </div>
                            <div class='data1'>
                                <p name='data1' id='d1'>{{DContent.num[0]}}</p>
                            </div>
                        </div>
                    </div>
                        <div class='img11' v-show='DContent.title[3] || DContent.num[1]'>
                            <div class='box1'>
                                <div class='title1'>
                                    <p name='title1' id='t2'>{{DContent.title[3]}}</p> 
                                </div>
                                <div class='data1'>
                                    <p name='data1' id='d2'>{{DContent.num[1]}}</p>
                                </div>
                            </div>
                        </div>
                        <div class='img11' v-show='DContent.title[4] || DContent.num[2]'>
                            <div class='box1'>
                                <div class='title1'>
                                    <p name='title1' id='t3'>{{DContent.title[4]}}</p>
                                </div>
                                <div class='data1'>
                                    <p name='data1' id='d3'>{{DContent.num[2]}}</p>
                                </div>
                            </div>
                        </div>
                 </div>
                 <div class='pic-leftmid'>
                     <div class='picmid-left col-md-6 col-sm-6 col-xs-6'>
                         <div class='toptitle2' v-show='DContent.title[5]'>
                             <p class='addtitleType' id='tt2'>{{DContent.title[5]}}</p>
                         </div>
                         <div class='pic-left1'>
                             <div class='report-edit'>
                                    <div class='edit-chart' id='edit-chart1'></div>
                             </div>
                         </div>
                     </div>
                     <div class='picmid-right col-md-6 col-sm-6 col-xs-6'>
                         <div class='toptitle3' v-show='DContent.title[6]'>
                             <p class='addtitleType' id='tt3'>{{DContent.title[6]}}</p>
                         </div>
                         <div class='pic-left2'>
                             <div class='report-edit'>
                                    <div class='edit-chart' id='edit-chart2'></div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class='pic-leftbtm'>
                     <div class='toptitle4' v-show='DContent.title[7]'>
                         <p class='addtitleType' id='tt4'>{{DContent.title[7]}}</p>
                     </div>
                     <div class='pic-left3'>
                         <div class='report-edit'>
                                <div class='edit-chart' id='edit-chart3'></div>
                        </div>
                     </div>
                 </div>
            </div>
            <div class='middle col-md-6 col-sm-6 col-xs-6'>
                <div class='midtitlet'>
                    <div class='midtitle1'>
                        <p class='addtitleType' id='midtitle1' v-show='DContent.title[8]'>{{DContent.title[8]}}</p>
                        <p name='data1' id='d4'>{{DContent.num[3]}}</p><span class='yuan' v-show='DContent.num[3]'>元</span> 
                    </div>
                    <div class='midtitle2'>
                        <p class='addtitleType' id='midtitle2' v-show='DContent.title[9]'>{{DContent.title[9]}}</p>
                        <p name='data1' id='d5'>{{DContent.num[4]}}</p><span class='yuan' v-show='DContent.num[4]'>元</span> 
                    </div>
                </div>
                <div class='pic-mid'>
                    <div class='report-edit'>
                            <div class='edit-chart' id='edit-chart4'></div>
                    </div>
                </div>
                <div class='midtitleb'>
                    <div class='midtitle3'>
                        <p class='addtitleType' id='midtitle3' v-show='DContent.title[10]'>{{DContent.title[10]}}</p>
                        <p name='data1' id='d6'>{{DContent.num[4]}}</p><span class='yuan' v-show='DContent.num[4]'>元</span> 
                    </div>
                    <div class='midtitle4'>
                        <p class='addtitleType' id='midtitle4' v-show='DContent.title[11]'>{{DContent.title[11]}}</p>
                        <p name='data1' id='d7'>{{DContent.num[5]}}</p><span class='yuan' v-show='DContent.num[5]'>元</span> 
                    </div>
                    <div class='midtitle5'>
                        <p class='addtitleType' id='midtitle5' v-show='DContent.title[15]'>{{DContent.title[15]}}</p>
                        <p name='data1' id='d8'>{{DContent.num[6]}}</p><span class='yuan' v-show='DContent.num[6]'>元</span> 
                    </div>
                </div>
            </div>
            <div class='right col-md-3 col-sm-3 col-xs-3'>
                    <div class='righttitle1' v-show='DContent.title[12]'>
                      <p class='addtitleType' id='righttitle1'>{{DContent.title[12]}}</p>
                    </div>
                <div class='pic-right1'>
                    <div class='report-edit'>
                            <div class='edit-chart' id='edit-chart5'></div>
                    </div>
                </div>
                <div class='useless'></div>
                    <div class='righttitle2' v-show='DContent.title[13]'>
                      <p class='addtitleType' id='righttitle2'>{{DContent.title[13]}}</p>
                    </div>
                <div class='pic-right2'>
                    <div class='report-edit'>
                            <div class='edit-chart' id='edit-chart6'></div>
                    </div>
                </div>
                <div class='useless'></div>
                    <div class='righttitle3' v-show='DContent.title[14]'>
                      <p class='addtitleType' id='righttitle3'>{{DContent.title[14]}}</p>
                    </div>
                <div class='pic-right3'>
                    <div class='report-edit'>
                            <div class='edit-chart' id='edit-chart7'></div>
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
      // alert("234");
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
              // this.myChart.setOption(this.reportOption[i].choseOption)
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
  background: url("../../../static/img/largeScreen/background4.png") no-repeat;
  background-position: center center;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;

  padding: 1%;
}
.topleft {
  top: 10px;
  left: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../static/img/largeScreen/topleft.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
}
.topright {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../static/img/largeScreen/topright.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottomleft {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../static/img/largeScreen/bottomleft.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottomright {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../static/img/largeScreen/bottomright.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.first {
  position: relative;
  width: 99%;
  height: 10%;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;
}
.main {
  display: inline-block;
  position: relative;
}
.main1 {
  display: inline-block;
  position: relative;
}
.leftimg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../static/img/largeScreen/titleleft.png");
  width: 200px;
  height: 30px;
}
#text4 {
  margin-left:2%;
  padding-top:18px;
  text-align: left;
  color: white;
  font-size: 30px;
  font-weight:bold;
}
.rightimg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../static/img/largeScreen/titleright.png");
  width: 200px;
  height: 30px;
}
.bottomimg {
  margin: 0 auto;
  width: 300px;
  height: 5%;
  background-image: url(../../../static/img/largeScreen/titlebottom.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.second {
  width: 99%;
  height: 72%;
  box-sizing: border-box;
  margin: 10px;
  margin-bottom: 0px;
}
.left,
.middle,
.right {
  height: 100%;
  padding: 0;
}
#ttitle1,
#tt4,
.toptitle1,
.toptitle2,
.toptitle3,
.toptitle4,
#midtitle1,
#midtitle2,
#midtitle3,
#midtitle4,
#midtitle5,
#righttitle1,
#righttitle2,
#righttitle3 {
  color: white;
  font-size: 25px;
  background-color: rgb(22, 64, 87);
  line-height: 1.1;
}
#tt2,
#tt3 {
  color: white;
  font-size: 15px;
  line-height: 25px;
}
.picleft {
  width: 100%;
  height: 20%;
  margin-top: 5px;
}
.img11 {
  height: 70%;
  width: 31%;
  position: relative;
  display: inline-block;
  float: left;
  border-style: solid;
  /*border-width: 16px 17px 17px;*/
  border-width: 10px 8px 17px;
  border-image-source: url("../../../static/img/largeScreen/dataframe.png");
  border-image-slice: 40 70 50 fill;
  border-image-width: initial;
  border-image-outset: initial;
  border-image-repeat: repeat;
  background: none;
  /*margin-top: -2%;*/
  margin-left: 2%;
}
.box1 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin-top: -10%;
}
#t1,
#d1,
#t2,
#d2,
#t3,
#d3 {
  background-color: transparent;
  border: none;
  height: 60%;
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-align: center;
}
#d4,
#d5,
#d6,
#d7,
#d8 {
  display: inline-block;
  background-color: transparent;
  height: 60%;
  width: 70%;
  font-size: 22px;
  color: yellow;
}
.addtitleType {
  background-color: transparent;
  border: none;
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 100%;
  margin-top: -25px;
}
.yuan {
  color: deepskyblue;
  font-size: 20px;
}
.buttonT {
  float: right;
  background: #0a054d;
  border: #0a054d;
  color: #4f4e5c;
}
.buttonT:hover {
  color: white;
}
.pic-leftmid,
.pic-leftbtm {
  width: 100%;
  height: 45%;
  margin-top: 5px;
}
.picmid-left,
.picmid-right {
  height: 60%;
  margin-top: 5px;
}
.pic-left1,
.pic-left2,
.pic-left3 {
  height: 100%;
  margin-top: 8%;
  /*border:2px solid #163042;*/
}
.pic-mid {
  height: 80%;
  /*border:2px solid #163042;*/
  margin-left: 2%;
  margin-right: 2%;
}
.midtitlet {
  width: 100%;
  height: 10%;
  margin-top: 3%;
}
.midtitle1,
.midtitle2 {
  width: 30%;
  height: 80%;
  display: inline-block;
  position: relative;
  margin-left: 10%;
  margin-top: -10%;
}
.midtitle3,
.midtitle4,
.midtitle5 {
  width: 20%;
  height: 80%;
  display: inline-block;
  position: relative;
  margin-left: 10%;
  margin-top: -10%;
  color: white;
}
.midtitleb {
  width: 100%;
  height: 10%;
  margin-top: 10%;
}
.toptitle1,
.righttitle1,
.righttitle2,
.righttitle3 {
  height: 8%;
}
.toptitle2,
.toptitle3,
.toptitle4 {
  height: 15%;
}
.pic-right1,
.pic-right2,
.pic-right3 {
  width: 80%;
  height: 30%;
  margin-left: 10%;
  /*border:2px solid #163042;*/
}
.useless {
  height: 10%;
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

.view-area-box {
  height: 103%;
  width: 100%;
}
</style>