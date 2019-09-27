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
                    <input class='addtitleType' contenteditable="true" type='text' id='text' placeholder='我是标题数据' v-model='DContent.title[0]'> 
                </div>
            </div>
            <div class='main2'>
                <div class='rightimg'></div>
            </div>
            <div class='bottomimg'></div>
        </div>
        <!--第二行-->
        <div class='row second'>
            <div class='left col-md-3 col-sm-3 col-xs-3'>
                <div class='toptitle1'>
                    <input class='addtitleType' type='text' id='ttitle1' placeholder='我是标题数据'  v-model='DContent.title[1]'>
                </div>
                <div class='picleft'>
                    <div class='img11'>
                        <div class='box1'>
                            <div class='title1'>
                                <input type='text' name='title1' id='t1' placeholder='我是标题' v-model='DContent.title[2]'>
                            </div>
                            <div class='data1'>
                                <input type='text' name='data1' id='d1' placeholder='我是数据' v-model='DContent.num[0]'>
                            </div>
                        </div>
                    </div>
                        <div class='img11'>
                            <div class='box1'>
                                <div class='title1'>
                                    <input type='text' name='title1' id='t2' placeholder='我是标题' v-model='DContent.title[3]'> 
                                </div>
                                <div class='data1'>
                                    <input type='text' name='data1' id='d2' placeholder='我是数据' v-model='DContent.num[1]'>
                                </div>
                            </div>
                        </div>
                        <div class='img11'>
                            <div class='box1'>
                                <div class='title1'>
                                    <input type='text' name='title1' id='t3' placeholder='我是标题' v-model='DContent.title[4]'>
                                </div>
                                <div class='data1'>
                                    <input type='text' name='data1' id='d3' placeholder='我是数据' v-model='DContent.num[2]'>
                                </div>
                            </div>
                        </div>
                 </div>
                 <div class='pic-leftmid'>
                     <div class='picmid-left col-md-6 col-sm-6 col-xs-6'>
                         <div class='toptitle2'>
                             <input class='addtitleType' id='tt2' type='text' placeholder='我是标题'
                             v-model='DContent.title[5]'>
                         </div>
                         <div class='pic-left1'>
                             <div class='report-edit'>
                                <!-- <div style="height:18%;z-index:999"> -->
                                    <button class='buttonT' @click='reLoad1'>x</button>
                                <!-- </div> -->
                                <div style="width:100%;height:100%;" @drop='drop1($event)' @dragover='allowDrop($event)'>
                                    <div class='edit-chart' id='edit-chart1'></div>
                                </div>
                             </div>
                         </div>
                     </div>
                     <div class='picmid-right col-md-6 col-sm-6 col-xs-6'>
                         <div class='toptitle3'>
                             <input class='addtitleType' id='tt3' type='text' placeholder='我是标题' v-model='DContent.title[6]'>
                         </div>
                         <div class='pic-left2'>
                             <div class='report-edit'>
                                <!-- <div style="height:18%;z-index:999"> -->
                                    <button class='buttonT' @click='reLoad2'>x</button>
                                <!-- </div> -->
                                <div style="width:100%;height:100%;" @drop='drop2($event)' @dragover='allowDrop($event)'>
                                    <div class='edit-chart' id='edit-chart2'></div>
                                </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div class='pic-leftbtm'>
                     <div class='toptitle4'>
                         <input class='addtitleType' id='tt4' type='text' placeholder='我是标题' v-model='DContent.title[7]'>
                     </div>
                     <div class='pic-left3'>
                         <div class='report-edit'>
                            <!-- <div style="height:18%;z-index:999"> -->
                                <button class='buttonT' @click='reLoad3'>x</button>
                            <!-- </div> -->
                            <div style="width:100%;height:100%;" @drop='drop3($event)' @dragover='allowDrop($event)'>
                                <div class='edit-chart' id='edit-chart3'></div>
                            </div>
                        </div>
                     </div>
                 </div>
            </div>
            <div class='middle col-md-6 col-sm-6 col-xs-6'>
                <div class='midtitlet'>
                    <div class='midtitle1'>
                        <input class='addtitleType' id='midtitle1' type='text' placeholder="我是标题数据" v-model='DContent.title[8]'>
                        <input type='text' name='data1' id='d4' placeholder="我是数据" v-model='DContent.num[3]'><span class='yuan'>元</span> 
                    </div>
                    <div class='midtitle2'>
                        <input class='addtitleType' id='midtitle2' type='text'  placeholder="我是标题数据" v-model='DContent.title[9]'>
                        <input type='text' name='data1' id='d5' placeholder="我是数据" v-model='DContent.num[4]'><span class='yuan'>元</span>
                    </div>
                </div>
                <div class='pic-mid'>
                    <div class='report-edit'>
                        <!-- <div style="height:18%;z-index:999"> -->
                            <button class='buttonT' @click='reLoad4'>x</button>
                        <!-- </div> -->
                        <div style="width:100%;height:100%;" @drop='drop4($event)' @dragover='allowDrop($event)'>
                            <div class='edit-chart' id='edit-chart4'></div>
                        </div>
                    </div>
                </div>
                <div class='midtitleb'>
                    <div class='midtitle3'>
                        <input class='addtitleType' id='midtitle3' type='text' placeholder="我是标题" v-model='DContent.title[10]'>
                        <input type='text' name='data1' id='d6' placeholder="我是数据" v-model='DContent.num[4]'><span class='yuan'>元</span>
                    </div>
                    <div class='midtitle4'>
                        <input class='addtitleType' id='midtitle4' type='text' placeholder="我是标题" v-model='DContent.title[11]'>
                        <input type='text' name='data1' id='d7' placeholder="我是数据" v-model='DContent.num[5]'><span class='yuan'>元</span>
                    </div>
                    <div class='midtitle5'>
                        <input class='addtitleType' id='midtitle5' type='text' placeholder="我是标题" v-model='DContent.title[15]'>
                        <input type='text' name='data1' id='d8' placeholder="我是数据" v-model='DContent.num[6]'><span class='yuan'>元</span>
                    </div>
                </div>
            </div>
            <div class='right col-md-3 col-sm-3 col-xs-3'>
                    <div class='righttitle1'>
                      <input class='addtitleType' id='righttitle1' type='text' placeholder="我是标题数据" v-model='DContent.title[12]'>
                    </div>
                <div class='pic-right1'>
                    <div class='report-edit'>
                        <!-- <div style="height:18%;z-index:999"> -->
                            <button class='buttonT' @click='reLoad5'>x</button>
                        <!-- </div> -->
                        <div style="width:100%;height:100%;" @drop='drop5($event)' @dragover='allowDrop($event)'>
                            <div class='edit-chart' id='edit-chart5'></div>
                        </div>
                    </div>
                </div>
                <div class='useless'></div>
                    <div class='righttitle2'>
                      <input class='addtitleType' id='righttitle2' type='text' placeholder="我是标题数据" v-model='DContent.title[13]'>
                    </div>
                <div class='pic-right2'>
                    <div class='report-edit'>
                        <!-- <div style="height:18%;z-index:999"> -->
                            <button class='buttonT' @click='reLoad6'>x</button>
                        <!-- </div> -->
                        <div style="width:100%;height:100%;" @drop='drop6($event)' @dragover='allowDrop($event)'>
                            <div class='edit-chart' id='edit-chart6'></div>
                        </div>
                    </div>
                </div>
                <div class='useless'></div>
                    <div class='righttitle3'>
                      <input class='addtitleType' id='righttitle3' type='text' placeholder="我是标题数据" v-model='DContent.title[14]'>
                    </div>
                <div class='pic-right3'>
                    <div class='report-edit'>
                        <!-- <div style="height:18%;z-index:999"> -->
                            <button class='buttonT' @click='reLoad7'>x</button>
                        <!-- </div> -->
                        <div style="width:100%;height:100%;" @drop='drop7($event)' @dragover='allowDrop($event)'>
                            <div class='edit-chart' id='edit-chart7'></div>
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
            .get( "largeScreen/user/getreportbyid?reportid=" + this.reportId)
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
      var el = $("#edit-chart2");
      var dom = document.getElementById("edit-chart2");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart2"></div>';
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
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad3: function() {
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
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad4: function() {
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
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad5: function() {
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
      // console.log("my"+index);
      this.Lcontent.splice(index, 1);
      // console.log(this.Lcontent);
      this.$emit("delData", this.Lcontent);
    },
    reLoad6: function() {
      var el = $("#edit-chart6");
      var dom = document.getElementById("edit-chart6");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart6"></div>';
      var length = this.Lcontent.length;
      var index = 0;
      for (var i = 0; i < length; i++) {
        if (this.Lcontent[i].BoxId == "edit-chart6") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
      this.$emit("delData", this.Lcontent);
    },
    reLoad7: function() {
      var el = $("#edit-chart7");
      var dom = document.getElementById("edit-chart7");
      var parentDiv = dom.parentNode;
      el.remove();
      parentDiv.innerHTML = '<div class="edit-chart" id="edit-chart7"></div>';
      var length = this.Lcontent.length;
      var index = 0;
      for (var i = 0; i < length; i++) {
        if (this.Lcontent[i].BoxId == "edit-chart7") {
          index = i;
        }
      }
      this.Lcontent.splice(index, 1);
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
      // console.log(dom);
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart3", this.chooseOption);
      }
    },
    drop4(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart4");
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
        this.tranData("edit-chart4", this.chooseOption);
      }
    },
    drop5(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart5");
      // console.log(dom);
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
    drop7(event) {
      event.preventDefault();
      var dom = document.getElementById("edit-chart7");
      if (this.dragContent) {
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.chooseOption);
        this.tranData("edit-chart7", this.chooseOption);
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
#container {
  width: 100%;
  height: 100vh;
  background: url("../../../../static/img/largeScreen/background4.png") no-repeat;
  background-position: center center;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;

  padding: 1%;
  overflow: hidden;
}
.topleft {
  top: 10px;
  left: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../../static/img/largeScreen/topleft.png");
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
  background-image: url("../../../../static/img/largeScreen/topright.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottomleft {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../../static/img/largeScreen/bottomleft.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.bottomright {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 8%;
  height: 20%;
  background-image: url("../../../../static/img/largeScreen/bottomright.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.first {
  width: 99%;
  position: relative;
  height: 10%;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 0px;
}
.main {
  display: inline-block;
  position: relative;
}
.main1 {
  display: inline-block;
  position: relative;
}
.main2 {
  display: inline-block;
  position: relative;
}
.leftimg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../../static/img/largeScreen/titleleft.png");
  width: 200px;
  height: 30px;
}
#text {
  height: 100%;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 30px;
  margin-top: -3%;
}
.rightimg {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("../../../../static/img/largeScreen/titleright.png");
  width: 200px;
  height: 30px;
}
.bottomimg {
  margin: 0 auto;
  width: 300px;
  height: 5%;
  background-image: url(../../../../static/img/largeScreen/titlebottom.png);
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
  background-color: rgb(22, 64, 87);
}
.picleft {
  width: 100%;
  height: 20%;
  margin-top: 5px;
}
.img11 {
  /*height:100%;*/
  width: 31%;
  position: relative;
  display: inline-block;
  float: left;
  border-style: solid;
  /*border-width: 16px 17px 17px;*/
  border-width: 10px 8px 17px;
  border-image-source: url("../../../../static/img/largeScreen/dataframe.png");
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
#d3,
#tt2,
#tt3,
#tt4 {
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
  background-color: transparent;
  border: none;
  height: 60%;
  width: 50%;
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-align: center;
}
#midtitle3,
#midtitle4,
#midtitle5 {
  font-size: 12px;
}
.addtitleType {
  background-color: transparent;
  border: none;
  text-align: center;
  height: 100%;
  width: 70%;
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
.pic-leftmid,
.pic-leftbtm {
  width: 100%;
  height: 42%;
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
  position: relative;
  height: 100%;
  border: 2px solid #163042;
}
.pic-mid {
  position: relative;
  height: 80%;
  border: 2px solid #163042;
  margin-left: 2%;
  margin-right: 2%;
}
.midtitlet {
  width: 100%;
  height: 10%;
  margin-top: 5%;
}
.midtitle1,
.midtitle2 {
  width: 30%;
  height: 80%;
  display: inline-block;
  position: relative;
  margin-left: 10%;
  margin-top: -10%;
  color: white;
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
.yuan {
  color: deepskyblue;
  font-size: 15px;
}
.pic-right1,
.pic-right2,
.pic-right3 {
  position: relative;
  width: 80%;
  height: 30%;
  margin-left: 10%;
  border: 2px solid #163042;
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