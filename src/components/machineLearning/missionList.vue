<template>
  <div class="container-main0">
    <div class="dashboard-v">
      <div class="container-report" style="width:80%;;margin-left:100px;margin-top:25px;">
        <div class="main-title">
          <div  class="title0" @click="getJResult" style="cursor: pointer;margin-top:10px;">
                  <span class="title-tg" ></span>任务列表
          </div>
          <div class="find">
            <el-input placeholder="请输入内容" v-model="find.findContent" @keyup.enter.native="goSearch">
              <el-select v-model="find.findType" slot="prepend" placeholder="请选择" class='input-S'>
                <el-option label="名字" value="name"></el-option>
                <el-option label="ID" value="id"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"  @click='goSearch'></el-button>
            </el-input>
          </div>
        </div>
        <el-table :data="Jresult.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;table-layout:fixed; margin-top:15px;" >
          <el-table-column
            prop="jobId"
            label="任务ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="jobName"
            label="任务名称">
          </el-table-column>
          <el-table-column
            label="日志查看">
            <template scope="scope">
              <el-button
              plain
              @click="logView(scope.row)">
              日志查看
            </el-button>
            </template>
          </el-table-column>
           <el-table-column label="参数配置查看">
            <template scope="scope">
              <el-button
              plain
              @click="optionView(scope.row)">
              配置查看
            </el-button>
            </template>
          </el-table-column>
          <el-table-column label="数据集详情">
            <template scope="scope">
              <el-button
              plain
              @click="setView(scope.row)">
              数据集查看
            </el-button>
          </template>
          </el-table-column>
          <el-table-column
          prop="status"
          label="状态"
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
              :total='Jresult.length'
              background>
            </el-pagination>
          </div>
        
      </div> 

    </div>
    <el-dialog :visible.sync="dialogVisible2"  title="模型配置详情">
      <div  style="padding: 10px;">
        <div v-for="item in optionViewData" class="detail-J">
          <span>{{item.name}}:  {{item.value}}</span>
        </div>
      </div>
        
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible3"  title="日志详情" >
      <div  style="padding: 10px;">
        <div v-for="item in logViewData" class="detail-J">
          <span>{{item.name}}:  {{item.value}}</span>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1"  title="数据集详情">
      <div  style="padding: 10px;">
        <div v-for="item in setViewData"  class="detail-J">
          <span>{{item.name}}:  {{item.value}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  var  BASE_URL ="http://10.108.211.136:15050/";
  export default {

    data() {
      return {
        pagesize:6,   //每页的条数限制
        currentPage:1,
        Jresult:[],
        find:{
          findType:'',
          findContent:''
        },
        dialogVisible1:false,
        dialogVisible2:false,
        dialogVisible3:false,
        setViewData:[],
        optionViewData:[],
        logViewData:[]
        
        
      }
    },
    created() {
     this.getJResult();
   },
    mounted() {
     this.getJResult();
   },
   methods:{
    handleSizeChange(size){
      this.pagesize = size;
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage);
    },
    logView:function(row){
      console.log(row);
      this.$http.get(BASE_URL+'job/get_log?jobId=' +row.jobId) 
      .then((response) => {
        console.log(response);
        var data = JSON.parse(response.body);
        this.logViewData = data.DATA;
        console.log(this.setViewData);
        this.dialogVisible3 = true;

      }, (response) => {
        alert("请求数据集详情失败");
      });
    },
    setView:function(row){
      console.log(row);
      this.$http.get(BASE_URL+'api/get_datafile_details?jobId=' +row.jobId) 
      .then((response) => {
        console.log(response);
        var data = JSON.parse(response.body);
        this.setViewData = data.DATA;
        this.dialogVisible1 = true;

      }, (response) => {
        alert("请求数据集详情失败");
      });
      
    },
    optionView:function(row){

      console.log(row);
      this.$http.get(BASE_URL+'api/get_model_algos?jobId=' +row.jobId) 
      .then((response) => {
        console.log(response);
        var data = JSON.parse(response.body);
        this.optionViewData = data.DATA;
        console.log(this.optionViewData);
        this.dialogVisible2 = true;

      }, (response) => {
        alert("请求配置详情失败");
      });
    },
    goSearch:function(){
      console.log(this.find);
      if(this.find.findContent !== '' && this.find.findType !== ''){
        this.$http.get(BASE_URL+'list/job/search?searchType=' +this.find.findType + '&searchContext='+ this.find.findContent) 
        .then((response) => {
          console.log(response);
          var data = JSON.parse(response.body);
          this.Jresult=data.DATA;

        }, (response) => {
          alert("请求配置详情失败");
        });
      }else if(this.find.findContent !== '' && this.find.findType === ''){
        alert('请选择搜索类型！')
      }else{
        this.getJResult();
      }
      
    },
    getJResult:function(){
      this.$http.get(BASE_URL+'api/jobList') 
      .then((response) => {
        console.log(response);
        var data = JSON.parse(response.body);
        this.Jresult = data.DATA;

      }, (response) => {
        console.log('请求失败了');
        alert("请求任务列表失败");
      });
      console.log("result完成")
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
/*.el-select .el-input {
    width: 100px;
  }*/
.detail-J{
  width:100%;
  /*height:40px;*/
  padding: 5px;
  margin:5px;
  font-size: 18px;
  flood-color: black;
  background-color: #EBEEF5;
}

.find{
  float: right;
  display: flex;
  justify-content: space-around;
  width: 420px;
  height:50px;
}
.putCon{
  margin: 5px,0;
  width: 250px; 
}
.select{
  margin: 5px,0;
  
  width:100px;
}
.select0{
  
  border-radius: 5px;
  border-color:#E4E7ED;
  height:40px;
  width: 100px;
}
.search1{
  margin: 5px,0;
  width: 30px;
}
/*.searchall{
  margin: 5px,0;
  width: 50px;
}*/
.title0{
  float: left;
  font-size: 18px;
  font-weight: bold;
  color:#00c1de;
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