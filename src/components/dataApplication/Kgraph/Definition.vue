<template>
  <div class="boxs">
    <el-row>
      <el-col :span="8">
        <b>图谱元数据概念定义</b>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入实体名称" width="50%" prefix-icon="el-icon-search" size="mini" v-model="searchnode">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search" circle @click="search" size="mini"></el-button>
      </el-col>
      <el-col :span="8">
        <el-button size="mini" round style="float:right;" @click="change">切换到表格形式</el-button>
      </el-col>
    </el-row>
    <div style="height:10px;"></div>
    <el-row>
      <el-col :span="24">
        <div id="sample">
          <el-row>
            <div id="myDiagramDiv" style="width: 98%; height: 675px;margin:11px;"></div>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      searchnode: "",
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
      jsonList1: {}
    };
  },
  created() {},
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
        // "clickCreatingTool.archetypeNodeData": {
        //   //空白处双击触发
        //   text: "双击为新实体命名",
        //   uid: "cms" + guid()
        // },
        // enable undo & redo
        "undoManager.isEnabled": true,
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
    
    var _this = this;
    // define the Node template
    this.myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      // define the node's outer shape, which will surround the TextBlock
      $(
        go.Shape,
        "RoundedRectangle",
        {
          parameter1: 20, // the corner has a large radius
          // fill: $(go.Brush, "Linear", {//将Shape.fill的属性设置为Brush画笔对象，并使用了线性渐变画笔给Shape填充颜色
          //   0: "rgb(21,200,255)",
          //   1: "rgb(21,177,236)"
          // }),

          // fill: _this.choosecolor(this),
          stroke: null,
          portId: "", // this Shape is the Node's port, not the whole Node
          fromLinkable: false,
          fromLinkableSelfNode: false,
          fromLinkableDuplicates: false,
          toLinkable: false,
          toLinkableSelfNode: false,
          toLinkableDuplicates: false,
          cursor: "pointer"
        },
        new go.Binding("fill", "isHighlighted", function(h) {
          return h ? "#F44336" : "rgb(21,177,236)";
        }).ofObject()
      ),
      $(
        go.TextBlock,
        {
          font: "bold 11pt helvetica, bold arial, sans-serif"
          // editable: true // editing the text automatically updates the model data
        },
        new go.Binding("text").makeTwoWay()
      ),
      {
        click: function(e, node) {
          // 单击事件,输出节点数据
          console.log(node.part.data);
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
      )
      // the button to create a "next" node, at the top-right corner
      // $(
      //   "Button",
      //   {
      //     alignment: go.Spot.TopRight,
      //     click: addNodeAndLink // this function is defined below
      //   },
      //   $(go.Shape, "PlusLine", { width: 6, height: 6 })
      // ) // end button
    ); // end Adornment

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
    // clicking the button inserts a new node to the right of the selected node,
    // and adds a link to that new node
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
    this.myDiagram.commandHandler.doKeyDown = function() {
      //阻止键盘事件
      var e = myDiagram.lastInput;
      // Meta（Command）键代替Mac命令的“控制”
      var control = e.control || e.meta;
      var key = e.key;
      //退出任何撤销/重做组合键，具体键值根据需求而定
      if (control && (key === "Z" || key === "Y")) return;

      //调用没有参数的基础方法（默认功能）
      go.CommandHandler.prototype.doKeyDown.call(this);
    };
    // replace the default Link template in the linkTemplateMap
    this.myDiagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
        reshapable: false,
        relinkableFrom: false,
        relinkableTo: false,
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
            margin: 4
            // editable: true // enable in-place editing
          },
          // editing the text automatically updates the model data
          new go.Binding("text").makeTwoWay()
        )
      )
    );
    // read in the JSON data from the "mySavedModel" element

    var that = this;
    axios
      .post("GRAPH/ontology/all", qs.stringify({}))
      .then(function(response) {
        console.log(response);
        var data = response.data;
        if (data.code == 200) {
          console.log(data.data);
          that.jsonList1 = data.data;
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
  methods: {
    choosecolor(item) {
      console.log(item);
      return "rgb(21,177,236)";
    },
    load() {
      console.log(this.jsonLis1);
      var jsonString = JSON.stringify(this.jsonList1);
      this.myDiagram.model = go.Model.fromJson(JSON.parse(jsonString));
    },
    change() {
      this.$router.push({
        name: "DefinitionTable"
      });
    },
    search() {
      console.log(this.searchnode);
      var results = this.myDiagram.findNodesByExample({
        text: this.searchnode
      }); // 根据需要搜索字段定义
      this.myDiagram.highlightCollection(results);
    }
  }
};
</script>

<style>
#sample {
  border: 1px solid #d8dee4;
  height: 700px;
  border-radius: 8px;
}
.boxs {
  margin: 20px;
}
</style>
