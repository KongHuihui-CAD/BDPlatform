<template>
    <div id='container'>
      <div class='left col-md-3 col-sm-3 col-xs-3'>
        <div class='useless'></div>
        <div class='ltitle1' v-show='DContent.title[1]'>
          <input class='addtitleType' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[1]'>
        </div>
        <div class='leftpic1'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart1'></div>
          </div>
        </div>
        <div class='useless'></div>
        <div class='ltitle2' v-show='DContent.title[2]'>
          <input class='addtitleType' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[2]'>
        </div>
        <div class='leftpic2'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart2'></div>
          </div>
        </div>
        <div class='useless'></div>
        <div class='ltitle3' v-show='DContent.title[3]'>
          <input class='addtitleType' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[3]'>
        </div>
        <div class='leftpic3'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart3'></div>
          </div>
        </div>
      </div>
      <div class='middle col-md-6 col-sm-6 col-xs-6'>
        <div class='centertitle'>
          <input class='addtitleType' id='text' contenteditable='true' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[0]'>
        </div>
        <div class='box1'>
          <div class='mtitle' v-show='DContent.title[4]'>
            <input class='addtitleType' id='mtitle' contenteditable='true' type='text' placeholder='我是副标题' disabled="disabled" v-model='DContent.title[4]'>
          </div>
          <div class='data1' v-show='DContent.num[0]'>
            <input type='text' name='data1' id='mdata' placeholder='我是副标题数据' disabled="disabled" v-model='DContent.num[0]'>
          </div>
        </div>
        <div class='middlepic'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart4'></div>
          </div>
        </div>
      </div>
      <div class='right col-md-3 col-sm-3 col-xs-3'>
         <div class='useless'></div>
        <div class='rtitle1' v-show='DContent.title[5]'>
          <input class='addtitleType' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[5]'>
        </div>
        <div class='rightpic1'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart5'></div>
          </div>
        </div>
        <div class='useless'></div>
        <div class='rtitle2' v-show='DContent.title[6]'>
          <input class='addtitleType' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[6]'>
        </div>
        <div class='rightpic2'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart6'></div>
          </div>
        </div>
        <div class='useless'></div>
        <div class='rtitle3' v-show='DContent.title[7]'>
          <input class='addtitleType' type='text' placeholder='我是标题' disabled="disabled" v-model='DContent.title[7]'>
        </div>
        <div class='rightpic3'>
          <div class='report-edit'>
              <div class='edit-chart' id='edit-chart7'></div>
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
      tx :[]
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
#text {
  height: 100%;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 40px;
  margin-top: 3%;
}
#mtitle{
  font-size:19px;
  line-height:1.1;
  color:white;
  background-color: #20484e;
}
.left,
.middle,
.right {
  height: 100%;
  padding: 0;
}
.ltitle1,.ltitle2,.ltitle3,.rtitle1,.rtitle2,.rtitle3 {
  font-size:19px;
  line-height:1.1;
  color: white;
  background-color: #20484e;
}
.mtitle{
  width:70%;
  margin:0 auto;
}
.leftpic1,.leftpic2,.leftpic3 {
  position:relative;
  /*border:2px solid #20484e;*/
  width: 100%;
  height: 27%;
  /*margin-bottom: 5px;*/
}
.middlepic {
  position:relative;
  /*border:2px solid #20484e;*/
  width:100%;
  height:70%;
  /*margin:10px 2%;*/
  padding:2%;
  margin-top:2%;
}
.rightpic1,.rightpic2,.rightpic3{
  position:relative;
  /*border:2px solid #20484e;*/
  width:100%;
  height:27%;
  /*margin-bottom:5px;*/
}
.box1 {
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  margin-top: 5%;
}
#mdata {
  background-color: transparent;
  border: none;
  height: 60%;
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  color: #ebe609;
  text-align: center;
  margin-top:2%;
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
.useless {
  height: 3%;
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