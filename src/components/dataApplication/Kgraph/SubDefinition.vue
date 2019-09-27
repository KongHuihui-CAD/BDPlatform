<template>
  <div class="boxs">
    <el-row>
      <el-col :span="12">
        <el-button size="mini" @click="back" icon="el-icon-arrow-left">返回</el-button>
        <b>{{subname}}图谱元数据概念定义</b>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" round style="float:right;" @click="change">切换到表格形式</el-button>
      </el-col>
    </el-row>
    <div style="height:10px;"></div>
    <el-row :gutter="8">
      <el-col :span="17">
        <div id="sample">
          <el-row>
            <div id="myDiagramDiv" style="width: 97%; height: 620px;margin:11px;"></div>
          </el-row>
          <el-row>
            <el-col :span="8" style="text-align:center;">
              <div style="cursor:pointer;" @click="build">
                <i class="el-icon-setting" style="font-size:30px;"></i>
                <p style="font-size:15px;">构建</p>
              </div>
            </el-col>
            <el-col :span="8" style="text-align:center;">
              <el-popover placement="top" width="160" v-model="visible2">
                <p>画布将刷新为目前保存最新状态，是否要刷新？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="empty">确定</el-button>
                </div>
                <div style="cursor:pointer;" slot="reference">
                  <i class="el-icon-refresh" style="font-size:30px;"></i>
                  <p style="font-size:15px;">刷新</p>
                </div>
              </el-popover>
            </el-col>
            <el-col :span="8" style="text-align:center;">
              <div style="cursor:pointer;" @click="save">
                <i class="el-icon-upload2" style="font-size:30px;"></i>
                <p style="font-size:15px;">保存</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="board">
          <div class="one">
            设置区
          </div>
          <hr/>
          <div class="two">
            （在空白处双击生成新实体，双击实体或关系即可修改名字，单击实体就会有设置项在这里出现哦～）
          </div>
          <div class="four" :style="entitystyle">
            <p>实体信息：</p>
            <el-table :data="entitymsg" border style="width:100%" class="tablestyle">
              <el-table-column prop="ch" label="中文名称" align="center">
              </el-table-column>
              <el-table-column prop="en" label="英文名称" align="center">
                <template scope="scope">
                  <el-input v-model="entitymsg[0].en"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <br/>
            <div style="text-align:center">
              <el-button size="mini" @click="addattr">查看/添加属性</el-button>
              <el-button size="mini" @click="addrela">查看/设置关系</el-button>
            </div>
            <br/>
          </div>
          <div class="notice" :style="noticestyle">
            <i class="iconfont icon-tishi" style="color:#FFC107"></i>该实体概念已存在，下方为其属性，若修改将更改唯一实体！点击
            <span @click="savenode" class="addentity">添加</span>直接添加，键盘delete即可删除。
          </div>
          <div class="three" :style="attrstyle">
            属性信息
            <i class="el-icon-circle-plus-outline" style="cursor:pointer;" @click="adddd"></i>
            <el-table :data="tableData" border stripe style="width: 100%" class="tablestyle">
              <el-table-column prop="index" label="序号" width="50" align="center">
                <template scope="scope">
                  <p>{{scope.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="属性名称" align="center">
                <template scope="scope">
                  {{tableData[scope.$index].name}}
                  <el-tooltip placement="top">
                    <div slot="content">{{tableData[scope.$index].type}}<br/>{{tableData[scope.$index].details}}</div>
                    <i class="el-icon-info" style="cursor:pointer;"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作" align="center">
                <template scope="scope">
                  <i class="el-icon-edit" style="cursor:pointer;" @click="modify(tableData[scope.$index])"></i>
                  &nbsp;
                  <i class="el-icon-delete" style="cursor:pointer;" @click="del(tableData[scope.$index])"></i>
                </template>
              </el-table-column>
            </el-table>
            <!-- <div style="height:10px;"></div>
            <div style="text-align:center;">
              <el-button @click="savenode">添加</el-button>
            </div> -->
          </div>
          <div class="three" :style="relationstyle">
            实体相关关系信息
            <div class="notice">
              <i class="iconfont icon-tishi" style="color:#FFC107"></i>直接选中关系
              <span class="addrelation">拖动</span>即可改变关系指向，
              <span class="addrelation">双击</span>可改变中文名，修改后点击
              <span class="addentity" @click="saverelation">刷新</span>后即可保存，点击
              <span class="addrelation">齿轮</span>可设置关系内部属性～
            </div>
            <el-table :data="tableDataR" border stripe style="width: 100%" class="tablestyle">
              <el-table-column prop="index" label="序号" width="50" align="center">
                <template scope="scope">
                  <p>{{scope.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="关系名称" align="center">
                <template scope="scope">
                  {{tableDataR[scope.$index].text}}
                  <el-tooltip placement="top">
                    <div slot="content">英文名:{{tableDataR[scope.$index].name}}<br/>from:{{tableDataR[scope.$index].from}}<br/>to:{{tableDataR[scope.$index].to}}</div>
                    <i class="el-icon-info" style="cursor:pointer;"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="action" label="操作" align="center">
                <template scope="scope">
                  <i class="iconfont icon-baocun1" @click="editRname(tableDataR[scope.$index],scope.$index)" style="cursor:pointer;"></i>
                  &nbsp;
                  <i class="el-icon-setting" @click="editRattr(tableDataR[scope.$index],scope.$index)" style="cursor:pointer;"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- build弹窗 -->
    <el-dialog title="构建结果" :visible.sync="buildtan" width="60%">
      <div style="margin-left:40px;margin-right:40px">
        <!-- <textarea id="mySavedModel" style="width:100%;height:450px"></textarea> -->
        <json-viewer :value="jsonData" :expand-depth=2 boxed></json-viewer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buildtan = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- modify弹窗 -->
    <el-dialog title="修改属性" :visible.sync="modifytan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性名称：</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="attrname"></el-input>
          </el-col>
        </el-row>
        <br/><br/>
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性类型：</p>
          </el-col>
          <el-col :span="16">
            <el-select v-model="attrtype" placeholder="请选择属性类型" style="width: 100%;">
              <el-option label="string" value="string"></el-option>
              <el-option label="int" value="int"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <br/><br/>
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性描述：</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="attrdes"></el-input>
          </el-col>
        </el-row>
        <br/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyyes">确定</el-button>
        <el-button @click="modifytan = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- del弹窗 -->
    <el-dialog title="删除属性" :visible.sync="deltan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        确定删除
        <b>{{deleteattr}}</b>属性？
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteyes">确定</el-button>
        <el-button @click="deltan = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- add弹窗 -->
    <el-dialog title="添加属性" :visible.sync="addtan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性名称：</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="addname"></el-input>
          </el-col>
        </el-row>
        <br/><br/>
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性类型：</p>
          </el-col>
          <el-col :span="16">
            <el-select v-model="addtype" placeholder="请选择属性类型" style="width: 100%;">
              <el-option label="string" value="string"></el-option>
              <el-option label="int" value="int"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <br/><br/>
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性描述：</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="adddes"></el-input>
          </el-col>
        </el-row>
        <br/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addyes">确定</el-button>
        <el-button @click="addtan = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑关系name弹窗 -->
    <el-dialog title="编辑关系" :visible.sync="relanametan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        <p>text:{{chooseRtext}}</p>
        <p>from:{{chooseRfrom}}</p>
        <p>to:{{chooseRto}}</p>
        <br/>
        <div style="background-color: aliceblue;">
          <i class="iconfont icon-tishi" style="color:#FFC107"></i>以上三个属性在图中直接选择关系，拖动即可修改哦～
        </div>
        <br/>
        <el-row>
          <el-col :span="6">
            <p style="margin-top:9px;">name：</p>
          </el-col>
          <el-col :span="18">
            <el-input v-model="relationname"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="relanameyes">确定</el-button>
        <el-button @click="relanametan = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑关系属性弹窗 -->
    <el-dialog title="关系属性" :visible.sync="relationattrtan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        <el-popover placement="top" width="460" v-model="addRtan">
          <div style="text-align: center; margin: 0">
            <el-row>
              <el-col :span="8">
                <p style="margin-top:9px;">属性名称：</p>
              </el-col>
              <el-col :span="14">
                <el-input v-model="addRname"></el-input>
              </el-col>
            </el-row>
            <br/>
            <el-row>
              <el-col :span="8">
                <p style="margin-top:9px;">属性类型：</p>
              </el-col>
              <el-col :span="14">
                <el-select v-model="addRtype" placeholder="请选择属性类型" style="width: 100%;">
                  <el-option label="string" value="string"></el-option>
                  <el-option label="int" value="int"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <br/>
            <el-row>
              <el-col :span="8">
                <p style="margin-top:9px;">属性描述：</p>
              </el-col>
              <el-col :span="14">
                <el-input v-model="addRdes"></el-input>
              </el-col>
            </el-row>
            <br/>
            <el-button size="mini" type="text" @click="addRtan = false">取消</el-button>
            <el-button type="primary" size="mini" @click="addRyes">确定</el-button>
          </div>
          <el-button slot="reference" icon="el-icon-plus" type="primary" size="mini" style="float:right;margin-top:-10px;" circle></el-button>
        </el-popover>
        <br/>
        <el-table :data="tableDataRattr" border stripe style="width: 100%" class="tablestyle">
          <el-table-column prop="index" label="序号" width="50" align="center">
            <template scope="scope">
              <p>{{scope.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="属性名称" align="center">
            <template scope="scope">
              {{tableDataRattr[scope.$index].name}}
              <el-tooltip placement="top">
                <div slot="content">{{tableDataRattr[scope.$index].type}}<br/>{{tableDataRattr[scope.$index].details}}</div>
                <i class="el-icon-info" style="cursor:pointer;"></i>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center">
            <template scope="scope">
              <i slot="reference" class="el-icon-edit" style="cursor:pointer;" @click="modifyR(tableDataRattr[scope.$index])"></i>
              &nbsp;
              <i slot="reference" class="el-icon-delete" style="cursor:pointer;" @click="delR(tableDataRattr[scope.$index])"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="relationattrtan = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- modify弹窗 -->
    <el-dialog title="修改属性" :visible.sync="editRtan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性名称：</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="attrRname"></el-input>
          </el-col>
        </el-row>
        <br/><br/>
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性类型：</p>
          </el-col>
          <el-col :span="16">
            <el-select v-model="attrRtype" placeholder="请选择属性类型" style="width: 100%;">
              <el-option label="string" value="string"></el-option>
              <el-option label="int" value="int"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <br/><br/>
        <el-row>
          <el-col :span="8">
            <p style="margin-top:9px;">属性描述：</p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="attrRdes"></el-input>
          </el-col>
        </el-row>
        <br/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRyes">确定</el-button>
        <el-button @click="editRtan = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- del弹窗 -->
    <el-dialog title="删除属性" :visible.sync="deleteRtan" width="30%">
      <div style="margin-left:40px;margin-right:40px">
        确定删除
        <b>{{deleteRattr}}</b>属性？
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteRyes">确定</el-button>
        <el-button @click="deleteRtan = false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      modifytan: false,
      deltan: false,
      addtan: false,
      deleteattr: "",
      attrname: "",
      attrtype: "",
      attrdes: "",
      addname: "",
      addtype: "",
      adddes: "",
      buildtan: false,
      jsonData: {},
      visible2: false,
      myDiagram: "",
      jsonList: {
        nodeKeyProperty: "id",
        nodeDataArray: [
          { id: 0, uid: "example0", loc: "120 120", text: "实体1" },
          { id: 1, uid: "example1", loc: "330 120", text: "实体2" }
        ],
        linkDataArray: [
          { from: 0, to: 0, text: "关系1" },
          { from: 0, to: 1, text: "关系2" },
          { from: 1, to: 0, text: "关系3" }
        ]
      },
      jsonList1: {},
      tableData: [],
      tableDataR: [],
      attrstyle: "display:none;",
      relationstyle: "display:none;",
      noticestyle: "display:none;",
      entitystyle: "display:none;",
      clicknodename: "",
      clicknodetext: "",
      clicknodepro: [],
      entitymsg: [],
      subname: this.$route.params.subname,
      subid: this.$route.params.subid,
      clicknodeid: "",
      deleteattrid: "",
      modifyattrid: "",
      exist: true,
      entityall: [],
      relationall: [],
      startlink: [],
      endlink: [],
      addlink: [],
      clickingnode: {},
      ifname: true,
      relationname: "",
      relanametan: false,
      chooseRtext: "",
      chooseRfrom: "",
      chooseRto: "",
      chooseRid: "",
      chooseIndex: "",
      flag: 0,
      relationattrtan: false,
      tableDataRattr: [],
      addRtan: false,
      addRname: "",
      addRtype: "",
      addRdes: "",
      chooseRIndex: "",
      attrRname: "",
      attrRtype: "",
      attrRdes: "",
      deleteattrRid: "",
      modifyattrRid: "",
      deleteRattr: "",
      deleteRtan: false,
      editRtan: false
    };
  },
  mounted() {
    if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make; // for conciseness in defining templates
    this.myDiagram = $(
      go.Diagram,
      "myDiagramDiv", // must name or refer to the DIV HTML element
      {
        // start everything in the middle of the viewport
        initialContentAlignment: go.Spot.Center,
        // have mouse wheel events zoom in and out instead of scroll up and down
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        // support double-click in background creating a new node
        "clickCreatingTool.archetypeNodeData": {
          //空白处双击触发
          text: "双击为新实体命名",
          uid: "cms" + guid()
        },
        // enable undo & redo
        // "undoManager.isEnabled": true,//回退是否好使
        layout: $(go.ForceDirectedLayout)
      }
    );
    var that = this;
    // when the document is modified, add a "*" to the title and enable the "Save" button
    this.myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !that.myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (that.myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });
    // notice whenever the selection may have changed
    this.myDiagram.addDiagramListener("ChangedSelection", function(e) {
      that.myDelete();
    });
    // notice when the Paste command may need to be reenabled
    this.myDiagram.addDiagramListener("ClipboardChanged", function(e) {
      that.myDelete();
    });
    // notice whenever a transaction or undo/redo has occurred
    this.myDiagram.addModelChangedListener(function(e) {
      if (e.isTransactionFinished) that.myDelete();
    });
    var _this = this;
    // define the Node template
    this.myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      // define the node's outer shape, which will surround the TextBlock
      $(go.Shape, "RoundedRectangle", {
        parameter1: 20, // the corner has a large radius
        // fill: $(go.Brush, "Linear", {//将Shape.fill的属性设置为Brush画笔对象，并使用了线性渐变画笔给Shape填充颜色
        //   0: "rgb(21,200,255)",
        //   1: "rgb(21,177,236)"
        // }),
        fill: _this.choosecolor(this),
        stroke: null,
        portId: "", // this Shape is the Node's port, not the whole Node
        fromLinkable: true,
        fromLinkableSelfNode: true,
        fromLinkableDuplicates: true,
        toLinkable: true,
        toLinkableSelfNode: true,
        toLinkableDuplicates: true,
        cursor: "pointer"
      }),
      $(
        go.TextBlock,
        {
          font: "bold 11pt helvetica, bold arial, sans-serif",
          editable: true // editing the text automatically updates the model data
        },
        new go.Binding("text").makeTwoWay()
      ),
      {
        click: function(e, node) {
          // 单击事件,输出节点数据
          console.log(node.part.data);
          _this.entitystyle = "display:block;";
          _this.clicknode(node.part.data);
        },
        cursor: "pointer" //改变鼠标样式变成小手
      }
    );
    // unlike the normal selection Adornment, this one includes a Button
    this.myDiagram.nodeTemplate.selectionAdornmentTemplate = $(
      go.Adornment,
      "Spot",
      $(
        go.Panel,
        "Auto",
        $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 2 }),
        $(go.Placeholder) // a Placeholder sizes itself to the selected Node
      ),
      // the button to create a "next" node, at the top-right corner
      $(
        "Button",
        {
          alignment: go.Spot.TopRight,
          click: addNodeAndLink // this function is defined below
        },
        $(go.Shape, "PlusLine", { width: 6, height: 6 })
      ) // end button
    ); // end Adornment
    // clicking the button inserts a new node to the right of the selected node,
    // and adds a link to that new node
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function guid() {
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    }
    function addNodeAndLink(e, obj) {
      var adornment = obj.part;
      var diagram = e.diagram;
      diagram.startTransaction("Add State");
      // get the node data for which the user clicked the button
      var fromNode = adornment.adornedPart;
      var fromData = fromNode.data;
      // create a new "State" data object, positioned off to the right of the adorned Node
      var toData = { text: "双击为新实体命名" };
      var p = fromNode.location.copy();
      p.x += 200;
      toData.loc = go.Point.stringify(p); // the "loc" property is a string, not a Point object
      toData.uid = "cms" + guid();
      // add the new node data to the model
      var model = diagram.model;
      model.addNodeData(toData);
      // create a link data from the old node data to the new node data
      var linkdata = {
        from: model.getKeyForNodeData(fromData), // or just: fromData.id
        to: model.getKeyForNodeData(toData),
        text: "双击为新关系命名"
      };
      // and add the link data to the model
      model.addLinkData(linkdata);
      // select the new Node
      var newnode = diagram.findNodeForData(toData);
      diagram.select(newnode);
      diagram.commitTransaction("Add State");
      // if the new node is off-screen, scroll the diagram to show the new node
      diagram.scrollToRect(newnode.actualBounds);
    }
    // replace the default Link template in the linkTemplateMap
    this.myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
        reshapable: true,
        relinkableFrom: true,
        relinkableTo: true,
        toShortLength: 3
      },
      new go.Binding("points").makeTwoWay(),
      new go.Binding("curviness"),
      $(
        go.Shape, // the link shape
        { strokeWidth: 1.5 }
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: "standard", stroke: null }
      ),
      $(
        go.Panel,
        "Auto",
        $(
          go.Shape, // the label background, which becomes transparent around the edges
          {
            fill: $(go.Brush, "Radial", {
              0: "rgb(240, 240, 240)",
              0.3: "rgb(240, 240, 240)",
              1: "rgba(240, 240, 240, 0)"
            }),
            stroke: null
          }
        ),
        $(
          go.TextBlock,
          "双击为新关系命名", // the label text
          {
            textAlign: "center",
            font: "9pt helvetica, arial, sans-serif",
            margin: 4,
            editable: true // enable in-place editing
          },
          // editing the text automatically updates the model data
          new go.Binding("text").makeTwoWay()
        )
      )
    );
    var that = this;
    axios
      .post(
        "GRAPH/domain/detail",
        qs.stringify({
          domainId: this.subid
        })
      )
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          that.jsonList1 = data.data.ontology;
          that.startlink = data.data.ontology.linkDataArray;
          that.load();
          // that.jsonList = JSON.parse(that.jsonString);
        } else {
          that.$message.error(data.msg);
        }
      })
      .catch(function(error) {
        console.log(error);
        that.$message.error("出错啦～");
      });
    that.getAllEntity();
    that.getAllRelation();
    // this.load();
    // read in the JSON data from the "mySavedModel" element
  },
  methods: {
    getAllEntity() {
      var that = this;
      axios
        .post("GRAPH/entity/all", qs.stringify({}))
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.entityall = data.data;
            // that.jsonList = JSON.parse(that.jsonString);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    getAllRelation() {
      var that = this;
      axios
        .post("GRAPH/relation/all", qs.stringify({}))
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.relationall = data.data;
            // that.jsonList = JSON.parse(that.jsonString);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    choosecolor(item) {
      console.log(item);
      return "rgb(21,177,236)";
    },
    save() {
      this.addlink = [];
      this.endlink = JSON.parse(this.myDiagram.model.toJson()).linkDataArray;
      console.log(this.endlink);
      for (var i = 0; i < this.endlink.length; i++) {
        if (!this.endlink[i].relationId) {
          this.addlink.push(this.endlink[i]);
        }
      }
      console.log(this.addlink);
      this.$notify({
        title: "保存成功",
        message: "图谱元数据概念更新成功！",
        type: "success"
      });
    },
    load() {
      var jsonString = JSON.stringify(this.jsonList1);
      this.myDiagram.model = go.Model.fromJson(JSON.parse(jsonString));
    },
    addrela() {
      this.clicknodename = this.entitymsg[0].en;
      console.log(this.clicknodename);
      if (!this.clicknodename) {
        this.$message({
          message: "请填写实体英文名！",
          type: "warning"
        });
        return false;
      } else {
        var that = this;
        axios
          .post(
            "GRAPH/entity/exist_entity",
            qs.stringify({
              name: this.clicknodename,
              text: this.clicknodetext
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              if (data.data == true) {
                for (var i = 0; i < that.entityall.length; i++) {
                  if (that.entityall[i].text == that.clicknodetext) {
                    console.log(that.entityall[i]);
                    that.clicknodename = that.entityall[i].name;
                    that.clicknodetext = that.entityall[i].text;
                    that.clicknodepro = that.entityall[i].properties;
                    that.clicknodeid = that.entityall[i].entityId;
                  }
                }
                //实体存在，但应判断是否存在在该域，若不存在，提示添加！！！
                axios
                  .post(
                    "GRAPH/domain/detail",
                    qs.stringify({
                      domainId: that.subid
                    })
                  )
                  .then(function(response) {
                    console.log(response);
                    var data = response.data;
                    if (data.code == 200) {
                      console.log(data.data);
                      var entitys = data.data.ontology.nodeDataArray;
                      var pp = 0;
                      for (var i = 0; i < entitys.length; i++) {
                        if (that.clicknodeid == entitys[i].entityId) {
                          that.reloadR();
                          pp = 1;
                          break;
                        }
                      }
                      if (pp == 0) {
                        //实体存在但不存在在该域
                        that
                          .$confirm(
                            "将为该子域添加一个已有的实体元数据概念, 是否继续?",
                            "提示",
                            {
                              confirmButtonText: "确定",
                              cancelButtonText: "取消",
                              type: "warning"
                            }
                          )
                          .then(() => {
                            that.exist = true;
                            that.flag = 1;
                            that.savenode();
                          })
                          .catch(() => {
                            this.$message({
                              type: "info",
                              message: "已取消"
                            });
                          });
                      }
                    } else {
                      that.$message.error(data.msg);
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                    that.$message.error("出错啦～");
                  });
              } else {
                //实体不存在
                that
                  .$confirm("将添加一个新的实体元数据概念, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                  .then(() => {
                    that.exist = false;
                    that.flag = 1;
                    that.savenode();
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消"
                    });
                  });
              }
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
    },
    reloadR() {
      var that = this;
      this.tableDataR = [];
      this.relationstyle = "display:block";
      this.noticestyle = "display:none";
      this.attrstyle = "display:none";
      this.clickingnode.findLinksConnected().each(function(link) {
        console.log(link.data);
        for (var i = 0; i < that.entityall.length; i++) {
          if (link.data.from == that.entityall[i].entityId) {
            link.data.from = that.entityall[i].text;
          }
          if (link.data.to == that.entityall[i].entityId) {
            link.data.to = that.entityall[i].text;
          }
        }
        that.tableDataR.push(link.data);
      });
      console.log(this.tableDataR);
    },
    build() {
      this.buildtan = true;
      this.jsonData = JSON.parse(this.myDiagram.model.toJson());
      //   document.getElementById(
      //     "mySavedModel"
      //   ).value = this.myDiagram.model.toJson();
    },
    empty() {
      this.reload();
      this.visible2 = false;
      this.$message({
        message: "刷新成功！",
        type: "success"
      });
    },
    modify(item) {
      this.modifytan = true;
      this.attrname = item.name;
      this.attrtype = item.type;
      this.attrdes = item.details;
      this.modifyattrid = item.propertyId;
    },
    modifyyes() {
      var that = this;
      axios
        .post(
          "GRAPH/entity/modify_property",
          qs.stringify({
            entityId: this.clicknodeid,
            propertyId: this.modifyattrid,
            name: this.attrname,
            details: this.attrdes,
            type: this.attrtype
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.$message({
              message: data.msg,
              type: "success"
            });
            that.modifytan = false;
            that.tableData = data.data.properties;
            that.getAllEntity();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    del(item) {
      console.log(item);
      this.deleteattrid = item.propertyId;
      this.deltan = true;
      this.deleteattr = item.name;
    },
    deleteyes() {
      var that = this;
      axios
        .post(
          "GRAPH/entity/delete_property",
          qs.stringify({
            entityId: this.clicknodeid,
            propertyId: this.deleteattrid
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.deltan = false;
            that.$message({
              message: data.msg,
              type: "success"
            });
            that.tableData = data.data.properties;
            that.getAllEntity();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    addyes() {
      var that = this;
      axios
        .post(
          "GRAPH/entity/add_property",
          qs.stringify({
            entityId: this.clicknodeid,
            name: this.addname,
            details: this.adddes,
            type: this.addtype
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.addtan = false;
            that.$message({
              message: data.msg,
              type: "success"
            });
            that.tableData = data.data.properties;
            that.getAllEntity();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    change() {
      this.$router.push({
        name: "SubDefinitionTable",
        params: { subname: this.subname, subid: this.subid }
      });
    },
    clicknode(item) {
      if (item.name) {
        //有name属性，为未添加节点，应显示notice
        this.ifname = true;
      } else {
        this.ifname = false;
      }
      this.noticestyle = "display:none";
      this.attrstyle = "display:none";
      this.relationstyle = "display:none";
      this.entitymsg = [];
      this.clicknodetext = item.text;
      //这里根据item.uid确定tableData的内容，赋值即可
      this.tableData = item.properties;
      this.clicknodeid = item.entityId;
      this.clicknodename = item.name;
      this.clicknodepro = item.properties;
      var obj = {
        ch: this.clicknodetext,
        en: this.clicknodename
      };
      this.entitymsg.push(obj);

      this.clickingnode = this.myDiagram.findNodeForKey(this.clicknodeid);
    },
    addattr() {
      this.clicknodename = this.entitymsg[0].en;
      console.log(this.clicknodename);
      if (!this.clicknodename) {
        this.$message({
          message: "请填写实体英文名！",
          type: "warning"
        });
        return false;
      } else {
        var that = this;
        axios
          .post(
            "GRAPH/entity/exist_entity",
            qs.stringify({
              name: this.clicknodename,
              text: this.clicknodetext
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              if (data.data == true) {
                that.getAllEntity();
                //实体已经存在
                console.log(that.ifname);
                if (that.ifname) {
                  that.noticestyle = "display:none";
                  that.attrstyle = "display:block";
                } else {
                  that.noticestyle = "display:block";
                  that.attrstyle = "display:block";
                }
                that.relationstyle = "display:none";
                for (var i = 0; i < that.entityall.length; i++) {
                  if (that.entityall[i].text == that.clicknodetext) {
                    console.log(that.entityall[i]);
                    that.clicknodename = that.entityall[i].name;
                    that.clicknodetext = that.entityall[i].text;
                    that.clicknodepro = that.entityall[i].properties;
                    that.clicknodeid = that.entityall[i].entityId;
                  }
                }
                console.log(that.clicknodepro);
                that.tableData = that.clicknodepro;
                that.exist = true;
              } else {
                //实体不存在
                that
                  .$confirm("将添加一个新的实体元数据概念, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                  .then(() => {
                    that.exist = false;
                    that.flag = 0;
                    that.savenode();
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: "已取消"
                    });
                  });
              }
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
    },
    back() {
      this.$router.push({
        name: "Definition"
      });
    },
    adddd() {
      this.addtan = true;
      this.addname = "";
      this.addtype = "";
      this.adddes = "";
    },
    savenode() {
      if (this.exist == true) {
        //实体已存在
        var that = this;
        axios
          .post(
            "GRAPH/domain/add_exist_entity",
            qs.stringify({
              domainId: this.subid,
              entityId: this.clicknodeid
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.$message({
                message: data.msg,
                type: "success"
              });
              if (that.flag == 0) {
                that.attrstyle = "display:block";
                that.relationstyle = "display:none";
                that.reload();
                that.getAllEntity();
              } else {
                that.relationstyle = "display:block;";
                that.attrstyle = "display:none";
                that.noticestyle = "display:none";
                that.reload();
                that.reloadR();
                that.getAllEntity();
                that.getAllRelation();
              }
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      } else {
        var that = this;
        axios
          .post(
            "GRAPH/domain/add_entity",
            qs.stringify({
              domainId: this.subid,
              name: this.entitymsg[0].en,
              details: this.entitymsg[0].ch
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.$message({
                message: "添加成功！",
                type: "success"
              });
              that.getAllEntity();
              if (that.flag == 0) {
                that.attrstyle = "display:block";
                that.relationstyle = "display:none";
                that.reload();
                that.getAllEntity();
              } else {
                that.relationstyle = "display:block;";
                that.attrstyle = "display:none";
                that.noticestyle = "display:none";
                that.reload();
                that.reloadR();
                that.getAllEntity();
                that.getAllRelation();
              }
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
    },
    reload() {
      var that = this;
      axios
        .post(
          "GRAPH/domain/detail",
          qs.stringify({
            domainId: that.subid
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.jsonList1 = data.data.ontology;
            that.load();
            // that.jsonList = JSON.parse(that.jsonString);
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    myDelete() {
      var that = this;
      var cmdhnd = this.myDiagram.commandHandler;
      cmdhnd.canDeleteSelection = function() {
        var nodeOrLinkList = that.myDiagram.selection;
        nodeOrLinkList.each(function(nodeOrLink) {
          console.log(nodeOrLink.data);
          if (nodeOrLink.data.from) {
            //选中的是关系
            that
              .$confirm(
                "此操作将删除关系：" + nodeOrLink.data.text + ", 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
              .then(() => {
                axios
                  .post(
                    "GRAPH/relation/delete_relation",
                    qs.stringify({
                      relationId: nodeOrLink.data.relationId
                    })
                  )
                  .then(function(response) {
                    console.log(response);
                    var data = response.data;
                    if (data.code == 200) {
                      console.log(data.data);
                      that.$message({
                        type: "success",
                        message: "删除关系成功！"
                      });
                      that.reload();
                      that.getAllRelation();
                    } else {
                      that.$message.error(data.msg);
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                    that.$message.error("出错啦～");
                  });
              })
              .catch(() => {
                that.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
          } else {
            //选中的是实体
            console.log(that.clicknodeid);
            that
              .$confirm(
                "此操作将删除实体：" + that.clicknodetext + ", 是否继续?",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }
              )
              .then(() => {
                axios
                  .post(
                    "GRAPH/entity/delete_entity",
                    qs.stringify({
                      entityId: that.clicknodeid
                    })
                  )
                  .then(function(response) {
                    console.log(response);
                    var data = response.data;
                    if (data.code == 200) {
                      console.log(data.data);
                      that.$message({
                        type: "success",
                        message: data.msg
                      });
                      that.reload();
                      that.getAllEntity();
                      that.entitystyle = "display:none";
                      that.noticestyle = "display:none";
                      that.attrstyle = "display:none";
                      // that.jsonList = JSON.parse(that.jsonString);
                    } else {
                      that.$message.error(data.msg);
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                    that.$message.error("出错啦～");
                  });
              })
              .catch(() => {
                that.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
          }
        });
      };
    },
    editRname(item, index) {
      this.relanametan = true;
      this.chooseRtext = item.text;
      this.chooseRfrom = item.from;
      this.chooseRto = item.to;
      this.relationname = item.name;
      this.chooseRid = item.relationId;
      this.chooseIndex = index;
    },
    editRattr(item, index) {
      console.log(item);
      console.log(this.relationall);
      this.relationattrtan = true;
      for (var i = 0; i < this.relationall.length; i++) {
        if (item.relationId == this.relationall[i].relationId) {
          this.tableDataRattr = this.relationall[i].properties;
        }
      }
      this.chooseRtext = item.text;
      this.chooseRfrom = item.from;
      this.chooseRto = item.to;
      this.relationname = item.name;
      this.chooseRid = item.relationId;
      this.chooseRIndex = index;
    },
    modifyR(item) {
      this.editRtan = true;
      this.attrRname = item.name;
      this.attrRtype = item.type;
      this.attrRdes = item.details;
      this.modifyattrRid = item.propertyId;
    },
    editRyes() {
      var that = this;
      this.tableDataRattr = [];
      axios
        .post(
          "GRAPH/relation/modify_property",
          qs.stringify({
            relationId: this.chooseRid,
            propertyId:this.modifyattrRid,
            name: this.attrRname,
            details: this.attrRdes,
            type: this.attrRtype
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.tableDataRattr = data.data.properties;
            that.$message({
              message: data.msg,
              type: "success"
            });
            that.editRtan = false;
            that.getAllRelation();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    delR(item) {
      this.deleteRtan = true;
      this.deleteattrRid = item.propertyId;
      this.deleteRattr = item.name;
    },
    deleteRyes() {
      var that = this;
      this.tableDataRattr = [];
      axios
        .post(
          "GRAPH/relation/delete_property",
          qs.stringify({
            relationId: this.chooseRid,
            propertyId:this.deleteattrRid
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.tableDataRattr = data.data.properties;
            that.$message({
              message: data.msg,
              type: "success"
            });
            that.deleteRtan = false;
            that.getAllRelation();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    addRyes() {
      var that = this;
      this.tableDataRattr = [];
      axios
        .post(
          "GRAPH/relation/add_property",
          qs.stringify({
            relationId: this.chooseRid,
            name: this.addRname,
            details: this.addRdes,
            type: this.addRtype
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.tableDataRattr = data.data.properties;
            that.$message({
              message: data.msg,
              type: "success"
            });
            that.addRtan = false;
            that.getAllRelation();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    relanameyes() {
      var that = this;
      for (var i = 0; i < this.entityall.length; i++) {
        if (this.chooseRfrom == this.entityall[i].text) {
          var Rfrom = this.entityall[i].entityId;
        }
        if (this.chooseRto == this.entityall[i].text) {
          var Rto = this.entityall[i].entityId;
        }
      }
      if (this.chooseRid) {
        //有id，说明是修改
        axios
          .post(
            "GRAPH/relation/modify_relation",
            qs.stringify({
              relationId: this.chooseRid,
              name: this.relationname,
              text: this.chooseRtext,
              from: Rfrom,
              to: Rto
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.tableDataR[that.chooseIndex].name = data.data.name;
              console.log(that.tableDataR);
              that.$message({
                message: data.msg,
                type: "success"
              });
              that.relanametan = false;
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      } else {
        //无id，说明是新建
        axios
          .post(
            "GRAPH/domain/add_relation",
            qs.stringify({
              domainId: this.subid,
              fromId: Rfrom,
              toId: Rto,
              name: this.relationname,
              details: this.chooseRtext
            })
          )
          .then(function(response) {
            console.log(response);
            var data = response.data;
            if (data.code == 200) {
              console.log(data.data);
              that.reload();
              that.$message({
                message: data.msg,
                type: "success"
              });
              that.relanametan = false;
            } else {
              that.$message.error(data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("出错啦～");
          });
      }
    },
    saverelation() {
      this.reloadR();
    }
  }
};
</script>

<style>
.board {
  border: 1px solid #d8dee4;
  height: 700px;
  border-radius: 8px;
  padding: 10px;
}
#sample {
  border: 1px solid #d8dee4;
  height: 700px;
  border-radius: 8px;
}
.boxs {
  margin: 20px;
}
.one {
  font-size: 18px;
}
.two {
  padding: 10px;
  color: #898c8c;
}
.three {
  padding: 8px;
}
.notice {
  padding: 10px;
  background-color: aliceblue;
}
.jv-container .jv-code {
  max-height: 400px !important;
  overflow: scroll !important;
}
.jv-more {
  display: none !important;
}
.tablestyle .el-table__body td {
  padding: 0px;
}
.addentity {
  cursor: pointer;
  color: #13b1ed;
  font-weight: 900;
}
.addrelation {
  font-weight: 900;
}
</style>
