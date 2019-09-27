<template>
  <div>
    <el-container>
      <el-aside width="300px" style="height:92.5vh;display:flex !important;flex-direction: column;overflow:hidden">
        <div class="hd">
          <ul id="myTab" class="nav nav-tabs">
            <li class="active" style="width:50%">
              <a href="#home" data-toggle="tab" class="hd-l hd_active" style="width:100%">图表</a>
            </li>
            <li style="width:50%">
              <a href="#style" data-toggle="tab" class="hd-r hd_active" style="width:100%">样式</a>
            </li>
          </ul>
        </div>
        <div style="overflow:auto">
          <div id="myTabContent" class="tab-content">
            <div class="tab-pane fade in active" id="home" style="margin-top:0px;padding:10px 0;background:#000066">
              <div class="mod-chart1" v-for="(item,index) in cacheOption " :key=index>
                <div style="height:20px;">
                  <button class="buttonT" @click="deletechart(index)">x</button>
                </div>
                <div class="mod-chart0" :id="'chart'+index" draggable="true" @dragstart='drag1($event)'>

                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="style">
              <div class="Orient" v-show="styleshow">
                <span style="margin-left:15px">标题:</span>
                <input type="text" style="width:60%" class="title form-control" id="titles" value="">
              </div>
              <div class="form-group" style="margin-left:93px;margin-top:15px;position:relative" v-show="styleshow">
                <input type="text" id="hue-demo" class="form-control demo" value="" style="width:87%;">
                <span for="hue-demo" style="margin-left:-182px;position:absolute;margin-top:-30px">标题颜色:</span>
              </div>
              <div class="Orient" v-show="styleshow">
                <span>标题上边距:</span>
                <input type="text" style="width:50%" class="title form-control" id="topEdge" value="0">
              </div>
              <div id="Margin">

              </div>
              <div style="margin-top:17px; ">
                <button class="buttonC" @click="save">保存</button>
                <button class="buttonC" id="previews" @click="previews($event)">预览</button>
              </div>
            </div>
          </div>
        </div>

      </el-aside>
      <el-main class="el-main">
        <div style="width:100%;height:40px;background-color:#fff;border-bottom:1px solid #eee">
          <ul class="icon">
            <li v-if='show6' @click="addTextandPic(1)">
              <i class="iconfont icon-biaoti">
              </i>
            </li>
            <li v-if='show6' @click="addTextandPic(2)">
              <i class="iconfont icon-sucai"></i>
            </li>
            <li ><i class="iconfont icon-yulan" @click="goPre"></i></li>
            <li ><i class="iconfont icon-baocun" @click="toSave"></i></li>
          </ul>
        </div>
        <div style="width:100%;over-flow:auto;margin-left:20px;margin-top:20px;flex:1;">
          <Modal-0 v-if="show0" @putcontent="putcontent" @putData="putData" @delData="delData" :dragContent="dragContent" :option="option" :chooseOption="chooseOption" :reportId="reportId"></Modal-0>
          <Modal-1 v-if="show1" @putcontent="putcontent" @putData="putData" @delData="delData" :dragContent="dragContent" :option="option" :chooseOption="chooseOption" :reportId="reportId"></Modal-1>
          <Modal-2 v-if="show2" @putcontent="putcontent" @putData="putData" @delData="delData" :dragContent="dragContent" :option="option" :chooseOption="chooseOption" :reportId="reportId"></Modal-2>
          <Modal-3 v-if="show3" @putcontent='putcontent' @putData='putData' @delData='delData' :dragContent='dragContent' :option='option' :chooseOption='chooseOption' :reportId='reportId'></Modal-3>
          <Modal-4 v-if='show4' @putcontent='putcontent' @putData='putData' @delData='delData' :dragContent='dragContent' :option='option' :chooseOption='chooseOption' :reportId='reportId'></Modal-4>
          <Modal-5 v-if='show5' @putcontent='putcontent' @putData='putData' @delData='delData' :dragContent='dragContent' :option='option' :chooseOption='chooseOption' :reportId='reportId'></Modal-5>
          <Modal-6 v-if='show6' @putcontent='putcontent' @putData='putData' @delData='delData' :dragContent='dragContent' :option='option' :chooseOption='chooseOption' :reportId='reportId'></Modal-6>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Modal0 from "./modals/modal_0";
import Modal1 from "./modals/modal_1";
import Modal2 from "./modals/modal_2";
import Modal3 from "./modals/modal_3";
import Modal4 from "./modals/modal_4";
import Modal5 from "./modals/modal_5";
import Modal6 from "./modals/modal_6";
import echarts from "echarts";
import 'echarts-liquidfill';
import 'echarts-wordcloud'
import bus from './bus.js';
import '../../../static/js/jquery.minicolors.js'
import '../../../static/js/bootstrap.min.js'
export default {
  data() {
    return {
      flag: false,
      show0: true,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      showChart: true,
      tableName: "二胎主题",
      option: [],
      option1: "",
      clickBoxId: "",
      myChart: {},
      chart: "",
      dragContent: "",
      chooseOption: {},
      configOption: {},
      cacheOption: [],
      cacheOptionD: [],
      optionID: [],
      reportId: null,
      // reportId:0,
      // conT:[],
      reportData: {
        Type: 0,
        desc: {
          title: "",
          content: {
            title: [],
            num: []
          }
        },
        result: []
      },
      id: "",
      styleshow: true,
      // textstyle: {}, // 全局标题样式
      currentid: ''
    };
  },
  created() {
    // alert('cre4')
    $.get("./../../static/json/guangdong.json", function (geoJson) {
      echarts.registerMap("guangdong", geoJson);
    });
    $.get("./../../static/json/china.json", function (geoJson) {
      echarts.registerMap("china", geoJson);
      // alert("true00");
    });

    this.init();

    var num = parseInt(this.$route.query.id);
    //alert(num);
    switch (num) {
      case 0:
        this.show0 = true;
        break;
      case 1:
        this.show1 = true;
        break;
      case 2:
        this.show2 = true;
        break;
      case 3:
        this.show3 = true;
        break;
      case 4:
        this.show4 = true;
        break;
      case 5:
        this.show5 = true;
        break;
      case 6:
        this.show6 = true;
        break;
    }

    this.$http
      .get(
        "largeScreen/user/getChartByUser?userId=" + "1"
        // sessionStorage.getItem("userId")
      )
      .then(
        response => {
          // console.log(response);
          var dataD = response.body.DATA;
          // console.log(dataD);
          for (var i = 0; i < dataD.length; i++) {
            // console.log(typeof dataD[i].chart);
            this.cacheOption.push(this._deepCopy(JSON.parse(dataD[i].chart)));
            // this.cacheOption.push(this._deepCopy(JSON.parse(dataD[i].chart))) ;
            // console.log(dataD[i].chart);
          }
          this.$nextTick(() => {
            //缓存图列表
            var length = this.cacheOption.length;
            // console.log(this.cacheOption.length);
            for (var j = 0; j < length; j++) {
              var i = length - j - 1;
              this.optionID.push(dataD[i].id);
              var dom = document.getElementById("chart" + i);
              // console.log(this.cacheOption[j]);
              this.myChart = echarts.init(dom);
              if (this.cacheOption[j].baseOption) {
                if (
                  this.cacheOption[j].baseOption.series !== undefined &&
                  this.cacheOption[j].baseOption.series[1] !== undefined &&
                  this.cacheOption[j].baseOption.series[1].type == "pie"
                ) {
                  var opt = this.cacheOption[j];
                  this.myChart.setOption(this.cacheOption[j]);
                  this.resetPieT(this.myChart, 0, opt);
                  window.addEventListener("resize", () => {
                    this.myChart.resize();
                    this.resetPieT(this.myChart, 0, opt);
                  });
                }
              }
              if (
                this.cacheOption[j].series !== undefined &&
                this.cacheOption[j].series[1] !== undefined &&
                this.cacheOption[j].series[1].type == "custom"
              ) {
                var opt = this.cacheOption[j].series[1];
                opt["renderItem"] = renderItem;
                this.myChart.setOption(this.cacheOption[j]);
              } else {
                this.myChart.setOption(this.cacheOption[j]);
              }
              // this.myChart.setOption(this.cacheOption[j]);
              var opt = this.cacheOption[j];
              if (!opt.barData) {
                // debugger;
                if (
                  opt.series !== undefined &&
                  opt.series[1] !== undefined &&
                  opt.series[1].type == "pie"
                ) {
                  this.resetPie(this.myChart, 0, opt);
                  window.addEventListener("resize", () => {
                    this.myChart.resize();
                    this.resetPie(this.myChart, 0, opt);
                  });
                }
              }
            }
          });
          // alert(this.cacheOption.length+"1");
        },
        response => {
          console.log("提交失败了");
          alert("提取option失败，请刷新重试哦");
        }
      );

    this.dataToLocal();
  },
  mounted() {
    this.fresh();
  },
  methods: {
    fresh() {
      var result = this.reportData.result;
      // console.log(this.reportData.result);
      var arrayBoxId = [];
      var arrayBoxType = [];
      for (var s = 0; s < result.length; s++) {
        arrayBoxId.push(result[s].BoxId);
        arrayBoxType.push(result[s].type);
      }
      // console.log(arrayBoxId)
      var that = this;
      //为每一个元素绑定点击事件
      for (var t = 0; t < arrayBoxId.length; t++) {
        (function () {
          var oob = $("#" + arrayBoxId[t]);
          // console.log(oob)
          oob.click(function () {
            next(oob);
            // function f2() {return arrayBoxId[t]}
            // f2()
            // alert(oob.attr('id'));
          });
        })();
      }
      function next(oob) {
        for (var p = 0; p < result.length; p++) {
          if (result[p].BoxId == oob.attr("id")) {
            if (result[p].type === 1) {
              that.styleshow = false;
              that.option1 = 'notecharts';
              that.currentid = result[p].BoxId
              var fontsizeArr = result[p].textstyle['font-size'].split('')
              var rmpx = fontsizeArr.splice(-2,2)
              var fontsize = fontsizeArr.join('')
              if (result[p].textstyle || result[p].text) {
                document.getElementById("Margin").innerHTML =
                '<div class="Orient">' +
                '<span style="margin-left:15px">标题:</span> <input value=' + result[p].text + ' id="ttitle" type="text" class="form-control title" style="width:60%">' +
                "</div>" +
                '<div class="Orient">' +
                '<span style="margin-left:-10px">标题字号:</span> <input value=' + fontsize + ' id="fontSize" type="text" class="form-control title" style="width:60%">' +
                "</div>" +
                '<div class="Orient">' +
                '<span style="margin-left:-10px">标题颜色:</span> <input value=' + result[p].textstyle['color'] + ' id="linestyle" type="text" class="form-control title" style="width:60%">' +
                "</div>"
              }
              // document.getElementById("Margin").innerHTML =
              //   '<div class="Orient">' +
              //   '<span style="margin-left:15px">标题:</span> <input value="我是标题" id="ttitle" type="text" class="form-control title" style="width:60%">' +
              //   "</div>" +
              //   '<div class="Orient">' +
              //   '<span style="margin-left:-10px">标题字号:</span> <input value="24" id="fontSize" type="text" class="form-control title" style="width:60%">' +
              //   "</div>" +
              //   '<div id="lineColor">' +
              //   "</div>";
              // document.getElementById("lineColor").innerHTML =
              //   '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
              //   '<input type="text" id="linestyle" class="form-control demo" data-control="hue" value="#ffffff" style="width:87%;">' +
              //   '<span for="linestyle" style="margin-left:-180px;position:absolute;margin-top:-30px">标题颜色:</span>' +
              //   "</div>";
              $("#myTab li:eq(1) a").tab("show");
            } else if (result[p].type === 0) {
              that.styleshow = true;
              var obj = result[p];
              that.set(obj.choseOption);
              that.option1 = obj.choseOption;
              that.clickBoxId = oob.attr("id");
            }
          }
        }
      }
    },
    resetPieT(myChart, params, opt) {
      // debugger;
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
      for (var m = 0; m < op.options.length; m++) {
        var ops = op.options[m].series;
        ops.forEach(function (v, i) {
          if (i > 0) {
            var geoCoord = geoCoordMap[v.name];

            // var p = myChart.convertToPixel({ seriesIndex: '0' }, geoCoord);
            var p = myChart.convertToPixel({ seriesIndex: "0" }, geoCoord);
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
      ops.forEach(function (v, i) {
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
    deletechart: function (index) {
      console.log(this.optionID[index]);
      console.dir(index);
      this.$http
        .get("largeScreen/user/deleteChart?chartId=" + this.optionID[index])
        .then(response => {
          window.location.reload();
        });
    },
    dataToLocal: function () {
      (this.reportData = {
        Type: 0,
        desc: {
          title: "",
          content: {
            title: [],
            num: []
          }
        },
        result: []
      }),
        // console.log(this.reportData);
        (this.reportId = parseInt(this.$route.query.reportId));
      if (this.reportId) {
        // alert("yes!");
        var local = window.localStorage;
        var bigCache = JSON.parse(local.getItem("bigCache")) || [];
        if (bigCache.length !== 0) {
          // alert("0.1");
          this.reportData.result = bigCache.data;
          if (!bigCache.content) {
            this.reportData.desc.content = bigCache.content;
          }
        } else {
          // alert("0.0");
          this.$http
            .get("largeScreen/user/getreportbyid?reportid=" + this.reportId)
            .then(response => {
              var data = response.body;
              console.log(data);
              this.reportData.result = JSON.parse(data.DATA.reportData).result;
              this.reportData.desc.content = JSON.parse(
                data.DATA.reportData
              ).desc.content;
              // this.reportData.Type=JSON.parse(data.DATA.reportData).Type;
              // this.reportData.desc.title =JSON.parse(data.DATA.reportData).desc.title;
              // console.log(this.reportData.desc.title);
              // console.log(this.reportData.Type);
              this.fresh();
            });
        }
        // console.log(this.reportData.desc.content);
      } else { // 预览返回
        // alert("no!");
        var local = window.localStorage;
        var bigCache = JSON.parse(local.getItem("bigCache")) || [];
        console.log(bigCache);
        if (bigCache.length !== 0) {
          this.reportData.result = bigCache.data;
          if (!bigCache.content) {
            this.reportData.desc.content = bigCache.content;
          }
        }
      }
    },
    toSave: function () {
      if (this.reportId) {
        this.$http
          .get("largeScreen/user/getreportbyid?reportid=" + this.reportId)
          .then(response => {
            var data = response.body;

            this.reportData.Type = JSON.parse(data.DATA.reportData).Type;
            this.reportData.desc.title = JSON.parse(
              data.DATA.reportData
            ).desc.title;
            this.$http
              .post(
                "largeScreen/user/updatereport",
                {
                  userid: 1,
                  report: JSON.stringify(this.reportData),
                  reportid: JSON.stringify(this.reportId)
                },
                {
                  emulateJSON: true
                }
              )
              .then(
                response => {
                  // console.log(response);
                  alert("保存成功");
                },
                response => {
                  console.log("提交失败了");
                  alert("提交DATA失败，请刷新重试哦");
                }
              );
            var local = window.localStorage;
            local.removeItem("bigCache");

            this.$nextTick(() => {
              this.$router.push({ path: "/dataApplication/dataReport" });
            });
          });
      } else {
        this.upload();
      }
    },
    putcontent: function (DContent) {
      this.reportData.desc.content = DContent;
      // console.log(this.reportData.desc.content);
    },
    delData: function (Ddata) {
      this.reportData.result = Ddata;
      // console.log(this.reportData.result);
    },
    upload: function () {
      // alert("main");
      this.reportData.Type = this.$route.query.id;
      this.reportData.desc.title = this.$route.query.name;
      // console.log(this.reportData);
      this.$http
        .post(
          "largeScreen/user/addnewreport",
          {
            // userid: sessionStorage.getItem("userId"),
            userid: '1',
            report: JSON.stringify(this.reportData)
          },
          {
            emulateJSON: true
          }
        )
        .then(
          response => {
            // console.log(response);
            alert("保存成功");
          },
          response => {
            console.log("提交失败了");
            alert("提交DATA失败，请刷新重试哦");
          }
        );

      var local = window.localStorage;
      local.removeItem("bigCache");

      this.$nextTick(() => {
        this.$router.push({ path: "/dataApplication/dataReport" });
      });
    },

    goPre: function () {
      var local = window.localStorage;
      var bigCache = {
        data: this.reportData.result,
        content: this.reportData.desc.content,
        layer: 1
      };
      local.setItem("bigCache", JSON.stringify(bigCache));
      var id = parseInt(this.$route.query.id);
      console.log(bigCache);
      // console.log(this.reportData.desc.content);
      if (id == 0) {
        this.$router.push({
          path: "/dataApplication/preView",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content
          }
        });
      } else if (id == 1) {
        this.$router.push({
          path: "/dataApplication/preview1",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content
          }
        });
      } else if (id == 2) {
        this.$router.push({
          path: "/dataApplication/preview2",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content
          }
        });
      } else if (id == 3) {
        this.$router.push({
          path: "/dataApplication/preView3",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content
          }
        });
      } else if (id == 4) {
        this.$router.push({
          path: "/dataApplication/preview4",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content
          }
        });
      } else if (id == 5) {
        this.$router.push({
          path: "/dataApplication/preview5",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content
          }
        });
      } else if (id == 6) {
        this.$router.push({
          path: "/dataApplication/preview6",
          query: {
            data: this.reportData.result,
            content: this.reportData.desc.content,
            screenName: this.$route.query.name
          }
        });
      }
    },
    putData: function (Mcontent) {
      // console.log(Mcontent)
      this.reportData.result = Mcontent;
      this.fresh();
    },

    previews() {
      // console.log(this.option1);
      var textstyle = {}
      if(this.option1 === 'notecharts') {
        textstyle['text'] = $("#ttitle").val();
        textstyle['fontsize'] = $("#fontSize").val();
        textstyle['color'] = $("#linestyle").val();
        // console.log(this.currentid)
        bus.$emit('editTextandPic', 1, this.currentid, textstyle)
      } else {
        this.eatlizhi(this.option1);
        var dom = document.getElementById(this.clickBoxId);
        this.myChart = echarts.init(dom);
        this.myChart.setOption(this.option1);
      }
    },
    save() {
      this.previews();
      for (var s = 0; s < this.reportData.result.length; s++) {
        if (this.reportData.result[s].BoxId == this.clickBoxId) {
          this.reportData.result[s].choseOption = this.option1;
        }
      }
    },
    eatlizhi(node) {
      // var theme1 = [
      //   "#033349",
      //   "#3f7994",
      //   "#3580a2",
      //   "#2ea0d4",
      //   "#b2dcef",
      //   "#dee7ea"
      // ];
      var theme1 = [
        "#113c81",
        "#2f60ae",
        "#4676c3",
        "#668bc6",
        "#81a1d5",
        "#9fb8df"
      ];
      // var theme2 = [
      //   "#977C00",
      //   "#C6A300",
      //   "#FFD306",
      //   "#FFE153",
      //   "#FFED97",
      //   "#dee7ea"
      // ];
      var theme2 = [
        "#a7a705",
        "#b9b905",
        "#c1c100",
        "#d9d96d",
        "#ecec66",
        "#f3f39f"
      ];
      // var theme3 = [
      //   "#844200",
      //   "#EA7500",
      //   "#FF9224",
      //   "#FFBB77",
      //   "#FFDC89",
      //   "#FFFAF4"
      // ];
      var theme3 = [
        "#EA7500",
        "#FF9224",
        "#ce8633",
        "#d9984d",
        "#e6b071",
        "#f5cea1"
      ];
      var defaultcolor = [
        "#147a29",
        "#299640",
        "#40ae57",
        "#57c16d",
        "#75d289",
        "#9be8ac"
      ];
      var defaultPieColor = [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48165",
        "#91c7af",
        "#ca8623",
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48165",
        "#91c7af",
        "#ca8623"
      ];
      var macarons = [
        "#d87a80",
        "#feb980",
        "#59b2f0",
        "#b6a2de",
        "#30c7c9",
        "#d87a80",
        "#feb980",
        "#59b2f0",
        "#b6a2de",
        "#30c7c9"
      ];
      var infographic = [
        "#28727b",
        "#c1232b",
        "#b5c334",
        "#fcce11",
        "#e87b25",
        "#28727b",
        "#c1232b",
        "#b5c334",
        "#fcce11",
        "#e87b25"
      ];
      var shine = [
        "#015eaa",
        "#c22e34",
        "#e7b603",
        "#0097d9",
        "#2b821d",
        "#015eaa",
        "#c22e34",
        "#e7b603",
        "#0097d9",
        "#2b821d"
      ];
      var helianthus = [
        "#89ee34",
        "#fe9616",
        "#f4e24e",
        "#e52b6c",
        "#43b7d4",
        "#89ee34",
        "#fe9616",
        "#f4e24e",
        "#e52b6c",
        "#43b7d4"
      ];
      var mint = [
        "#a6d7c2",
        "#8aedd5",
        "#93bc9e",
        "#cef2dc",
        "#7fe579",
        "#a6d7c2",
        "#8aedd5",
        "#93bc9e",
        "#cef2dc",
        "#7fe579"
      ];
      var options = node;
      console.log(node);
      if (options.baseOption != undefined) {
        if (
          options.baseOption.series[0].type == "map" &&
          options.baseOption.series[0].mapType == "china"
        ) {
          var theme = $("#theme option:selected").text();
          //alert(options.baseOption.timeline.data.length)
          for (var i = 0; i < options.baseOption.timeline.data.length; i++) {
            //需要获得timeline的length
            options.options[i].title.text = $("#titles").val();
            options.options[i].title.top = $("#topEdge").val();
            if (theme == "defaultcolor") {
              options.options[i].visualMap.color = defaultcolor;
              options.options[i].series[0].itemStyle.normal.areaColor =
                "#d8f5df";
            } else if (theme == "蓝色") {
              options.options[i].visualMap.color = theme1;
              options.options[i].series[0].itemStyle.normal.areaColor =
                "#dadcf7";
            } else if (theme == "黄色") {
              options.options[i].visualMap.color = theme2;
              options.options[i].series[0].itemStyle.normal.areaColor =
                "#ffffc3";
            } else if (theme == "橙色") {
              options.options[i].visualMap.color = theme3;
              options.options[i].series[0].itemStyle.normal.areaColor =
                "#f7e5d1";
            }
            if (options.options[i].graphic[0].left == undefined) {
              options.options[i].graphic[0].left = $("#remarkleft").val();
            } else {
              options.options[i].graphic[0].left = $("#remarkleft").val();
            }
            if (options.options[i].graphic[0].bottom == undefined) {
              options.options[i].graphic[0].left = $("#remarkbottom").val();
            } else {
              options.options[i].graphic[0].bottom = $("#remarkbottom").val();
            }
            if (options.options[i].visualMap.left == undefined) {
              options.options[i].visualMap.left = $("#visualleft").val();
            } else {
              options.options[i].visualMap.left = $("#visualleft").val();
            }
            if (options.options[i].visualMap.bottom == undefined) {
              options.options[i].visualMap.bottom = $("#visualbottom").val();
            } else {
              options.options[i].visualMap.bottom = $("#visualbottom").val();
            }
          }

          options.baseOption.title.textStyle.color = $("#hue-demo").val();
        } else if (options.baseOption.series[2].type == "pie") {
          options.baseOption.title.text = $("#titles").val();
          options.baseOption.title.textStyle.color = $("#hue-demo").val();
          options.baseOption.title.top = $("#topEdge").val();
          options.baseOption.grid.left = $("#leftMargin").val();
          options.baseOption.grid.top = $("#topMargin").val();
          options.baseOption.grid.right = $("#rightMargin").val();
          options.baseOption.grid.bottom = $("#underMargin").val();
          options.baseOption.graphic[0].bottom = $("#remarkbottom").val();
          options.baseOption.graphic[0].left = $("#remarkleft").val();
          for (var i = 0; i < options.baseOption.timeline.data.length; i++) {
            options.options[i].title.text = $("#titles").val();
            options.options[i].title.textStyle.color = $("#hue-demo").val();
            options.options[i].title.top = $("#topEdge").val();
            options.options[i].grid.left = $("#leftMargin").val();
            options.options[i].grid.top = $("#topMargin").val();
            options.options[i].grid.right = $("#rightMargin").val();
            options.options[i].grid.bottom = $("#underMargin").val();
            options.options[i].graphic[0].bottom = $("#remarkbottom").val();
            options.options[i].graphic[0].left = $("#remarkleft").val();
          }
          options.baseOption.xAxis[0].name = $("#xtitle").val();
          options.baseOption.yAxis[0].name = $("#ytitle").val();
          options.baseOption.xAxis[0].axisLabel.rotate = $(
            "#xaxisrotate"
          ).val();
        }
      } else {
        options.title.text = $("#titles").val();
        options.title.textStyle.color = $("#hue-demo").val();
        options.title.top = $("#topEdge").val();
        var grids = {};
        grids["left"] = $("#leftMargin").val();
        grids["top"] = $("#topMargin").val();
        grids["right"] = $("#rightMargin").val();
        grids["bottom"] = $("#underMargin").val();
        options["grid"] = grids;
        if (
          options.series[0].type == "line" ||
          options.series[0].type == "bar"
        ) {
          if (options.xAxis[0].type == "value") {
            if ($("#valueMin").val() != "") {
              if (options.xAxis[0].min == undefined) {
                options.xAxis[0].min = $("#valueMin").val();
              } else {
                options.xAxis[0].min = $("#valueMin").val();
              }
            }
            if (options.xAxis[0].minInterval == undefined) {
              options.xAxis[0].minInterval = Number($("#valueSeg").val());
            } else {
              options.xAxis[0].minInterval = Number($("#valueSeg").val());
            }
          }
          if (options.yAxis[0].type == "value") {
            if ($("#valueMin").val() != "") {
              if (options.yAxis[0].min == undefined) {
                options.yAxis[0].min = $("#valueMin").val();
              } else {
                options.yAxis[0].min = $("#valueMin").val();
              }
            }
            if (options.yAxis[0].minInterval == undefined) {
              options.yAxis[0].minInterval = Number($("#valueSeg").val());
            } else {
              options.yAxis[0].minInterval = Number($("#valueSeg").val());
            }
          }
          if (options.xAxis[0].name == undefined) {
            var name = options.xAxis[0];
            name["name"] = $("#xtitle").val();
          } else {
            options.xAxis[0].name = $("#xtitle").val();
          }
          if (options.yAxis[0].name == undefined) {
            var name = options.yAxis[0];
            name["name"] = $("#ytitle").val();
          } else {
            options.yAxis[0].name = $("#ytitle").val();
          }
          if (options.graphic[0].left == undefined) {
            options.graphic[0].left = $("#remarkleft").val();
          } else {
            options.graphic[0].left = $("#remarkleft").val();
          }
          if (options.graphic[0].bottom == undefined) {
            options.graphic[0].left = $("#remarkbottom").val();
          } else {
            options.graphic[0].bottom = $("#remarkbottom").val();
          }
          if (options.xAxis[0].axisLabel.rotate == undefined) {
            options.xAxis[0].axisLabel.rotate = $("#xaxisrotate").val();
          } else {
            options.xAxis[0].axisLabel.rotate = $("#xaxisrotate").val();
          }
          // normal["color"] = $("#linestyle").val();
          if (options.series.length == 1) {
            var itemStyle = {};
            var normal = {};
            normal["color"] = $("#linestyle").val();
            itemStyle["normal"] = normal;
            var list = options.series[0];
            list["itemStyle"] = itemStyle;
            options.series[0].barWidth = $("#barWid").val();
          } else if (options.series.length >= 2) {
            var colorStyle = [];
            var normal = {};
            var arrayNormal = [];
            var arrayItem = [];
            var itemStyle = {};
            for (var a = 0; a < options.series.length; a++) {
              colorStyle.push($("#" + a).val());
              var copy = this._deepCopy(normal);
              copy["color"] = colorStyle[a];
              arrayNormal.push(copy);
            }
            for (var b = 0; b < options.series.length; b++) {
              var copy1 = this._deepCopy(itemStyle);
              copy1["normal"] = arrayNormal[b];
              arrayItem.push(copy1);
            }
            for (var c = 0; c < options.series.length; c++) {
              options.series[c]["itemStyle"] = arrayItem[c];
            }
          }
        } else if (options.series[0].type == "radar") {
          if (options.polar[0].center != undefined) {
            options.polar[0].center[0] = $("#xLocation").val();
            options.polar[0].center[1] = $("#yLocation").val();
          } else {
            var center = [];
            center.push($("#xLocation").val());
            center.push($("#yLocation").val());
            options.polar[0]["center"] = center;
          }
          options.polar[0].radius = $("#radiusStyle").val();
          if (options.series[0].data.length >= 2) {
            var colorStyle = [];
            var normal = {};
            var arrayNormal = [];
            var arrayItem = [];
            var itemStyle = {};
            for (var a = 0; a < options.series[0].data.length; a++) {
              colorStyle.push($("#" + a).val());
              var copy = this._deepCopy(normal);
              copy["color"] = colorStyle[a];
              arrayNormal.push(copy);
            }
            for (var b = 0; b < options.series[0].data.length; b++) {
              var copy1 = this._deepCopy(itemStyle);
              copy1["normal"] = arrayNormal[b];
              arrayItem.push(copy1);
            }
            for (var c = 0; c < options.series[0].data.length; c++) {
              options.series[0].data[c]["areaStyle"] = arrayItem[c];
            }
            if (options.graphic[0].left == undefined) {
              options.graphic[0].left = $("#remarkleft").val();
            } else {
              options.graphic[0].left = $("#remarkleft").val();
            }
            if (options.graphic[0].bottom == undefined) {
              options.graphic[0].left = $("#remarkbottom").val();
            } else {
              options.graphic[0].bottom = $("#remarkbottom").val();
            }
          } else if (options.series[0].data.length == 1) {
            var areaStyle = {};
            var normal = {};
            // var opt = options.series[0].data[1];
            if (options.graphic[0].left == undefined) {
              options.graphic[0].left = $("#remarkleft").val();
            } else {
              options.graphic[0].left = $("#remarkleft").val();
            }
            if (options.graphic[0].bottom == undefined) {
              options.graphic[0].left = $("#remarkbottom").val();
            } else {
              options.graphic[0].bottom = $("#remarkbottom").val();
            }
            normal["color"] = $("#linestyle").val();
            areaStyle["normal"] = normal;
            var opt = options.series[0].data[0];
            opt["areaStyle"] = areaStyle;
          }
        } else if (options.series[0].type == "pie") {
          var theme = $("#theme option:selected").text();
          if (theme == "default") {
            options["color"] = defaultPieColor;
          } else if (theme == "macarons") {
            options["color"] = macarons;
          } else if (theme == "infographic") {
            options["color"] = infographic;
          } else if (theme == "shine") {
            options["color"] = shine;
          } else if (theme == "mint") {
            options["color"] = mint;
          } else if (theme == "helianthus") {
            options["color"] = helianthus;
          }
          if (options.series[0].center != undefined) {
            options.series[0].center[0] = $("#xLocation").val();
            options.series[0].center[1] = $("#yLocation").val();
          } else {
            var center = [];
            center.push($("#xLocation").val());
            center.push($("#yLocation").val());
            options.series[0]["center"] = center;
          }
          if (options.series[0].radius.length == 2) {
            options.series[0].radius[0] = $("#inRadius").val();
            options.series[0].radius[1] = $("#outRadius").val();
          } else if (typeof options.series[0].radius == "string") {
            options.series[0].radius = $("#radiusStyle").val();
          }
          if (options.graphic[0].left == undefined) {
            options.graphic[0].left = $("#remarkleft").val();
          } else {
            options.graphic[0].left = $("#remarkleft").val();
          }
          if (options.graphic[0].bottom == undefined) {
            options.graphic[0].left = $("#remarkbottom").val();
          } else {
            options.graphic[0].bottom = $("#remarkbottom").val();
          }
          if (options.series[0].label.show == undefined) {
            if ($("#viewC").val() == "true") {
              options.series[0].label.show = true;
            } else {
              options.series[0].label.show = false;
            }
          } else {
            if ($("#viewC").val() == "true") {
              options.series[0].label.show = true;
            } else {
              options.series[0].label.show = false;
            }
          }
          if (options.series[0].labelLine.show == undefined) {
            if ($("#viewC").val() == "true") {
              options.series[0].labelLine.show = true;
            } else {
              options.series[0].labelLine.show = false;
            }
          } else {
            if ($("#viewC").val() == "true") {
              options.series[0].labelLine.show = true;
            } else {
              options.series[0].labelLine.show = false;
            }
          }
        } else if (
          options.series[0].type == "map" &&
          options.series[0].mapType == "china"
        ) {
          var theme = $("#theme option:selected").text();
          if (theme == "defaultcolor") {
            options.visualMap.color = defaultcolor;
            options.series[0].itemStyle.normal.areaColor = "#d8f5df";
          } else if (theme == "蓝色") {
            options.visualMap.color = theme1;
            options.series[0].itemStyle.normal.areaColor = "#dadcf7";
          } else if (theme == "黄色") {
            options.visualMap.color = theme2;
            options.series[0].itemStyle.normal.areaColor = "#ffffc3";
          } else if (theme == "橙色") {
            options.visualMap.color = theme3;
            options.series[0].itemStyle.normal.areaColor = "#f7e5d1";
          }
          if (options.graphic[0].left == undefined) {
            options.graphic[0].left = $("#remarkleft").val();
          } else {
            options.graphic[0].left = $("#remarkleft").val();
          }
          if (options.graphic[0].bottom == undefined) {
            options.graphic[0].left = $("#remarkbottom").val();
          } else {
            options.graphic[0].bottom = $("#remarkbottom").val();
          }
          if (options.visualMap.left == undefined) {
            options.visualMap.left = $("#visualleft").val();
          } else {
            options.visualMap.left = $("#visualleft").val();
          }
          if (options.visualMap.bottom == undefined) {
            options.visualMap.bottom = $("#visualbottom").val();
          } else {
            options.visualMap.bottom = $("#visualbottom").val();
          }
        }
      }
      // alert(JSON.stringify(options));
    },
    set(node) {
      // debugger;
      if (node.baseOption !== undefined) {
        //动态中国地图
        if (
          node.baseOption.series[0].type == "map" &&
          node.baseOption.series[0].mapType == "china"
        ) {
          document.getElementById("titles").value = node.options[0].title.text;
          document.getElementById("hue-demo").value =
            node.baseOption.title.textStyle.color;
          document.getElementById("Margin").innerHTML =
            "<div class='Orient'><span style='margin-left:-15px'>切换主题:</span>" +
            "<select id='theme' class = 'form-control title' style='width:60%'>" +
            "<option  name ='defaultcolor'>defaultcolor</option>" +
            "<option  name ='theme1'>蓝色</option>" +
            "<option name ='theme2'>黄色</option>" +
            "<option name ='theme3'>橙色</option>" +
            "</select>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>图例左边距:</span> <input  id="visualleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>图例下边距:</span> <input  id="visualbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            "</div>";
          // alert(node.graphic[0].left);
          if (node.baseOption.title.top == undefined) {
            document.getElementById("topEdge").value = 0;
          } else {
            document.getElementById("topEdge").value =
              node.baseOption.title.top;
          }
          if (
            node.baseOption.graphic[0].left == undefined ||
            node.baseOption.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value =
              node.baseOption.graphic[0].left;
          }
          if (
            node.baseOption.graphic[0].bottom == undefined ||
            node.baseOption.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.baseOption.graphic[0].bottom;
          }
          if (
            node.baseOption.visualMap.left == undefined ||
            node.baseOption.visualMap.left == null
          ) {
            document.getElementById("visualleft").value = "5%";
          } else {
            document.getElementById("visualleft").value =
              node.baseOption.visualMap.left;
          }
          if (
            node.baseOption.visualMap.bottom == undefined ||
            node.baseOption.visualMap.bottom == null
          ) {
            document.getElementById("visualbottom").value = "5%";
          } else {
            document.getElementById("visualbottom").value =
              node.baseOption.visualMap.bottom;
          }
        } else if (node.baseOption.series[2].type == "pie") {
          // alert(node.baseOption.grid.left);
          document.getElementById("titles").value = node.baseOption.title.text;
          document.getElementById("hue-demo").value =
            node.baseOption.title.textStyle.color;
          document.getElementById("Margin").innerHTML =
            '<div class="Orient">' +
            '<span>x轴标题:</span> <input value="" id="xtitle" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>y轴标题:</span> <input value="" id="ytitle" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>上边距:</span> <input value="40" id="topMargin" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>下边距:</span><input value="50" id="underMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>左边距:</span><input value="50" id="leftMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>右边距:</span> <input value="30" id="rightMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>横轴倾斜度:</span> <input  id="xaxisrotate" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>";
          if (
            node.baseOption.xAxis[0].name == undefined ||
            node.baseOption.xAxis[0].name == null
          ) {
            document.getElementById("xtitle").value = "";
          } else {
            document.getElementById("xtitle").value =
              node.baseOption.xAxis[0].name;
          }
          if (
            node.baseOption.yAxis[0].name == undefined ||
            node.baseOption.yAxis[0].name == null
          ) {
            document.getElementById("ytitle").value = "";
          } else {
            document.getElementById("ytitle").value =
              node.baseOption.yAxis[0].name;
          }
          if (node.baseOption.title.top == undefined) {
            document.getElementById("topEdge").value = 0;
          } else {
            document.getElementById("topEdge").value =
              node.baseOption.title.top;
          }
          if (node.baseOption.grid.left == undefined) {
            document.getElementById("leftMargin").value = 50;
          } else {
            document.getElementById("leftMargin").value =
              node.baseOption.grid.left;
          }
          if (node.baseOption.grdefined) {
            document.getElementById("topMargin").value = 40;
          } else {
            document.getElementById("topMargin").value =
              node.baseOption.grid.top;
          }
          if (node.baseOption.grid.right == undefined) {
            document.getElementById("rightMargin").value = 30;
          } else {
            document.getElementById("rightMargin").value =
              node.baseOption.grid.right;
          }
          if (node.baseOption.grid.bottom == undefined) {
            document.getElementById("underMargin").value = 30;
          } else {
            document.getElementById("underMargin").value =
              node.baseOption.grid.bottom;
          }
          if (node.baseOption.xAxis[0].axisLabel.rotate == undefined) {
            document.getElementById("xaxisrotate").value = "";
          } else {
            document.getElementById("xaxisrotate").value =
              node.baseOption.xAxis[0].axisLabel.rotate;
          }

          if (
            node.baseOption.graphic == undefined ||
            node.baseOption.graphic[0].left == undefined ||
            node.baseOption.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value =
              node.baseOption.graphic[0].left;
          }
          if (
            node.baseOption.graphic == undefined ||
            node.baseOption.graphic[0].bottom == undefined ||
            node.baseOption.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.baseOption.graphic[0].bottom;
          }
        }
      } else {
        document.getElementById("titles").value = node.title.text;
        document.getElementById("hue-demo").value = node.title.textStyle.color;
        if (node.title.top == undefined) {
          document.getElementById("topEdge").value = 0;
        } else {
          document.getElementById("topEdge").value = node.title.top;
        }
        if (node.series[0].type == "radar") {
          document.getElementById("Margin").innerHTML =
            '<div class="Orient">' +
            '<span>半径大小:</span> <input id="radiusStyle" value="55%" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>水平位置:</span> <input value="50%" id="xLocation" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>垂直位置:</span> <input value="60%" id="yLocation" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            "<div id='radius'></div>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>";
          if (
            node.graphic == undefined ||
            node.graphic[0].left == undefined ||
            node.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value = node.graphic[0].left;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].bottom == undefined ||
            node.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.graphic[0].bottom;
          }
          if (node.series[0].data.length >= 2) {
            for (var s = 0; s < node.series[0].data.length; s++) {
              var div = document.createElement("div");
              div.innerHTML =
                '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
                '<input type="text" id="' +
                s +
                '" class="form-control demo" data-control="hue" value="" style="width:87%;">' +
                '<span style="margin-left:-177px;position:absolute;margin-top:-30px">背景色' +
                (s + 1) +
                ":</span>" +
                "</div>";
              document.getElementById("radius").appendChild(div);
              if (node.series[0].data[s].areaStyle == undefined) {
                document.getElementById(s).value = "";
              } else {
                document.getElementById(s).value =
                  node.series[0].data[s].areaStyle.normal.color;
              }
            }
          } else if (node.series[0].data.length == 1) {
            document.getElementById("radius").innerHTML =
              '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
              '<input type="text" id="linestyle" class="form-control demo" data-control="hue" value="" style="width:87%;">' +
              '<span for="linestyle" style="margin-left:-177px;position:absolute;margin-top:-30px">背景色:</span>' +
              "</div>";
            if (node.series[0].data[0].areaStyle == undefined) {
              document.getElementById("linestyle").value = "#d43939";
            } else {
              document.getElementById("linestyle").value =
                node.series[0].data[0].areaStyle.normal.color;
            }
          }
        } else if (node.series[0].type == "line") {
          document.getElementById("Margin").innerHTML =
            '<div class="Orient">' +
            '<span>x轴标题:</span> <input value="" id="xtitle" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>y轴标题:</span> <input value="" id="ytitle" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>数值最小值:</span> <input  id="valueMin" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>数值分段值:</span> <input  id="valueSeg" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>上边距:</span> <input value="40" id="topMargin" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>下边距:</span><input value="50" id="underMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>左边距:</span><input value="50" id="leftMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>右边距:</span> <input value="30" id="rightMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>横轴倾斜度:</span> <input  id="xaxisrotate" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div id="lineColor">' +
            "</div>";
          if (node.yAxis[0].min == undefined) {
            document.getElementById("valueMin").value = "";
          } else {
            document.getElementById("valueMin").value = node.yAxis[0].min;
          }
          if (node.yAxis[0].minInterval == undefined) {
            document.getElementById("valueSeg").value = "";
          } else {
            document.getElementById("valueSeg").value =
              node.yAxis[0].minInterval;
          }
          if (node.xAxis[0].name == undefined || node.xAxis[0].name == null) {
            document.getElementById("xtitle").value = "";
          } else {
            document.getElementById("xtitle").value = node.xAxis[0].name;
          }
          if (node.yAxis[0].name == undefined || node.yAxis[0].name == null) {
            document.getElementById("ytitle").value = "";
          } else {
            document.getElementById("ytitle").value = node.yAxis[0].name;
          }
          if (node.grid.left == undefined) {
            document.getElementById("leftMargin").value = 50;
          } else {
            document.getElementById("leftMargin").value = node.grid.left;
          }
          if (node.grid.top == undefined) {
            document.getElementById("topMargin").value = 40;
          } else {
            document.getElementById("topMargin").value = node.grid.top;
          }
          if (node.grid.right == undefined) {
            document.getElementById("rightMargin").value = 30;
          } else {
            document.getElementById("rightMargin").value = node.grid.right;
          }
          if (node.grid.bottom == undefined) {
            document.getElementById("underMargin").value = 30;
          } else {
            document.getElementById("underMargin").value = node.grid.bottom;
          }
          if (node.xAxis[0].axisLabel.rotate == undefined) {
            document.getElementById("xaxisrotate").value = "";
          } else {
            document.getElementById("xaxisrotate").value =
              node.xAxis[0].axisLabel.rotate;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].left == undefined ||
            node.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value = node.graphic[0].left;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].bottom == undefined ||
            node.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.graphic[0].bottom;
          }
          if (node.series.length == 1) {
            document.getElementById("lineColor").innerHTML =
              '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
              '<input type="text" id="linestyle" class="form-control demo" data-control="hue" value="" style="width:87%;">' +
              '<span for="linestyle" style="margin-left:-155px;position:absolute;margin-top:-30px">线色:</span>' +
              "</div>";
            if (node.series[0].itemStyle == undefined) {
              document.getElementById("linestyle").value = "";
            } else {
              document.getElementById("linestyle").value =
                node.series[0].itemStyle.normal.color;
            }
          } else if (node.series.length >= 2) {
            for (var s = 0; s < node.series.length; s++) {
              var div = document.createElement("div");
              div.innerHTML =
                '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
                '<input type="text" id="' +
                s +
                '" class="form-control demo" data-control="hue" value="" style="width:87%;">' +
                '<span style="margin-left:-155px;position:absolute;margin-top:-30px">线' +
                (s + 1) +
                "色:</span>" +
                "</div>";
              document.getElementById("lineColor").appendChild(div);
              if (node.series[s].itemStyle == undefined) {
                document.getElementById(s).value = "";
              } else {
                document.getElementById(s).value =
                  node.series[s].itemStyle.normal.color;
              }
            }
          }
        } else if (node.series[0].type == "bar") {
          document.getElementById("Margin").innerHTML =
            '<div class="Orient">' +
            '<span>x轴标题:</span> <input value="" id="xtitle" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>y轴标题:</span> <input value="" id="ytitle" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>数值最小值:</span> <input value="" id="valueMin" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>数值分段值:</span> <input value="" id="valueSeg" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div id="barWidth">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>上边距:</span> <input value="40" id="topMargin" type="text" class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>下边距:</span><input value="50" id="underMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>左边距:</span><input value="50" id="leftMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>右边距:</span> <input value="30" id="rightMargin" type="text"  class="form-control title" style="width:60%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>横轴倾斜度:</span> <input  id="xaxisrotate" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div id="lineColor">' +
            "</div>";
          if (node.xAxis[0].type == "value") {
            if (node.xAxis[0].min == undefined) {
              document.getElementById("valueMin").value = "";
            } else {
              document.getElementById("valueMin").value = node.xAxis[0].min;
            }
            if (node.xAxis[0].minInterval == undefined) {
              document.getElementById("valueSeg").value = "";
            } else {
              document.getElementById("valueSeg").value =
                node.xAxis[0].minInterval;
            }
          } else {
            if (node.yAxis[0].min == undefined) {
              document.getElementById("valueMin").value = "";
            } else {
              document.getElementById("valueMin").value = node.yAxis[0].min;
            }
            if (node.yAxis[0].minInterval == undefined) {
              document.getElementById("valueSeg").value = "";
            } else {
              document.getElementById("valueSeg").value =
                node.yAxis[0].minInterval;
            }
          }

          if (node.xAxis[0].axisLabel.rotate == undefined) {
            document.getElementById("xaxisrotate").value = "";
          } else {
            document.getElementById("xaxisrotate").value =
              node.xAxis[0].axisLabel.rotate;
          }
          if (node.xAxis[0].name == undefined || node.xAxis[0].name == null) {
            document.getElementById("xtitle").value = "";
          } else {
            document.getElementById("xtitle").value = node.xAxis[0].name;
          }
          if (node.yAxis[0].name == undefined || node.yAxis[0].name == null) {
            document.getElementById("ytitle").value = "";
          } else {
            document.getElementById("ytitle").value = node.yAxis[0].name;
          }
          if (node.grid == undefined || node.grid.top == undefined) {
            document.getElementById("leftMargin").value = 50;
            document.getElementById("topMargin").value = 40;
            document.getElementById("rightMargin").value = 30;
            document.getElementById("underMargin").value = 30;
          } else {
            document.getElementById("leftMargin").value = node.grid.left;
            document.getElementById("topMargin").value = node.grid.top;
            document.getElementById("rightMargin").value = node.grid.right;
            document.getElementById("underMargin").value = node.grid.bottom;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].left == undefined ||
            node.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value = node.graphic[0].left;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].bottom == undefined ||
            node.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.graphic[0].bottom;
          }
          if (node.series.length == 1) {
            document.getElementById("lineColor").innerHTML =
              '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
              '<input type="text" id="linestyle" class="form-control demo" data-control="hue" value="" style="width:87%;">' +
              '<span for="linestyle" style="margin-left:-155px;position:absolute;margin-top:-30px">柱色:</span>' +
              "</div>";
            document.getElementById("barWidth").innerHTML =
              '<div class="Orient">' +
              '<span>柱宽:</span> <input  id="barWid" type="text"  class="form-control title" style="width:65%">' +
              "</div>";
            if (node.series[0].itemStyle == undefined) {
              document.getElementById("linestyle").value = "";
            } else {
              document.getElementById("linestyle").value =
                node.series[0].itemStyle.normal.color;
            }
            if (node.series[0].barWidth == undefined) {
              document.getElementById("barWid").value = "";
            } else {
              document.getElementById("barWid").value = node.series[0].barWidth;
            }
          } else if (node.series.length >= 2) {
            for (var s = 0; s < node.series.length; s++) {
              var div = document.createElement("div");
              div.innerHTML =
                '<div class="form-group" style="margin-left:93px;margin-top:15px;position:relative">' +
                '<input type="text" id="' +
                s +
                '" class="form-control demo" data-control="hue" value="" style="width:87%;">' +
                '<span style="margin-left:-155px;position:absolute;margin-top:-30px">柱' +
                (s + 1) +
                "色:</span>" +
                "</div>";
              document.getElementById("lineColor").appendChild(div);
              if (node.series[s].itemStyle == undefined) {
                document.getElementById(s).value = "";
              } else {
                document.getElementById(s).value =
                  node.series[s].itemStyle.normal.color;
              }
            }
          }
        } else if (node.series[0].type == "pie") {
          document.getElementById("Margin").innerHTML =
            "<div class='Orient'><span style='margin-left:-15px'>切换主题:</span>" +
            "<select id='theme' class = 'form-control title' style='width:60%'>" +
            "<option selected = 'true'></option>" +
            "<option name ='default'>default</option>" +
            "<option name ='macarons'>macarons</option>" +
            "<option name ='infographic'>infographic</option>" +
            "<option name ='shine'>shine</option>" +
            "<option name ='helianthus'>helianthus</option>" +
            "<option name ='mint'>mint</option>" +
            "</select>" +
            "<div id='radius'></div>" +
            '<div class="Orient">' +
            '<span>水平位置:</span> <input value="50%" id="xLocation" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>垂直位置:</span> <input value="60%" id="yLocation" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>视觉导航字</span> <input  id="viewC" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            "</div>";
          // alert(typeof(node.series[0].radius));
          if (typeof node.series[0].radius == "string") {
            document.getElementById("radius").innerHTML =
              '<div class="Orient">' +
              '<span>半径大小:</span> <input id="radiusStyle" value="55%" type="text" class="form-control title" style="width:60%">' +
              "</div>";
          } else if (node.series[0].radius.length == 2) {
            document.getElementById("radius").innerHTML =
              '<div class="Orient">' +
              '<span>内半径:</span> <input value="15" id="inRadius" type="text" class="form-control title" style="width:60%">' +
              "</div>" +
              '<div class="Orient">' +
              '<span>外半径:</span> <input value="50" id="outRadius" type="text" class="form-control title" style="width:60%">';
            ("</div>");
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].left == undefined ||
            node.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value = node.graphic[0].left;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].bottom == undefined ||
            node.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.graphic[0].bottom;
          }
          if (
            node.series[0].label == undefined ||
            node.series[0].label.show == undefined ||
            node.series[0].label.show == null
          ) {
            document.getElementById("viewC").value = "true";
          } else {
            console.log(node.series[0].label.show);
            document.getElementById("viewC").value = node.series[0].label.show;
          }
        } else if (
          node.series[0].type == "map" &&
          node.series[0].mapType == "china"
        ) {
          document.getElementById("Margin").innerHTML =
            "<div class='Orient'><span style='margin-left:-15px'>切换主题:</span>" +
            "<select id='theme' class = 'form-control title' style='width:60%'>" +
            "<option  name ='defaultcolor'>defaultcolor</option>" +
            "<option  name ='theme1'>蓝色</option>" +
            "<option name ='theme2'>黄色</option>" +
            "<option name ='theme3'>橙色</option>" +
            "</select>" +
            '<div class="Orient">' +
            '<span>备注左边距:</span> <input  id="remarkleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>备注下边距:</span> <input  id="remarkbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>图例左边距:</span> <input  id="visualleft" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            '<div class="Orient">' +
            '<span>图例下边距:</span> <input  id="visualbottom" type="text"  class="form-control title" style="width:50%">' +
            "</div>" +
            "</div>";
          // alert(node.graphic[0].left);
          if (
            node.graphic == undefined ||
            node.graphic[0].left == undefined ||
            node.graphic[0].left == null
          ) {
            document.getElementById("remarkleft").value = "";
          } else {
            document.getElementById("remarkleft").value = node.graphic[0].left;
          }
          if (
            node.graphic == undefined ||
            node.graphic[0].bottom == undefined ||
            node.graphic[0].bottom == null
          ) {
            document.getElementById("remarkbottom").value = "";
          } else {
            document.getElementById("remarkbottom").value =
              node.graphic[0].bottom;
          }
          if (node.visualMap.left == undefined || node.visualMap.left == null) {
            document.getElementById("visualleft").value = "5%";
          } else {
            document.getElementById("visualleft").value = node.visualMap.left;
          }
          if (
            node.visualMap.bottom == undefined ||
            node.visualMap.bottom == null
          ) {
            document.getElementById("visualbottom").value = "5%";
          } else {
            document.getElementById("visualbottom").value =
              node.visualMap.bottom;
          }
        }
      }
      $(".demo").each(function () {
        $(this).minicolors({
          control: $(this).attr("data-control") || "hue",
          defaultValue: $(this).attr("data-defaultValue") || "",
          inline: $(this).attr("data-inline") === "true",
          letterCase: $(this).attr("data-letterCase") || "lowercase",
          opacity: $(this).attr("data-opacity"),
          position: $(this).attr("data-position") || "bottom left",
          change: function (hex, opacity) {
            if (!hex) return;
            if (opacity) hex += ", " + opacity;
            try {
            } catch (e) { }
          },
          theme: "bootstrap"
        });
      });
      $("#myTab li:eq(1) a").tab("show");
    },

    init() {
      this.show0 = false;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      this.show5 = false;
      this.show6 = false;
      this.reportId = null;
    },
    convert() {
      this.showChart = !this.showChart;
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
    drag1(event) {
      //alert('a');
      this.chart = event.currentTarget;
      //通过复制被拖拽节点，使原来的位置上仍保存节点
      this.dragContent = this.chart.cloneNode(true);
      this.dragContent.setAttribute("draggable", "false");
      var str = this.dragContent.id;
      // console.log(str.length);
      var num = str.slice(5);
      var sum = this.cacheOption.length - num - 1;

      // console.log(num);
      this.chooseOption = this.cacheOption[sum];
      // console.log(this.chooseOption);
    },
    addTextandPic(type) {
      var textstyle = {}
      bus.$emit('addTextandPic', type, textstyle)
    },
  },
  watch: {
    $route(to, from) {
      this.init();
      var num = parseInt(this.$route.query.id);
      //alert(num);
      switch (num) {
        case 0:
          this.show0 = true;
          break;
        case 1:
          this.show1 = true;
          break;
        case 2:
          this.show2 = true;
          break;
        case 3:
          this.show3 = true;
          break;
        case 4:
          this.show4 = true;
          break;
        case 5:
          this.show5 = true;
          break;
        case 6:
          this.show6 = true;
          break;
      }
      // debugger;
      var fromPath = from.path;
      // alert(fromPath);
      // console.log(fromPath);
      if (fromPath == "/modal" || fromPath == "/dataApplication/dataReport") {
        var local = window.localStorage;
        // var bigCache =JSON.parse(local.getItem("bigCache")) || [];
        // console.log(bigCache);
        // alert(fromPath);
        local.removeItem("bigCache");
        // var bigCache1 = JSON.parse(local.getItem("bigCache")) || [];
        // console.log(bigCache1);
      }
      this.dataToLocal();
    }
  },
  components: {
    "Modal-0": Modal0,
    "Modal-1": Modal1,
    "Modal-2": Modal2,
    "Modal-3": Modal3,
    "Modal-4": Modal4,
    "Modal-5": Modal5,
    "Modal-6": Modal6,
  }
};
</script>
<style>
.buttonC {
  color: white;
  background-color: #409eff;
  height: 40px;
  width: 80px;
  border: solid;
  border-radius: 5px;
}
.Orient {
  margin-top: 15px;
}
.title {
  border-radius: 5px;
  margin-left: 10px;
  display: inline;
}
.el-header,
.el-footer {
  background-color: #545b64;
  color: #333;
  text-align: center;
}

.el-aside {
  text-align: center;
  overflow: scroll;
}

.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
  padding: 0px;
  display: flex;
  flex-direction: column;
}
a {
  border-radius: 0px !important;
}
.el-tabs__item {
  width: 120px;
}
.hd {
  width: 100%;
  height: 40px;
  border-bottom: 1px #eee solid;
}
.hd-l,
.hd-r {
  float: left;
  width: 50%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #666;
  border-bottom: 1px solid #dddee3;
  cursor: pointer;
}
.hd_active {
  background: #409eff;
  color: #fff;
}
.mod-chart0 {
  width: 90%;
  height: 200px;
  /* border: 2px solid #ddd; */
  margin: 10px auto;
  cursor: move;
}
.mod-chart1 {
  width: 90%;
  height: 250px;
  border: 2px solid #ddd;

  margin: 10px auto;
  cursor: move;
}
.buttonT {
  float: right;
  background: #0a054d;
  border: #0a054d;
  color: #4f4e5c;
}
.icon {
  float: right;
  white-space: nowrap;
}
.icon li {
  display: inline-block;
  margin-right: 15px;
  line-height: 35px;
}
.icon li:hover {
  cursor: pointer;
  color: lightblue;
}
</style>