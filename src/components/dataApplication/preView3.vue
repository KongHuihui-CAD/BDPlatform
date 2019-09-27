<template>
    
    <div id="md0-container" >
        <div class="md0-row" >
            <div class="left-middle col-md-9 col-sm-9 col-xs-9">
                <div class='pictt'>
                    <div ><p id="text">{{DContent.title[0]}}</p></div>
                </div>
                <div class="pic3" >
                    <div class="report-edit">
                            <div class="edit-chart" id="edit-chart3" style="margin-top: 20px"></div>
                    </div>
                </div>
                <div class='left'>
                    <div class="left-bottom col-md-3 col-sm-3 col-xs-3">

                        <div class='useless'></div>
                        <div class="picleft" >
                            
                            <div class="report-edit">
                                    <div class="edit-chart" id="edit-chart1" ></div>
                            </div>
                        </div>
                    </div>
                    <div class="left-bottom col-md-3 col-sm-3 col-xs-3">
                        <div class='useless'></div>
                        <div class="picleft">
                            <div class="report-edit">
                                    <div class="edit-chart" id="edit-chart2" ></div>
                           </div>
                        </div>
                    </div>
                    <div class="left-bottom col-md-6 col-sm-6 col-xs-6">
                        <div class='useless'></div>
                        <div class="picleft">
                            <div class="report-edit">
                                    <div class="edit-chart" id="edit-chart7" ></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="right col-md-3 col-sm-3 col-xs-3">
                <div class="picright" style='margin-top:20px'>
                    <div class="report-edit">
                            <div class="edit-chart" id="edit-chart4"></div>
                    </div>
                </div>
                <div class='useless2'></div>
                <div class="picright">
                    <div class="report-edit">
                            <div class="edit-chart" id="edit-chart5"></div>
                    </div>
                </div>
                <div class='useless3'></div>
                <div class="picright" >
                    <div class="report-edit">
                            <div class="edit-chart" id="edit-chart6"></div>
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
      DContent: {
        title: []
      },
      myChart: "",
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
        .get( "largeScreen/user/getreportbyid?reportid=" + this.id)
        .then(response => {
          // alert("mem");
          var data = response.body;
          this.reportOption = JSON.parse(data.DATA.reportData).result;
          this.DContent = JSON.parse(data.DATA.reportData).desc.content;
          this.drawReport();
        });
    } else {
      // 预览报告
      this.reportOption = this.$route.query.data;
      this.DContent = this.$route.query.content;
      this.drawReport();
      console.log(this.reportOption);
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
        var dom = document.getElementById(this.reportOption[i].BoxId);
        this.myChart = echarts.init(dom);
        if (
          this.reportOption[i].choseOption.series !== undefined &&
          this.reportOption[i].choseOption.series[1] !== undefined &&
          this.reportOption[i].choseOption.series[1].type == "custom"
        ) {
          var opt = this.reportOption[i].choseOption.series[1];
          opt["renderItem"] = renderItem;
          console.log(opt);
          this.myChart.setOption(this.reportOption[i].choseOption);
        } else {
          this.myChart.setOption(this.reportOption[i].choseOption);
        }
        if(this.reportOption[i].choseOption.baseOption){
          if (
            this.reportOption[i].choseOption.baseOption.series !== undefined &&
            this.reportOption[i].choseOption.baseOption.series[1] !== undefined &&
            this.reportOption[i].choseOption.baseOption.series[1].type == "pie"
            ){
             
            
              var opt = this.reportOption[i].choseOption;
              // this.myChart.setOption(this.reportOption[i].choseOption)
              this.resetPieT(this.myChart, 0, opt);
              window.addEventListener("resize", () => {
              this.myChart.resize();
              this.resetPieT(this.myChart, 0, opt);
            });
          }
        }
        // this.myChart.setOption(this.reportOption[i].choseOption);
        var opt = this.reportOption[i].choseOption;
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
        if(opt.series !== undefined && opt.series[0] !== undefined ){
          

          if(opt.series[0].type == "pie" )
          {
            id0 = id0 +1;
            this.myChart.setOption(opt);
            list[id0] = this.myChart;
            listO[id0] = opt;
          }else if(opt.series[0].type == "bar" )
          {
            id0=id0+1;
            this.myChart.setOption(opt);
            list[id0] = this.myChart;
            listO[id0] = opt;
          }
          console.log(listO);

          
          
          

        }
      }
      var that = this;
      for(var e=0; e<list.length;e++){
          (function (lockedInIndex) {
            var currentIndex = -1;
            that.tx[e] = setInterval(function () {
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
html,
body {
  height: 100%;
}
* {
  font-family: "微软雅黑";
}
#md0-container {
  height: 100vh;
  /*background-color: #404a59;*/
  background: url("../../../static/img/largeScreen/background2.png");
  repeat: no-repeat;
  background-position: center center;

  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;

  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  padding: 1%;
}
#text {
  font-size: 30px;
  font-weight: bold;
  padding-top: 18px;
  color: white;
  text-align: left;
}
.md0-row {
  height: 95%;
  box-sizing: border-box;
  margin: 10px;
  margin-bottom: 0px;
}
.right,
.left-middle {
  height: 100%;
  padding: 0;
}
.left-bottom {
  height: 100%;
  padding: 0;
}
.useless {
  height: 15%;
}
.left {
  /*height:25vh;*/
  height: 31%;
  position: relative;
}
.picleft {
  height: 100%;
  position: relative;
}
.pictt {
  margin-bottom: 10px;
  height: 20px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding-right: 5%;
  margin-top: -20px;
}
.picSub {
  height: 100%;
  width: 100%;
}
.pic3 {
  height: 63%;
  width: 97%;
  margin-left: 10px;
  margin-top: 40px;
  box-sizing: border-box;
  position: relative;
}
.picright {
  height: 31%;
  position: relative;
}
.useless2 {
  height: 4%;
}
.useless3 {
  height: 5%;
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
  /*position: absolute;*/
  /*top:-20px;*/
}
.titlen {
  margin-top: -20px;
  margin-left: 20px;
  display: flex;
  justify-content: left;
}
.titlen p {
  color: #ffffff;
  font-size: 31px;
}
</style>