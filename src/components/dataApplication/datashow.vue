<template>
  <div class="container-main">
    <div class="main-table">
      <div class="main-title">
        <span class="title-tg"></span>数据表格
      </div>
      <div class="to-view">
        <label for="布局选择">选择图形呈现方式：</label>
        <select class="form-control select-layer" v-model="showType">
          <option value="1">饼图</option>
          <option value="34">环状图</option>
          <option value="35">玫瑰图</option>
          <option value="2">折线图</option>
          <option value="10">横向条形图</option>
          <option value="3">柱状图</option>
          <!-- <option value="33">斑马柱状图</option> -->
          <option value="8">广东地图</option>
          <option value="11">散点广东地图</option>
          <option value="13">雷达图</option>
          <option value="36">太阳图</option>
          <option value="41">中国地图</option>
          <option value="42">散点中国地图</option>
          <option value="44">动态中国地图</option>
          <option value="37">旋转状柱状图</option>
          <option value="38">饼状地图</option>
          <option value="46">柱饼联动图</option>
          <option value="39">堆积条形图</option>
          <option value="20">箱形图和柱形图</option>
          <option value="47">动态饼状地图</option>
          <option value="52">飞线层地图</option>
          <option value="48">弧形柱图</option>
          <option value="49">折线柱图</option>
          <option value="50">基本水位图</option>
          <option value="51">字符云</option>
        </select>
        <div class="btn btn-default table-next" @click="chose">确定
          <!-- <router-link :to="({path:'/biggraph/datasight',query:{id: parseInt(this.showType),data:this.$route.query.data}})" >下一步</router-link> -->
        </div>
      </div>
      <div class="table-area">
        <div class="view-bt">
          <div class="btn btn-info button-layercache" @click="loadimg">
            <div class="layercache-icon"></div>视图缓存
          </div>
          <div class="btn btn-default view-next">
            <router-link to="/dataApplication/largeScreen">新建大屏</router-link>
          </div>
        </div>
        <div class="view-area">
          <div class="view-area-box" id="main" style=" margin-top: -40px;"></div>
          <div class="row tiplocation">
            添加备注
            <span
              style="color: grey;font-size: 12px; margin-left: 450px;"
            >注：备注允许输入汉字，字母，数字且字数上限为60</span>
          </div>
          <div class="tiplocation">
            <textarea style="width: 800px; height: 50px;border: 1px solid black" id="remark"></textarea>
          </div>
          <div
            class="btn btn-info button-layercache"
            @click="saveremark"
            style="margin-top :10px;margin-left: 500px; "
          >
            <div class="layercache-icon">保存备注</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import 'echarts/map/js/china.js'
export default {
  data() {
    return {
      showType: "",
      dataShow: {},
      option: {},
      firstT: 0,
      clickFlag: false,
      flagP: false
    };
  },
  created() {},
  mounted: function() {},
  methods: {
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
    draw: function() {
      $.get("./../../static/json/china.json", function(geoJson) {
          echarts.registerMap("china", geoJson);
          // alert("true00");
      });
      // $.get("./../../static/json/guangdong.json", function(geoJson) {
      //     echarts.registerMap("guangdong", geoJson);
      // });
      document.getElementById("remark").value = "";
      this.dataShow = this.$route.query.data;
      console.log(this.dataShow);
      if (this.dataShow.label) {
        var showType = this.showType;
        // console.log(JSON.stringify(this.$route.query)+"hhh");
        this.firstT = parseInt(showType);

        this.option = DVL($("#main"), this.dataShow.data, this.firstT);
        console.log(this.option);
      } else {
        var showType = this.showType; // 非实时表
        // console.log(JSON.stringify(this.$route.query)+"hhh");
        this.firstT = parseInt(showType);
        this.option = DVL($("#main"), this.dataShow, this.firstT);
        console.log(this.option);
      }

      var mychart = echarts.init(document.getElementById("main"));
      if (
        this.firstT == 41 ||
        this.firstT == 42 ||
        this.firstT == 38 ||
        this.firstT == 47 ||
        this.firstT == 44
      ) {
        $.get("./../../static/json/china.json", geoJson => {
          echarts.registerMap("china", geoJson);

          // alert("true00"+this.flagP);
          console.log(this.flagP);
          console.log(this.option);
          mychart.setOption(this.option);
        });
      } else if (this.firstT == 8) {
        $.get("./../../static/json/guangdong.json", geoJson => {
          echarts.registerMap("guangdong", geoJson);

          // alert("true00"+this.flagP);
          // console.log(this.flagP);
          // console.log(this.option);
          mychart.setOption(this.option);
        });
      }
      mychart.setOption(this.option);
      // console.log("maybe11");
    },
    datamatch: function(data, index) {
      // relationtype 数据类型，index 布局类型
      // relationtype 1 yiwei 2 2wei  7 map
      // index 1 pie  2: Line 3: bar 4: Timeline 5 Parallel 6: Tree 7: Ford 8: map 9:Word 10 horizBar
      // debugger;
      console.log(data);
      var relationtype = parseInt(data.relationtype);
      index = parseInt(index);
      //console.log(relationtype+ '' +index);
      if (
        relationtype === 1 &&
        (index === 8 ||
          index === 11 ||
          index === 41 ||
          index === 42 ||
          index === 38 ||
          index === 44 ||
          index === 46 ||
          index === 47)
      ) {
        createPop();
        return false;
      }
      if (
        relationtype === 2 &&
        (index === 1 ||
          index === 13 ||
          index === 34 ||
          index === 35 ||
          index === 37 ||
          index === 47)
      ) {
        createPop();
        return false;
      }
      if (
        relationtype === 7 &&
        (index === 1 ||
          index === 13 ||
          index === 34 ||
          index === 35 ||
          index === 37 ||
          index === 47)
      ) {
        createPop();
        return false;
      }
      if (relationtype === 3 && index !== 47) {
        createPop();
        return false;
      }
      return true;

      function createPop() {
        alert("数据类型与布局不匹配");
      }
    },
    chose: function() {
      // document.getElementById("remark").value="";
      var myChart = echarts.init(document.getElementById("main"));
      // if (myChart) {
      //   myChart.dispose();
      //   this.draw();
      // } else {
      //   this.dispose();
      // }
      if (myChart) {
        myChart.dispose();
      }
      var index = parseInt(this.showType);
      if (index === 50) {
        this.option = {
          series: [
            {
              type: "liquidFill",
              data: [0.7],
              label: {
                normal: {
                  textStyle: {
                    fontSize: 10
                  }
                }
              }
            }
          ]
        };
        var mychart1 = echarts.init(document.getElementById("main"));
        mychart1.setOption(this.option);
      } else if (index === 51) {
        function createRandomItemStyle() {
          return {
            normal: {
              color:
                "rgb(" +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(",") +
                ")"
            }
          };
        }

        this.option = {
          tooltip: {
            show: true
          },
          series: [
            {
              name: "Google Trends",
              type: "wordCloud",
              size: ["80%", "80%"],
              textRotation: [0, 45, 90, -45],
              textPadding: 0,
              autoSize: {
                enable: true,
                minSize: 14
              },
              data: [
                {
                  name: "Sam S Club",
                  value: 10000,
                  itemStyle: {
                    normal: {
                      color: "black"
                    }
                  }
                },
                {
                  name: "Macys",
                  value: 6181,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Amy Schumer",
                  value: 4386,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Jurassic World",
                  value: 4055,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Charter Communications",
                  value: 2467,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Chick Fil A",
                  value: 2244,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Planet Fitness",
                  value: 1898,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Pitch Perfect",
                  value: 1484,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Express",
                  value: 1112,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Home",
                  value: 965,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Johnny Depp",
                  value: 847,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Lena Dunham",
                  value: 582,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Lewis Hamilton",
                  value: 555,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "KXAN",
                  value: 550,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Mary Ellen Mark",
                  value: 462,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Farrah Abraham",
                  value: 366,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Rita Ora",
                  value: 360,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Serena Williams",
                  value: 282,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "NCAA baseball tournament",
                  value: 273,
                  itemStyle: createRandomItemStyle()
                },
                {
                  name: "Point Break",
                  value: 265,
                  itemStyle: createRandomItemStyle()
                }
              ]
            }
          ]
        };
        var mychart1 = echarts.init(document.getElementById("main"));
        mychart1.setOption(this.option);
      } else if (index === 52) {
        var geoCoordMap = {
          上海: [121.4648, 31.2891],
          东莞: [113.8953, 22.901],
          东营: [118.7073, 37.5513],
          中山: [113.4229, 22.478],
          临汾: [111.4783, 36.1615],
          临沂: [118.3118, 35.2936],
          丹东: [124.541, 40.4242],
          丽水: [119.5642, 28.1854],
          乌鲁木齐: [87.9236, 43.5883],
          佛山: [112.8955, 23.1097],
          保定: [115.0488, 39.0948],
          兰州: [103.5901, 36.3043],
          包头: [110.3467, 41.4899],
          北京: [116.4551, 40.2539],
          北海: [109.314, 21.6211],
          南京: [118.8062, 31.9208],
          南宁: [108.479, 23.1152],
          南昌: [116.0046, 28.6633],
          南通: [121.1023, 32.1625],
          厦门: [118.1689, 24.6478],
          台州: [121.1353, 28.6688],
          合肥: [117.29, 32.0581],
          呼和浩特: [111.4124, 40.4901],
          咸阳: [108.4131, 34.8706],
          哈尔滨: [127.9688, 45.368],
          唐山: [118.4766, 39.6826],
          嘉兴: [120.9155, 30.6354],
          大同: [113.7854, 39.8035],
          大连: [122.2229, 39.4409],
          天津: [117.4219, 39.4189],
          太原: [112.3352, 37.9413],
          威海: [121.9482, 37.1393],
          宁波: [121.5967, 29.6466],
          宝鸡: [107.1826, 34.3433],
          宿迁: [118.5535, 33.7775],
          常州: [119.4543, 31.5582],
          广州: [113.5107, 23.2196],
          廊坊: [116.521, 39.0509],
          延安: [109.1052, 36.4252],
          张家口: [115.1477, 40.8527],
          徐州: [117.5208, 34.3268],
          德州: [116.6858, 37.2107],
          惠州: [114.6204, 23.1647],
          成都: [103.9526, 30.7617],
          扬州: [119.4653, 32.8162],
          承德: [117.5757, 41.4075],
          拉萨: [91.1865, 30.1465],
          无锡: [120.3442, 31.5527],
          日照: [119.2786, 35.5023],
          昆明: [102.9199, 25.4663],
          杭州: [119.5313, 29.8773],
          枣庄: [117.323, 34.8926],
          柳州: [109.3799, 24.9774],
          株洲: [113.5327, 27.0319],
          武汉: [114.3896, 30.6628],
          汕头: [117.1692, 23.3405],
          江门: [112.6318, 22.1484],
          沈阳: [123.1238, 42.1216],
          沧州: [116.8286, 38.2104],
          河源: [114.917, 23.9722],
          泉州: [118.3228, 25.1147],
          泰安: [117.0264, 36.0516],
          泰州: [120.0586, 32.5525],
          济南: [117.1582, 36.8701],
          济宁: [116.8286, 35.3375],
          海口: [110.3893, 19.8516],
          淄博: [118.0371, 36.6064],
          淮安: [118.927, 33.4039],
          深圳: [114.5435, 22.5439],
          清远: [112.9175, 24.3292],
          温州: [120.498, 27.8119],
          渭南: [109.7864, 35.0299],
          湖州: [119.8608, 30.7782],
          湘潭: [112.5439, 27.7075],
          滨州: [117.8174, 37.4963],
          潍坊: [119.0918, 36.524],
          烟台: [120.7397, 37.5128],
          玉溪: [101.9312, 23.8898],
          珠海: [113.7305, 22.1155],
          盐城: [120.2234, 33.5577],
          盘锦: [121.9482, 41.0449],
          石家庄: [114.4995, 38.1006],
          福州: [119.4543, 25.9222],
          秦皇岛: [119.2126, 40.0232],
          绍兴: [120.564, 29.7565],
          聊城: [115.9167, 36.4032],
          肇庆: [112.1265, 23.5822],
          舟山: [122.2559, 30.2234],
          苏州: [120.6519, 31.3989],
          莱芜: [117.6526, 36.2714],
          菏泽: [115.6201, 35.2057],
          营口: [122.4316, 40.4297],
          葫芦岛: [120.1575, 40.578],
          衡水: [115.8838, 37.7161],
          衢州: [118.6853, 28.8666],
          西宁: [101.4038, 36.8207],
          西安: [109.1162, 34.2004],
          贵阳: [106.6992, 26.7682],
          连云港: [119.1248, 34.552],
          邢台: [114.8071, 37.2821],
          邯郸: [114.4775, 36.535],
          郑州: [113.4668, 34.6234],
          鄂尔多斯: [108.9734, 39.2487],
          重庆: [107.7539, 30.1904],
          金华: [120.0037, 29.1028],
          铜川: [109.0393, 35.1947],
          银川: [106.3586, 38.1775],
          镇江: [119.4763, 31.9702],
          长春: [125.8154, 44.2584],
          长沙: [113.0823, 28.2568],
          长治: [112.8625, 36.4746],
          阳泉: [113.4778, 38.0951],
          青岛: [120.4651, 36.3373],
          韶关: [113.7964, 24.7028]
        };

        var BJData = [
          [{ name: "北京" }, { name: "上海", value: 95 }],
          [{ name: "北京" }, { name: "广州", value: 90 }],
          [{ name: "北京" }, { name: "大连", value: 80 }],
          [{ name: "北京" }, { name: "南宁", value: 70 }],
          [{ name: "北京" }, { name: "南昌", value: 60 }],
          [{ name: "北京" }, { name: "拉萨", value: 50 }],
          [{ name: "北京" }, { name: "长春", value: 40 }],
          [{ name: "北京" }, { name: "包头", value: 30 }],
          [{ name: "北京" }, { name: "重庆", value: 20 }],
          [{ name: "北京" }, { name: "常州", value: 10 }]
        ];

        var SHData = [
          [{ name: "上海" }, { name: "包头", value: 95 }],
          [{ name: "上海" }, { name: "昆明", value: 90 }],
          [{ name: "上海" }, { name: "广州", value: 80 }],
          [{ name: "上海" }, { name: "郑州", value: 70 }],
          [{ name: "上海" }, { name: "长春", value: 60 }],
          [{ name: "上海" }, { name: "重庆", value: 50 }],
          [{ name: "上海" }, { name: "长沙", value: 40 }],
          [{ name: "上海" }, { name: "北京", value: 30 }],
          [{ name: "上海" }, { name: "丹东", value: 20 }],
          [{ name: "上海" }, { name: "大连", value: 10 }]
        ];

        var GZData = [
          [{ name: "广州" }, { name: "福州", value: 95 }],
          [{ name: "广州" }, { name: "太原", value: 90 }],
          [{ name: "广州" }, { name: "长春", value: 80 }],
          [{ name: "广州" }, { name: "重庆", value: 70 }],
          [{ name: "广州" }, { name: "西安", value: 60 }],
          [{ name: "广州" }, { name: "成都", value: 50 }],
          [{ name: "广州" }, { name: "常州", value: 40 }],
          [{ name: "广州" }, { name: "北京", value: 30 }],
          [{ name: "广州" }, { name: "北海", value: 20 }],
          [{ name: "广州" }, { name: "海口", value: 10 }]
        ];

        var planePath =
          "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

        var convertData = function(data) {
          var res = [];
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
              res.push([
                {
                  coord: fromCoord
                },
                {
                  coord: toCoord
                }
              ]);
            }
          }
          return res;
        };

        var color = ["#a6c84c", "#ffa022", "#46bee9"];
        var series = [];
        [["北京", BJData], ["上海", SHData], ["广州", GZData]].forEach(function(
          item,
          i
        ) {
          series.push(
            {
              name: item[0] + " Top10",
              type: "lines",
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: "#fff",
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + " Top10",
              type: "lines",
              zlevel: 2,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.2
                }
              },
              data: convertData(item[1])
            },
            {
              name: item[0] + " Top10",
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              rippleEffect: {
                brushType: "stroke"
              },
              label: {
                normal: {
                  show: true,
                  position: "right",
                  formatter: "{b}"
                }
              },
              symbolSize: function(val) {
                return val[2] / 8;
              },
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item[1].map(function(dataItem) {
                return {
                  name: dataItem[1].name,
                  value: geoCoordMap[dataItem[1].name].concat([
                    dataItem[1].value
                  ])
                };
              })
            }
          );
        });

        this.option = {
          backgroundColor: "#404a59",
          title: {
            text: "模拟迁徙",
            subtext: "",
            left: "center",
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {
            trigger: "item"
          },
          legend: {
            orient: "vertical",
            top: "bottom",
            left: "right",
            data: ["北京 Top10", "上海 Top10", "广州 Top10"],
            textStyle: {
              color: "#fff"
            },
            selectedMode: "single"
          },
          geo: {
            type: "map",
            map: "china",
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#323c48",
                borderColor: "#404a59"
              },
              emphasis: {
                areaColor: "#2a333d"
              }
            }
          },
          series: series
        };
        var mychart1 = echarts.init(document.getElementById("main"));
        mychart1.setOption(this.option);
      } else {
        this.dataShow = this.$route.query.data;
        console.log(this.dataShow.relationtype);
        console.log(index);
        if (this.datamatch(this.dataShow, index)) {
          this.option = DVL($("#main"), this.dataShow, index);
          // console.log(this.option);
          var mychart1 = echarts.init(document.getElementById("main"));
          mychart1.setOption(this.option);
          // console.log("maybe");
        } else {
          return false;
        }
      }
    },
    loadimg: function() {
      var OP = this.option;
      if (OP === undefined) {
        alert("当前不可缓存,请重新选择数据源生成视图！");
      } else {
        // alert(OP)
        // console.log(typeof OP);
        this.$http
          .post(
            "largeScreen/user/addnewChart",
            {
              // userId: sessionStorage.getItem("userId"),
              userId: "1",
              chart: JSON.stringify(OP)
            },
            {
              emulateJSON: true
            }
          )
          .then(
            response => {
              console.log(response);
              alert("缓存成功");
            },
            response => {
              console.log("提交失败了");
              alert("提交option失败，请刷新重试哦");
            }
          );
      }
    },
    saveremark: function() {
      var remarkdom = document.getElementById("remark");
      var remarktext = remarkdom.value;
      var regremark = /^[\u4e00-\u9fa5a-zA-Z0-9]{0,60}$/;
      if (!regremark.test(remarktext)) {
        alert("允许输入汉字，字母，数字且字数上限为60");
      }
      if (this.option.baseOption == undefined) {
        if (remarkdom.value != "") {
          var textarr = remarktext.match(/[\u4e00-\u9fa5a-zA-Z0-9]{1,20}/g);
          this.option.graphic[0].children[0].style.text = textarr.join("\n");
        } else {
          this.option.graphic[0].children[0].style.text = [];
        }
      } else {
        if (remarkdom.value != "") {
          // var remarktext=remarkdom.value;
          var textarr = remarktext.match(/[\u4e00-\u9fa5a-zA-Z0-9]{1,20}/g);
          for (
            var i = 0;
            i < this.option.baseOption.timeline.data.length;
            i++
          ) {
            this.option.options[
              i
            ].graphic[0].children[0].style.text = textarr.join("\n");
          }
        } else {
          this.option.graphic[0].children[0].style.text = [];
        }
      }
    },
    handlevalue: function(value) {
      this.dataId = value;
      // console.log(this.dataId);
    }
  },
  watch: {
    $route(to, from) {}
  }
};
</script>
<style scoped>
* {
  font-family: "microsoft yahei";
}
body,
h1,
h2,
h3,
h4,
p,
span,
div {
  font-family: "microsoft yahei";
  font-size: 16px;
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
html {
  height: 100%;
}
body {
  background: #eff0f4;
}
.container-main {
  height: 100%;
  /* background: #fff; */
  /*box-shadow: 0 1px 3px #d0d0d0;*/
}
.container-main .main-title {
  color: #1f2425;
  width: 100%;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  background-color: #fff;
  border-bottom: 2px solid #ddd;
  font-size: 20px;
  font-weight: bold;
}
.container-main .main-title .title-tg {
  display: inline-block;
  float: left;
  margin: 17px;
  width: 16px;
  height: 16px;
  /* background: url('../images/main-title.png') no-repeat;*/
}
.container-main .main-table {
  background-color: #fff;
  height: 800px;
  overflow-x: hidden;
  overflow-y: auto;
  /*display: none;*/
}
.container-main .main-table .to-view {
  margin: 20px;
}
.container-main .main-table .to-view .form-control {
  display: inline;
  width: 200px;
}
.container-main .main-table .table-area {
  padding: 0 20px;
}
.container-main .main-table .to-view > .table-next {
  margin-left: 5px;
}
.table-show {
  margin-left: 10px;
}
.view-area > .view-area-box {
  /*margin-left: 90px;*/
  width: 800px;
  height: 500px;
  /*margin-top: 50px;*/
  background-color: #4f515a;
  /*background-color: #4f515a;*/
}
.view-bt {
  margin-left: 850px;
  width: 120px;
}
.view-bt .button-layercache,
.view-bt .button-imgdown,
.view-bt .view-next {
  width: 120px;
  margin-top: 11px;
  font-size: 16px;
}
.view-bt .button-layercache {
  background-color: #2a3d53;
  border: none;
}
.view-bt .button-imgdown {
  background-color: #2a3d53;
  border: none;
}
</style>
