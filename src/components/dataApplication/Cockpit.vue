<template>
 <fullscreen ref="fullscreen" @change="fullscreenChange">
  <div class="dashboard" >
    <div>
      <div class="operate-content">
        <!-- <el-button round @click="addReport" class="operate" v-if="show1">生成报告</el-button> -->
         <el-button class="operate" type="text" @click="toggle">
              <span class="sum">
                <i class="iconfont icon-Shape"></i></span>
          </el-button>
      </div>
      <graphDisplay :option="option" :testLayout="testLayout" :number="number" :fx="fx" :fxdata="fxdata" :data="data" :nodedata="nodedata" :university="university" :alldata="alldata" v-if="show1">
       
      </graphDisplay>
    </div>
  </div>
 </fullscreen>
</template>

<script>
import echarts from "echarts";
import graphDisplay from "./graphDisplay.vue";
import fullscreen from "vue-fullscreen";
export default {
  name: "dashboard",
  data() {
    return {
       //全屏
      fullscreen: false,
      message: {},
      theme: "vintage",
      fx: ["01、03", "02", "04", "05", "06", "07", "08"],
      fxdata: [],
      data: {
        同济大学: [
          [26, 17, 7, 0, 17, 7, 2],
          [10, 8, 1, 2, 12, 7, 0],
          [
            [
              252.0,
              245.0,
              251.0,
              262.0,
              249.0,
              253.0,
              255.0,
              228.0,
              229.0,
              246.0,
              253.0,
              225.0,
              237.0,
              243.0,
              234.0,
              231.0,
              235.0,
              223.0,
              230.0,
              233.0,
              228.0,
              243.0,
              229.0,
              237.0,
              223.0,
              226.0
            ],
            [
              249.8,
              257.5,
              252.5,
              256.5,
              243.3,
              241.8,
              251.8,
              249.8,
              248.0,
              253.2,
              249.3,
              255.0,
              247.2,
              251.3,
              249.5,
              240.2,
              248.2
            ],
            [304.0, 286.0, 291.0, 295.0, 281.0, 271.0, 277.0],
            [],
            [
              293.5,
              256.8,
              267.5,
              294.5,
              277.6,
              273.5,
              296.0,
              264.7,
              276.6,
              267.5,
              264.2,
              262.2,
              268.9,
              266.7,
              290.0,
              298.0,
              256.0
            ],
            [265.0, 292.0, 271.0, 265.0, 284.0, 261.0, 274.0],
            [263.3, 285.5]
          ]
        ],
        中南大学: [
          [3, 4, 3, 0, 1, 1, 0],
          [1, 6, 2, 0, 7, 3, 0],
          [
            [233.0, 236.0, 225.0],
            [244.7, 240.8, 245.5, 255.0],
            [279.0, 287.0, 274.0],
            [],
            [260.0],
            [265.0],
            []
          ]
        ],
        郑州大学: [
          [3, 1, 1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[231.0, 240.0, 242.0], [242.5], [285.0], [], [], [], []]
        ],
        哈尔滨工业大学: [
          [2, 0, 0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0, 0, 0],
          [[253.0, 233.0], [], [], [], [], [], []]
        ],
        东南大学: [
          [0, 1, 0, 0, 2, 2, 0],
          [1, 0, 2, 0, 2, 0, 0],
          [[], [243.7], [], [], [283.2, 265.7], [272.0, 264.0], []]
        ],
        西南交通大学: [
          [2, 2, 2, 3, 6, 4, 1],
          [0, 3, 3, 2, 6, 2, 2],
          [
            [225.0, 238.0],
            [240.2, 242.7],
            [276.0, 269.0],
            [244.0, 231.0, 253.0],
            [303.0, 279.6, 258.0, 263.9, 271.2, 255.5],
            [261.0, 279.0, 265.0, 269.0],
            [263.1]
          ]
        ],
        湖南大学: [
          [2, 0, 0, 0, 0, 0, 0],
          [1, 0, 1, 0, 0, 0, 0],
          [[226.0, 223.0], [], [], [], [], [], []]
        ],
        吉林大学: [
          [2, 0, 3, 0, 1, 0, 0],
          [4, 0, 1, 0, 2, 1, 1],
          [[236.0, 231.0], [], [278.0, 293.0, 268.0], [], [276.7], [], []]
        ],
        长安大学: [
          [6, 0, 0, 0, 2, 0, 0],
          [5, 1, 0, 0, 3, 0, 0],
          [
            [227.0, 245.0, 251.0, 230.0, 237.0, 247.0],
            [],
            [],
            [],
            [255.0, 256.0],
            [],
            []
          ]
        ],
        西北工业大学: [
          [1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[250.0], [], [], [], [], [], []]
        ],
        沈阳建筑大学: [
          [1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[227.0], [], [], [], [], [], []]
        ],
        华中科技大学: [
          [1, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[223.0], [], [], [], [300.0], [], []]
        ],
        重庆交通大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        山东大学: [
          [0, 1, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [244.7], [276.0], [], [], [], [262.5]]
        ],
        宁波大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        大连理工大学: [
          [1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[244.0], [], [], [], [], [], []]
        ],
        东北林业大学: [
          [0, 0, 0, 0, 1, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [], [], [], [258.0], [], []]
        ],
        石河子大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        中国矿业大学: [
          [1, 2, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[225.0], [252.8, 247.0], [], [], [], [], []]
        ],
        中国民航大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        内蒙古大学: [
          [1, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[227.0], [], [], [], [], [], []]
        ],
        "中国地质大学（北京）": [
          [0, 0, 0, 0, 0, 0, 0],
          [1, 0, 0, 0, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        重庆大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        武汉理工大学: [
          [0, 0, 0, 0, 0, 1, 0],
          [0, 1, 0, 0, 1, 0, 0],
          [[], [], [], [], [], [265.0], []]
        ],
        北京交通大学: [
          [0, 1, 0, 1, 1, 1, 0],
          [0, 0, 0, 0, 2, 1, 0],
          [[], [245.2], [], [234.0], [263.6], [261.0], []]
        ],
        华南理工大学: [
          [0, 0, 2, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[], [], [273.0, 270.0], [], [], [], []]
        ],
        "哈尔滨工业大学（威海）": [
          [0, 0, 1, 0, 2, 0, 0],
          [0, 0, 0, 1, 2, 0, 0],
          [[], [], [270.0], [], [263.4, 261.0], [], []]
        ],
        中山大学: [
          [0, 0, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[], [], [287.0], [], [], [], []]
        ],
        中国农业大学: [
          [0, 0, 1, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[], [], [268.0], [], [], [], []]
        ],
        南京理工大学: [
          [0, 0, 1, 2, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [[], [], [268.0], [244.0, 246.0], [], [], []]
        ],
        苏州大学: [
          [0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[], [], [], [243.0], [259.6], [], []]
        ],
        厦门大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        扬州大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        上海海事大学: [
          [0, 0, 0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [[], [], [], [230.0], [], [], []]
        ],
        北京林业大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        北京工业大学: [
          [0, 0, 0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [[], [], [], [], [292.0], [], []]
        ],
        南京工业大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        新疆大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        大连海事大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 2, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        兰州交通大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 1, 0, 0],
          [[], [], [], [], [], [], []]
        ],
        华东交通大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 1, 0],
          [[], [], [], [], [], [], []]
        ],
        四川大学: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 1],
          [[], [], [], [], [], [], []]
        ]
      },
      nodedata: [],
      university: "同济大学",
      alldata: [],

      name: localStorage.getItem("ms_username"),
      items: [
        {
          collaspe: false,
          icon: "el-icon-date",
          index: "/dashboards",
          title: "仪表盘示例",
          subs: ["网站订单分析", "销售业绩分析", "网站用户分析"]
        }
      ],
      ind: 0,
      show1: true,
      show2: false,
      myChart: {},
      tableNameList: ["网站订单分析", "销售业绩分析", "网站用户分析"],
      tableName: "",
      option: [],
      testLayout: [],
      number: [],
      options: {
        showCheckbox: false,
        search: {
          useInitial: true,
          useEnglish: false,
          customFilter: null
        }
      }
    };
  },
  mounted() {
    for (var i = 0; i < this.fx.length; i++) {
      this.fxdata.push({
        name: this.fx[i],
        max: 20
      });
    }
    var tempdata;
    for (var key in this.data) {
      tempdata = this.data[key][2];
      for (var i = 0; i < tempdata.length; i += 1) {
        for (var j = 0; j < tempdata[i].length; j += 1) {
          this.alldata.push([this.fx[i], tempdata[i][j]]);
        }
      }
    }
    for (var key in this.data) {
      var totalnum =
        this.data[key][0].reduce(function(a, b) {
          return a + b;
        }, 0) +
        this.data[key][1].reduce(function(a, b) {
          return a + b;
        }, 0);
      if (key == this.university) {
        this.nodedata.push({
          name: key,
          symbolSize: Math.max(totalnum, 7),
          value: this.data[key][2],
          label: {
            color: "rgba(193,56,52,1)"
          },
          itemStyle: {
            normal: {
              color: "rgba(193,56,52,1)"
            }
          }
        });
      } else {
        this.nodedata.push({
          name: key,
          symbolSize: Math.max(totalnum, 3),
          value: this.data[key][2],
          label: {
            color: "black"
          },
          itemStyle: {
            normal: {
              color: "rgba(51,71,85,1)"
            }
          }
        });
      }
    }
    // this.drawCharts();
    //alert('aaa');
    // this.$http.get(BASE_URL + "graph/allGraphs").then(response => {
    // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
    // var data = response.body;
    // this.tableNameList = data;
    // this.tableName = data[0];
    this._getGraphInfo();
    // });
  },
  methods: {
    toggle() {
      this.$refs["fullscreen"].toggle(); // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    _getGraphInfo() {
      var _self = this;
      var university = _self.university;
      var fx = _self.fx;
      var data = _self.data;
      var nodedata = _self.nodedata;
      var alldata = _self.alldata;
      var optionNew = [
        {
          legend: {
            data: ["录取", "不录取"],
            align: "left",
            left: 10
          },
          xAxis: {
            data: fx,
            name: "方向",
            silent: false,
            axisLine: {
              onZero: true
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
          },
          yAxis: {
            max: 35,
            name: "人数",
            inverse: false,
            splitArea: {
              show: false
            }
          },
          grid: {
            left: 50,
            name: "人数",
            top: "10%",
            height: "40%",
            width: "40%"
          },
          series: [
            {
              name: "录取",
              type: "bar",
              stack: "one",
              xAxisIndex: 0,
              yAxisIndex: 0,
              data: data[university][0],
              label: {
                normal: {
                  show: true,
                  position: "inside"
                }
              }
            },
            {
              name: "不录取",
              type: "bar",
              stack: "one",
              xAxisIndex: 0,
              yAxisIndex: 0,
              data: data[university][1],
              label: {
                normal: {
                  show: true,
                  position: "inside"
                }
              }
            }
          ]
        },
        {
          series: [
            {
              type: "pie",
              radius: [0, "30%"],
              center: ["50%", "50%"],
              data: [
                {
                  name: "录取",
                  value: data[university][0].reduce(function(a, b) {
                    return a + b;
                  }, 0)
                },
                {
                  name: "不录取",
                  value: data[university][1].reduce(function(a, b) {
                    return a + b;
                  }, 0)
                }
              ],
              label: {
                normal: {
                  formatter: "{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                  backgroundColor: "#eee",
                  borderColor: "#aaa",
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              }
            }
          ]
        },

        {
          series: [
            {
              type: "graph",
              layout: "force",
              left: "20%",
              right: "20%",
              top: "25%",
              bottom: "20%",

              focusNodeAdjacency: true, //鼠标覆盖高亮显示节点及关系名称
              roam: "move", //是否开启滚轮缩放和拖拽漫游,默认为false（关闭），其他有效输入为true（开启），'scale'（仅开启滚轮缩放），'move'（仅开启拖拽漫游）
              data: nodedata,
              label: {
                normal: {
                  position: "top",
                  show: true,
                  textStyle: {
                    color: "rgba(18,89,147,1)",
                    fontSize: 10
                  }
                }
              },
              force: {
                repulsion: 30
              },
              links: [],
              tooltip: {
                formatter: function(d) {
                  var temp = data[d.data.name];
                  var totalnum =
                    temp[0].reduce(function(a, b) {
                      return a + b;
                    }, 0) +
                    temp[1].reduce(function(a, b) {
                      return a + b;
                    }, 0);

                  return d.name + "参加人数:" + totalnum;
                }
              }
            }
          ]
        },

        {
          timeline: {
            data: ["8.20", "8.21", "8.22", "8.23", "8.24", "8.25", "8.26"],
            left: "10%",
            right: "10%",
            bottom: 0,
            height: -120,
            axisType: "category",
            show: true,
            autoPlay: false,
            playInterval: 1000,
            checkpointStyle: {
              color: "#04a5f1",
              borderColor: "rgba(4, 165, 261, .5)"
            },
            label: {
              normal: {
                formatter: function(v) {
                  var _txt = v.replace(/\//gim, "\n");
                  return _txt;
                },
                rotate: -45,
                position: "bottom",
                fontSize: "6"
              }
            },
            itemStyle: {
              normal: {
                color: "#04a5f1"
              }
            },
            lineStyle: {
              color: "#ddd"
            },
            controlStyle: {
              show: false
            }
          },
          options: [
            {
              textStyle: {
                fontSize: 12,
                height: 40
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "rgba(255,255,255,0.8)",
                    extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
                    textStyle: {
                      color: "#666"
                    }
                  }
                },
                backgroundColor: "rgba(255,255,255,0.8)",
                extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);",
                textStyle: {
                  color: "#666"
                }
              },
              toolbox: {
                show: false,
                // orient: 'vertical',
                //x: 'right',
                //y: 'center',
                feature: {
                  magicType: {
                    show: true,
                    type: ["bar", "line"]
                  },
                  restore: {
                    show: true
                  },
                  saveAsImage: {
                    show: true
                  }
                }
              },
              legend: {
                data: ["交易量", "交易数"]
              },
              grid: {
                top: "100",
                left: "3%",
                right: "4%",
                bottom: "60",
                containLabel: true
              },
              xAxis: [
                {
                  type: "category",
                  data: [
                    "8.20",
                    "8.21",
                    "8.22",
                    "8.23",
                    "8.24",
                    "8.25",
                    "8.26"
                  ],
                  axisLabel: {
                    //坐标轴刻度标签的相关设置。
                    interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                    //rotate:-30,
                    textStyle: {
                      color: "#666",
                      fontSize: "12"
                    }
                  },
                  axisLine: {
                    //坐标轴轴线相关设置
                    lineStyle: {
                      color: "#666",
                      opacity: 1
                    }
                  },
                  splitLine: {
                    //坐标轴在 grid 区域中的分隔线。
                    show: false
                  }
                }
              ],
              yAxis: [
                {
                  name: "交易量（万个）",
                  type: "value",

                  axisLabel: {
                    textStyle: {
                      color: "#666",
                      fontSize: "12"
                    }
                  },
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  }
                },
                {
                  name: "交易数（笔）",
                  type: "value",
                  position: "right",
                  axisLabel: {
                    textStyle: {
                      color: "#666",
                      fontSize: "12"
                    }
                  },
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  }
                }
              ],
              series: [
                {
                  name: "交易量",
                  type: "bar",
                  // barWidth: 15,
                  data: [12318, 15360, 11760, 11447, 7325, 15696, 10590],
                  itemStyle: {
                    normal: {
                      //barBorderRadius: 15,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#229aff"
                        },
                        {
                          offset: 1,
                          color: "#13bfe8"
                        }
                      ])
                    }
                  }
                },
                {
                  name: "交易数",
                  yAxisIndex: 1,
                  type: "line",
                  showAllSymbol: true,
                  symbol: "emptyCircle",
                  symbolSize: 14,
                  data: [1061, 992, 1244, 4020, 818, 1032, 2092],
                  itemStyle: {
                    normal: {
                      color: "#fdb94e"
                    }
                  }
                }
              ]
            }
          ]
        }
      ];
      this.option = [];
      this.testLayout = [];
      this.number = [];
      this.option = optionNew;
      console.log(optionNew);
      var length = this.option.length;
      console.log("777" + length);
      for (let i = 0; i < length; i++) {
        if (i % 2 == 0) {
          var item = {
            x: 0,
            y: 0,
            w: 6,
            h: 8,
            i: i + "",
            resizable: true,
            draggable: true
          };
          this.testLayout.push(item);
          this.number.push(item);
        } else {
          var item = {
            x: 6,
            y: 0,
            w: 6,
            h: 8,
            i: i + "",
            resizable: true,
            draggable: true
          };
          this.testLayout.push(item);
          this.number.push(item);
        }
      }
      console.log("666" + this.testLayout);
      // });
      console.log(fx);
      console.log(data);
      console.log(nodedata);
      console.log(alldata);
      console.log(this.university);
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
    getscoredata(university, tempdata) {
      var _self = this;
      console.log(tempdata);
      var result = [];
      for (var i = 0; i < tempdata.length; i += 1) {
        for (var j = 0; j < tempdata[i].length; j += 1) {
          result.push([_self.fx[i], tempdata[i][j]]);
        }
      }
      return result;
    },

    addReport() {
      this.show1 = !this.show1;
      this.show2 = !this.show2;
    }
  },
  components: {
    graphDisplay: graphDisplay
  }
};
</script>


<style scoped>
.dashboard{
  position:absolute;
  width: 100%;
  height: 100%;
}
.content {
  margin-left: 180px;
  bottom: 0;
  height: 680px;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.left {
  width: 240px;
  height: 100%;
  border-right: 1px rgb(227, 230, 232);
  position: absolute;
  top: 0;
  left: 0px;
  bottom: 0;
  background-color: #f0f2f3;
}
.table-name {
  font-size: 15px;
  color: #000;
  cursor: pointer;
  width: 100%;
  padding-top: 1px;
  text-align: center;
}
li {
  padding: 5px 10px;
}
.icon1-file-text {
  line-height: 3;
  font-style: normal;
  font-size: 13px;
}
.item-name {
  background-color: #d4d5d8;
  color: #fff;
  cursor: pointer;
}
.sidebar {
  display: block;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
.el-menu-item.is-active {
  color: #303133;
}
.operate-content{
    background: #eee;
    margin: 0px 10px;
}
.operate{
  float: right;
  margin-right: 30px
}
</style>
