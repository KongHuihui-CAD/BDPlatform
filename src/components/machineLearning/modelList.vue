<template>
    <div class="container-main0">
    
      <div class="dashboard-v">
          <div class="container-report" style="width:80%;margin-left:100px;margin-top:25px;">
            <div class="main-title">
              <div class="title0" @click="getResultM" style="cursor: pointer;margin-top:10px;">
                  <span class="title-tg"></span>模型列表
              </div>
              <div class="find">
                <el-button style='float: right;margin-right: 20px;margin-bottom:10px;'  type="primary" plain @click='predict' icon="el-icon-edit-outline">模型评估</el-button>
                <el-input placeholder="请输入内容" v-model="find.findContent" @keyup.enter.native="goSearch">
                  <el-select v-model="find.findType" slot="prepend" placeholder="请选择" class='input-S'>
                    <el-option label="名字" value="name"></el-option>
                    <el-option label="ID" value="id"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"  @click='goSearch'></el-button>
                </el-input>
              </div>
            </div>
           
            <el-table :data="Mresult.slice((currentPage-1)*pagesize,currentPage*pagesize)" ref="multipleTable" style="width: 100%;table-layout:fixed;"  @selection-change="handleSelectionChange">
                  
                  <el-table-column
                    type="selection" :reserve-selection="true">
                  </el-table-column>
                  <el-table-column
                    prop="jobId"
                    label="模型ID"
                    width="80">
                  </el-table-column>
                  <el-table-column
                          prop="modelName"
                          label="模型名称">
                  </el-table-column>
                  <el-table-column
                          prop="algoName"
                          label="算法名称">
                  </el-table-column>
                  <el-table-column
                          prop="datasetName"
                          label="数据集名称">
                  </el-table-column>
                  <el-table-column
                      prop="modelPath"
                      label="模型路径"
                  >
                  </el-table-column>
                  <el-table-column
                      prop="createTime"
                      label="构建时间"
                  >
                  </el-table-column>
                  <el-table-column
                      prop="time"
                      label="运行时间"
                  >
                  </el-table-column>
                  <el-table-column
                      prop="status"
                      label="保存状态"
                  >
                  </el-table-column>
                  <el-table-column
                      prop="modelDown"
                      label="模型结果"
                  >
                  </el-table-column>                      
                  <!-- <el-table-column label="操作" >
                      <template scope="scope">
                          <el-button type="primary"
                              plain
                              @click="open3">
                              下载
                          </el-button>
                      </template>
                  </el-table-column> -->
            </el-table>
            <div class="pagination" style="text-align: left;margin-top: 10px; float:right; margin-right: 10%">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total,prev,pager,next,jumper"
                :total='Mresult.length'
                background>
              </el-pagination>
            </div>
            
          </div>
          
          
        
      </div>
      <el-dialog :visible.sync="dialogVisible1" title="评估结果" >
        <div class="resultL">
          <div class="resultE" id="echart0"></div>
          <div class="resultE" id="echart1"></div>
          <div class="resultE" id="echart2"></div>  
        </div>  
      </el-dialog>
    </div>
</template>
<script>
    import echarts from "echarts";
    var  BASE_URL ="http://10.108.211.136:15050/";
    export default {
       
      data() {
        return {
          pagesize:6,   //每页的条数限制
          currentPage:1,
          Mresult:[],
          multipleSelection :[],
          find:{
            findType:'',
            findContent:''
          },
          dialogVisible1:false,
          option: {
              xAxis: {
                  type: 'category',
                  data: []
              },
              yAxis: {
                  type: 'value'
              },
              series: [{
                  data: [],
                  type: 'bar'
              }]
          },
          myChart:{}
        
        }
      },
      mounted() {
        
         this.getResultM();
      },
      methods:{
          
          handleSizeChange(size){
            this.pagesize = size;
          },
          handleCurrentChange(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage);
          },
          drawBar:function(data){
            // debugger;
            var name = ['auc_score' , 'auc_std_err', 'time']
            var listN = this.multipleSelection;
            console.log(data);
            console.log(listN);
            var listY = [];
            for(var j=0;j<listN.length;j++){
              listY[j] = listN[j].modelName;
            };
           
            
            console.log(listY);
            for(var i =0;i<3; i++){
              var option = {

                  title: {
                    text:name[i]
                  },
                  tooltip: {
                      trigger: 'axis',
                      formatter: '{b} : {c} ',
                      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      },
                      textStyle: {
                          color: '#fff'
                      }
                  },
                  grid: {
                      top:'15%',
                      left: '3%',
                      right: '5%',
                      bottom: '2%',
                      containLabel: true
                  },
                  xAxis: {
                      type: 'category',
                      data: listY
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [{
                      data: data[name[i]],
                      type: 'bar'
                  }]
              };
              console.log(option);
              
              var dom = document.getElementById("echart"+i);
              console.log(dom);
              // console.log(this.cacheOption[j]);
              this.myChart = echarts.init(dom);
              this.myChart.setOption(option);
            }
              

            
          },
          goSearch:function(){
            console.log(this.find);
            if(this.find.findContent !== '' && this.find.findType !== ''){
              this.$http.get(BASE_URL+'list/model/search?searchType=' +this.find.findType + '&searchContext='+ this.find.findContent) 
              .then((response) => {
                console.log(response);
                var data = JSON.parse(response.body);
                this.Mresult=data.DATA;

              }, (response) => {
                alert("请求配置详情失败");
              });
            }else if(this.find.findContent !== '' && this.find.findType === ''){
              alert('请选择搜索类型！')
            }else{
              this.getResultM();
            }
            
          },
          handleSelectionChange:function(rows){
            this.multipleSelection = rows;
          },
          predict:function(){
            console.log(this.multipleSelection);
            var preList=[];
            for(var i=0;i<this.multipleSelection.length;i++){
              preList[i] = this.multipleSelection[i].jobId;
            };
             console.log(preList);
             console.log(JSON.stringify(preList))
            

            this.$http.post(BASE_URL+'model/evaluate',
            {
              ids:JSON.stringify(preList)
            },
            {
                      emulateJSON: true
                    }
            )
                .then((response) => {
                  console.log(response);
                  var data1 = JSON.parse(response.body)
                  this.dialogVisible1 = true;
                   this.dialogVisible1 = true;
                   this.$nextTick(() => {
                     this.drawBar(data1.DATA); 
                  });

                  
                    // this.list = response.body.result.list;
                }, (response) => {
                  console.log('请求失败了');
                  alert("模型评估失败，请刷新重试哦");
            });
           
          },
          getResultM:function(){
            this.$http.get(BASE_URL+'model/query') 
            .then((response) => {
              console.log(response);
              var data = JSON.parse(response.body);
              this.Mresult = data.DATA;
              
            }, (response) => {
              console.log('请求模型失败了');
              
              alert("请求结果模型失败，222");
            });
            console.log("model完成")
          },
           open4() {
            this.$alert('已成功下载预测报告',  {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          },
          open3() {
            this.$alert('已成功下载模型报告',  {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          }


      }
    }


</script>
<style>
.input-S{
  width:100px;
}
  .resultL{
    display: flex;
    justify-content: space-around;
  }
  .resultE{
    width: 350px;
    height: 300px;
    /*border-color: black;
    background-color: blue;*/
    margin-right: 20px;
    margin-bottom: 80px;
  }
 /* .el-select .el-input {
    width: 130px;
  }*/
  .find{
    float: right;
    display: flex;
    justify-content: space-around;
    width: 450px;
    height:50px;
  }
  .title0{
    float: left;
  }
 .container-main0 {
  margin-left: 0px;
  height: 100%;
  /* background: #fff; */
  /*box-shadow: 0 1px 3px #d0d0d0;*/
  }
    .new{
      height:400px;
      width:700px;
    }
    .el-table td,.el-table th.is-leaf {
        text-align: center;
        font-size:12px;

        
    }
    .container-main0 .dashboard-v {
 /*       position: fixed;*/
        top: 150px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }
    .tips-v {
        clear: right;
        margin-left:10%;
        padding-top: 30px;
        display: flex;
    }
    .tips-v p {
        text-align: left;
        color: #3987ad;
    }
    .el-tabs_item{
      width:80px;

    }
    .el-tabs__item.is-active{
      background-color: #FFFFFF；
    }
</style>