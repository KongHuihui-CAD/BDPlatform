<template>
 <fullscreen ref="fullscreen" @change="fullscreenChange">
  <div class="dashboard">
    <div class="background" id="background">
       <el-button class="button" type="text" @click="toggle">
              <span class="sum">
                <i class="iconfont icon-Shape"></i></span>
          </el-button>
      <div class="title">仪表盘模版二</div>
      <div class="operate-content" id="cityEcharts">
      </div>
      <!-- <br/> -->
      <!-- <div class="titles">世界各地专利情况分布图</div> -->
      <div class="operate" style="margin-top: 10px;" id="chart-panel">
      </div>

    </div>
  </div>
   </fullscreen>
</template>

<script>
import echarts from "echarts";
import graphDisplay from "./graphDisplay.vue";
import fullscreen from "vue-fullscreen";
import "../../../static/js/china.js";
import "../../../static/js/world.js";
export default {
  name: "dashboard",
  data() {
    return {
      width:"",
      geoCoordMap: {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58]
      },
      cityData: [
        { name: "杭州", value: 180.59 },
        { name: "济南", value: 253.47 },
        { name: "成都", value: 16.06 },
        { name: "宁波", value: 112.21 },
        { name: "重庆", value: 319.19 },
        { name: "西安", value: 543.93 },
        { name: "郑州", value: 380.7 },
        { name: "天津", value: 41.9 },
        { name: "苏州", value: 111.33 },
        { name: "青岛", value: 102.12 },
        { name: "南京", value: 30.64 },
        { name: "苏州", value: 78.2 },
        { name: "成都", value: 20.14 },
        { name: "大连", value: 65.39 },
        { name: "北京", value: 48.39 },
        { name: "鄂尔多斯", value: 88 },
        { name: "武汉", value: 66 },
        { name: "齐齐哈尔", value: 200 },
        { name: "乌鲁木齐", value: 33 }
      ],
      countries: [
        "奥地利",
        "比利时",
        "加拿大",
        "智利",
        "中国",
        "捷克共和国",
        "德国",
        "丹麦",
        "西班牙",
        "爱沙尼亚",
        "芬兰",
        "法国",
        "英国",
        "希腊",
        "匈牙利",
        "爱尔兰",
        "以色列",
        "意大利",
        "日本",
        "大韩民国",
        "卢森堡",
        "墨西哥",
        "荷兰",
        "挪威",
        "波兰",
        "葡萄牙",
        "罗马尼亚",
        "俄罗斯联邦",
        "新加坡",
        "斯洛伐克共和国",
        "瑞典",
        "土耳其",
        "美国"
      ],
      years: ["2011", "2012", "2013", "2014"],
      data: [
        [
          [3888, 2.681634155, 0.115044968],
          [2630, 2.155333864, 0.113580762],
          [4754, 1.798516848, 0.321718039],
          [339, 0.353431105, 0.008865196],
          [415829, 1.794378769, 1.344426108],
          [947, 1.560055473, 0.035462114],
          [73216, 2.793094646, 1.049495413],
          [3372, 2.966252937, 0.101297148],
          [4846, 1.325123536, 0.197168399],
          [92, 2.306546282, 0.005343989],
          [3221, 3.638811596, 0.099578704],
          [14655, 2.190640728, 0.627071365],
          [20107, 1.690647615, 0.438706938],
          [798, 0.671962477, 0.019337731],
          [759, 1.196201683, 0.016738569],
          [1089, 1.532655096, 0.03705727],
          [1360, 4.010980069, 0.104993157],
          [12776, 1.208805643, 0.275376703],
          [287580, 3.383130198, 1.99795231],
          [138034, 3.743612984, 0.450155865],
          [454, 1.495255394, 0.008776758],
          [1065, 0.425630318, 0.049771599],
          [8195, 1.903056123, 0.170076448],
          [1585, 1.627537229, 0.081076972],
          [4134, 0.746011795, 0.039444782],
          [648, 1.456831329, 0.035674867],
          [1445, 0.493159407, 0.009141344],
          [26879, 1.090685987, 0.207753205],
          [1056, 2.150545396, 0.059218391],
          [269, 0.664985831, 0.006511529],
          [5614, 3.249186329, 0.182966043],
          [4258, 0.859523484, 0.066591939],
          [247750, 2.762901434, 4.28745]
        ],
        [
          [4137, 2.885611751, 0.117552039],
          [2656, 2.362687426, 0.117609858],
          [4709, 1.786069239, 0.327335695],
          [336, 0.364786726, 0.009675296],
          [535313, 1.928096899, 1.631482938],
          [1005, 1.790383224, 0.036960954],
          [73905, 2.871666001, 1.016459314],
          [3013, 3.000847221, 0.096710267],
          [4816, 1.284108385, 0.172063689],
          [61, 2.114262278, 0.004891402],
          [3600, 3.419483165, 0.087780344],
          [14540, 2.229066585, 0.597705505],
          [20108, 1.621774512, 0.426603403],
          [708, 0.699567292, 0.017186316],
          [795, 1.27038148, 0.016156227],
          [1059, 1.563616123, 0.03512697],
          [1319, 4.128561592, 0.107183065],
          [12192, 1.269762162, 0.263428865],
          [287013, 3.34313709, 1.990663159],
          [148136, 4.025543282, 0.492246329],
          [502, 1.288387196, 0.007213256],
          [1294, 0.431925327, 0.051161548],
          [7443, 1.939447342, 0.160769869],
          [1565, 1.620240469, 0.082584443],
          [4795, 0.881090883, 0.04407462],
          [696, 1.377767686, 0.029810508],
          [1057, 0.482513568, 0.008301336],
          [29174, 1.125617969, 0.226937204],
          [1081, 1.999471183, 0.057971785],
          [205, 0.808098834, 0.007519337],
          [5758, 3.281344985, 0.178466004],
          [4833, 0.921956332, 0.072729752],
          [268782, 2.699295093, 4.362913307]
        ],
        [
          [4159, 2.964367964, 0.127082033],
          [2600, 2.429639368, 0.126681978],
          [4567, 1.688282406, 0.310469086],
          [340, 0.391102941, 0.01082079],
          [704936, 2.014663128, 1.912036712],
          [1134, 1.909524273, 0.03978082],
          [73929, 2.826465631, 1.05860102],
          [3275, 3.05717828, 0.102683755],
          [4532, 1.261723192, 0.172762921],
          [66, 1.71468405, 0.004329026],
          [3492, 3.296833923, 0.088747507],
          [14690, 2.243278709, 0.630417223],
          [19552, 1.664319816, 0.451412843],
          [764, 0.812521634, 0.019460694],
          [745, 1.397306603, 0.018780049],
          [881, 1.535990932, 0.036596513],
          [1201, 4.088166123, 0.119541383],
          [12017, 1.30581673, 0.278601131],
          [271731, 3.474087952, 1.709099492],
          [159978, 4.148528466, 0.541633943],
          [515, 1.301430349, 0.008042125],
          [1210, 0.501060466, 0.063072179],
          [8151, 1.957941606, 0.169199292],
          [1612, 1.652425456, 0.086314296],
          [4608, 0.870823097, 0.045636272],
          [741, 1.326410846, 0.029986633],
          [1023, 0.386661981, 0.007407949],
          [29120, 1.132793839, 0.235510646],
          [1143, 2.000481989, 0.060463749],
          [213, 0.827352135, 0.008110851],
          [6000, 3.306047971, 0.191334882],
          [4769, 0.944772769, 0.077777718],
          [287831, 2.742439075, 4.598536376]
        ],
        [
          [4058, 2.986101514, 0.130459055],
          [2811, 2.464682772, 0.131009371],
          [4198, 1.611535199, 0.287721343],
          [452, 0.379277698, 0.009787698],
          [801135, 2.046036451, 2.118636316],
          [1077, 1.997342028, 0.040999382],
          [73826, 2.842110679, 1.099411182],
          [3359, 3.051451057, 0.104470235],
          [4416, 1.222219162, 0.168830279],
          [80, 1.4323688, 0.003793652],
          [3615, 3.173878291, 0.086398228],
          [25116, 2.255988303, 0.638262415],
          [19922, 1.700690197, 0.508318151],
          [745, 0.834537526, 0.019659541],
          [659, 1.370716837, 0.018963411],
          [881, 1.518890182, 0.038095833],
          [1125, 4.108562894, 0.125588429],
          [12243, 1.28699587, 0.275566578],
          [265959, 3.583492875, 1.648930345],
          [164073, 4.291634971, 0.605284896],
          [586, 1.256096937, 0.008148799],
          [1246, 0.540771351, 0.070013112],
          [9150, 1.972795993, 0.173471763],
          [1632, 1.705111816, 0.085224411],
          [4424, 0.940505393, 0.051254398],
          [834, 1.285201947, 0.02957467],
          [980, 0.382832013, 0.007620028],
          [24370, 1.186906229, 0.220835526],
          [1303, "-", 0],
          [238, 0.886220557, 0.008884238],
          [15852, 3.160839968, 0.180512561],
          [5170, 1.007124663, 0.080411777],
          [285096, "-", 0]
        ]
      ],
      coords: [
        [14.550072, 47.516231, 0, "奥地利"],
        [4.469936, 50.503887, 0, "比利时"],
        [-106.346771, 56.130366, 0, "加拿大"],
        [-71.542969, -35.675147, 0, "智利"],
        [104.195397, 35.86166, 0, "中国"],
        [15.472962, 49.817492, 0, "捷克共和国"],
        [10.451526, 51.165691, 0, "德国"],
        [9.501785, 56.26392, 0, "丹麦"],
        [-3.74922, 40.463667, 0, "西班牙"],
        [25.013607, 58.595272, 0, "爱沙尼亚"],
        [25.748151, 61.92411, 0, "芬兰"],
        [2.213749, 46.227638, 0, "法国"],
        [-3.435973, 55.378051, 0, "英国"],
        [21.824312, 39.074208, 0, "希腊"],
        [19.503304, 47.162494, 0, "匈牙利"],
        [-8.24389, 53.41291, 0, "爱尔兰"],
        [34.851612, 31.046051, 0, "以色列"],
        [12.56738, 41.87194, 0, "意大利"],
        [138.252924, 36.204824, 0, "日本"],
        [127.766922, 35.907757, 0, "大韩民国"],
        [6.129583, 49.815273, 0, "卢森堡"],
        [-102.552784, 23.634501, 0, "墨西哥"],
        [5.291266, 52.132633, 0, "荷兰"],
        [8.468946, 60.472024, 0, "挪威"],
        [19.145136, 51.919438, 0, "波兰"],
        [-8.224454, 39.399872, 0, "葡萄牙"],
        [24.96676, 45.943161, 0, "罗马尼亚"],
        [105.318756, 61.52401, 0, "俄罗斯联邦"],
        [103.819836, 1.352083, 0, "新加坡"],
        [19.699024, 48.669026, 0, "斯洛伐克共和国"],
        [18.643501, 60.128161, 0, "瑞典"],
        [35.243322, 38.963745, 0, "土耳其"],
        [-95.712891, 37.09024, 0, "美国"]
      ],
      itemStyle: {
        normal: {
          opacity: 0.8,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      schema: [
        {
          name: "Income",
          index: 0,
          text: "人均收入",
          unit: "美元"
        },
        {
          name: "LifeExpectancy",
          index: 1,
          text: "人均寿命",
          unit: "%"
        },
        {
          name: "Population",
          index: 2,
          text: "总人口",
          unit: ""
        },
        {
          name: "Country",
          index: 3,
          text: "国家",
          unit: ""
        }
      ]
    };
  },
  mounted() {
    let geoCoordMap = this.geoCoordMap;
    var convertData = function(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };

    var convertedData = [
      convertData(this.cityData),
      convertData(
        this.cityData
          .sort(function(a, b) {
            return b.value - a.value;
          })
          .slice(0, 6)
      )
    ];

    var option = {
      backgroundColor: "#333",
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicInOut",
      animationDurationUpdate: 1000,
      animationEasingUpdate: "cubicInOut",
      title: [
        {
          text: "城市表现图",
          subtext: "data from Dashbroad",
          sublink: "http://www.Petronas.com",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        {
          id: "statistic",
          right: 120,
          top: 40,
          width: 100,
          textStyle: {
            color: "#fff",
            fontSize: 16
          }
        }
      ],
      toolbox: {
        iconStyle: {
          normal: {
            borderColor: "#fff"
          },
          emphasis: {
            borderColor: "#b1e4ff"
          }
        }
      },
      brush: {
        outOfBrush: {
          color: "#abc"
        },
        brushStyle: {
          borderWidth: 2,
          color: "rgba(0,0,0,0.2)",
          borderColor: "rgba(0,0,0,0.5)"
        },
        seriesIndex: [0, 1],
        throttleType: "debounce",
        throttleDelay: 300,
        geoIndex: 0
      },
      geo: {
        map: "china",
        left: "170",
        right: "60%",
        center: [97.98561551896913, 35.205000490896193],
        zoom: 2.5,
        label: {
          emphasis: {
            show: false
          }
        },
        // roam: true,
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "#111"
          },
          emphasis: {
            areaColor: "#2a333d"
          }
        }
      },
      tooltip: {
        trigger: "item"
      },
      grid: {
        right: 40,
        top: 100,
        bottom: 40,
        width: "30%"
      },
      xAxis: {
        type: "value",
        scale: true,
        position: "top",
        boundaryGap: false,
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { margin: 2, textStyle: { color: "#aaa" } }
      },
      yAxis: {
        type: "category",
        name: "TOP 20",
        nameGap: 16,
        axisLine: { show: false, lineStyle: { color: "#ddd" } },
        axisTick: { show: false, lineStyle: { color: "#ddd" } },
        axisLabel: { interval: 0, textStyle: { color: "#ddd" } },
        data: []
      },
      series: [
        {
          name: "Sell-in vol, KL",
          type: "scatter",
          coordinateSystem: "geo",
          data: convertedData[0],
          symbolSize: function(val) {
            return Math.max(val[2] / 15, 8);
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#ddb926"
            }
          }
        },
        {
          name: "Top 5",
          type: "effectScatter",
          coordinateSystem: "geo",
          data: convertedData[1],
          symbolSize: function(val) {
            return Math.max(val[2] / 15, 8);
          },
          showEffectOn: "emphasis",
          rippleEffect: {
            brushType: "stroke"
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#f4e925",
              shadowBlur: 10,
              shadowColor: "#333"
            }
          },
          zlevel: 1
        },
        {
          id: "bar",
          zlevel: 2,
          type: "bar",
          symbol: "none",
          itemStyle: {
            normal: {
              color: "#ddb926"
            }
          },
          data: []
        }
      ]
    };

    var cityEcharts = document.getElementById("cityEcharts");
    var myChart = echarts.init(cityEcharts);
    myChart.setOption(option);
    myChart.on("brushselected", renderBrushed);

    function renderBrushed(params) {
      var mainSeries = params.batch[0].selected[0];

      var selectedItems = [];
      var categoryData = [];
      var barData = [];
      var maxBar = 30;
      var sum = 0;
      var count = 0;

      for (var i = 0; i < mainSeries.dataIndex.length; i++) {
        var rawIndex = mainSeries.dataIndex[i];
        var dataItem = convertedData[0][rawIndex];
        var pmValue = dataItem.value[2];

        sum += pmValue;
        count++;

        selectedItems.push(dataItem);
      }

      selectedItems.sort(function(a, b) {
        return a.value[2] - b.value[2];
      });

      for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
        categoryData.push(selectedItems[i].name);
        barData.push(selectedItems[i].value[2]);
      }

      this.setOption({
        yAxis: {
          data: categoryData
        },
        xAxis: {
          axisLabel: { show: !!count }
        },
        title: {
          id: "statistic",
          text: count ? "平均: " + (sum / count).toFixed(4) : ""
        },
        series: {
          id: "bar",
          data: barData
        }
      });
    }

    //专利情况
    let data = this.data;
    let countries = this.countries;
    function getMax(dim) {
      var max = 0;
      data.forEach(function(dataByYear) {
        dataByYear.forEach(function(item) {
          if (item[dim] > max) {
            max = item[dim];
          }
        });
      });
      var exp = Math.round(Math.log(max) / Math.log(10));
      var exp10 = Math.pow(10, exp);
      max = (Math.ceil((max / exp10) * 10) / 10) * exp10;

      return max;
    }
    var options = {
      baseOption: {
        timeline: {
          axisType: "category",
          orient: "vertical",
          autoPlay: true,
          inverse: true,
          playInterval: 3000,
          left: null,
          right: 10,
          top: 20,
          bottom: 20,
          width: 55,
          height: null,
          label: {
            normal: {
              textStyle: {
                color: "#ddd"
              }
            },
            emphasis: {
              textStyle: {
                color: "#fff"
              }
            }
          },
          symbol: "none",
          lineStyle: {
            color: "#555"
          },
          checkpointStyle: {
            color: "#bbb",
            borderColor: "#777",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            normal: {
              color: "#666",
              borderColor: "#666"
            },
            emphasis: {
              color: "#aaa",
              borderColor: "#aaa"
            }
          },
          data: this.years
        },
        backgroundColor: "#333",
        title: {
          text: "",
          textAlign: "center",
          right: 80,
          bottom: 60,
          textStyle: {
            fontSize: 70,
            color: "#fff"
          }
        },
        tooltip: {
          padding: 5,
          backgroundColor: "#222",
          borderColor: "#777",
          borderWidth: 1
        },
        xAxis: {
          // type: 'log',
          type: "value",
          name: "专利申请量（千亿 $）",
          nameGap: 25,
          min: 0,
          max: getMax(0),
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 14
          },
          splitLine: {
            show: false
          },
          axisTick: {
            lineStyle: {
              color: "#ddd"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ddd"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#ddd"
            }
          }
        },
        yAxis: {
          type: "value",
          name: "研发经费\n支出占比",
          nameGap: 25,
          min: 0,
          max: getMax(1),
          nameTextStyle: {
            color: "#ccc",
            fontSize: 14
          },
          axisLine: {
            lineStyle: {
              color: "#ddd"
            }
          },
          axisTick: {
            lineStyle: {
              color: "#ddd"
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#ddd"
            }
          }
        },
        grid: {
          top: "40%",
          left: 200,
          right: 130
        },
        geo: {
          top: 20,
          left: 170,
          right: 120,
          height: "38%",
          name: "World Population (2010)",
          type: "map",
          map: "world",
          roam: false,
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#aaa",
              areaColor: "#555"
            },
            emphasis: {
              areaColor: "#555"
            }
          }
        },
        toolbox: {
          top: 20,
          left: 10,
          itemSize: 15,
          iconStyle: {
            normal: {
              borderColor: "#eee"
            },
            emphasis: {
              borderColor: "#fffb60"
            }
          }
        },
        brush: {
          toolbox: ["polygon", "keep", "clear"],
          brushLink: "all",
          outOfBrush: {
            opacity: 0.1,
            color: "#aaa"
          }
        },
        visualMap: [
          {
            type: "piecewise",
            dimension: 3,
            categories: countries,
            left: 10,
            top: 80,
            calculable: true,
            precision: 0.1,
            textGap: 10,
            itemGap: 3,
            itemHeight: 10,
            textStyle: {
              color: "#ccc"
            },
            inRange: {
              color: [
                "#bcd3bb",
                "#e88f70",
                "#9dc5c8",
                "#e1e8c8",
                "#7b7c68",
                "#e5b5b5",
                "#f0b489",
                "#928ea8",
                "#bda29a",
                "#376956",
                "#c3bed4",
                "#495a80",
                "#9966cc",
                "#bdb76a",
                "#eee8ab",
                "#a35015",
                "#04dd98",
                "#d9b3e6",
                "#b6c3fc",
                "#315dbc",
                "#c5c975",
                "#476a54",
                "#66e638",
                "#a59619",
                "#822ee2",
                "#49450d",
                "#eeebd4",
                "#2b98dc",
                "#b95c25",
                "#8f1ec2",
                "#d50390",
                "#36a15d",
                "#edc1a5"
              ]
            },
            outOfRange: {
              color: "#555"
            }
          },
          {
            show: false,
            type: "continuous",
            dimension: 2,
            min: 0,
            max: 5,
            inRange: {
              symbolSize: [10, 50]
            }
          }
        ],
        series: [
          {
            type: "scatter",
            id: "gridScatter",
            itemStyle: this.itemStyle,
            data: [],
            tooltip: {
              formatter: function(obj) {
                var value = obj.value;
                return (
                  '<div style="border-bottom: 1px solid #555;padding-bottom: 5px; margin-bottom: 5px;">' +
                  value[3] +
                  "</div>" +
                  "专利申请量：" +
                  value[0] +
                  "<br>" +
                  "R&D 经费支出占比：" +
                  value[1] +
                  " %<br>" +
                  "R&D 经费支出：" +
                  value[2] +
                  " 千亿 $<br>"
                );
              }
            }
          },
          {
            type: "scatter",
            id: "geoScatter",
            coordinateSystem: "geo",
            itemStyle: {
              normal: {
                opacity: 1,
                shadowBlur: 5,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            data: this.coords,
            symbolSize: 15,
            tooltip: {
              formatter: function(obj) {
                var value = obj.value;
                return this.schema[3].text + "：" + value[3];
              }
            }
          }
        ],
        animationDurationUpdate: 1000,
        animationEasingUpdate: "quinticInOut"
      },
      options: []
    };
    for (var n = 0; n < this.years.length; n++) {
      options.options.push({
        title: {
          text: this.years[n]
        },
        series: {
          id: "gridScatter",
          type: "scatter",
          itemStyle: this.itemStyle,
          data: data[n].map(function(item, index) {
            return item.concat([countries[index]]);
          }),
          symbolSize: 10
        }
      });
    }
    var chart = document.getElementById("chart-panel");
    var Chart = echarts.init(chart);
    Chart.setOption(options);
  },
  methods: {
    toggle() {
      this.$refs["fullscreen"].toggle(); // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
  },
};
</script>
<style scoped>
.background {
  background-color: #333;
  text-align: center;
}
.dashboard{
  background-color: #333;

}
.operate-content {
  padding: 20px;
  /* width: 1050px; */
  height: 500px;
}
.operate {
  padding: 20px;
  /* width: 1050px; */
  height: 500px;
}
.title {
  font-size: 25px;
  color: #80ac7b;
  font-weight: 500;
  padding-top: 10px;
}
.titles{
  font-size: 17px;
  color: #fff;
  font-weight: 400;
}
.button{
  float: right;
  margin-right: 10px;
}
</style>
