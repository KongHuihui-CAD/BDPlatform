<template>
    <div class="main-import">
          <div class="main-title"><span class="title-tg"></span>数据源</div>
          <div class="import-area clearfix">
            <ul id="myTab" class="nav nav-tabs import-choose" role='tablist'>
                <li class="active">
                  <a href="#from-in" data-toggle="tab" id='in' @click='clickIn()'>已导入数据</a>
                </li>
                <li>
                 <a href="#from-out" data-toggle="tab" id='create' @click='clickCreate()'>新建导入</a>
                </li>
                <!-- <li>
                 <a href="#manage-table" data-toggle="tab" id='manage' @click='clickManageTable()'>实时表管理</a>
                </li> -->
            </ul>
          <div class='tab-content'>
                <div class="tab-pane fade in active from-in " id="from-in">      
                    <table class='table table-bordered table-striped table-hover'>
                        <thead>
                            <tr><th class='text-center'>数据标识</th>
                                <th class='text-center'>数据标题</th>
                                <th class='text-center'>数据类型</th>
                                <th class='text-center'>数据操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = " (item,index) in data " :key=index>
                                <td class='text-center'>{{item.id}}</td>
                                <td >{{item.title}}</td>
                                <td class='text-center'>{{item.relationtype}}</td>
                                <td class='text-center'><span class='td-cho' ><router-link :to="({path:'/dataApplication/datashow',query:{data:item}})">选择</router-link></span>|
                                    <span class='td-del' @click='del(item.id)'>删除</span>
                                </td>
                            </tr>
                            <tr v-show='data.length==0'>
                              <td colspan='4' class='text-center text-muted'>
                                <p>暂无数据...</p>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
          </div>
          <div class="tab-pane fade from-out " id="from-out" v-show="show" >
              <form role="form"  enctype='multipart/form-data'>
                <div class="form-group ">
                    <label for="name">数据格式</label>
                      <!-- <select v-model='selected' @change="getFormatSelected" class="form-control source-fromout"  id='test'> -->
                         <!-- <option value='api'>接口API</option> -->
                         <!-- <option value='excelLocal'>本地EXCEL/CSV文件</option> -->
                         <!-- <option value='excelSQL'>数据库EXCEL文件</option>
                         <option value='csvSQL'>数据库CSV文件</option> -->
                      <!-- </select> -->
                      <input class="fileload" type="file" name="myfiles" id="fileload" multiple > 
                      <div class="form-group">
                          <label for="name">标题请准确填写，将显示在大屏中</label>
                          <input type="text" id='datatitle' v-model='nameE' class=" title form-control" placeholder="输入名称">
                      </div>
                 </div> 
                 <div class="btn btn-default import-next" @click='nextShow1()'>提交</div>
              </form>
                 <!--
                 <div class="form-out-div">
                      <div class="form-group apiAddr">
                          <label for="name">API地址</label>
                          <input type="text" class=" path form-control" placeholder="http://localhost:8080/VisibleServer/hbase/hbaseMapLocation">
                          <div class='form-group refresh' >
                            <input type='checkbox' data-check=false @click='refresh'>定时刷新
                          </div>
                      </div>
                      <div class="form-group fileloading" style='display:none'>
                          <label for="name">文件上传</label>
                          <input class="fileload" type="file" name="myfiles" id="fileload" multiple > 
                          <div class="form-group">
                              <label for="name">标题请准确填写，将显示在大屏中</label>
                              <input type="text" id='datatitle' class=" title form-control" placeholder="输入名称">
                          </div>
                      </div> 
                      <div class="form-group excelL" style='display:none;'>
                          <label for="name">选择文件</label>
                          <el-select v-model="fileChose" placeholder="请选择" >
                            <el-option
                              v-for="item in excelList"
                              :key = item
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select> 
                          <div class="form-group">
                              <label for="name">标题请准确填写，将显示在大屏中</label>
                              <input type="text" id='datatitle' v-model='nameE' class=" title form-control" placeholder="输入名称">
                          </div>
                      </div>  
                      <div class="form-group csvL" style='display:none'>
                          <label for="name">选择文件</label>
                          <el-select v-model="fileChose1" placeholder="请选择">
                            <el-option
                              v-for="item in csvList"
                              :key=item
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select> 
                          <div class="form-group">
                              <label for="name">标题请准确填写，将显示在大屏中</label>
                              <input type="text" id='datatitle' v-model='nameE' class=" title form-control" placeholder="输入名称">
                          </div>
                      </div>        
                 </div> 
                 <div class="btn btn-default import-next" @click='nextShow()'>下一步</div>
              </form>  -->
              <!-- <label for="name">选择数据库表名</label>
                <el-select v-model="fileChose1" placeholder="请选择" @click="getFormatSelected()">
                  <el-option
                    v-for="item in csvList"
                    :key=item
                    :label="item"
                    :value="item"
                    >
                  </el-option>
                </el-select> 
              <div class="btn btn-default import-next" @click='nextShow()'>下一步</div> -->
          </div>
          <!-- <div class="tab-pane fade manage-table " id="manage-table" v-show="show" >
            <el-form  label-width="130px" :model="formLabelAlign" style="font-size:40px">
              <el-form-item label="选择数据表">
                <el-select v-model="value" placeholder="请选择" @click='getTables()'>
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                </el-select> 
                <el-button type="primary" icon="el-icon-refresh el-icon--left" circle @click="getTables()">刷新</el-button>
              </el-form-item>
              <el-form-item label="实时属性" margin-top="50px">
                <el-radio v-model="radio1" label="1" size="medium">实时</el-radio>
                <el-radio v-model="radio1" label="2" size="medium">非实时</el-radio>
              </el-form-item>
            </el-form>
            <div class="btn btn-default import-next" @click='nextShow2()'>下一步</div>
          </div> -->
      </div> 
    </div>
        
</template>

<script>
var baseUrl2 = 'http://182.92.222.75:8008/VPlatform';
var baseUrl1 = "http://182.92.222.75:5005/";
export default {
  data() {
    return{
      data:[],
      selected: 'csvSQL',
      selectopt: '1',
      show:false,
      excelList:[],
      csvList:[],
      fileChose: "",  //在nextShow函数中的参数
      fileChose_tab3:'', //在nextShow2()中的参数，与fileChose对应
      fileChose1:'',  //tab2“新建导入”的选择数据表绑定
      fileChose2:'',  //tab3“实时表管理”的选择数据表绑定
      nameE:'',
      formLabelAlign:{}, //选择的表名，实时/非实时，都是表格的内容
      radio1: '1', //查看：实时与非实时单选框
      options: [
            {
            value: '1',
            label: '语句1'
            }, {
            value: '2',
            label: '语句2'
            }
        ],
      value:'',
    }
  },
  mounted:function() {
       this.loadData();
      //  this.getTables();
    },
  methods:{
      onSubmit() {
        console.log('submit!');
        this.addTableVisible=false;
        this.$message({
            type: 'success',
            message: '添加成功!'
          });
      },
      loadData() {
        this.$http.get( "largeScreen/user/getallcache?userid="+"1").then((response)=>{
        var data = response.body.DATA;
        this.data = data;
        this.data.sort((a,b) => {
          return a.id - b.id;
        });
        console.log(this.data);
        console.log(JSON.stringify(this.data[0]));
       });
        // var mockdata = [{"describe":"undefined","id":1223,"objects":["男","女"],"property":[["压力","人数"]],"relations":{"女":[["缺失","28448"],["无压力","1496607"],["很少","549652"],["有一点","509437"],["比较大","54522"],["很大","6854"]],"男":[["缺失","28183"],["无压力","1374687"],["很少","542245"],["有一点","528519"],["比较大","77915"],["很大","12635"]]},"relationtype":2,"title":"压力","userid":107},{"describe":"undefined","id":1224,"objects":["2010","2011"],"property":[["县市","人数"]],"relations":{"2010":[["潮州市","1"],["潮安县","2"],["饶平县","3"],["海珠区","4"],["河源市","5"],["东源县","6"],["和平县","7"],["源城区","8"],["紫金县","9"],["连平县","10"],["龙川县","11"],["澄海区","12"],["佛山市","13"],["三水区","14"],["南海区","15"],["禅城区","16"],["顺德区","17"],["高明区","18"],["潮南区","19"],["茂名市","20"],["信宜市","21"],["化州市","22"],["电白县","23"],["茂南区","24"],["高州市","25"],["阳江市","26"],["江城区","27"],["阳东县","28"],["阳春市","29"],["阳西县","30"],["云浮市","31"],["云城区","32"],["云安县","33"],["新兴县","34"],["罗定市","35"],["郁南县","36"],["惠州市","37"],["博罗县","38"],["惠东县","39"],["惠城区","40"],["惠阳区","41"],["龙门县","42"],["梅州市","43"],["丰顺县","44"],["五华县","45"],["兴宁市","46"],["大埔县","47"],["平远县","48"],["梅县","49"],["梅江区","50"],["蕉岭县","51"],["湛江市","52"],["吴川市","53"],["坡头区 ","54"],["廉江市","55"],["徐闻县","56"],["赤坎区","57"],["遂溪县","58"],["雷州市","59"],["清远市","60"],["佛冈县","61"],["清城区","62"],["清新县","63"],["英德市","64"],["连州市","65"],["阳山县","66"],["中山市","67"],["仁化县","68"],["揭阳市","69"],["惠来县","70"],["揭东县","71"],["揭西县","72"],["普宁市","73"],["榕城区","74"],["珠海市","75"],["斗门区","76"],["汕头市","77"],["潮阳区","78"],["金平区","79"],["龙湖区","80"],["东莞市","81"],["乐昌市","82"],["广州市","83"],["南沙区","84"],["天河区","85"],["从化市","86"],["增城市","87"],["天河区","88"],["广州市","89"],["番禺区","90"],["白云区","91"],["花都区","92"],["荔湾区","93"],["萝岗区","94"],["越秀区","95"],["黄埔区","96"],["花都区","97"],["肇庆市","98"],["四会市","99"],["封开县","100"],["广宁县","101"],["德庆县","102"],["怀集县","103"],["端州区","104"],["高要市","105"],["鼎湖区","106"],["汕尾市","107"],["海丰县","108"],["陆丰市","109"],["陆河县","110"],["江门市","111"],["台山市","112"],["江门市","113"],["开平市","114"],["恩平市","115"],["新会区","116"],["蓬江区","117"],["深圳市","118"],["南山区","119"],["宝安区","120"],["盐田区","121"],["福田区","122"],["罗湖区","123"],["龙岗区","124"],["韶关市","125"],["乐昌市","126"],["乳源瑶族自治县","127"],["南雄市","128"],["始兴县","129"],["韶关市","130"],["新丰县","131"],["曲江区","132"],["武江区","133"],["浈江区","134"],["翁源县","135"]],"2011":[["乐昌市","136"],["乳源瑶族自治县","137"],["南雄市","138"],["始兴县","139"],["韶关市","140"],["新丰县","141"],["曲江区","142"],["武江区","143"],["浈江区","144"],["翁源县","145"],["乐昌市","146"],["乳源瑶族自治县","147"],["南雄市","148"],["始兴县","149"]]},"relationtype":2,"title":"地图","userid":107},{"describe":"undefined","id":1228,"objects":["假肥大型肌营养不良","脊肌萎缩症"],"property":[["省份","家庭数量（单位：个）"]],"relations":{"假肥大型肌营养不良":[["四川","49"],["河南","34"],["湖北","13"]],"脊肌萎缩症":[["四川","5"],["河南","1"],["湖北","4"]]},"relationtype":2,"title":"3yue","userid":107},{"describe":"undefined","id":1229,"objects":["海淀区","1区","朝阳区","2区"],"property":[["省份","家庭数量（单位：个）"]],"relations":{"1区":[["河南","34"],["湖北","13"]],"2区":[["河南","1"],["湖北","4"]],"朝阳区":[["四川","5"]],"海淀区":[["四川","49"]]},"relationtype":2,"title":"2","userid":107}];
        // this.data = JSON.parse(JSON.stringify(mockdata));
        // console.log(123);
        // this.getTables();
      },
      clickIn() {
        $("#from-in").css("display", "block");
        $("#from-out").css("display", "none");
        $("#manage-table").css("display","none");
        $('#in').addClass('active2');
        $('#create').addClass('active3');
        $('#manage').addClass('active3');
      },
      clickManageTable() {
        $("#from-in").css("display", "none");
        $("#from-out").css("display", "none");
        $("#manage-table").css("display","block");
        $('#in').addClass('active3');
        $('#create').addClass('active3');
        $('#manage').addClass('active2');
        this.getTables();
      },
      getTables(){
        this.options=[];
        console.log(this.radio1);
        this.$http.get("largeScreen/ssm/screenInfoMetaController/queryAllScreenNames",
        {
          //无参数
        },
        {
          emulateJSON:true
        }).then((response)=>{
          console.log(response);
          if(response.body.result == false){
            alert('数据表获取失败！');
          }
          else{
            // this.$message({
            //   showClose: true,
            //   message: '数据表获取成功',
            //   type: 'success'
            // });
            this.options=[];
            var tableNames = response.body.datum;
            console.log(tableNames);
            for (var i=0;i<tableNames.length;i++){
                var SQLs={};
                SQLs.value=i+"";
                SQLs.label=tableNames[i];
                this.options.push(SQLs);
          }
      }
      }
      )
      },
      clickCreate() {
        $("#from-in").css("display", "none");
        $("#from-out").css("display", "block");
        $("#manage-table").css("display","none");
        $('#in').addClass('active3');
        $('#create').addClass('active2');
        $('#manage').addClass('active');
        this.show=true;
        // this.$http.get(baseUrl1+'expVisual/cleanedcsv_list')
        //       .then((response) => {
        //         console.log(response);
        //         this.csvList = response.body.data;
        //         var len = this.csvList.length
        //         for(var i = 0; i < len; i++){
        //           this.csvList[i] = this.csvList[i].slice(0, this.csvList[i].length - 4);
        //         }
        //         console.log(this.csvList);
        //         $('div .fileloading').css('display','none');
        //         $('div .apiAddr').css('display','none');
        //         $('div .excelL').css('display','none');
        //         $('div .csvL').css('display','block');
        //       }, (response) => {
        //         console.log('请求失败了');
        //         alert("请求list失败，请刷新重试哦");
        //   });
      },
      clickManage() {
      },
      del(id) {
        this.$http.get( "largeScreen/user/deleteUserCache?cacheid="+id+"&userid="+"1").then((response)=>{
          this.promp('删除成功');
          this.loadData();
      })
    },
      getFormatSelected(){                   
        //alert('111');
        if(this.selected === 'excelLocal' || this.selected === 'txt') {
          $('div .fileloading').css('display','block');
          $('div .apiAddr').css('display','none');
          $('div .excelL').css('display','none');
          $('div .csvL').css('display','none');
        }else if(this.selected === 'api') {
          $('div .apiAddr').css('display','block');
          $('div .fileloading').css('display','none');
          $('div .excelL').css('display','none');
          $('div .csvL').css('display','none');
        }else  if(this.selected === 'excelSQL') {
          this.$http.get(baseUrl1+'expVisual/cleanedexcel_list')
              .then((response) => {
                console.log(response);
                this.excelList = response.body.data;
                console.log(this.excelList);
                $('div .fileloading').css('display','none');
                $('div .apiAddr').css('display','none');
                $('div .excelL').css('display','block');
                $('div .csvL').css('display','none');
              }, (response) => {
                console.log('请求失败了');
                alert("请求list失败，请刷新重试哦");
          });
          
        }else  if(this.selected === 'csvSQL') {
          this.$http.get(baseUrl1+'expVisual/cleanedcsv_list')
              .then((response) => {
                console.log(response);
                this.csvList = response.body.data;
                var len = this.csvList.length;
                for(var i = 0; i < len; i++){
                    this.csvList[i] = this.csvList[i].slice(0, this.csvList[i].length - 4);
                }
                console.log(this.csvList);
                $('div .fileloading').css('display','none');
                $('div .apiAddr').css('display','none');
                $('div .excelL').css('display','none');
                $('div .csvL').css('display','block');
              }, (response) => {
                console.log('请求失败了');
                alert("请求list失败，请刷新重试哦");
          });
        }
    },
     tableSelected(){
        // alert('111');
        if(this.selected === 'excelLocal' || this.selected === 'txt') {
          $('div .fileloading').css('display','block');
          $('div .apiAddr').css('display','none');
          $('div .excelL').css('display','none');
          $('div .csvL').css('display','none');
        }else if(this.selected === 'api') {
          $('div .apiAddr').css('display','block');
          $('div .fileloading').css('display','none');
          $('div .excelL').css('display','none');
          $('div .csvL').css('display','none');
        }else  if(this.selected === 'excelSQL') {
          this.$http.get(baseUrl1+'expVisual/cleanedexcel_list')
              .then((response) => {
                console.log(response);
                this.excelList = response.body.data;
                console.log(this.excelList);
                $('div .fileloading').css('display','none');
                $('div .apiAddr').css('display','none');
                $('div .excelL').css('display','block');
                $('div .csvL').css('display','none');
              }, (response) => {
                console.log('请求失败了');
                alert("请求list失败，请刷新重试哦");
          });
          
        }else  if(this.selected === 'csvSQL') {
          this.$http.get(baseUrl1+'expVisual/cleanedcsv_list')
              .then((response) => {
                console.log(response);
                this.csvList = response.body.data;
                var len = this.csvList.length;
                for(var i = 0; i < len; i++){
                    this.csvList[i] = this.csvList[i].slice(0, this.csvList[i].length - 4);
                }
                console.log(this.csvList);
                $('div .fileloading').css('display','none');
                $('div .apiAddr').css('display','none');
                $('div .excelL').css('display','none');
                $('div .csvL').css('display','block');
              }, (response) => {
                console.log('请求失败了');
                alert("请求list失败，请刷新重试哦");
          });
        }
    },
    nextShow2(){
      //http://localhost:8080/ssm/StaticIndexManageController/
      //queryRealTimeStaticNamesAndValuesByScreenName?screenName=444
        var obj={};
        obj.tableName=this.options[this.value].label;
        obj.label=this.radio1;
        console.log(obj);
        this.$http.get('largeScreen/ssm/StaticIndexManageController/queryRealTimeStaticNamesAndValuesByScreenName?screenName=' + obj.tableName)
        .then((response) => {
          console.log(response);
          var data = response.body
          console.log(data)
          if(data.result === true){
            obj.data = data.datum;
            console.log('obj: ' + obj.label);
            this.$router.push({path:'/biggraph/datashow',query:{data:obj}});
            this.value="";
          } else {
            return false;
          }
        })
    },
    nextShow1() {
        // var sel = $('#test option:selected').val(); //注释掉下拉列表框
        // var sel = 'csvSQL';
        var sel = 'excelLocal'
        console.log(sel);
        if(sel === 'api') {
            var api = $('.path').val();
            var refresh = $('.refresh').find('input:checkbox').attr('data-check');
            refresh = refresh === 'false' ? false : true ;
            var session = window.sessionStorage;
            session.setItem('api',api);
            session.setItem('fresh', refresh);
            this.sendAPI(api,this.tomaintable);
          }else if(sel === 'excelLocal'){

            var oj = {};
            oj.type = sel;
            oj.title = $('.title').val();
            oj.describe = $('.desc-area').val();
            oj.fileAddr = $('.fileload').val();
            oj.filename = $('.fileload').attr('name');
            oj.fileID = $('.fileload').attr('id');
            oj.relationtype = $('.relationtype').find('option:selected').val();
            oj.userid = sessionStorage.getItem("userId");
            if(oj.fileAddr == "" || oj.fileAddr == null){
              this.promp("请选择文件");
            }else{this.sendFILE(oj,this.tomaintable);}
        }else if(sel === 'excelSQL'){
          
          var titleT = $('.title').val();
          console.log(titleT);
          var desc0 =$('.title').val();
          console.log(typeof this.fileChose);
           console.log(desc0);
           var Name0 = String(this.fileChose )
          
           this.$http.get('largeScreen/visual/analysis_file?userid='+ sessionStorage.getItem("userId") + '&title=' + this.nameE + '&desc=' + desc0+'&tabname=' + Name0 )
              .then((response) => {
                console.log(response);
                var data = response.body.DATA;
                console.log(data);
                this.nameE = '';
                this.fileChose = '';
                this.$router.push({path:'/biggraph/datashow',query:{data:data}});
              }, (response) => {
                console.log('请求失败了');
                alert("请求list失败，请刷新重试哦");
          });

        }else if(sel === 'csvSQL'){
          var titleT = $('.title').val();
          console.log(titleT);
          var desc0 =$('.title').val();
          console.log(typeof this.fileChose1);
           console.log(desc0);
           var Name0 = String(this.fileChose1 + '.csv' )
          
           this.$http.get('largeScreen/visual/analysis_file?userid='+ sessionStorage.getItem("userId") + '&title=' + this.nameE + '&desc=' + desc0+'&tabname=' + Name0 )
              .then((response) => {
                console.log(response);
                var data = response.body.DATA;
                console.log(data);
                this.nameE = '';
                this.fileChose1 = '';
                this.$router.push({path:'/biggraph/datashow',query:{data:data}});
              }, (response) => {
                console.log('请求失败了');
                alert("请求list失败，请刷新重试哦");
          });

        }
      },
    sendAPI(api,fn){
        $.ajax({
          type:'get',
          url: api,
          async: true,
          data: '',
          dataType:"text",
          jsonp: 'callback',
          crossDomain:true,
          success:function (data) {
              // console.log(data);
       },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest.status);
              console.log(XMLHttpRequest);
         }
     })
  },
  sendFILE(obj,fn) {
      var _self = this;
      // console.log(obj);
      var url = 'largeScreen/visual/upload_file';
      console.log($('#fileload'));
      console.log($('#fileload')[0]);
      console.log($('#fileload')[0].files[0]);
      this.promp(' 正在导入...');
      var formData = new FormData();
      formData.append('myfiles',$('#fileload')[0].files[0]);
      formData.append('userid',1); // obj.userid
      formData.append('title',obj.title);
      formData.append('desc','test');
      // formData.append('relationtype',parseInt(obj.relationtype, 10));
      // console.log(formData);
      // console.log(formData.get('file'));
      $.ajax({
        url:url,
        type:'POST',
        data:formData,
        cache:false,
        processData:false,
        contentType:false
        })
        .done(function(data){
          _self.loadData();
          // console.log(data);
          _self.promp(' 导入成功');
          // var regx=/(\{.*})/;
          // var data = data.match(regx)[0];
          // data = JSON.parse(data); 
          _self.$message({
            type: "success",
            message: "数据导入成功"
          })
          // console.log(data);
          // fn(data.DATA);
      })
        .fail(function(res){console.log(res);});
        },
      promp(value){
          var pop = '<div class="popup">\
                    <span class="popup-info">'+ value + '</span>\
                    <div class="popup-close"></div>\
                    </div>';
          $('body').append(pop);
          $('body').on('click', '.popup-close', function() {
                $('.popup').remove();
              });
            setTimeout(function(){
                $('.popup').remove();
              }, 2000);
          },
      refresh(){
          if($('.refresh').attr('data-check') === 'false'){
            $('.refresh').attr('data-check','true');
          }else{
            $('.refresh').attr('data-check','false');
          }
      },
      tomaintable(data){
        // this.selected = 'api';
        this.selected = 'csvSQL';
        this.getFormatSelected();
        var obj = document.getElementById('fileload');
        obj.outerHTML = obj.outerHTML;
        this.selectopt = '1';
        $('#datatitle').val('');
        $('#desc').val('');
          this.$router.push({path:'/biggraph/datashow',query:{data:data}});
      },
      tableDelete(){   //删除按钮的弹窗
        this.$confirm('此操作将删除该实时表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

  }
}
</script>

<style scoped>
* {
  font-family: "microsoft yahei";
}
body,
span,
div {
  font-family: "microsoft yahei";
  font-size: 16px;
  margin: 0;
  padding: 0;
  background-color:#fff;
}
.import-area {
  width: 850px;
  margin: 0 auto;
}
.td-cho,
.td-del {
  cursor: pointer;
}
span.td-del:hover {
  color:blue;
}
.import-choose {
    display:block;
}
.import-area {
  margin:2% auto;
}
.tab-content {
  margin:2% auto;
  
  width:90%;
  background-color: #fff;
}
#from-out{
  margin-left:40px;
}
.form-group{
  margin:4% auto;
}
.form-group select{
  margin:5px 0;
  width:80%;
}
.form-out-div .form-control{
  margin:5px 0;
  width:560px;
}
.active2{
  background-color:#fff;
  color:#555;
}
.active3{
  background-color:#f1f1f1;
  color:#555;
}
li a{
  display:block;
  background-color:#f1f1f1;
  color:#555;
}
li a:hover{
  background-color:#e6e3e3;
  color:white;
}
.main-import .main-title {
    color: #1f2425;
    width: 100%;
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    background-color: #fff;
    border-bottom: 2px solid #ddd;
    font-size: 20px;
    font-weight: bold;
  }
.main-import .main-title .title-tg {
    display: inline-block;
    float: left;
    margin: 17px;
    width: 16px;
    height: 16px;
   /* background: url('../images/main-title.png') no-repeat;*/
  }
  .popup {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 150px;
  border-radius: 20px;
  text-align: center;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.8);
  line-height: 50px;
  margin-top: -75px;
  margin-left: -150px;
  z-index: 1111;
}
.popup .popup-info {
  color: #cedadf;
  display: block;
  margin-top: 50px;
}
.popup .popup-close {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 16px;
  height: 16px;
  /*background: url('./close.png') no-repeat;*/
  background-size: contain;
}
.import-next {
  float:right;
  font-size:14px;
  padding:6px 12px;
  text-align:center;
}
</style>
