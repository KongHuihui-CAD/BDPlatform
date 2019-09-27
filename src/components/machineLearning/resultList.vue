 <template>
    <div class="container-main0">
    
      <div class="dashboard-v">
          <div class="container-report" style="width:80%;margin-left:100px;margin-top:25px;">
            <div class="main-title">
              <div class="title0" @click="getResult" style="cursor: pointer;margin-top:10px;">
                  <span class="title-tg"></span>结果列表
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
                 <el-table :data="Presult.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100% ;table-layout:fixed;" >
                      <el-table-column
                              prop="jobId"
                              label="任务ID">
                      </el-table-column>
                      <el-table-column
                              prop="filename"
                              label="文件名称">
                      </el-table-column>
                      <el-table-column
                          prop="path"
                          label="保存路径"
                      >
                      </el-table-column>
                      <el-table-column
                          prop="createdon"
                          label="创建时间"
                      >
                      </el-table-column>
                      <el-table-column label="操作" >
                          <template scope="scope">
                              <el-button
                                  type="primary"
              plain  @click='downloadF(scope.row)'>
                                  下载
                              </el-button>
                              
                          </template>
                      </el-table-column>
                  </el-table>
                   <div class="pagination" style="text-align: left;margin-top: 10px; float:right; margin-right: 10%">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-size="pagesize"
                      layout="total,prev,pager,next,jumper"
                      :total='Presult.length'
                      background>
                    </el-pagination>
                  </div>


          </div>
        
      </div>
    </div>
</template>
<script>
    var  BASE_URL ="http://10.108.211.136:15050/";
    export default {
       
      data() {
        return {
          pagesize:6,   //每页的条数限制
          currentPage:1,
          Presult:[],
          find:{
            findType:'',
            findContent:''
          }

        
        }
      },
      mounted() {
         this.getResult();
      },
      methods:{
        handleSizeChange(size){
          this.pagesize = size;
        },
        handleCurrentChange(currentPage){
          this.currentPage = currentPage;
          console.log(this.currentPage);
        },
        downloadF:function(row){
          console.log(row);
          var IDN = row.jobId;
          window.open(BASE_URL+'api/file/'+IDN+'/output/download', '_blank');
          // this.$http.get(BASE_URL+'api/file/' +IDN + '/output/download') 
          //   .then((response) => {
          //     console.log(response);
          //     var data = JSON.parse(response.body);
          //     this.Presult=data.DATA;

          //   }, (response) => {
          //     alert("请求配置详情失败");
          //   });
        },
        goSearch:function(){
            console.log(this.find);
            if(this.find.findContent !== '' && this.find.findType !== ''){
              this.$http.get(BASE_URL+'list/res/search?searchType=' +this.find.findType + '&searchContext='+ this.find.findContent) 
              .then((response) => {
                console.log(response);
                var data = JSON.parse(response.body);
                this.Presult=data.DATA;

              }, (response) => {
                alert("请求配置详情失败");
              });
            }else if(this.find.findContent !== '' && this.find.findType === ''){
              alert('请选择搜索类型！')
            }else{
              this.getResult();
            }
          },
          getResult:function(){
            this.$http.get(BASE_URL+'api/resList')
            .then((response) => {
              console.log(response);
              var data = JSON.parse(response.body);
              this.Presult = data.DATA;
              
            }, (response) => {
              console.log('请求失败了');
              alert("请求结果失败，11111");
            })
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