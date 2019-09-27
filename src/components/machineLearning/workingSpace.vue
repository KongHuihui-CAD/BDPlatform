<template>
  <div>
    <el-container>
      <el-header>
        <div style="text-align:center;margin-top:17px">
          <el-button
            type="primary"
            style="float: center;"
            size="medium"
            @click="dialogVisible1 = true"
          ><i class="el-icon-plus"></i> 创建任务</el-button>

          <el-button
            style="float: center;"
            size="medium"
            type="warning"
            plain
            @click="clear()"
          ><i class="el-icon-delete"></i> 清空画布</el-button>

          <el-button
            style="float: center;"
            size="medium"
            @click="save()"
          ><i class="el-icon-success"></i> 配置任务</el-button>

          <el-button
            type="success"
            style="float: center;"
            size="medium"
            @click="toList()"
          ><i class="el-icon-caret-right"></i> 提交运行</el-button>

          <el-dialog
            title="任务信息"
            :visible.sync="dialogVisible1"
            width="30%"
            :before-close="handleClose1"
          >
            <div style="float:left ;padding:20px 10px;margin-top:0px;">
              <span>请输入任务名称：</span>
            </div>
            <el-input
              placeholder="Demo"
              v-model="jobInfor.jobName"
            ></el-input>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button
                id="submit1"
                type="primary"
                @click="submitjobinfor"
              >确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-header>
      <el-container>
        <el-aside
          width="270px"
          height="610px"
        >
          <div
            id="left"
            style="overflow-y:auto"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <i class="el-icon-document"></i>
              <span>数据</span>
              <el-select
                v-model="choosedataSetName"
                placeholder="请选择"
                style="width:100px;margin-left:4px"
                size="mini"
              >
                <el-option
                  v-for="item in dataSetInfo"
                  :key="item.index"
                  :label="item.Name"
                  :value="item.index"
                >
                </el-option>
              </el-select>
              <el-button
                style="float:right"
                type="danger"
                icon="el-icon-upload2"
                size="mini"
                circle
                @click="dialogVisible2 = true"
              ></el-button>

              <el-dialog
                :visible.sync="dialogVisible2"
                title="上传数据文件"
                :before-close="handleClose1"
              >
                <el-form
                  :model="fileForm"
                  label-width="140px"
                >
                  <el-form-item label="数据集名称">
                    <el-input v-model="fileForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="第一行有效">
                    <el-switch
                      style="display: inline;"
                      v-model="fileForm.firstLine"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="有列头（无效）"
                      inactive-text="无列头（有效）"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="分隔符">
                    <el-input v-model="fileForm.separate"></el-input>
                  </el-form-item>
                  <el-form-item label="选择文件">
                    <input
                      type="file"
                      name="myfiles"
                      id="fileload"
                      multiple
                    >
                  </el-form-item>
                </el-form>
                <span
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button
                    id="submit1"
                    type="primary"
                    @click="submitfileinfor"
                  >确 定</el-button>
                </span>

              </el-dialog>
            </div>

            <div
              class="item"
              :data-index="dataSetInfo[dataindex].index+'-'+item.id"
              v-for="item in dataSetInfo[dataindex].subFile"
              style="margin-top:6px"
            >
              {{item.fileName}}
            </div>
            <!-- <div class="item" data-index="1" style="margin-top:6px">数据1.csv</div>
                            <div class="item" data-index="2">数据2.csv</div>
                            <div class="item" data-index="3">数据3.csv</div> -->
          </div>
          <div
            id="right"
            style="overflow-y:auto"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <i class="el-icon-menu"></i>
              <span>算法</span>
              <el-select
                v-model="chooseAlgoName"
                placeholder="请选择"
                style="width:100px;margin-left:4px"
                size="mini"
              >
                <el-option
                  v-for="item in algoSetInfo"
                  :key="item.index"
                  :label="item.Name"
                  :value="item.index"
                >
                </el-option>
              </el-select>

            </div>
            <div
              class="item"
              :data-index="algoSetInfo[algoindex].index+'-'+item.id"
              v-for="item in algoSetInfo[algoindex].subFile"
              style="margin-top:6px"
            >{{item.fileName}}</div>
            <!-- <div class="item" data-index="3">算法1</div>
                        <div class="item" data-index="4">算法2</div>
                        <div class="item" data-index="5">算法3</div> -->
          </div>
          <!-- </el-card> -->
          <!-- <el-card class="box-card3"> -->
          <div
            id="model"
            style="overflow-y:auto"
          >
            <div
              slot="header"
              class="clearfix"
            >
              <i class="el-icon-rank"></i>
              <span>模型</span>
              <el-select
                v-model="chooseModelName"
                placeholder="请选择"
                style="width:100px;margin-left:4px"
                size="mini"
              >
                <el-option
                  v-for="item in modelsInfo"
                  :key="item.index"
                  :label="item.Name"
                  :value="item.index"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <div class="item" data-index="1">模型1</div>
                        <div class="item" data-index="2">模型2</div>
                        <div class="item" data-index="3">模型3</div> -->
            <div
              class="item"
              :data-index="modelsInfo[modelindex].index+'-'+item.id"
              v-for="item in modelsInfo[modelindex].subFile"
              style="margin-top:6px"
            >{{item.fileName}}</div>
          </div>
          <!-- </el-card> -->
        </el-aside>
        <el-container>
          <div id="main">
          </div>
          <div id="config">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
            >

              <!-- <el-tab-pane
                label="任务配置"
                name="first"
              >
                <el-form label-width="120px">
                  <div v-for="item in messionConf">
                    <el-form-item :label="item.messionConfName">
                      <el-input v-model="item.messionConfValue"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="medium"
                      style="margin-top:20px;margin-left:80px;"
                      @click="editJobConf()"
                    >保存修改</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane> -->

              <el-tab-pane
                label="数据配置"
                name="second"
              >
                <el-form label-width="120px">
                  <div v-for="item in dataSetConf">
                    <el-form-item :label="item.name">
                      <el-input v-model="item.value"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="medium"
                      style="margin-top:20px;margin-left:80px;"
                      @click="editDataConf()"
                    >保存修改</el-button>
                    <!-- @click="onSubmit(testN) -->
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <el-tab-pane
                label="算法/模型配置"
                name="third"
              >
                <el-form label-width="120px">
                  <div v-for="item in algoConf">
                    <el-form-item :label="item.name">
                      <el-input v-model="item.value"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="medium"
                      style="margin-top:20px;margin-left:80px;"
                      @click="editAlgoConf()"
                    >保存修改</el-button>
                    <!-- @click="onSubmit(testN) -->
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- <button onclick="save()">保存</button>
                        <br />
                        <br />
                        <input type="checkbox" id="onOff" /><label for="onOff">不可重复拖拽</label> -->

        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import "../../../static/js/drag.js";
var BASE_URL = "http://10.108.211.136:15050/";

export default {
  data() {
    return {
      //   onOff: true,
      activeName: "first", // 右侧tab绑定属性

      choosedataSetName: "默认", //下拉框中选择的数据集名称对应的value
      chooseAlgoName: "默认", //下拉框中选择的算法集名称对应的value
      chooseModelName: "默认", //暂时用不到的模型下拉框

      dataindex: 0,
      algoindex: 0, //下拉框默认索引
      modelindex: 0,

      // dataList_ori: [], //保留
      // modelList_ori: [], //保留
      // algList_ori: [], //保留

      dataSetFiles: [
        //监听选择的数据集名称，然后通过js方法，改变dataSetFiles的值，从而改变盒子里的内容，格式如下：
        //     {
        //       datafileID: 1,
        //       dataFileName: "分类1.csv"
        //     },
        //    {
        //       datafileID: 2,
        //       dataFileName: "分类2.csv"
        //     },
        //     {
        //       datafileID: 3,
        //       dataFileName: "分类3.csv"
        //     }
      ],

      dataSetInfo: [
        {
          Name: "as",
          index: "1-1",
          subFile: [
            {
              fileName: "data_merge_1.txt",
              id: 10,
              type: "data"
            }
          ]
        },
        {
          Name: "asa",
          index: "1-2",
          subFile: [
            {
              fileName: "testfile.txt",
              id: 11,
              type: "data"
            }
          ]
        },
        {
          Name: "hour_noheader",
          index: "1-3",
          subFile: [
            {
              fileName: "testfile3.txt",
              id: 16,
              type: "data"
            },
            {
              fileName: "hour_noheader.csv",
              id: 17,
              type: "data"
            }
          ]
        }
      ],

      algoSetInfo: [
        {
          Name: "回归",
          index: "2-1",
          subFile: [
            {
              fileName: "决策树回归",
              id: 1,
              type: "alg"
            },
            {
              fileName: "迭代回归",
              id: 2,
              type: "alg"
            },
            {
              fileName: "线性回归",
              id: 3,
              type: "alg"
            },
            {
              fileName: "岭回归",
              id: 4,
              type: "alg"
            },
            {
              fileName: "逻辑回归",
              id: 5,
              type: "alg"
            }
          ]
        },
        {
          Name: "分类",
          index: "2-2",
          subFile: [
            {
              fileName: "支持向量机",
              id: 6,
              type: "alg"
            },
            {
              fileName: "朴素贝叶斯",
              id: 7,
              type: "alg"
            }
          ]
        },
        {
          Name: "关联",
          index: "2-3",
          subFile: [
            {
              fileName: "Apriori",
              id: 8,
              type: "alg"
            }
          ]
        }
      ],
      modelsInfo: [
        {
          Name: "hour_noheader",
          index: "3-1",
          subFile: [
            {
              fileName: "自行车预测",
              id: 3,
              type: "model"
            }
          ]
        },
        {
          Name: "sf",
          index: "3-2",
          subFile: [
            {
              fileName: "modelByk",
              id: 1,
              type: "model"
            }
          ]
        }
      ],
      dataTestSave: {},
      algoTestSave: {},

      dataSetConf: [
        //数据集属性的列表
        // {
        //   name: "",
        //   value: ""
        // }
      ],

      algoConf: [
        //算法/模型属性的列表
        // {
        //   name: "",
        //   value: ""
        // }
      ],

      //以下为搬过来的属性
      showdetail: false,
      testN: [],
      testSave: {},
      dialogVisible1: false,
      dialogVisible2: false,
      jobInfor: {
        jobName: "",
        jobId: null,
        status: ""
      },
      fileForm: {
        name: "",
        firstLine: true,
        separate: ""
      },
      datalist: [],
      modelList: [],
      algList: [],
      result: [],
      lists: [],
      loading: true,
      listEnd: []
    };
  },

  watch: {
    choosedataSetName: function(val) {
      //监听数据盒子的下拉框
      console.log(val);
      for (var i = 0; i < this.dataSetInfo.length; i++) {
        if (this.dataSetInfo[i].index == val) {
          // this.dataSetFiles = this.dataSetInfo[i].dataSetIndex;
          this.dataindex = i;
          $("#left")
            .children()
            .draggable({
              helper: "clone",
              scope: "ss"
            });
          break;
        }
      }
    },
    // dataindex:{
    //   handler:function(){
    //     console.log(this.dataindex)
    //     $("#left")
    //     .children()
    //     .draggable({
    //         helper: "clone",
    //         scope: "ss"
    //     });
    //   }
    // },
    chooseAlgoName: function(val) {
      //监听算法盒子的下拉框
      console.log(val);
      for (var i = 0; i < this.algoSetInfo.length; i++) {
        if (this.algoSetInfo[i].index == val) {
          // this.algoSetNamesBox = this.algoSetInfo[i].algoSetIndex;
          this.algoindex = i;
          break;
        }
      }
    },
    chooseModelName: function(val) {
      //监听算法盒子的下拉框
      console.log(val);
      for (var i = 0; i < this.modelsInfo.length; i++) {
        if (this.modelsInfo[i].index == val) {
          // this.algoSetNamesBox = this.algoSetInfo[i].algoSetIndex;
          this.modelindex = i;
          break;
        }
      }
    }
  },

  created() {
    //获取所有数据
    this.getAllData();
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      // get_all_list为计生委接口——获取所有的数据

      this.$http.get(BASE_URL + "api/get_all_list").then(
        response => {
          console.log(response.body);
          var dataR = JSON.parse(response.body);

          // var dataR = JSON.parse(
          //   //假数据，测试时要删除！
          //   '{"DATA": {"algList": [{"Name": "回归", "index": "2-1", "subFile": [{"fileName": "决策树回归", "id": 1, "type": "alg"}, {"fileName": "迭代回归", "id": 2, "type": "alg"}, {"fileName": "线性回归", "id": 3, "type": "alg"}, {"fileName": "岭回归", "id": 4, "type": "alg"}, {"fileName": "逻辑回归", "id": 5, "type": "alg"}]}, {"Name": "分类", "index": "2-2", "subFile": [{"fileName": "支持向量机", "id": 6, "type": "alg"}, {"fileName": "朴素贝叶斯", "id": 7, "type": "alg"}]}, {"Name": "关联", "index": "2-3", "subFile": [{"fileName": "Apriori", "id": 8, "type": "alg"}]}], "datalist": [{"Name": "as", "index": "1-1", "subFile": [{"fileName": "data_merge_1.txt", "id": 10, "type": "data"}]}, {"Name": "asa", "index": "1-2", "subFile": [{"fileName": "testfile.txt", "id": 11, "type": "data"}]}, {"Name": "hour_noheader", "index": "1-3", "subFile": [{"fileName": "testfile3.txt", "id": 16, "type": "data"}, {"fileName": "hour_noheader.csv", "id": 17, "type": "data"}]}], "modelList": [{"Name": "hour_noheader", "index": "3-1", "subFile": [{"fileName": "自行车预测", "id": 3, "type": "model"}]}, {"Name": "sf", "index": "3-2", "subFile": [{"fileName": "modelByk", "id": 1, "type": "model"}]}]}, "SUCCESS": true}'
          // );

          this.dataSetInfo = dataR.DATA.datalist; //  三个存放真数据的变量
          this.algoSetInfo = dataR.DATA.algList;
          this.modelsInfo = dataR.DATA.modelList;
          console.log(this.dataSetInfo);
          console.log(this.algoSetInfo);
          console.log(this.modelsInfo);
        },
        response => {
          console.log("getAllData请求失败了");
          alert("请求数据失败，请刷新重试哦");
        }
      );
    },

    handleClick(tab, event) {
      //右侧tab的控制方法
      console.log(tab, event);
    },

    //创建任务使用的方法
    handleClose1(done) {
      this.$confirm("确定停止创建？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitjobinfor: function() {
      //创建任务，点击提交，调用的方法
      if (this.jobInfor.jobName == "") {
        alert("任务名不能为空");
      } else {
        this.$http
          .get(BASE_URL + "job/create?jobName=" + this.jobInfor.jobName) //创建任务的接口不变，只需要提交任务名
          .then(
            response => {
              var data = JSON.parse(response.body);
              console.log(data); // 响应包含任务的配置信息
              //jobInfor包含任务的基本信息，包括jobId，status
              this.jobInfor.jobId = data.DATA.id;
              sessionStorage.setItem("jobId", this.jobInfor.jobId); //将任务的id存到session里面
              console.log(sessionStorage.getItem("jobId"));
              this.jobInfor.status = "未运行";
              this.dialogVisible1 = false; //关闭模态框
              this.$message({
                showClose: true,
                message: "创建任务成功！",
                type: "success"
              });
            },
            response => {
              console.log("创建任务失败");
              alert("创建任务失败，请刷新重试！");
              this.jobInfor.jobId = "test_jobId";
              sessionStorage.setItem("jobId", this.jobInfor.jobId); //用于测试，存到session中的假jobId
              console.log(sessionStorage.getItem("jobId"));
            }
          );
      }
    },

    //画布的保存
    save() {
      var connects = []; //存储连线的数组
      var mainArr = []; //存储元素的数组
      $.each(jsPlumb.getAllConnections(), function(idx, connection) {
        connects.push({
          ConnectionId: connection.id,
          start: $(connection.source).attr("data-index"),
          end: $(connection.target).attr("data-index"),
          originSign: $(connection.source).attr("data-sign"),
          destinationSign: $(connection.target).attr("data-sign")
        });
      });
      $("#main .item").each(function() {
        mainArr.push({
          offset: $(this).position(),
          text: $(this).text(),
          index: $(this).attr("data-index"),
          sign: $(this).attr("data-sign")
        });
      });
      console.log(connects); //打印连线
      console.log(mainArr); //打印拖动块

      sessionStorage.setItem(
        "flowsheet",
        JSON.stringify({ connects: connects, mainArr: mainArr })
      );

      // console.log(sessionStorage.flowsheet); //后加，从console看一下封装的json是什么样子，测试用

      //获取数据集的配置
      this.dataTestSave.index = "test:1-x"; //，数据集配置需要的参数，假数据，拖动之后，存到了session中，再从session中赋值给dataTestSave
      this.dataTestSave.id = "test:id1"; //数据集配置需要的参数，假数据，拖动之后，存到了session中，再从session中赋值给dataTestSave
      console.log(this.dataTestSave);
      // this.$http
      //   .get(
      //     BASE_URL +
      //       "api/show_details?index=" +
      //       this.dataTestSave.index +
      //       "&id=" +
      //       this.dataTestSave.id +
      //       "&jobId=" +
      //       sessionStorage.getItem("jobId")
      //   )
      // .then(
      //   response => {
      //     console.log(response);
      //     var dataS = JSON.parse(response.body);
      var dataS = JSON.parse(
        '{"DATA": [{"name": "datasetName", "value": "hour_noheader"}, {"name": "createdon", "value": "2018-04-10 16:36:36"}, {"name": "separate", "value": ","}, {"name": "firstLine", "value": "0"}, {"name": "Label", "value": "-1"}, {"name": "cat_list", "value": "4,7,8"}, {"name": "num_list", "value": "1,2,5,3,6"}, {"name":  "weights", "value": "8:2"}], "SUCCESS": true}'
      );
      this.dataTestSave.data = dataS.DATA; //dataTestSave.data存的是原始的数据集配置
      this.dataSetConf = dataS.DATA; //dataSetConf绑定了组件，可以动态变化
      this.activeName = "second";

      this.testN = dataS.DATA; //不确定testN的用途
      console.log(this.dataTestSave);
      console.log(this.testN);
      // },
      // response => {
      //   console.log("请求数据集配置信息失败了");
      //   alert("请求数据配置信息失败，请刷新重试哦");
      // }
      // );

      //获取算法/模型的配置
      this.algoTestSave.index = "test:2-x"; //算法和模型的index，以2-或3-开头，假数据，拖动之后，存到了session中，再从session中赋值给algoTestSave，索引
      this.algoTestSave.id = "test:id9"; //算法和模型的配置信息，假数据，拖动之后，存到了session中，再从session中赋值给algoTestSave
      console.log(this.algoTestSave);
      // this.$http
      //   .get(
      //     BASE_URL +
      //       "api/show_details?index=" +
      //       this.algoTestSave.index +
      //       "&id=" +
      //       this.algoTestSave.id +
      //       "&jobId=" +
      //       sessionStorage.getItem("jobId")
      //   )
      // .then(
      //   response => {
      //     console.log(response);
      //     var algoS = JSON.parse(response.body);
      var algoS = JSON.parse(
        '{"DATA": [{"name": "regParam", "value": "l1"}, {"name": "step", "value": 0.01}, {"name": "iterations", "value": 10}, {"name": "regType", "value": 0.01}], "SUCCESS": true}'
      );
      this.algoTestSave.data = algoS.DATA;
      this.algoConf = algoS.DATA;
      // this.activeName="third";

      this.testN = algoS.DATA; //不确定testN的用途
      console.log(this.algoTestSave);
      console.log(this.testN);
      // },
      // response => {
      //   console.log("请求算法/模型配置信息失败了");
      //   alert("请求算法/模型的配置信息失败，请刷新重试哦");
      // }
      // );
    },

    //清空画布
    clear() {
      this.$confirm("此操作将清空当前画布, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          document.getElementById("main").innerHTML = "";
          sessionStorage.removeItem("flowsheet");
          this.$message({
            type: "success",
            message: "清空画布成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },

    //上传数据文件
    submitfileinfor: function() {
      var obj = {};
      obj.fileAddr = $("#fileload").val();
      obj.filename = $("#fileload").attr("name");
      obj.fileID = $("#fileload").attr("id");
      if (obj.fileAddr == "" || obj.fileAddr == null) {
        alert("请选择文件");
      }
      console.log(obj);
      console.log(this.fileForm);
      var FL = "";
      if (this.fileForm.firstLine == true) {
        FL = "1";
      } else {
        FL = "0";
      }

      if (this.fileForm.name == "" || this.fileForm.separate == "") {
        alert("文件名称或者分隔符不能为空");
      } else {
        var formData = new FormData();
        formData.append("file", $("#fileload")[0].files[0]);
        formData.append("name", this.fileForm.name);
        formData.append("firstLine", FL);
        formData.append("separate", this.fileForm.separate);
        console.log(formData);
        console.log($("#fileload")[0].files[0]);
        var that = this;
        $.ajax({
          url: BASE_URL + "api/uploadDataFile",
          type: "POST",
          data: formData,
          cache: false,
          processData: false,
          contentType: false
        })
          .done(function(data) {
            alert(0);
            var regx = /(\{.*})/;
            var data = data.match(regx)[0];
            data = JSON.parse(data);
            console.log(data);
            alert("数据文件上传成功！");
            that.dialogVisible2 = false;
            this.getAllData();
          })
          .fail(function(res) {
            console.log(res);
          });
        this.$nextTick(() => {
          this.getAllData();
          this.dialogVisible2 = false;
        });
      }
    },
    editJobConf() {
      this.$message({
        //修改成功，响应之后，需要刷新三个配置的tab
        showClose: true,
        message: "任务参数已修改",
        type: "success"
      });
    },
    editDataConf() {
      //提交修改后的配置之前，是否需要判空？？
      //请求方式post还是get？
      console.log(JSON.stringify(this.dataSetConf)); //打印看一下修改后的数据集配置

      this.$http
        .post(
          BASE_URL + "api/update_info",
          {
            id: this.dataTestSave.id,
            index: this.dataTestSave.index,
            jobId: sessionStorage.getItem("jobId"),
            info: JSON.stringify(this.dataSetConf) //将一个数组转化为json串
          },
          {
            emulateJSON: true
          }
        )
        .then(
          response => {
            console.log(response);
          },
          response => {
            console.log("修改数据集配置失败");
            alert("请求修改数据集配置失败了，请刷新重试哦");
          }
        );
    },
    editAlgoConf() {
      //参考上面的editDataConf，确定请求方式之后再写！

      console.log(JSON.stringify(this.dataSetConf)); //打印看一下修改后的数据集配置

      this.$http
        .post(
          BASE_URL + "api/update_info",
          {
            id: this.dataTestSave.id,
            index: this.dataTestSave.index,
            jobId: sessionStorage.getItem("jobId"),
            info: JSON.stringify(this.dataSetConf) //将一个数组转化为json串
          },
          {
            emulateJSON: true
          }
        )
        .then(
          response => {
            console.log(response);
          },
          response => {
            console.log("修改数据集配置失败");
            alert("请求修改数据集配置失败了，请刷新重试哦");
          }
        );
    },

    //提交执行任务
    toList: function() {
      this.$http
        .get(BASE_URL + "model/train?jobId=" + sessionStorage.getItem("jobId"))
        .then(
          response => {
            console.log(response);
          },
          response => {
            console.log("请求失败了");
            alert("提交任务失败，请刷新重试哦");
          }
        );
      sessionStorage.setItem("jobId", null);
      this.showdetail = false;
      this.listEnd = [];
      this.lists = [];
      this.testN = [];
      console.log(this.showdetail);
      console.log(this.listEnd);
      location.reload();
      this.$router.push({ path: "/mlmodal/jobList" });
    }
  }
};
</script>
<style scoped>
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

/* .box-card1 {
  width: 250px;
  margin-left: 15px;
  height: 230px;
}
.box-card2 {
  width: 250px;
  margin-left: 15px;
  height: 230px;
}
.box-card3 {
  width: 250px;
  margin-left: 15px;
  height: 230px;
} */

#left {
  height: 180px;
  width: 235px;
  /* border: 1px solid #000; */
  float: center;
  margin-top: 0;
  margin-bottom: 15px;
  margin-left: 15px;
  /* padding: 0 10px; */
  position: relative;
  padding: 8px 16px;
  background-color: #fff6f7;
  border-radius: 10px;
  border-top: 5px solid #fe6c6f;
}

#right {
  height: 180px;
  width: 235px;
  /* border: 1px solid #000; */
  float: center;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: 15px;
  /* padding: 0 10px; */
  position: relative;
  padding: 8px 16px;
  background-color: aliceblue;
  border-radius: 10px;
  border-top: 5px solid rgb(4, 90, 187);
}
#model {
  height: 180px;
  width: 235px;
  /* border: 1px solid #000; */
  float: center;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: 15px;
  /* padding: 0 10px; */
  position: relative;
  padding: 8px 16px;
  background-color: whitesmoke;
  border-radius: 10px;
  border-top: 5px solid rgb(139, 134, 151);
}

#config {
  /* height: 180px; */
  /* width: 235px; */
  /* border: 1px solid #000; */
  float: left;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  /* padding: 0 10px; */
  position: relative;
  padding: 8px 16px;
  border-radius: 10px;
  border-top: 5px solid rgb(151, 112, 4);
}

#main {
  height: 560px;
  width: 75%;
  float: left;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 15px;
  position: relative;
  background-color: rgb(248, 247, 242);
  border: 1px solid rgb(151, 112, 4);
  border-radius: 10px;
  /* background-color:aliceblue; */
}
.item {
  background: #ffffff;
  height: 28px;
  width: 175px;
  border: 1px solid #5f9edf;
  margin: 5px 0;
  font: 13px/30px "微软雅黑";
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.theGrey {
  background: #ccc !important;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-dialog {
  padding-top: 5px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
