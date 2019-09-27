<template>
  <div class="boxs">
    <el-row>
      <el-col :span="12">
        <el-button size="mini" @click="back" icon="el-icon-arrow-left">返回</el-button>
        <b>{{subname}}图谱元数据概念定义</b>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" round style="float:right;" @click="change">切换到概念图形式</el-button>
      </el-col>
    </el-row>
    <div style="height:20px;"></div>
    <el-row>
      实体列表
      <div>
        <el-table :data="tableDataEntity" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.properties" border stripe style="width: 100%">
                <el-table-column prop="index" label="序号" width="100" align="center">
                  <template scope="scope">
                    <p>{{scope.$index+1}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="属性名称">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="details" label="描述">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="index" label="序号" width="100" align="center">
            <template scope="scope">
              <p>{{scope.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="text" label="实体中文名" align="center">
          </el-table-column>
          <el-table-column prop="name" label="实体英文名" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="实体创建时间" align="center">
          </el-table-column>
          <el-table-column prop="updateTime" label="实体更新时间" align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <br/><br/>  
    <br/>
    <el-row>
      关系列表
      <div>
        <el-table :data="tableDataRelation" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.properties" border stripe style="width: 100%">
                <el-table-column prop="index" label="序号" width="100" align="center">
                  <template scope="scope">
                    <p>{{scope.$index+1}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="属性名称">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="details" label="描述">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="index" label="序号" width="100" align="center">
            <template scope="scope">
              <p>{{scope.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="text" label="关系中文名" align="center">
          </el-table-column>
          <el-table-column prop="name" label="关系英文名" align="center">
          </el-table-column>
          <el-table-column prop="from" label="from" align="center">
          </el-table-column>
          <el-table-column prop="to" label="to" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      subname: this.$route.params.subname,
      subid: this.$route.params.subid,
      tableDataEntity:[],
      tableDataRelation:[],
      tableData1: [
        {
          nodename: "企业",
          nodeuid: "dbjdslbjljwnk",
          nodedes: "nsjlebcljeojij",
          attrs: [
            {
              name: "属性1",
              type: "int",
              des: "属性描述1"
            },
            {
              name: "属性2",
              type: "int",
              des: "属性描述2"
            }
          ]
        },
        {
          nodename: "法人",
          nodeuid: "dbjdslxdvswnk",
          nodedes: "nsjlebcljeojij111",
          attrs: [
            {
              name: "属性3",
              type: "int",
              des: "属性描述3"
            },
            {
              name: "属性4",
              type: "int",
              des: "属性描述4"
            }
          ]
        },
        {
          nodename: "行业",
          nodeuid: "dbjdsldxcswnk",
          nodedes: "nsjlebcljeojij2222",
          attrs: [
            {
              name: "属性5",
              type: "int",
              des: "属性描述5"
            },
            {
              name: "属性6",
              type: "int",
              des: "属性描述6"
            }
          ]
        }
      ],
      tableData2: [
        {
          linkname: "属于",
          linkfrom: "企业",
          linkto: "行业"
        },
        {
          linkname: "关系2",
          linkfrom: "法人",
          linkto: "企业"
        },
        {
          linkname: "关系3",
          linkfrom: "行业",
          linkto: "法人"
        }
      ]
    };
  },
  mounted() {
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
          console.log(data.data.ontology);
          that.trans(data.data.ontology.nodeDataArray,data.data.ontology.linkDataArray);
          that.tableDataEntity = data.data.ontology.nodeDataArray;
          that.tableDataRelation = data.data.ontology.linkDataArray;
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
    change() {
      this.$router.push({
        name: "SubDefinition",
        params: { subname: this.subname,subid:this.subid }
      });
    },
    back() {
      this.$router.push({
        name: "Definition"
      });
    },
    trans(nodeArray,linkArray){
      for(var i=0;i<linkArray.length;i++){
        for(var j=0;j<nodeArray.length;j++){
          if(linkArray[i].from==nodeArray[j].entityId){
            linkArray[i].from = nodeArray[j].text;
          }
          if(linkArray[i].to==nodeArray[j].entityId){
            linkArray[i].to = nodeArray[j].text;
          }
        }
      }
    }
  }
};
</script>

<style>
.boxs {
  margin: 20px;
}
</style>
