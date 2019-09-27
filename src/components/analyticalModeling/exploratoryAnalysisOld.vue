<template>
  <div class="analysis" v-show="showFlag">
    <div class="left-bar" ref="leftBar" :style="{height:clientHeight+'px'}">
      <div class="left-bar-content">
        <div class="table-list-wrapper">
          <div class="table-list-wrapper">
          <div class="olap-item item-title">主题</div>
          <ul>
          <!-- <li class="item table-list-item"><a>外勤工作表</a></li> -->
          <li class="olap-item" @click="changItem"><a>{{itemNameShow}}</a></li>
          </ul>
        </div>

          <div class="olap-item item-title">工作表</div>
          <ul>
          <!-- <li class="item table-list-item"><a>外勤工作表</a></li> -->
          <div v-for="tableName in tableNameList">
            <li class="olap-item table-list-item" @click="selectTable($event)" ><a>{{tableName}}</a></li>
            <div class="field-wrapper">
              <div class="olap-item item-title2">字段</div>
              <div class="dimension-wrapper">
              <div class="olap-item dimension-name">维度</div>
                <li class="olap-item dimension-item" draggable="true" @dragstart='drag1($event)' v-for="dimension in dimensionList"><a :data-column="dimension[0]" :data-eg="dimension[1]" :data-table="dimension[2]">{{dimension[0]}}</a></li>
              </div>
              <div class="measure-wrapper">
              <div class="olap-item measure-name">度量</div>
              <li class="olap-item measure-item" draggable="true" @dragstart='drag2($event)' v-for="measure in measureList"><a :data-column="measure[0]" :data-eg="measure[1]" :data-table="measure[2]" class="measure-name">{{measure[0]}}</a>
              </li>
              </div>
            </div>
          </div>
          </ul>
        </div>

      </div>
    </div>
    <div class="main-content" ref="mainContent" :style="{height:clientHeight+'px'}">
       <div class="drag-wrapper">
         <div class="drag-item border-1px" @drop='drop1($event)' @dragover='allowDrop($event)'><label class="drag-title-label">维度</label>
         </div>
         <!-- <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave2($event)'><label class="drag-title-label">对比</label></div> -->
         <div class="drag-item border-1px" id="measure-list" @drop='drop3($event)' @dragover='allowDrop($event)'><label class="drag-title-label">度量</label></div>
         <div class="drag-item border-1px" @drop='drop4($event)' @dragover='allowDrop($event)' ><label class="drag-title-label">次轴</label></div>
         <div class="drag-item border-1px" @drop='drop5($event)' @dragover='allowDrop($event)' ><label class="drag-title-label">筛选器</label></div>
         <div class="drag-item border-1px" @drop='drop6($event)' @dragover='allowDrop($event)' >
         <label class="drag-title-label">颜色</label>
         <!-- <colorPicker v-model="color" @change="headleChangeColor"></colorPicker> -->
         </div>
       </div>
       <div class="graph-wrapper">
         <div class="graph">
          <!-- <v-column @optionConfig="_initOption" :optionUpdate="optionUpdate"></v-column> -->
         </div>
        <!--  <div class="graph">
           <img src="../assets/close.png" style="{width: 900px;height: 400px;}">
         </div> -->
       </div>
    </div>
    <div class="right-bar" ref="rightBar" :style="{height:clientHeight+'px'}">
      <v-rightbar :baseUrl="baseUrl" :option="option" :type="type" :tableName="itemNameShow"  :searchmeasure="searchmeasure" :searchdimension="searchdimension" :searchmethods="searchmethods" @update-type="update" @update-option="updateOption"></v-rightbar>
    </div>
    <MyDialog :isShow="isShowFilter" @on-close="closeFilterDialog">
        <div class="dialog dialog-content">
          筛选器
          <div class="filter-content">
            筛选条件：
            <div class="filter-detail">
              <div>
                <select class="form-select" v-model="selected" @change="updateFilter">
                  <option value="0">区间</option>
                  <option value="=">等于</option>
                  <option value="!=">不等于</option>
                  <option value=">">大于</option>
                  <option value="<">小于</option>
                  <option value=">=">大于等于</option>
                  <option value="<=">小于等于</option>
                </select>
                <input type="" name="" class="select-input" v-show="commonSelect" v-model="filterCount">
                <div class="section-content" v-show="sectionSelect">
                  <input type="" name="" v-model="filterCount">
                  <span>~</span>
                  <input type="" name="" v-model="filterCount1">
                </div>
              </div>
            </div>
          </div>
          <div class="button-content">
            <span @click="filterSelect">确定</span><span>取消</span>
          </div>
        </div>
    </MyDialog>
    <MyDialog :isShow="isShow" @on-close="closeColorDialog">
        <div class="dialog dialog-content">
          <div class="color-select-content">
            <div class="color-left">
              <span>{{dragColorItem}}</span>
            </div>
            <div class="color-right">
              <colorPicker v-model="color" @change="headleChangeColor"></colorPicker>
            </div>
          </div>
        </div>
    </MyDialog>
    <MyDialog :isShow="tableShow" @on-close="closeTableDialog">
        <div class="dialog dialog-content">
        <div class="table-title">选择工作表</div>
          <ul>
            <li class="table-list" v-for="table in tableNameList">
              <label><input type="radio" name="radio" class="" value="">{{table}}</label>
            </li>
          </ul>
          <div class="common-btn conn-btn" @click="selectTable">切换工作表</div>
        </div>
    </MyDialog>
    <MyDialog :isShow="itemShow" @on-close="closeItemDialog">
        <div class="dialog dialog-content">
        <div class="table-title" style="height:40px;">
          <div class="table-title-l " :class="{'table-tb': isActive, 'table-tbb': !isActive }" @click="showCube()">选择主题立方体</div>
          <div class="table-title-r" :class="{'table-tb': !isActive, 'table-tbb': isActive }" @click="showTab()">选择主题单表</div>
        </div>
          <ul v-if="isActive">
            <li class="table-list" v-for="item in itemNameList">
              <input type="radio" name="radio" class="" value="" :data-value="item" @click="showSitem()">{{item}}
              <ul class="sitem">
                <li class="table-list" v-for="sitem in sitemNameList">
                  <label><input type="radio" name="sradio" class="" value="" :data-value="sitem">{{sitem}}</label>
                </li>
              </ul>
            </li>
          </ul>
          <ul v-if="!isActive">
            <li class="table-list" v-for="item in itemNameList">
              <input type="radio" name="tradio" class="" value="" :data-value="item" @click="showStab()">{{item}}
              <ul class="sitem">
                <li class="table-list" v-for="stab in stabNameList">
                  <label><input type="radio" name="tsradio" class="" value="" :data-value="stab">{{stab}}</label>
                </li>
              </ul>
            </li>
          </ul>
          <div class="common-btn conn-btn" @click="selectItem" v-if="isActive">切换主题</div>
          <div class="common-btn conn-btn" @click="selectTab " v-if="!isActive">切换表格</div>
        </div>
    </MyDialog>
  </div>
</template>

<script>
import $ from "jquery";
import echarts from "echarts";
import rightBar from "./graph-right";
import colorPicker from "./plugin/vue-color-picker/colorPicker";
import MyDialog from "./plugin/base/dialog.vue";

// var BASE_URL ="http://124.127.117.136:8082/lxy/";
// var BASE_URL ="http://10.108.211.136:3306/jishengwei";
// var  BASE_URL ="http://10.108.210.31:8088/";
var  BASE_URL ="http://127.0.0.1:8088/";

export default {
  data() {
    return {
      isActive: true,
      showFlag: true,
      baseUrl: BASE_URL,
      clientHeight: (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60),
      dimension: '',
      measure: '',
      dragContent: '',
      chartDate: {},
      // tableName: 'worker',
      tableName: '',
      cubeName: '',
      itemName: '',
      sitemName: '',
      itemNameShow: '',
      // tableName: 'GD_BABY_SITUATION',
      myChart: {},
      option: {
        series: []
      },//
      // optionUpdate: {},
      dimensionList: [],
      measureList: [],
      info: [],
      searchdimension: [],
      searchdimCh: [],
      searchdimTable: [],
      searchmeasure: [],
      searchmeasureCh: [],
      searchmeasureTable: [],
      searchmeasure2: [],
      searchmeasureCh: [],
      searchmeasureTable: [],
      searchmethods: [],
      searchadmethods: [],
      searchmethods2: [],
      searchadmethods2: [],
      searchcolor: [],
      colors:[],
      color: '#f00',
      isShow: false,
      isDisplay: false,
      isShowFilter: false,
      tableShow: false,
      itemShow: true,
      tableNameList: [],
      itemList: {},
      itemNameList: [],
      sitemNameList: [],
      stabNameList: [],
      dragColorItem:'',
      sectionSelect: true,
      commonSelect: false,
      selected: 0,
      filterName: '',
      filterTableName: '',
      filterCount: 0,
      filterCount1: 0,
      filterCondition: '',
      filterNameList: [],
      filterList: [],
      filterTable: [],
      type: 0 //0柱状图，1堆叠柱状图，2条形图，3条形堆叠图，4折现图，5饼图，6堆叠面积图，7雷达图，10笛卡尔积热力图（两个维度一个度量），13漏斗图（一个维度一个度量）
    }
  },
  // computed:{
  // },
  created() {
    this.$http.get(BASE_URL+'all/KylinTopics?topic=').then((response) => {
    // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
      var data = response.body;
      console.log('hello'+JSON.stringify(data));
      this.itemList = data;
      for(var key in data){
        this.itemNameList.push(key);
        //alert(key);//json对象的key
        //alert(jb[key]);//json对象的值
      }
    });
    // this.$http.get(BASE_URL+'all/KylinTables?topic=').then((response) => {
    // // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
    //   var data = response.body;
    //   console.log('world'+data);
    //   for(var i = 0;i < data.length;i++)
    //   this.tableNameList.push(data[i].table);
    // });
    this.$nextTick(() => {
    });
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector('.graph-wrapper .graph'));
    this.myChart.setOption(this.option);
    this.init();
  },
  methods: {
    initConfig(){
      this.itemName = "";
      this.itemNameShow = "";
      this.sitemName = "";
      this.info = [];
      this.dimensionList=[];
      this.measureList=[];
      this.tableNameList=[];
      this.searchdimension=[];
      this.searchdimCh = [];
      this.searchdimTable = [];
      this.searchmeasure=[];
      this.searchmeasureCh = [];
      this.searchmeasureTable = [];
      this.searchmeasure2=[];
      this.searchmeasure2Ch = [];
      this.searchmeasure2Table = [];
      this.searchmethods=[];
      this.searchmethods2=[];
      this.searchadmethods=[];
      this.searchadmethods2=[];
      this.filterNameList=[];
      this.filterList=[];
      this.filterTable=[];
      this.searchcolor=[];
      $('.drag-item label').nextAll().remove();
      this.option={series:[]};
      $('.graph-wrapper').empty();
      $('.graph-wrapper').html('<div class="graph"></div>');
      this.myChart = echarts.init(document.querySelector('.graph-wrapper .graph'));
      this.myChart.setOption(this.option);
    },

    init(){
      window.addEventListener('resize', function() {
            this.myChart.resize();
          }.bind(this))
          // this.$emit('optionConfig',this.option);
    },
    _deepCopy(obj) {
      let str, newobj;
      str = newobj = obj instanceof Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj) // 系列化对象
        newobj = JSON.parse(str) // 还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? _deepCopy(obj[i]) : obj[i];
        }
      }
      return newobj;
    },
    // _initOption(option){
    //   this.optionUpdate = option;
    // },
    update(utype) { //根据左边修改图表type
      this.type = utype;
    },
    show(flag) {
      this.showFlag = flag;
    },
    showCube() {
      if(!this.isActive) {
        this.isActive = true;
        this.sitemNameList = [];
        this.stabNameList = [];
        var radio = document.getElementsByName("radio");
        for (var i=0; i<radio.length; i++) {
          radio[i].checked=false;
        }
        var tradio = document.getElementsByName("tradio");
        for (var i=0; i<radio.length; i++) {

          tradio[i].checked=false;
        }
      }
    },
    showTab() {
      if(this.isActive) {
        this.isActive = false;
        this.sitemNameList = [];
        this.stabNameList = [];
                var radio = document.getElementsByName("radio");
                for (var i=0; i<radio.length; i++) {
                  //alert('radio');
          radio[i].checked=false;
        }
        var tradio = document.getElementsByName("tradio");
        for (var i=0; i<radio.length; i++) {

          tradio[i].checked=false;
        }
      }
    },
    changTable(){
      this.tableShow = true;
    },
    changItem(){
      this.itemShow = true;
    },
    getData(type,dimension,dimCh,dimTable,measure,measureCh,measureTable,methods,colors,measure2,measure2Ch,measure2Table,methods2,filterList,admethods,admethods2,filterTable,filterNameList,cubeName,tableFlag){ //获取拖拽后的数据，并生成图表
      console.log('------------------------------------');
      console.log(type+dimension+dimCh+dimTable+measure+measureCh+measureTable+methods+colors+measure2+measure2Ch+measure2Table+methods2+admethods+admethods2+filterNameList+filterList+filterTable+cubeName+tableFlag);
      console.log('------------------------------------');
      this.$http.get(BASE_URL+'chart/query?dimension='+dimension+'&dimCh='+dimCh+'&dimTable='+dimTable+'&type='+type+'&values='+measure+'&valueCh='+measureCh+'&valueTable='+measureTable+'&methods='+methods+'&colors='+colors+'&values2='+measure2+'&values2Ch='+measure2Ch+'&values2Table='+measure2Table+'&methods2='+methods2+'&havingValue='+filterNameList+'&having='+filterList+'&havingTable='+filterTable+'&ad_methods='+admethods+'&ad_methods2='+admethods2+'&cubeName='+cubeName+'&tableFlag='+tableFlag).then((response) => {
          var data = response.body;
          console.log(data);
          this.option = this._deepCopy(data);
          console.log(this.option);
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this.init();
        });
    },
    updateOption(newOption){
      this.option = newOption;
      console.log(this.option);
      this.myChart.setOption(this.option,true);//true表示和之前的option合并
      this.init();
    },
    updateFilter(){
      if(this.selected === "0") {
        this.sectionSelect = true;
        this.commonSelect = false;
      } else {
        this.sectionSelect = false;
        this.commonSelect = true;
      }
    },
    filterSelect(){
      this.filterCondition = '';
      if(this.selected === 0) {
        this.filterCondition += ('>' + this.filterCount);
        this.filterCondition += (','+ '<' + this.filterCount1);
      } else {
        this.filterCondition = (this.selected + this.filterCount);
      }
      this.filterNameList.push(this.filterName);
      this.filterList.push(this.filterCondition);
      this.filterTable.push(this.filterTableName);
      if(this.isActive) {
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,!this.isActive);
      }else{
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,this.isActive);
      }

      this.isShowFilter = false;
    },
    headleChangeColor (color) {
      let hasSet = false;
      //非首次改变颜色，只需把原来数组中对应元素的颜色进行改变，无需再push
      for(let i in this.colors){
          if(this.colors[i].indexOf(this.dragColorItem) >= 0){
            this.colors[i] = this.dragColorItem + ":" + color.substr(1,color.length);
            hasSet = true;
          }
      }
      //首次改变颜色
      if(!hasSet){//去掉#
        var t = this.dragColorItem + ":" + color.substr(1,color.length);
        this.colors.push(t);
      }

      // console.log(this.colors);
      if(this.isActive) {
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,false);
      }else{
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,true);
      }
    },
    closeColorDialog() {
      this.isShow = false;
    },
    closeFilterDialog() {
      this.isShowFilter = false;
    },
    closeTableDialog() {
      this.tableShow = false;
    },
    closeItemDialog() {
      this.itemShow = false;
    },
    selectTable(event){
          //event.target.parentNode.style.background = '#2F456E';
          $('.field-wrapper').css('display','none');
          console.log(event.target);
          this.tableName=event.target.innerText;
          console.log(this.tableName);

          this.measureList = [];
          this.dimensionList = [];
          var data = this.info;
          console.log('hhhhhhhh'+data);
      // console.log(response);
          if(data.length!=0){
            //alert('b');
            for(let i in data) {
              if(data[i].table == this.tableName){
                for(let j in data[i].dimCh) {

                  if(data[i].dimCh[j] != '人数') {
                    this.dimensionList.push([data[i].dimCh[j],data[i].dims[j],data[i].tableEg]);
                  }
                }

                for(let k in data[i].valuesCh) {
                  this.measureList.push([data[i].valuesCh[k],data[i].values[k],data[i].tableEg]);
                }
                this.cubeName = data[i].cubeName;


              }
            }
            //alert(this.dimensionList);
          }
          else {
            //alert("a");
            this.$http.get(BASE_URL+'all/columns?table_name='+this.tableName).then((response) => {

            var data = response.body;
            //alert(JSON.stringify(data));
            this.measureList = [];
            this.dimensionList = [];




            for(let i in data) {
              if(data[i].t_type == 1){
                //alert(data[i].t_name);
              this.measureList.push([data[i].t_name,data[i].t_name,this.tableName]);
              } else if(data[i].t_type == 2){
              this.dimensionList.push([data[i].t_name,data[i].t_name,this.tableName]);
              }
            }

          });
          }



          this.isDisplay = !this.isDisplay ;
          console.log(this.isDisplay);
          var dom = event.target.parentNode.nextElementSibling;

          console.log(dom);
          if(dom.style.display == "block"){
            //dom.style.display = "inline";
            $(dom).slideUp(1000);

          }else{
            //dom.style.display = "none";
             $(dom).slideDown(1000);
          }



    },
    selectItem(){
      this.initConfig();
      var radio = document.getElementsByName("radio");
      var sradio = document.getElementsByName("sradio");

      for(let i = 0; i < radio.length; i++){
        if(radio[i].checked){
          if(this.sitemNameList.length == 0){
            this.itemName=radio[i].getAttribute('data-value');
            this.$http.get(BASE_URL+'all/KylinTables?main='+this.itemName+'&sub=null').then((response) => {
          // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
              var data = response.body;

              this.info = data;
              this.tableNameList = [];

        // console.log(response);
              for(let i in data) {
                this.tableNameList.push(data[i].table);
              }
            });
            this.itemShow = false;
          }
          else {
            for(let j = 0; j < sradio.length;j++) {
              if(sradio[j].checked) {
                this.itemName=radio[i].getAttribute('data-value');
                this.sitemName = sradio[j].getAttribute('data-value');
                this.$http.get(BASE_URL+'all/KylinTables?main='+this.itemName+'&sub='+this.sitemName).then((response) => {
            // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
                  var data = response.body;

                  this.info = data;
                  this.tableNameList = [];

            // console.log(response);
                  for(let i in data) {
                    this.tableNameList.push(data[i].table);
                  }
                });
                this.itemShow = false;
              }
            }
          }

        }
      }
      this.itemNameShow = this.sitemName ? this.sitemName : this.itemName;
    },
    selectTab(){
      $('.field-wrapper').css('display','none');
      this.initConfig();
      var radio = document.getElementsByName("tradio");
      var sradio = document.getElementsByName("tsradio");

      for(let i = 0; i < radio.length; i++){
        if(radio[i].checked){
          if(this.stabNameList.length == 0){
            alert('该主题没有工作表');
          }
          else {
            for(let j = 0; j < sradio.length;j++) {
              if(sradio[j].checked) {
                this.itemName=radio[i].getAttribute('data-value');
                var tableName = sradio[j].getAttribute('data-value');
                //alert(tableName);
                  this.tableNameList = [];

                    this.tableNameList.push(tableName);
                    //alert(this.tableNameList);
                  }

                this.itemShow = false;
              }
            }
          }

        }

      this.itemNameShow = this.sitemName ? this.sitemName : this.itemName;
    },
    showSitem(){
      $('.sitem').css('display','none');
      var $this = $(event.target);
      $this.parent().find('ul').css('display','block');
      var item = event.target.getAttribute('data-value');

      var sitem = this.itemList[item];
      //alert(JSON.stringify(sitem));
      this.sitemNameList = [];
      for(var key in sitem) {
        if(key != "") {
          this.sitemNameList.push(key);
        }
      }
      // if(sitem == "") {
      //   this.sitemNameList = [];
      // }
      // else {
      //   this.sitemNameList = sitem;
      // }

    },
    showStab(){
      $('.sitem').css('display','none');
      var $this = $(event.target);
      $this.parent().find('ul').css('display','block');
      var item = event.target.getAttribute('data-value');

      var stab = this.itemList[item];
      //alert(JSON.stringify(stab));
      this.stabNameList = [];
      for(var key in stab) {

        if(stab[key][0] != "") {
          var stabList = stab[key][0].split(',');
          for(var i = 0;i <  stabList.length;i++) {
            //alert(stab[key][i]);
            this.stabNameList.push(  stabList[i]);
          }

        }
      }

    },
    drag1(event) {
       this.dimension = event.currentTarget;
       //通过复制被拖拽节点，使原来的位置上仍保存节点
       this.dragContent = this.dimension.cloneNode(true);
       this.dragContent.setAttribute('draggable','false');

    },
    drag2(event) {
       this.measure = event.currentTarget;
       //通过复制被拖拽节点，使原来的位置上仍保存节点
       this.dragContent = this.measure.cloneNode(true);
       // let dt = event.dataTransfer;
       // dt.setData("Text", event.target.id);
       // dt.effectAllowed = "copy";
       this.dragContent.setAttribute('draggable','false');
    },
    drop1(event) {
        //放维度
        event.preventDefault();
        if(this.dragContent){
          var i=this.dragContent.getElementsByTagName("span");
          if(i.length!=0){
            i[0].remove();
          }
        let closeButton = document.createElement("i");
        closeButton.className = "fa fa-times-circle";
        closeButton.setAttribute('aria-hidden','true');
        this.dragContent.getElementsByTagName("a")[0].appendChild(closeButton);
          event.target.appendChild(this.dragContent);
        }
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseover', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='inline';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseout', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='none';

        });
        let dimensionDragList = event.target.getElementsByTagName('a');

        var dimensionValues = [];
        var dimensionTable = [];
        var dimensionEg = [];
        for(let i in dimensionDragList){
          if(dimensionDragList[i].innerText != undefined){
             var chdata = dimensionDragList[i].getAttribute('data-column');
             console.log(chdata);
             dimensionValues.push(dimensionDragList[i].getAttribute('data-column'));
             dimensionTable.push(dimensionDragList[i].getAttribute('data-table'));
             dimensionEg.push(dimensionDragList[i].getAttribute('data-eg'));
          }
        }
        console.log(dimensionValues);
        this.searchdimCh = dimensionValues;
        this.searchdimension = dimensionEg;
        this.searchdimTable = dimensionTable;
        console.log('a'+this.searchdimCh);
        console.log('b'+this.searchdimension);
        console.log('c'+this.searchdimTable);
        if(this.isActive) {

          this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,!this.isActive);
        }else{

          this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,this.isActive);
        }
      var that = this;
        $('.fa').on('click',function(event){
           event.stopPropagation();
           let dom = event.target.parentNode.parentNode;
            if(dom.nodeName.toLowerCase() == 'li'){
                $(dom).remove();

                var dimch = dom.children[0].getAttribute('data-column');
                var dimension = dom.children[0].getAttribute('data-eg');
                var dimtable = dom.children[0].getAttribute('data-table');

                function removeByValue(arr,arr1,arr2,val,val1,val2) {
                  for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val && arr1[i] == val1 && arr2[i] == val2) {
                        arr.splice(i, 1);
                        arr1.splice(i,1);
                        arr2.splice(i,1);
                        break;
                    }
                  }
                }

                removeByValue(that.searchdimCh,that.searchdimension,that.searchdimTable,dimch,dimension,dimtable);
                if(that.isActive) {
                  //alert(that.isActive);
                that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,!that.isActive);
              }else{
                that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,that.isActive);
              } }
    })
    },
    drop2(event) {
        event.preventDefault();
    },
    drop3(event) {
        //放度量
        event.preventDefault();
       //如果度量横轴上没有元素,那么searchMethodsSelect置零
//      if($('#measure-list').children.length==1){
//        this.searchmethods=[];
//      }
        //申明方法DOM
        let computeDisplay = document.createElement("span");
        computeDisplay.innerText = '(求和)';
        let computeSelect = document.createElement("div");
        var searchMethodsSelect = this.searchmethods;
        var searchadMethodsSelect = this.searchadmethods;
        let closeButton = document.createElement("i");
        closeButton.className = "fa fa-times-circle";
        closeButton.setAttribute('aria-hidden','true');

        computeSelect.setAttribute('class','computed');
        computeSelect.innerHTML = '<ul index='+searchMethodsSelect.length+' class="measure-compute"><li><a data-method="count">求和</a></li><li><a data-method="avg">平均数</a></li><li><a data-method="sum">计数</a></li><li><a data-method="max">最大值</a></li><li><a data-method="min">最小值</a></li><li class="senior" style="position:relative"><a data-method="senior">高级计算</a><div class="scomputed"><ul><li><a data-method="rate">百分比</a></li><li><a data-method="krate">知晓率</a></li><li><a data-method="rate">检出率</a></li></ul><div></li></ul>';
          //将methods DOM加入拖拽DOM元素中

      if(this.dragContent.getElementsByTagName("span").length==0){
        searchMethodsSelect.push('count');
        searchadMethodsSelect.push('default');
        var chdata = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-column');
        var egdata = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-eg');
        var tabledata = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-table');
        this.searchmeasure.push(egdata);
        this.searchmeasureCh.push(chdata);
        this.searchmeasureTable.push(tabledata);
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeDisplay);
        this.dragContent.getElementsByTagName("a")[0].appendChild(closeButton);
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeSelect);

      }
        this.dragContent.getElementsByTagName("a")[0].addEventListener('click', function(){
              var lc = this.lastChild.lastChild;
              lc.style.display='block';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseover', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='inline';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseout', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='none';

        });
        if(this.dragContent){
          event.target.appendChild(this.dragContent);
        }
        var that = this;
        $('.measure-compute li').on('click',function(){
          if($(this).parent().parent().parent().attr('class')!='senior') {
            if($(this).attr('class')=='senior') {
            }
            else {
              var index = $(this).parent().attr("index");
              //更新显示文字
              let selectMethodText = $(this).find('a').text();
              $(this).parents('div').prev().prev().text('(' + selectMethodText + ')');
              //保存对应methods
              let selectMethod = $(this).find('a').attr('data-method');
              $(this).parent().hide();
              searchMethodsSelect[index] = selectMethod;
              searchadMethodsSelect[index] = 'default';
            }
          }
          else{
            var index = $(this).parent().parent().parent().parent().attr("index");
            //更新显示文字
            let selectMethodText = $(this).find('a').text();
            $(this).parents('div').prev().prev().text('(' + selectMethodText + ')');
            //保存对应methods
            let selectMethod = $(this).find('a').attr('data-method');
            $(this).parent().parent().parent().parent().css('display','none');
            searchadMethodsSelect[index] = selectMethod;
          }


          if(that.isActive) {
        that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,false);
      }else{
        that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,true);
      }return false;
        });



        this.searchmethods = searchMethodsSelect;
        this.searchadmethods = searchadMethodsSelect;
         console.log(this.searchmeasure);
        console.log(this.searchmethods);
        var that = this;
        $('.fa').on('click',function(event){
           event.stopPropagation();
           let dom = event.target.parentNode.parentNode;
            if(dom.nodeName.toLowerCase() == 'li'){
                $(dom).remove();

                var measure = dom.children[0].getAttribute('data-column');
                var measure2 = dom.children[0].getAttribute('data-eg');
                var measure3 = dom.children[0].getAttribute('data-table');
                function removeByValue(arr,arr2,arr3,arr4,arr5,val,val2,val3) {

                  for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val && arr2[i] == val2 && arr3[i] == val3) {
                        arr.splice(i, 1);
                        arr2.splice(i,1);
                        arr3.splice(i,1);
                        arr4.splice(i,1);
                        arr5.splice(i,1);
                        break;
                    }
                  }
                }

                removeByValue(that.searchmeasureCh,that.searchmeasure,that.searchmeasureTable,that.searchmethods,that.searchadmethods,measure,measure2,measure3);
                if(that.isActive) {
                  that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,false);
                }else{
                  that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,true);
                }
      }
    })
      if(this.isActive) {
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,false);
      }else{
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,true);
      }
    },
    drop4(event) {

 event.preventDefault();
       //如果度量横轴上没有元素,那么searchMethodsSelect置零
//      if($('#measure-list').children.length==1){
//        this.searchmethods=[];
//      }
        //申明方法DOM
        let computeDisplay = document.createElement("span");
        computeDisplay.innerText = '(求和)';
        let computeSelect = document.createElement("div");
        var searchMethodsSelect = this.searchmethods2;
        var searchadMethodsSelect = this.searchadmethods2;
        let closeButton = document.createElement("i");
        closeButton.className = "fa fa-times-circle";
        closeButton.setAttribute('aria-hidden','true');

        computeSelect.setAttribute('class','computed');
        computeSelect.innerHTML = '<ul index='+searchMethodsSelect.length+' class="measure-compute"><li><a data-method="count">求和</a></li><li><a data-method="avg">平均数</a></li><li><a data-method="sum">计数</a></li><li><a data-method="max">最大值</a></li><li><a data-method="min">最小值</a></li><li class="senior" style="position:relative"><a data-method="senior">高级计算</a><div class="scomputed"><ul><li><a data-method="rate">百分比</a></li><li><a data-method="krate">知晓率</a></li><li><a data-method="rate">检出率</a></li></ul><div></li></ul>';
          //将methods DOM加入拖拽DOM元素中

      if(this.dragContent.getElementsByTagName("span").length==0){
        searchMethodsSelect.push('count');
        searchadMethodsSelect.push('default');
        var chdata = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-column');
        var egdata = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-eg');
        var tabledata = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-table');
        this.searchmeasure2.push(egdata);
        this.searchmeasure2Ch.push(chdata);
        this.searchmeasure2Table.push(tabledata);
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeDisplay);
        this.dragContent.getElementsByTagName("a")[0].appendChild(closeButton);
        this.dragContent.getElementsByTagName("a")[0].appendChild(computeSelect);

      }
        this.dragContent.getElementsByTagName("a")[0].addEventListener('click', function(){
              var lc = this.lastChild.lastChild;
              lc.style.display='block';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseover', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='inline';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseout', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='none';

        });
        if(this.dragContent){
          event.target.appendChild(this.dragContent);
        }
        var that = this;
        $('.measure-compute li').on('click',function(){
          if($(this).parent().parent().parent().attr('class')!='senior') {
            if($(this).attr('class')=='senior') {
            }
            else {
              var index = $(this).parent().attr("index");
              //更新显示文字
              let selectMethodText = $(this).find('a').text();
              $(this).parents('div').eq(0).prev().prev().text('(' + selectMethodText + ')');
              //保存对应methods
              let selectMethod = $(this).find('a').attr('data-method');
              $(this).parent().hide();
              searchMethodsSelect[index] = selectMethod;
              searchadMethodsSelect[index] = 'default';
            }
          }
          else{
            var index = $(this).parent().parent().parent().parent().attr("index");
            //更新显示文字
            let selectMethodText = $(this).find('a').text();
            $(this).parents('div').eq(1).prev().prev().text('(' + selectMethodText + ')');
            //保存对应methods
            let selectMethod2 = $(this).find('a').attr('data-method');
            $(this).parent().parent().parent().parent().css('display','none');
            searchadMethodsSelect[index] = selectMethod2;
          }


          if(that.isActive) {
        that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,false);
      }else{
        that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,true);
      }return false;
        });



        this.searchmethods2 = searchMethodsSelect;
        this.searchadmethods2 = searchadMethodsSelect;
         console.log(this.searchmeasure2);
        console.log(this.searchmethods2);
        var that = this;
        $('.fa').on('click',function(event){
           event.stopPropagation();
           let dom = event.target.parentNode.parentNode;
            if(dom.nodeName.toLowerCase() == 'li'){
                $(dom).remove();

                var measure = dom.children[0].getAttribute('data-column');
                var measure2 = dom.children[0].getAttribute('data-eg');
                var measure3 = dom.children[0].getAttribute('data-table');
                function removeByValue(arr,arr2,arr3,arr4,arr5,val,val2,val3) {

                  for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val && arr2[i] == val2 && arr3[i] == val3) {
                        arr.splice(i, 1);
                        arr2.splice(i,1);
                        arr3.splice(i,1);
                        arr4.splice(i,1);
                        arr5.splice(i,1);
                        break;
                    }
                  }
                }

                removeByValue(that.searchmeasure2Ch,that.searchmeasure2,that.searchmeasure2Table,that.searchmethods2,that.searchadmethods2,measure,measure2,measure3);
                if(that.isActive) {
                  that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,false);
                }else{
                  that.getData(that.type, that.searchdimension,that.searchdimCh,that.searchdimTable, that.searchmeasure,that.searchmeasureCh,that.searchmeasureTable, that.searchmethods,that.colors, that.searchmeasure2, that.searchmeasure2Ch,that.searchmeasure2Table,that.searchmethods2, that.filterList,that.searchadmethods,that.searchadmethods2,that.filterTable,that.filterNameList,that.cubeName,true);
                }
      }
    })
      if(this.isActive) {
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,false);
      }else{
        this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.cubeName,true);
      }
    },
    drop5(event) {
      event.preventDefault();
      this.isShowFilter = true;
      this.filterCount = 0;
      this.filterCount1 = 0;
      if(this.dragContent) {
        let closeButton = document.createElement("i");
        closeButton.className = "fa fa-times-circle";
        closeButton.setAttribute('aria-hidden','true');
        this.dragContent.getElementsByTagName("a")[0].appendChild(closeButton);
        event.target.appendChild(this.dragContent);
      }
      this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseover', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='inline';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseout', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='none';

        });
        var that2 = this;
        $('.fa').on('click',function(event){
           event.stopPropagation();
           let dom = event.target.parentNode.parentNode;
            if(dom.nodeName.toLowerCase() == 'li'){
                $(dom).remove();
                var measure = dom.children[0].getAttribute('data-eg');
                function removeByValue(arr,arr2,arr3,val) {
                  for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val) {
                        arr.splice(i, 1);
                        arr2.splice(i,1);
                        arr3.splice(i,1);
                        break;
                    }
                  }
                }

                removeByValue(that2.filterNameList,that2.filterList,that2.filterTable,measure);
                if(that2.isActive) {
                  that2.getData(that2.type, that2.searchdimension,that2.searchdimCh,that2.searchdimTable, that2.searchmeasure,that2.searchmeasureCh,this.searchmeasureTable, that2.searchmethods,that2.colors, that2.searchmeasure2, that2.searchmeasure2Ch,that2.searchmeasure2Table,that2.searchmethods2, that2.filterList,that2.searchadmethods,that2.searchadmethods2,that2.filterTable,that2.filterNameList,that2.cubeName,false);
                }else{
                  that2.getData(that2.type, that2.searchdimension,that2.searchdimCh,that2.searchdimTable, that2.searchmeasure,that2.searchmeasureCh,that2.searchmeasureTable, that2.searchmethods,that2.colors, that2.searchmeasure2, that2.searchmeasure2Ch,that2.searchmeasure2Table,that2.searchmethods2, that2.filterList,that2.searchadmethods,that2.searchadmethods2,that2.filterTable,that2.filterNameList,that2.cubeName,true);
                }
            }
        })
      this.filterName = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-eg');
      this.filterTableName = this.dragContent.getElementsByTagName('a')[0].getAttribute('data-table');
    },
    drop6(event) {
        event.preventDefault();

        if(this.dragContent) {
          let closeButton = document.createElement("i");
          closeButton.className = "fa fa-times-circle";
          closeButton.setAttribute('aria-hidden','true');
          this.dragContent.getElementsByTagName("a")[0].appendChild(closeButton);
          event.target.appendChild(this.dragContent);
        }
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseover', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='inline';

        });
        this.dragContent.getElementsByTagName("a")[0].addEventListener('mouseout', function(){
              var cb = this.getElementsByTagName("i")[0];
              cb.style.display='none';

        });
        $('.fa').on('click',function(event){
           event.stopPropagation();
           let dom = event.target.parentNode.parentNode;
            if(dom.nodeName.toLowerCase() == 'li'){
                $(dom).remove();
            }
        })
        //this.searchcolor为解决多个元素设置颜色问题
        this.searchcolor.push(this.dragContent);
        //保存获取颜色的name值
        this.dragColorItem = $(this.dragContent).find('a').text();

        this.isShow = true;
        //利用对象是引用类型，使得在click函数中仍可访问isShow变量
        var self = this;
        $(this.searchcolor).on('click', function() {
          self.isShow = true;
          self.dragColorItem = $(this).find('a').text();
        });
    },
    allowDrop(event) {
        event.preventDefault();
       // let dt = event.dataTransfer;
       // dt.effectAllowed = "copy";
       // dt.dropEffect = "copy";
    },

    ischild(a,b) {
       for(; a ; a = a.parentNode) {
          if(a === b){
            return true;
          }
       }
       return false;
    }
  },
  watch: {
    type: {
      handler: function(){
        if(this.isActive) {
          this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.filterNameList,this.cubeName,false);
        }else{
          this.getData(this.type, this.searchdimension,this.searchdimCh,this.searchdimTable, this.searchmeasure,this.searchmeasureCh,this.searchmeasureTable, this.searchmethods,this.colors, this.searchmeasure2, this.searchmeasure2Ch,this.searchmeasure2Table,this.searchmethods2, this.filterList,this.searchadmethods,this.searchadmethods2,this.filterTable,this.filterNameList,this.filterNameList,this.cubeName,true);
        }
      },
      //深度观察
      deep: true
    }
  },
  components: {
    'v-rightbar': rightBar,
    'colorPicker': colorPicker,
    'MyDialog': MyDialog
    // 'v-column': column
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../static/css/mixin.styl';

.header {
  background-color: #eee;
  width: 100%;
  height: 800px;
}

.analysis {
  position: fixed;
  top: 85px;
  width: 73%;
  height: 100%;
  margin-bottom: 50px;

  // display: flex;
  .left-bar {
    // flex: 0 0 200px;
    width: 150px;
    height: 100%;
    float: left;
    // background-color: #F5F5F5;
    // color: #000;
    overflow-y: auto;

    // overflow-x: hidden;
    .olap-item {
      min-height: 40px;
      line-height: 40px;
      list-style: none;
      text-align: center;

      a {
        color: #7E8C8D;
      }

      a:hover {
        display: block;
        min-height: 40px;
        line-height: 40px;
        color: #fff;
        // background-color: rgba(255,255,255,0.3);
        background-color: #3b8dbc;
      }
    }

    .item-title {
      padding-left: 10px;
      text-align: left;
    }

    .table-list-item {
      display: block;
      min-height: 40px;
      line-height: 40px;
      // background-color: rgba(255,255,255,0.3);
      background-color: #3b8dbc;
      border-bottom: 1px solid #fff;

      a {
        color: #fff;
      }
    }

    .field-wrapper {
      display: none;
      .item-title2 {
        border-right: 1px solid #ddd;
        padding-left: 10px;
        text-align: left;
      }

      .dimension-wrapper {
        border-right: 1px solid #ddd;

        a:hover {
          display: block;
          min-height: 40px;
          line-height: 40px;
          color: #468fca;
          background-color: #bbe9ff;
        }
      }

      .measure-wrapper {
        border-right: 1px solid #ddd;

        a:hover {
          display: block;
          min-height: 40px;
          line-height: 40px;
          color: #468fca;
          background-color: #bbe9ff;
        }
      }
    }
  }

  .main-content {
    // flex: 1;
    position: absolute;
    top: 0px;
    left: 150px;
    right: 200px;
    // height: 100%;
    padding: 5px 15px;
    background-color: #fff;
    text-align: left;
    overflow: auto;

    // overflow-x: auto;
    .drag-wrapper {
      .drag-item {
        height: 40px;
        min-width: 530px;
        line-height: 40px;
        border-1px(#868686);

        .drag-title-label {
          padding-right: 10px;
          // color: #000;
        }

        .measure-item, .dimension-item {
          // background-color: #29A2E6;
          position: relative;
          background-color: #3b8dbc;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 3px;
          cursor: pointer;
          margin: 0 5px;
          padding: 0px 10px;

          a {
            color: #fff;
            font-weight: 700;

            .computed {
              position: absolute;
              border: 1px solid #eee;
              top: 30px;
              // display: none;
              Width: 100%;
              margin-left: -10px;
              background-color: #fff;
              z-index: 50;

              .measure-compute {
                display: none;

                .scomputed {
                  display: none;
                  position: absolute;
                  border: 1px solid #eee;
                  Width: 100px;
                  background-color: #fff;
                  z-index: 50;
                  top: 0px;
                  right: -100px;

                  a {
                    display: block;
                    width: 100%;
                    color: #314871;
                  }

                  a:hover {
                    background-color: #F5F5F5;
                  }
                }
              }

              a {
                display: block;
                width: 100%;
                color: #314871;
              }

              a:hover {
                background-color: #F5F5F5;
              }

              .senior:hover > .scomputed {
                display: block;
              }
            }

            .fa {
              margin-left: 5px;
              display: none;
            }
          }
        }
      }
    }

    .graph-wrapper {
      min-width: 530px;
      min-height: 450px;
      width: 100%;
      padding: 0px 30px;

      .graph {
        // min-width: 500px;
        // min-height: 400px;
        width: 100%;
        height: 400px;
        padding: 30px 55px 50px;
        margin-top: 30px;
        border: 1px solid #868686;
      }
    }
  }

  .right-bar {
    // flex: 0 0 200px;
    width: 200px;
    height: 100%;
    float: right;
    padding: 5px 5px 20px 5px;
    // background-color: #F5F5F5;
    // color: #000;
    overflow-y: auto;
    // overflow-x: hidden;
  }

  .dialog-content {
    position: relative;
    min-height: 300px;
    min-width: 400px;
    width: 30%;

    // color: #000;
    .color-select-content {
      margin: 25px 40px;

      .color-left {
        float: left;
        margin-right: 30px;
        padding-right: 30px;
        min-height: 300px;
        border-right: 5px solid #F5F5F5;
      }

      .color-right {
        margin-left: 10px;
      }
    }

    .filter-content {
      margin: 10px 40px;
      border: 5px solid #F5F5F5;
      padding: 10px;

      .filter-detail {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 180px;

        .form-select {
          border: 0px;
          border-bottom: solid 1px #868686;
          background-color: transparent;
          border-radius: 0px;
          min-width: 60px;
          text-align: center;
          appearance: none;
        }

        input {
          display: inline-block;
          border: 0px;
          border-bottom: 1px solid #868686;
          background-color: transparent;
          color: #000;
          text-align: center;
          margin: 5px;
        }

        .select-input {
          min-width: 180px;
        }

        .section-content {
          display: inline-block;

          input {
            display: inline-block;
            max-width: 80px;
          }
        }
      }
    }

    .button-content {
      text-align: right;
      color: #3b8dbc;

      span {
        display: inline-block;
        margin-right: 45px;
        cursor: pointer;
      }
    }

    .table-title {
      margin-bottom: 20px;

      .table-title-l {
        font-size: 20px;
        float: left;
        padding: 10px 20px 0px 20px;
        cursor: pointer;
      }

      .table-tb {
        border: 2px solid #2F4574;
        border-bottom: none;
      }

      .table-title-r {
        font-size: 20px;
        float: left;
        padding: 10px 20px 0px 20px;
        cursor: pointer;
      }

      .table-tbb {
        border-bottom: 2px solid #2F4574;
      }
    }

    ul {
      padding: 10px;

      .table-list {
        cursor: pointer;
        padding: 5px 0;
      }
    }

    .common-btn {
      position: absolute;
      bottom: 15px;
      right: 20px;
      padding: 5px 15px;
      cursor: pointer;
      background-color: #2F4574;
      color: #fff;
    }
  }
}
</style>
