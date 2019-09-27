<template>
  <div>
    <div class="prehd">
      <span class="pretitle">数据API管理</span>
    </div>
    <br>
    <br>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple" style="border-right: 1px solid #bbb;">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple"></div>
              <el-input
                placeholder="请填写查找的API名字"
                v-model="searchtext"
                class="input-with-select"
                style="width:90%;margin-left:20px;"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-select v-model="searchstatus" placeholder="请选择状态">
                <el-option label="已创建" value="0"></el-option>
                <el-option label="已发布" value="1"></el-option>
                <el-option label="已下线" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-button icon="el-icon-search" circle @click="search()"></el-button>
            </el-col>
          </el-row>
          <br>
          <div class="tableData">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              stripe
              style="width: 90%;margin-left:20px;"
            >
              <el-table-column prop="name" label="API列表">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="add(scope.$index, scope.row,tableData)"
                  >{{scope.row.name}}</el-button>
                </template>
              </el-table-column>

              <el-table-column prop="des" label="描述"></el-table-column>
              <el-table-column prop="state" label="状态" width="100"></el-table-column>
              <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="text"
                    @click="edit(scope.$index, scope.row,tableData)"
                  >修改</el-button>
                  <el-button
                    size="small"
                    type="text"
                    @click.native.prevent="deleteRow(scope.$index, scope.row,tableData)"
                  >删除</el-button>
                  <el-button type="text" size="small" v-if="scope.row.state=='已创建'">
                    <el-button
                      size="small"
                      type="text"
                      @click.native.prevent="release(scope.$index, scope.row,tableData)"
                    >发布</el-button>
                  </el-button>
                  <el-button type="text" size="small" v-if="scope.row.state=='已下线'">
                    <el-button
                      size="small"
                      type="text"
                      @click.native.prevent="release(scope.$index, scope.row,tableData)"
                    >发布</el-button>
                  </el-button>
                  <el-button type="text" size="small" v-if="scope.row.state=='已发布'">
                    <el-button
                      size="small"
                      type="text"
                      @click.native.prevent="offline(scope.$index, scope.row,tableData)"
                    >下线</el-button>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <br>
          <el-row>
            <div class="pages">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-button type="primary" plain @click="newadd=true">创建API</el-button>
          </el-col>

          <el-col :span="8">
            <el-button type="primary" plain>上传Yaml文件</el-button>
          </el-col>

          <el-col :span="8">
            <el-button type="primary" plain>以json文件批量创建</el-button>
          </el-col>
        </el-row>
        <br>

        <div>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本属性" name="1">
              <el-table :data="tableData1" border stripe style="width: 90%;margin-left:20px;">
                <el-table-column prop="name" label="api名称"></el-table-column>
                <el-table-column prop="project" label="项目"></el-table-column>
                <el-table-column prop="add" label="服务地址"></el-table-column>
              </el-table>
            </el-collapse-item>
            <br>

            <el-collapse-item title="参数信息" name="2">基础定义
              <div style="border-bottom: 1px solid #bbb;">
                <el-table :data="tableData2" border stripe style="width: 90%;margin-left:20px;">
                  <el-table-column prop="method" label="请求方法"></el-table-column>
                  <el-table-column prop="path" label="请求路径"></el-table-column>
                  <el-table-column prop="num" label="请求端口号"></el-table-column>
                </el-table>
              </div>参数信息
              <el-table :data="tableData3" border stripe style="width: 90%;margin-left:20px;">
                <el-table-column prop="name" label="参数名称"></el-table-column>
                <el-table-column prop="type" label="参数类型"></el-table-column>
                <el-table-column prop="description" label="参数描述"></el-table-column>
              </el-table>
            </el-collapse-item>
            <br>

            <el-collapse-item title="错误码解释" name="3">
              <el-table :data="tableData4" border stripe style="width: 90%;margin-left:20px;">
                <el-table-column prop="status" label="错误码"></el-table-column>
                <el-table-column prop="info" label="错误信息"></el-table-column>
                <el-table-column prop="descrpition" label="错误描述"></el-table-column>
              </el-table>
            </el-collapse-item>
            <br>

            <el-collapse-item title="API测试工具" name="4">
              <div>tool</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>

    <!--新建-->
    <el-dialog title="创建API" :visible.sync="newadd" width="60%" :before-close="handleClose">
      <div style="margin-left:15px;margin-right:15px">
        <el-row>
          <el-col :span="5" :offset="1">
            <p>API名称：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="namenew" placeholder="请输入API名称"></el-input>
          </el-col>&nbsp;&nbsp;
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>

        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>地址：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="addnew" placeholder="请输入地址"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>端口号：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="numnew" placeholder="请输入端口号"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>请求路径：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="pathnew" placeholder="请输入请求路径"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>请求方法：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="methodnew" placeholder="请输入请求方法"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>项目：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="projectnew" placeholder="请输入项目"></el-input>
          </el-col>
        </el-row>
        <br>

        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数设置：</p>
          </el-col>
          <el-col :span="15">
            <el-button class="btn" type="primary" icon="el-icon-plus" size="mini" v-on:click="cadd"></el-button>
            <div style="height:5px;"></div>
            <el-table :data="cadd_tableData" border>
              <el-table-column prop="name" label="参数名称">
                <template scope="scope">
                  <el-input v-model="cadd_tableData[scope.$index].name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="参数类型">
                <template scope="scope">
                  <el-input v-model="cadd_tableData[scope.$index].type"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="参数描述">
                <template scope="scope">
                  <el-input v-model="cadd_tableData[scope.$index].description"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template scope="scope">
                  <el-button type="text" @click="cadddel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误：</p>
          </el-col>
          <el-col :span="15">
            <el-button class="btn" type="primary" icon="el-icon-plus" size="mini" v-on:click="eadd"></el-button>
            <div style="height:5px;"></div>
            <el-table :data="eadd_tableData" border>
              <el-table-column prop="value4" label="错误码">
                <template scope="scope">
                  <el-input v-model="eadd_tableData[scope.$index].value4"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value5" label="错误信息">
                <template scope="scope">
                  <el-input v-model="eadd_tableData[scope.$index].value5"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value6" label="错误描述">
                <template scope="scope">
                  <el-input v-model="eadd_tableData[scope.$index].value6"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template scope="scope">
                  <el-button type="text" @click="eadddel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>



        <!-- <el-row>
          <el-col :span="5" :offset="1">
            <p>参数名称：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="pnamenew" placeholder="请输入参数名称"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数类型：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="ptypenew" placeholder="请输入参数类型"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="pdesnew" placeholder="请输入参数描述"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误码：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="scodenew" placeholder="请输入错误码"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误信息：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="sinfonew" placeholder="请输入信息"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="sdesnew" placeholder="请输入错误描述"></el-input>
          </el-col>
        </el-row> -->
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>API描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="desnew" placeholder="请输入API描述" type="textarea" :rows="2"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newadd = false">取消</el-button>
        <el-button type="primary" @click="created">确定</el-button>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog title="修改" :visible.sync="EditFormVisible" width="60%" :before-close="handleClose">
      <div style="margin-left:15px;margin-right:15px">
        <el-row>
          <el-col :span="5" :offset="1">
            <p>API名称：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="nameedit"></el-input>
          </el-col>&nbsp;&nbsp;
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>地址：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="addedit" placeholder="请输入地址"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>端口号：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="numedit" placeholder="请输入端口号"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>请求路径：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="pathedit" placeholder="请输入请求路径"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>请求方法：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="methodedit" placeholder="请输入请求方法"></el-input>
          </el-col>
          <el-col :span="2">
            <div style="color:#F56C6C">必填</div>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>项目：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="projectedit" placeholder="请输入项目"></el-input>
          </el-col>
        </el-row>
        <br>

        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数设置：</p>
          </el-col>
          <el-col :span="15">
            <el-button class="btn" type="primary" icon="el-icon-plus" size="mini" v-on:click="cedit"></el-button>
            <div style="height:5px;"></div>
            <el-table :data="cedit_tableData" border>
              <el-table-column prop="name" label="参数名称">
                <template scope="scope">
                  <el-input v-model="cedit_tableData[scope.$index].name"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="参数类型">
                <template scope="scope">
                  <el-input v-model="cedit_tableData[scope.$index].type"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="description" label="参数描述">
                <template scope="scope">
                  <el-input v-model="cedit_tableData[scope.$index].description"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template scope="scope">
                  <el-button type="text" @click="ceditdel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误：</p>
          </el-col>
          <el-col :span="15">
            <el-button class="btn" type="primary" icon="el-icon-plus" size="mini" v-on:click="eedit"></el-button>
            <div style="height:5px;"></div>
            <el-table :data="eedit_tableData" border>
              <el-table-column prop="value4" label="错误码">
                <template scope="scope">
                  <el-input v-model="eedit_tableData[scope.$index].value4"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value5" label="错误信息">
                <template scope="scope">
                  <el-input v-model="eedit_tableData[scope.$index].value5"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value6" label="错误描述">
                <template scope="scope">
                  <el-input v-model="eedit_tableData[scope.$index].value6"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作">
                <template scope="scope">
                  <el-button type="text" @click="eeditdel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>






        <!-- <el-row>
          <el-col :span="5" :offset="1">
            <p>参数名称：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="pnameedit" placeholder="请输入参数名称"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数类型：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="ptypeedit" placeholder="请输入参数类型"></el-input>
          </el-col>
        </el-row>
        <br>

        <el-row>
          <el-col :span="5" :offset="1">
            <p>参数描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="pdesedit" placeholder="请输入参数描述"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误码：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="scodeedit" placeholder="请输入错误码"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误信息：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="sinfoedit" placeholder="请输入信息"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="5" :offset="1">
            <p>错误描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="sdesedit" placeholder="请输入错误描述"></el-input>
          </el-col>
        </el-row>-->
        <br> 
        <el-row>
          <el-col :span="5" :offset="1">
            <p>API描述：</p>
          </el-col>
          <el-col :span="15">
            <el-input v-model="desedit" placeholder="请输入API描述" type="textarea" :rows="2"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
import qs from "qs";
var servicename;
export default {
  data() {
    return {
      activeNames: ["1"],
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 0, //总条数
      EditFormVisible: false,
      namenew: "",
      desnew: "",
      addnew: "",
      numnew: "",
      pathnew: "",
      methodnew: "",
      projectnew: "",
      pnamenew: "",
      ptypenew: "",
      pdesnew: "",
      scodenew: "",
      sinfonew: "",
      sdesnew: "",

      nameedit: "",
      desedit: "",
      addedit: "",
      numedit: "",
      pathedit: "",
      methodedit: "",
      projectedit: "",
      pnameedit: "",
      ptypeedit: "",
      pdesedit: "",
      scodeedit: "",
      sinfoedit: "",
      sdesedit: "",

      searchtext: "",
      searchstatus: "",
      newadd: false,

      cadd_tableData: [],
      eadd_tableData: [],
      cedit_tableData: [],
      eedit_tableData: [],


      tableData1: [
        {
          name: "",
          project: "",
          add: ""
          //area: ""
        }
      ],
      tableData2: [
        {
          method: "",
          path: "",
          num: ""
        }
      ],
      tableData3: [
        {
          name: "",
          type: "",
          description: ""
        }
      ],
      tableData4: [
        {
          status: "",
          info: "",
          description: ""
        }
      ],

      tableData: [
        {
          name: "combination",
          des: "",
          state: "已发布"
        },
        {
          name: "combination_2",
          des: "22",
          state: "已发布"
        },
        {
          name: "testAPI",
          des: "test index",
          state: "已创建",
          type: "消息API",
          add: "http://10.108.208.51",
          area: "北京"
        }
      ]
    };
  },

  mounted() {
    var that = this;
    axios
      .get("http://182.92.222.75:5002/service-manager/all")
      .then(function(response) {
        var data = response.data;
        data.datum.map(service => {
          switch (service.state) {
            case 0:
              service.state = "已创建";
              break;
            case 1:
              service.state = "已发布";
              break;

            case 2:
              service.state = "已下线";
              break;
          }
        });
        that.tableData = data.datum;
        that.total = data.datum.length;
      })
      .catch(function(error) {
        console.log(error);
        alert("error!");
      });
  },

  methods: {
    handleCurrentChange(val) {
      //切换页面时触发
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleChange(val) {
      console.log(val);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    created() {
      if (
        this.namenew == "" ||
        this.addnew == "" ||
        this.pathnew == "" ||
        this.methodnew == ""
      ) {
        alert("请填写必填信息！");
        return false;
      }

      var statusCode = [];
      var obj2 = {
        status: this.scodenew,
        info: this.sinfonew,
        description: this.sdesnew
      };
      statusCode.push(obj2);

      var that = this;
      axios
        .post(
          "http://182.92.222.75:5002/service-manager/create",
          qs.stringify({
            name: this.namenew,
            description: this.desnew,
            address: this.addnew,
            port: this.numnew,
            path: this.pathnew,
            method: this.methodnew,
            project: this.projectnew,
            parameter: this.cadd_tableData,
            statusCode: statusCode
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;

          that.tableData = [data.datum];
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
      this.newadd = false;
      this.namenew = "";
      this.desnew = "";
      this.addnew = "";
      this.numnew = "";
      this.pathnew = "";
      this.methodnew = "";
      this.projectnew = "";
      this.pnamenew = "";
      this.ptypenew = "";
      this.pdesnew = "";
      this.scodenew = "";
      this.sinfonew = "";
      this.sdesnew = "";
    },

    edit: function(index, row, tableData) {
      this.EditFormVisible = true;
      servicename = row.name;

      //this.editForm = Object.assign({}, rows);
      console.log(row);
      var that = this;

      axios
        .get(
          "http://182.92.222.75:5002/service-manager/project",

          {
            params: {
              serviceName: row.name
            }
          }
        )
        .then(function(response) {
          console.log(response);
          that.nameedit = response.data.datum.basic.name;
          that.addedit = response.data.datum.basic.add;
          that.numedit = response.data.datum.parameter.basic.num;
          that.pathedit = response.data.datum.parameter.basic.path;
          that.methodedit = response.data.datum.parameter.basic.method;
          that.projectedit = response.data.datum.basic.project;
          that.pnameedit = response.data.datum.parameter.info[0].name;
          that.ptypeedit = response.data.datum.parameter.info[0].type;
          that.pdesedit = response.data.datum.parameter.info[0].description;
          that.scodeedit = response.data.datum.statusCode[0].status;
          that.sinfoedit = response.data.datum.statusCode[0].info;
          that.sdesedit = response.data.datum.statusCode[0].description;
          that.desedit = response.data.datum.description;
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
    },

    submit(row) {
      if (
        this.nameedit == "" ||
        this.addedit == "" ||
        this.pathedit == "" ||
        this.methodedit == ""
      ) {
        alert("请填写必填信息！");
        return false;
      }

      var parameter = [];
      var obj1 = {
        name: this.pnameedit,
        type: this.ptypeedit,
        decription: this.pdesedit
      };
      parameter.push(obj1);
      var statusCode = [];
      var obj2 = {
        status: this.scodeedit,
        info: this.sinfoedit,
        description: this.sdesedit
      };
      statusCode.push(obj2);

      var that = this;
      axios
        .post(
          `http://182.92.222.75:5002/service-manager/modify/${servicename}`,
          qs.stringify({
            name: this.nameedit,
            decription: this.desedit,
            address: this.addedit,
            port: this.numedit,
            path: this.pathedit,
            method: this.methodedit,
            project: this.projectedit,
            parameter: parameter,
            statusCode: statusCode
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;

          that.tableData = [data.datum];
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
      this.EditFormVisible = false;
      this.nameedit = "";
      this.desedit = "";
      this.addedit = "";
      this.numedit = "";
      this.pathedit = "";
      this.methodedit = "";
      this.projectedit = "";
      this.pnameedit = "";
      this.ptypeedit = "";
      this.pdesedit = "";
      this.scodeedit = "";
      this.sinfoedit = "";
      this.sdesedit = "";
    },

    search() {
      var that = this;
      let params = {};
      if (this.searchtext) {
        params.serviceName = this.searchtext;
      }
      if (this.searchstatus) {
        params.status = this.searchstatus;
      }
      axios
        .get("http://182.92.222.75:5002/service-manager/query", {
          params: params
        })
        .then(function(response) {
          console.log(response);
          var data = response.data;
          data.datum.map(service => {
            switch (service.state) {
              case 0:
                service.state = "已创建";
                break;
              case 1:
                service.state = "已发布";
                break;

              case 2:
                service.state = "已下线";
                break;
            }
          });
          that.tableData = data.datum;
          that.total = data.datum.length;
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
    },
    release(index, row, tableData) {
      var that = this;
      axios
        .get("http://182.92.222.75:5002/service-manager/release", {
          params: {
            serviceName: row.name
          }
        })
        .then(function(response) {
          console.log(response);
          var data = response.data;

          that.tableData = [data.datum];
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
    },

    offline(index, row, tableData) {
      var that = this;
      axios
        .get("http://182.92.222.75:5002/service-manager/offline", {
          params: {
            serviceName: row.name
          }
        })
        .then(function(response) {
          console.log(response);
          var data = response.data;

          that.tableData = [data.datum];
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
    },

    deleteRow(index, row, tableData) {
      console.log(row);
      var that = this;
      console.log(index);
      axios
        .get("http://182.92.222.75:5002/service-manager/delete", {
          params: {
            serviceName: row.name
          }
        })
        .then(function(response) {
          console.log(response);
          var data = response.data;
          that.tableData = [data.datum];
          that.total = data.datum.length;
          that.tableData.splice(index, 1);
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
    },

    add: function(index, row, tableData) {
      console.log(row);
      var that = this;
      axios
        .get(
          "http://182.92.222.75:5002/service-manager/project",
          // qs.stringify({
          //   serviceName: row.name
          // })
          {
            params: {
              serviceName: row.name
            }
          }
        )
        .then(function(response) {
          console.log(response);
          that.tableData1 = [response.data.datum.basic];
          that.tableData2 = [response.data.datum.parameter.basic];
          that.tableData3 = response.data.datum.parameter.info;
          that.tableData4 = response.data.datum.statusCode;

          // this.tableData1 = [];

          // var table1 = [];

          // var obj1 = {
          //   name: parameter.name,
          //   project: parameter.project,
          //   add: parameter.add
          // };
          // table1.push(obj1);
          // this.tableData1 = table1;
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
    },

    cadd() {
      var cadddata = {
        name: "",
        type: "",
        description: "",
      };
      this.cadd_tableData.push(cadddata);
    },

     eadd() {
      var eadddata = {
        value4: "",
        value5: "",
        value6: "",
      };
      this.eadd_tableData.push(eadddata);
    },
    cadddel(index) {
      console.log(index);
      this.cadd_tableData.splice(index, 1);
    },
    eadddel(index) {
      console.log(index);
      this.eadd_tableData.splice(index, 1);
    }

  }
};
</script>

<style>
.prehd {
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #bbb;
  line-height: 45px;
  padding: 10px 20px;
}
.pretitle {
  font-size: 24px;
  font-family: 微软雅黑;
  color: #3a8ab8;
}
.pages {
  float: right;
  margin: 15px;
}
</style>