<template>
    <div>
        <div class="prehd">
            <a>
                <i class="iconfont icon-fanhui" @click="back()"></i>
            </a>
            <span class='pretitle'>统计处理</span>
        </div>
        <div class="predashboard" style="background:#fff;">

            <div class='content_da'>
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

                    <el-tab-pane label="探索分类变量" name="first">
                        <div class="container">
                            <div class="lf">
                                <div data-force="30" class="layer block" style="width:100%;height:40vh">
                                    <div class="layer title">多元分类</div>
                                    <draggable v-model="list3" class="block__list block__list_words" :options="{group:'people2'}" style="height:37vh;overflow:scroll">
                                        <div v-for="element in list3">{{element.name}}</div>
                                    </draggable>
                                </div>
                                <div data-force="30" class="layer block" style="margin-top:40px;">
                                    <div class="layer title">二元分类</div>
                                    <draggable v-model="list4" class="block__list block__list_words" :options="{group:'people'}" style="height:30vh;overflow:scroll">
                                        <div v-for="element in list4">{{element.name}}</div>
                                    </draggable>
                                </div>
                            </div>

                            <div data-force="18" class="layer block" style="position: absolute; left: 30%; top: 20px; width: 30%;height:80px">
                                <div class="layer title">多元分类</div>
                                <draggable v-model="list5" class="block__list2 block__list_tags" :options="{group:'people2'}">
                                    <div v-for="element in list5">{{element.name}}</div>
                                </draggable>
                            </div>
                            <div data-force="18" class="layer block" style="position: absolute; left: 65%; top: 20px; width: 30%;height:80px">
                                <div class="layer title">二元分类</div>
                                <draggable v-model="list6" class="block__list2 block__list_tags" :options="{group:'people'}">
                                    <div v-for="element in list6">{{element.name}}</div>
                                </draggable>
                            </div>
                            <div class="graph" v-show="show1">
                                <div class="output6">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(1)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(1)">输出到数据表</span>
                                </div>
                                <div class="table">
                                    <div class="capital">{{show1List['colname']}}</div>
                                    <div class="thead">
                                        <div style="width:15%">Value</div>
                                        <div style="width:55%">Proportion</div>
                                        <div style="width:15%">Count</div>
                                        <div style="width:15%">%</div>

                                    </div>
                                    <div class="tr thead" v-for="item in show1List['data']">
                                        <div style="width:15%">{{item[0]}}</div>
                                        <div style="width:55%;height:30px;box-sizing:border-box;padding-top:8px">
                                            <div v-bind:style="{width:item[3]+'%'}" id="graph">
                                            </div>
                                        </div>
                                        <div style="width:15%">{{item[1]}}</div>
                                        <div style="width:15%">{{item[3]}}</div>

                                    </div>

                                </div>

                            </div>
                            <div class="graph" v-show="show2">
                                <div class="output6">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(2)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(2)">输出到数据表</span>
                                </div>
                                <div class="table2" style="margin-top:160px;">

                                    <div class="thead">
                                        <div style="width:20%;border-bottom:none;border-right:none"></div>
                                        <div style="width:20%;border-bottom:none;"></div>
                                        <div style="width:60%">{{colname2}}</div>
                                    </div>
                                    <div class="tr thead">
                                        <div style="width:20%;border-right:none"></div>
                                        <div style="width:20%;"></div>
                                        <div style="width:20%">{{show3List[0]}}</div>
                                        <div style="width:20%">{{show3List[1]}}</div>
                                        <div style="width:20%">总计</div>

                                    </div>
                                    <div class="tr2 thead" v-for="(item,index) in show5List">
                                        <div style="width:20%;border-bottom:none;">{{show4List[index]}}</div>
                                        <div style="width:20%;">{{show2List[index]}}</div>
                                        <div style="width:20%;">
                                            {{show5List[0][index]}}
                                        </div>
                                        <div style="width:20%">
                                            {{show5List[1][index]}}
                                        </div>
                                        <div style="width:20%">
                                            {{show5List[0][index]+show5List[1][index]}}
                                        </div>

                                    </div>

                                    <div class="tr thead">
                                        <div style="width:20%;border-bottom:none;"></div>
                                        <div style="width:20%;">总计</div>
                                        <div style="width:20%">{{show5List[0][0]+show5List[0][1]}}</div>
                                        <div style="width:20%">{{show5List[1][0]+show5List[1][1]}}</div>
                                        <div style="width:20%">{{show5List[0][0]+show5List[0][1]+show5List[1][0]+show5List[1][1]}}</div>

                                    </div>

                                </div>
                                <div class="table" style="margin-top:20px;margin-bottom:0px;">
                                    <div class="capital">{{colname2}}</div>
                                    <div class="thead">
                                        <div style="width:15%">Value</div>
                                        <div style="width:55%">Proportion</div>
                                        <div style="width:15%">Count</div>
                                        <div style="width:15%">%</div>

                                    </div>
                                    <div class="tr thead" v-for="(item,index) in show6List">
                                        <div style="width:15%">{{show3List[index]}}</div>
                                        <div style="width:55%;height:30px;box-sizing:border-box;padding-top:8px;display:flex">
                                            <div v-bind:style="{width:item[2]+'%'}" id="graph11">
                                                <span v-if="item[2]!= 0.00">{{item[2]}}</span>
                                            </div>
                                            <div v-bind:style="{width:item[3]+'%'}" id="graph21">
                                                <span v-if="item[3]!= 0.00">{{item[3]}}</span>
                                            </div>
                                        </div>
                                        <!-- <div style="width:55%;height:30px;box-sizing:border-box;padding-top:8px">
                                            <div v-bind:style="{width:item[1]+'%'}" id="graph" >
                                            </div>
                                        </div> -->
                                        <div style="width:15%">{{item[0]}}</div>
                                        <div style="width:15%">{{item[1]}}</div>

                                    </div>

                                    <div class="tr">
                                        <div style="width:15%">{{show4List[0]}}</div>
                                        <div style="width:15%"><span class="glyphicon glyphicon-stop" style="color:#ddd"></span>{{show2List[0]}}</div>
                                        <div style="width:25%"><span class="glyphicon glyphicon-stop" style="color:#555"></span>{{show2List[1]}}</div>
                                    </div>

                                </div>

                                <div class="table3" id="graph2">

                                </div>

                            </div>
                            <div class="graph" v-show="show3">

                                <el-table border class="table2_2" v-if="show8" :data="show7List" height="450">
                                    <el-table-column prop="Value" label="Value">
                                    </el-table-column>
                                    <el-table-column prop="Count" label="Count">
                                    </el-table-column>
                                    <el-table-column prop="Percent" label="Percent">
                                    </el-table-column>

                                </el-table>
                                <!-- <div class="Pagination" style="text-align: left;margin-top: 10px; float:right; margin-right: 10%">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="show7List.length">
                                        </el-pagination>
                                    </div> -->

                                <!-- <div class="table" v-if="show8">
                                    <div class="table_title">
                                        <div class="capital">{{show7List['colname']}}</div>
                                        <div class="thead">
                                            <div style="width:40%">Value</div>
                                            <div style="width:30%">Count</div>
                                            <div style="width:30%">%</div>
                                            
                                        </div>
                                    </div>
                                    <div class="table_body">
                                        <div class="tr thead" v-for="item in show7List['data']">
                                            <div style="width:40%">{{item[0]}}</div>
                                            <div style="width:30%">{{item[1]}}</div>
                                            <div style="width:30%">{{item[2]}}</div>
                                        </div>
                                    </div>
                                    
                                </div> -->
                                <div id="show9">
                                    <el-table :data="tableData" height="450" border class="table2_2" v-if="show9">

                                        <el-table-column fixed="left" :prop="colname" :label="colname" width="150" style="font-size:12px;">
                                        </el-table-column>
                                        <el-table-column :label="colname2">
                                            <el-table-column :label="date" v-for="(date, key) in title">
                                                <template scope="scope">
                                                    {{data_list[scope.$index][key]}}
                                                </template>
                                            </el-table-column>

                                        </el-table-column>
                                    </el-table>
                                </div>

                                <div class="output6" v-if="show8">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(1)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(1)">输出到数据表</span>
                                </div>
                                <div class="output6" v-if="show9">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(2)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(2)">输出到数据表</span>
                                </div>
                                <div class="table4" id="graph3">

                                </div>

                            </div>
                            <div class="graph" v-show="show4">
                                <div class="output6">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(2)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(2)">输出到数据表</span>
                                </div>
                                <div class="table2_2">
                                    <div class="table_title">
                                        <div class="thead">
                                            <div style="width:20%;border-bottom:none;border-right:none"></div>
                                            <div style="width:20%;border-bottom:none;"></div>
                                            <div style="width:60%">{{colname2}}</div>
                                        </div>
                                        <div class="tr thead">
                                            <div style="width:20%;border-right:none"></div>
                                            <div style="width:20%;"></div>
                                            <div style="width:20%">{{show3List[0]}}</div>
                                            <div style="width:20%">{{show3List[1]}}</div>
                                            <div style="width:20%">总计</div>
                                        </div>
                                    </div>
                                    <div class="table_body">
                                        <div class="tr2 thead" v-for="(item,index) in show8List">
                                            <div style="width:20%;border-bottom:none;">{{show4List[index]}}</div>
                                            <div style="width:20%;">{{show8List[index][0]}}</div>
                                            <div style="width:20%;">
                                                {{show8List[index][1]}}
                                            </div>
                                            <div style="width:20%">
                                                {{show8List[index][2]}}
                                            </div>
                                            <div style="width:20%">
                                                {{show8List[index][1]+show8List[index][2]}}
                                            </div>

                                        </div>

                                        <div class="tr thead">
                                            <div style="width:20%;border-bottom:none;"></div>
                                            <div style="width:20%;">总计</div>
                                            <div style="width:20%">{{show9List[0]}}</div>
                                            <div style="width:20%">{{show9List[1]}}</div>
                                            <div style="width:20%">{{show9List[2]}}</div>

                                        </div>
                                    </div>

                                </div>
                                <div class="table4_1" id="graph4">

                                </div>
                                <div class="table5" id="graph5">
                                    hhhhhhh
                                </div>

                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="探索数值变量" name="second">
                        <div class="container">
                            <div class="lf">
                                <div data-force="30" class="layer block" style="width: 100%;height:40vh">
                                    <div class="layer title">数值变量</div>
                                    <draggable v-model="list" class="block__list block__list_words" :options="{group:'people'}" style="height:37vh;overflow:scroll">
                                        <div v-for="element in list">{{element.name}}</div>
                                    </draggable>
                                </div>
                            </div>
                            <div data-force="18" class="layer block" style="position:absolute;left: 30%; top: 20px; width: 65%;height:80px">
                                <div class="layer title">数值变量</div>
                                <draggable v-model="list2" class="block__list2 block__list_tags" :options="{group:'people'}">
                                    <div v-for="element in list2">{{element.name}}</div>
                                </draggable>
                            </div>
                            <div class="graph" v-show="show5">
                                <div class="output6" v-show="show10">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(1)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(1)">输出到数据表</span>
                                </div>
                                <div class="table6" id="graph6">

                                </div>

                            </div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="探索多元关系" name="third">
                        <div class="container">
                            <div class="lf">
                                <div data-force="30" class="layer block" style="width:100%;height:40vh">
                                    <div class="layer title">二元分类</div>
                                    <draggable v-model="list7" class="block__list block__list_words" :options="{group:'people3'}" style="height:37vh;overflow:scroll">
                                        <div v-for="element in list7">{{element.name}}</div>
                                    </draggable>
                                </div>
                                <div data-force="30" class="layer block" style="margin-top:40px;">
                                    <div class="layer title">数值变量</div>
                                    <draggable v-model="list8" class="block__list block__list_words" :options="{group:'people4'}" style="height:30vh;overflow:scroll">
                                        <div v-for="element in list8">{{element.name}}</div>
                                    </draggable>
                                </div>
                            </div>

                            <div data-force="18" class="layer block" style="position: absolute; left: 30%; top: 20px; width: 30%;height:80px">
                                <div class="layer title" style="width:140px;">二元分类（1个）</div>
                                <draggable v-model="list9" class="block__list2 block__list_tags" :options="{group:'people3'}">
                                    <div v-for="element in list9">{{element.name}}</div>
                                </draggable>
                            </div>
                            <div data-force="18" class="layer block" style="position: absolute; left: 65%; top: 20px; width: 30%;height:80px">
                                <div class="layer title" style="width:150px;">数值变量（1个）</div>
                                <draggable v-model="list10" class="block__list2 block__list_tags" :options="{group:'people4'}">
                                    <div v-for="element in list10">{{element.name}}</div>
                                </draggable>
                            </div>
                            <div class="graph" v-show="show6">
                                <div class="output6">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(2)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(2)">输出到数据表</span>
                                </div>
                                <div class="table2_2">

                                    <div class="thead">
                                        <div style="width:20%;border-bottom:none;border-right:none"></div>
                                        <div style="width:20%;border-bottom:none;"></div>
                                        <div style="width:60%">{{colname2_2}}</div>
                                    </div>
                                    <div class="tr thead">
                                        <div style="width:20%;border-right:none"></div>
                                        <div style="width:20%;"></div>
                                        <div style="width:20%">{{show13List[0]}}</div>
                                        <div style="width:20%">{{show13List[1]}}</div>
                                        <div style="width:20%">总计</div>

                                    </div>
                                    <div class="tr2 thead" v-for="(item,index) in show18List">
                                        <div style="width:20%;border-bottom:none;">{{show14List[index]}}</div>
                                        <div style="width:20%;">{{show18List[index][0]}}</div>
                                        <div style="width:20%;">
                                            {{show18List[index][1]}}
                                        </div>
                                        <div style="width:20%">
                                            {{show18List[index][2]}}
                                        </div>
                                        <div style="width:20%">
                                            {{show18List[index][1]+show18List[index][2]}}
                                        </div>

                                    </div>

                                    <div class="tr thead">
                                        <div style="width:20%;border-bottom:none;"></div>
                                        <div style="width:20%;">总计</div>
                                        <div style="width:20%">{{show19List[0]}}</div>
                                        <div style="width:20%">{{show19List[1]}}</div>
                                        <div style="width:20%">{{show19List[2]}}</div>

                                    </div>

                                </div>
                                <div class="table4_1" id="graph7">

                                </div>
                                <div class="table5" id="graph8">
                                    hhhhhhh
                                </div>

                            </div>
                            <div class="graph" v-show="show7">
                                <div class="output6" v-show="show11">
                                    <!-- <span data-toggle="modal" data-target="#myModalout" @click="output1(1)">输出到excel</span>&nbsp;&nbsp; -->
                                    <span data-toggle="modal" data-target="#myModalout2" @click="output2(1)">输出到数据表</span>
                                </div>
                                <div class="table6" id="graph9">

                                </div>

                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="字段查询" name="forth">
                        <div class="container">
                            <div>
                                <el-button type="primary" style="float:right;margin-left:10px;" @click="clear">清空</el-button>
                                <el-button type="primary" style="float:right;" @click="search">查询</el-button>
                                <el-button type="primary" style="float:right;" @click="add">添加</el-button>
                            </div>
                            <div>
                                <el-form :inline="true" class="demo-form-inline" v-for="(item,index) in formInline">

                                    <el-form-item label="字段名" style="margin-right:3vw;">
                                        <el-select v-model="item.name">
                                            <el-option v-for="item in titleName" :label="item" :value="item"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="匹配到" style="margin-right:3vw;">
                                        <el-select v-model="item.totype">
                                            <el-option label="包含" value="0"></el-option>
                                            <el-option label="整个单元格" value="1"></el-option>
                                            <el-option label="开始以" value="2"></el-option>
                                            <el-option label="结束以" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="查找内容">
                                        <el-input v-model="item.content"></el-input>
                                    </el-form-item>
                                </el-form>

                            </div>
                            <div>
                                <el-table v-loading="loading" :data="tableData2.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 80%;margin:10px 10%">
                                    <el-table-column v-for="item in tablehead" :prop="item.name" :label="item.name">
                                    </el-table-column>

                                </el-table>
                                <div class="Pagination" style="text-align: left;margin-top: 10px; float:right; margin-right: 10%">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="tableData2.length">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
        <!--excel模态框输出-->
        <div class="modal fade" id="myModalout" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:40%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">表输出设置——EXCEL文件</h4>
                    </div>
                    <div class="modal-body">

                        <div style="width:100%;padding:0 1%">
                            <el-form label-width="90px">
                                <el-form-item label="输出表名称">
                                    <el-input v-model="outputName"></el-input>
                                </el-form-item>

                            </el-form>
                            <div class="connbtn2">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="outputExcel">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <!--csv模态框输出-->
        <div class="modal fade" id="myModalout2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:40%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">表输出设置</h4>
                    </div>
                    <div class="modal-body">

                        <div style="width:100%;padding:0 1%">
                            <el-form label-width="90px">
                                <el-form-item label="输出表名称">
                                    <el-input v-model="outputName2"></el-input>
                                </el-form-item>

                            </el-form>
                            <div class="connbtn2">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="outputCSV">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <!-- <div class="modal fade " id="progressModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog  tasksave">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">运行中，请等待....</h4>
                    </div>
                    <div class="modal-body">
                        <div style="width:100%;padding:0 1%;text-align:center">
                            <img src="../back_components/assets/progress.gif" style="height:15px;">
                        </div>
                    </div>

                </div>
            </div>
        </div> -->

    </div>

</template>

<script>
import echarts from "echarts";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      formInline: [
        {
          name: "",
          totype: "",
          content: ""
        }
      ],
      loading: false,
      pagesize: 6, //每页的条数限制
      currentPage: 1,
      tableData2: [],
      tablehead: [],
      header: [],
      tableData: [],
      data_list: [],
      myChart: {},
      //普通柱状图
      option: {
        legend: {
          data: []
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 30,
            interval: 0
          },
          data: [],
          name: ""
        },
        yAxis: {
          type: "value",
          name: ""
        },
        series: [],
        grid: {
          x: 80,
          y2: 100,
          x2: 100,
          y: 120
        }
      },
      //堆叠柱状图
      option2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: "7%",
          right: "10%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: [],
          axisLabel: {
            rotate: 30,
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          name: "计数"
        },
        series: []
      },
      //散点图
      option3: {
        legend: {
          data: [],
          left: "center"
        },
        grid: {
          x2: 100
        },
        xAxis: {},
        yAxis: {},
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "cross"
          }
        },
        series: []
      },
      activeName2: "first",
      //探索分类变量中，数值变量
      list: [],
      //探索数值变量中，数值变量拖拽结果
      list2: [],
      //分类变量
      list3: [],
      //二元分类
      list4: [],
      //探索分类变量中，分类变量拖拽结果
      list5: [],
      //探索分类变量中，二元变量拖拽结果
      list6: [],
      //探索多元关系中，分类变量
      list7: [],
      // //探索多元关系中，数值变量
      list8: [],
      //探索多元关系中，分类变量拖拽结果
      list9: [],
      //探索多元关系中，数值变量拖拽结果
      list10: [],

      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false,
      show11: false,
      outputName: "",
      outputName2: "",
      tableName: "",
      colname2: "",
      colname2_2: "",
      colname: "",
      dataList: {},
      //1个二元分类
      show1List: {},
      //2个二元分类
      show2List: [],
      show3List: [],
      show4List: [],
      show5List: [[], []],
      show6List: [],
      //1个多元分类
      show7List: [],
      show8List: [],
      show9List: [],
      //2个多元分类的表头
      title: [],
      //1个二元变量，1个数值变量
      show13List: [],
      show14List: [],
      show18List: [],
      show19List: [],
      col: "",
      titleName: []
    };
  },
  created() {},
  mounted() {
    this.formInline = [
      {
        name: "",
        totype: "",
        content: ""
      }
    ];
    this.list3 = [];
    this.list4 = [];
    this.list = [];
    this.list7 = [];
    this.list8 = [];
    // if( this.$route.path == '/olap_p/dataanalysis') {
    //         $(".modal-backdrop").show();
    //         $("#progressModal").modal("show");

    //     }
    //     if(this.$route.path != '/olap_p/dataanalysis') {
    //         $(".modal-backdrop").hide();
    //         $("#progressModal").modal("hide");
    //     }
    this.tableName = this.$route.params.tableName;
    // this.$http.get(this.$store.state.URL3+'/kind?tabname='+this.tableName) //跨域加{emulateJSON: true}
    //     .then((response) => {

    //         this.dataList = response.body;
    //         var flag = [];
    //         var set = [];
    //         var range = [];
    //         for(var i = 0;i < this.dataList['flag'].length;i++) {
    //             var obj = {};
    //             obj['name'] = this.dataList['flag'][i];
    //             flag.push(obj);
    //             this.titleName.push(this.dataList['flag'][i]);
    //         }
    //         for(var i = 0;i < this.dataList['set'].length;i++) {
    //             var obj = {};
    //             obj['name'] = this.dataList['set'][i];
    //             set.push(obj);
    //             this.titleName.push(this.dataList['set'][i]);
    //         }
    //         for(var i = 0;i < this.dataList['range'].length;i++) {
    //             var obj = {};
    //             obj['name'] = this.dataList['range'][i];
    //             range.push(obj);
    //             this.titleName.push(this.dataList['range'][i]);
    //         }
    //         this.list3 = set;
    //         this.list4 = flag;
    //         this.list = range;
    //         this.list7 = flag;
    //         this.list8 = range;
    //         $(".modal-backdrop").hide();
    //         $("#progressModal").modal("hide");

    //     }, (response) => {
    //         console.log('请求失败了');
    //         // alert("请求失败，请刷新重试哦");
    //     });
  },
  methods: {
    //返回
    back(){
      this.$router.go(-1);
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    output1: function(col) {
      this.col = col;
      this.outputName = "";
    },
    output2: function(col) {
      this.col = col;
      this.outputName2 = "";
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    add: function() {
      var dict = {
        name: "",
        totype: "",
        content: ""
      };
      this.formInline.push(dict);
    },
    clear: function() {
      this.formInline = [];
      var dict = {
        name: "",
        totype: "",
        content: ""
      };
      this.formInline.push(dict);
    },
    search: function() {
      this.loading = true;
      var arrs2 = [];
      var arrs3 = [];
      var arrs4 = [];
      for (var i = 0; i < this.formInline.length; i++) {
        var str2 = this.formInline[i]["name"].toString();
        arrs2.push(str2.trim());
        var str3 = this.formInline[i]["totype"].toString();
        arrs3.push(str3.trim());
        var str4 = this.formInline[i]["content"].toString();
        arrs4.push(str4.trim());
      }

      this.$http
        .get(
          this.$store.state.URL1 +
            "/searchMatch/search?tableName=" +
            this.tableName +
            "&columns=" +
            arrs2 +
            "&match=" +
            arrs3 +
            "&search_text=" +
            arrs4
        )
        .then(response => {
          this.loading = false;
          var data = JSON.parse(response.body);
          console.log(data);
          this.tablehead = data.schema.fields;
          this.tableData2 = data.data;
        });
    },
    replace: function() {
      this.list = [
        {
          name: "Edgard"
        }
      ];
    },
    outputExcel: function() {
      if (this.col == 2) {
        var dict = {};
        dict["savename"] = this.outputName;
        dict["type"] = "excel";
        dict["data"] = JSON.stringify(this.dataList);
        this.$http
          .post(this.$store.state.URL3 + "/twokind2file", dict, {
            emulateJSON: true
          }) //跨域加{emulateJSON: true}
          .then(
            response => {
              console.log(response);
              alert("EXCEL表输出成功");
            },
            response => {
              console.log("请求失败了");
              // alert("请求失败，请刷新重试哦");
            }
          );
      }
      if (this.col == 1) {
        var dict = {};
        dict["savename"] = this.outputName;
        dict["type"] = "excel";
        dict["data"] = JSON.stringify(this.dataList);
        this.$http
          .post(this.$store.state.URL3 + "/onekind2file", dict, {
            emulateJSON: true
          }) //跨域加{emulateJSON: true}
          .then(
            response => {
              console.log(response);
              alert("EXCEL表输出成功");
            },
            response => {
              console.log("请求失败了");
              // alert("请求失败，请刷新重试哦");
            }
          );
      }
      console.log(this.outputName);
      console.log(this.dataList);
      // setTimeout(() => {

      //     alert('EXCEL表输出成功');
      // }, 500);
      this.outputName = "";
    },
    outputCSV: function() {
      if (this.col == 1) {
        var dict = {};
        dict["savename"] = this.outputName2;
        dict["type"] = "csv";
        dict["data"] = JSON.stringify(this.dataList);
        this.$http
          .post(this.$store.state.URL3 + "/onekind2file", dict, {
            emulateJSON: true
          }) //跨域加{emulateJSON: true}
          .then(
            response => {
              console.log(response);
              alert("数据表表输出成功");
            },
            response => {
              console.log("请求失败了");
              // alert("请求失败，请刷新重试哦");
            }
          );
      }
      if (this.col == 2) {
        var dict = {};
        dict["savename"] = this.outputName2;
        dict["type"] = "csv";
        dict["data"] = JSON.stringify(this.dataList);
        this.$http
          .post(this.$store.state.URL3 + "/twokind2file", dict, {
            emulateJSON: true
          }) //跨域加{emulateJSON: true}
          .then(
            response => {
              console.log(response);
              alert("数据表输出成功");
            },
            response => {
              console.log("请求失败了");
              // alert("请求失败，请刷新重试哦");
            }
          );
      }
      console.log(this.outputName2);
      console.log(this.dataList);
      // setTimeout(() => {
      //     alert('CSV表输出成功');
      // }, 500);
      this.outputName2 = "";
    }
  },
  watch: {
    $route(to, from) {
      this.activeName2 = "first";
      this.formInline = [
        {
          name: "",
          totype: "",
          content: ""
        }
      ];
      this.list3 = [];
      this.list4 = [];
      this.list5 = [];
      this.list6 = [];
      this.list = [];
      this.list2 = [];
      this.list7 = [];
      this.list8 = [];
      this.list9 = [];
      this.list10 = [];
      this.tableName = this.$route.params.tableName;
      console.log(this.tableName);
      if (this.$route.path == "/olap_p/dataanalysis") {
        $(".modal-backdrop").show();
        $("#progressModal").modal("show");
      }
      if (this.$route.path != "/olap_p/dataanalysis") {
        $(".modal-backdrop").hide();
        $("#progressModal").modal("hide");
      }
      this.$http
        .get(this.$store.state.URL3 + "/kind?tabname=" + this.tableName) //跨域加{emulateJSON: true}
        .then(
          response => {
            this.dataList = response.body;
            var flag = [];
            var set = [];
            var range = [];
            for (var i = 0; i < this.dataList["flag"].length; i++) {
              var obj = {};
              obj["name"] = this.dataList["flag"][i];
              flag.push(obj);
            }
            for (var i = 0; i < this.dataList["set"].length; i++) {
              var obj = {};
              obj["name"] = this.dataList["set"][i];
              set.push(obj);
            }
            for (var i = 0; i < this.dataList["range"].length; i++) {
              var obj = {};
              obj["name"] = this.dataList["range"][i];
              range.push(obj);
            }
            this.list3 = set;
            this.list4 = flag;
            this.list = range;
            this.list7 = flag;
            this.list8 = range;
            $(".modal-backdrop").hide();
            $("#progressModal").modal("hide");
          },
          response => {
            console.log("请求失败了");
            // alert("请求失败，请刷新重试哦");
          }
        );
    },
    list2: {
      handler: function() {
        //alert(this.list2.length);
        if (this.list2.length == 0) {
          this.show5 = false;
        } else if (this.list2.length == 1) {
          this.show10 = true;
          var colname = this.list2[0]["name"];
          this.$http
            .get(
              this.$store.state.URL3 +
                "/column_count?tabname=" +
                this.tableName +
                "&colname=" +
                colname +
                "&kind=range"
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                var arr1 = [];
                var arr2 = [];
                for (var key in this.dataList["data"]) {
                  arr1.push(key);
                  arr2.push(this.dataList["data"][key]);
                }
                // this.option['xAxis']['data'] = arr1;
                // this.option['series'][0] = {'data':[2664,346,310,569,910,210,609,312],'type':'bar'} ;
                this.option["xAxis"]["name"] = this.list2[0]["name"];
                this.option["yAxis"]["name"] = "计数";
                this.option["xAxis"]["data"] = arr1;
                this.option["series"] = [];
                this.option["legend"]["data"] = [];
                this.option["series"][0] = { data: arr2, type: "bar" };

                this.$nextTick(() => {
                  var dom = document.getElementById("graph6");
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option);
                  this.show5 = true;
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else if (this.list2.length == 2) {
          this.show10 = false;
          var colname = this.list2[0]["name"];
          var colname2 = this.list2[1]["name"];
          this.$http
            .get(
              this.$store.state.URL3 +
                "/two_columns?table_name=" +
                this.tableName +
                "&col1=" +
                colname +
                "&col2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                if (this.dataList["nums"] > 200) {
                  alert(
                    "该字段共" +
                      this.dataList["nums"] +
                      "条数据，数据量过大，只为您显示前200条"
                  );
                }
                this.option3["series"][0] = {};
                this.option3["series"][0]["type"] = "scatter";
                this.option3["series"][0]["data"] = this.dataList["data"];
                this.option3["xAxis"]["name"] = this.list2[0]["name"];
                this.option3["yAxis"]["name"] = this.list2[1]["name"];

                this.$nextTick(() => {
                  var dom = document.getElementById("graph6");
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option3);
                  this.show5 = true;
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else {
          alert("最多只能分析两个维度");
          var item = this.list2.pop();
          this.list.push(item);
        }
      }
    },
    list3: {
      handler: function() {}
    },
    list5: {
      handler: function() {
        //alert(this.list2.length);
        if (this.list5.length == 0 && this.list6.length == 0) {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
        } else if (
          (this.list5.length == 1 && this.list6.length == 0) ||
          (this.list5.length == 0 && this.list6.length == 1)
        ) {
          if (this.list5.length == 1) {
            this.show8 = false;
            var colname = this.list5[0]["name"];
            this.show7List = [];
            this.$http
              .get(
                this.$store.state.URL3 +
                  "/column_count?tabname=" +
                  this.tableName +
                  "&colname=" +
                  colname +
                  "&kind=set"
              ) //跨域加{emulateJSON: true}
              .then(
                response => {
                  this.dataList = response.body;
                  if (this.dataList["nums"] > 200) {
                    alert(
                      "该字段共" +
                        this.dataList["nums"] +
                        "条数据，数据量过大，只为您显示前200条"
                    );
                  }
                  var arr1 = [];
                  var arr2 = [];
                  for (var key in this.dataList["data"]) {
                    arr1.push(key);
                    arr2.push(this.dataList["data"][key]);
                  }
                  this.option["xAxis"]["name"] = colname;
                  this.option["yAxis"]["name"] = "计数";
                  this.option["xAxis"]["data"] = arr1;
                  this.option["series"] = [];
                  this.option["legend"]["data"] = [];
                  this.option["series"][0] = { data: arr2, type: "bar" };

                  var sum = 0;
                  for (var i = 0; i < arr2.length; i++) {
                    sum += arr2[i];
                  }
                  for (var j = 0; j < arr2.length; j++) {
                    var arr3 = {};
                    arr3["Value"] = arr1[j];
                    arr3["Count"] = arr2[j];
                    arr3["Percent"] = ((arr2[j] / sum) * 100).toFixed(2);
                    this.show7List.push(arr3);
                  }
                  console.log(this.show7List);

                  this.$nextTick(() => {
                    var dom = document.getElementById("graph3");
                    this.myChart = echarts.init(dom);
                    this.myChart.clear();
                    this.myChart.setOption(this.option);

                    this.show3 = true;
                    this.show4 = false;
                    this.show8 = true;
                    this.show9 = false;
                  });
                },
                response => {
                  console.log("请求失败了");
                  // alert("请求失败，请刷新重试哦");
                }
              );
          } else {
            var colname = this.list6[0]["name"];
            this.$http
              .get(
                this.$store.state.URL3 +
                  "/column_count?tabname=" +
                  this.tableName +
                  "&colname=" +
                  colname +
                  "&kind=flag"
              ) //跨域加{emulateJSON: true}
              .then(
                response => {
                  this.dataList = response.body;

                  this.show1List["colname"] = colname;

                  this.show1List["data"] = [];
                  for (var key in this.dataList["data"]) {
                    var arr1 = [];
                    arr1.push(key);
                    arr1.push(this.dataList["data"][key]);
                    this.show1List["data"].push(arr1);
                  }
                  this.show1List["data"][0].push(
                    this.show1List["data"][0][1] /
                      (this.show1List["data"][0][1] +
                        this.show1List["data"][1][1])
                  );
                  this.show1List["data"][0].push(
                    (
                      (this.show1List["data"][0][1] /
                        (this.show1List["data"][0][1] +
                          this.show1List["data"][1][1])) *
                      100
                    ).toFixed(2)
                  );
                  this.show1List["data"][1].push(
                    this.show1List["data"][1][1] /
                      (this.show1List["data"][0][1] +
                        this.show1List["data"][1][1])
                  );
                  this.show1List["data"][1].push(
                    (
                      (this.show1List["data"][1][1] /
                        (this.show1List["data"][0][1] +
                          this.show1List["data"][1][1])) *
                      100
                    ).toFixed(2)
                  );
                  this.$nextTick(() => {
                    this.show1 = true;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                  });
                },
                response => {
                  console.log("请求失败了");
                  // alert("请求失败，请刷新重试哦");
                }
              );
          }
        } else if (this.list5.length == 0 && this.list6.length == 2) {
          this.show6List = [];
          var colname = this.list6[0]["name"];
          var colname2 = this.list6[1]["name"];
          this.show4List[0] = colname;
          this.show4List[1] = "";
          this.colname2 = colname2;
          this.$http
            .get(
              this.$store.state.URL3 +
                "/twokind?tabname=" +
                this.tableName +
                "&kind1=" +
                colname +
                "&kind2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                var arr_axis = [];
                var kind1 = this.dataList["data"][colname];
                var arr2 = [];
                for (var key in kind1) {
                  arr_axis.push(key);

                  var kind2 = kind1[key][colname2];
                  var arr = [];
                  for (var i = 0; i < this.dataList[colname2].length; i++) {
                    arr.push(0);
                  }
                  for (var key2 in kind2) {
                    for (var n = 0; n < arr.length; n++) {
                      if (key2 == this.dataList[colname2][n]) {
                        arr[n] = kind2[key2];
                      }
                    }
                  }

                  arr2.push(arr);
                }
                var arr3 = [];
                for (var k = 0; k < arr2[0].length; k++) {
                  var arr4 = [];
                  for (var j = 0; j < arr2.length; j++) {
                    arr4.push(arr2[j][k]);
                  }
                  arr3.push(arr4);
                }
                for (var m = 0; m < arr3.length; m++) {
                  this.option["series"][m] = {
                    name: this.dataList[colname2][m],
                    data: arr3[m],
                    type: "bar"
                  };
                }
                if (this.dataList[colname2].length <= 20) {
                  this.option["legend"]["data"] = this.dataList[colname2];
                } else {
                  this.option["legend"]["data"] = [];
                }

                this.option["xAxis"]["data"] = arr_axis;
                this.show2List = arr_axis;
                this.show3List = this.dataList[colname2];
                this.show5List = arr3;

                for (var i = 0; i < this.show5List.length; i++) {
                  var arr6 = [];
                  arr6.push(this.show5List[i][0] + this.show5List[i][1]);
                  arr6.push(
                    (
                      ((this.show5List[i][0] + this.show5List[i][1]) /
                        (this.show5List[0][0] +
                          this.show5List[0][1] +
                          this.show5List[1][0] +
                          this.show5List[1][1])) *
                      100
                    ).toFixed(2)
                  );
                  arr6.push(
                    (
                      (this.show5List[i][0] /
                        (this.show5List[i][0] + this.show5List[i][1])) *
                      100
                    ).toFixed(2)
                  );
                  arr6.push(
                    (
                      (this.show5List[i][1] /
                        (this.show5List[i][0] + this.show5List[i][1])) *
                      100
                    ).toFixed(2)
                  );
                  this.show6List.push(arr6);
                }
                this.option["xAxis"]["name"] = colname;
                this.option["yAxis"]["name"] = "计数";
                this.$nextTick(() => {
                  this.show1 = false;
                  this.show2 = true;
                  this.show3 = false;
                  this.show4 = false;
                  var dom = document.getElementById("graph2");
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.setOption(this.option);
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else if (this.list5.length == 2 && this.list6.length == 0) {
          var colname = this.list5[0]["name"];
          var colname2 = this.list5[1]["name"];
          this.colname = colname;
          this.colname2 = colname2;
          this.show9 = false;
          this.show3 = false;

          this.tableData = [];
          this.data_list = [];
          this.title = [];
          $(".modal-backdrop").show();
          $("#progressModal").modal("show");

          this.$http
            .get(
              this.$store.state.URL3 +
                "/twokind?tabname=" +
                this.tableName +
                "&kind1=" +
                colname +
                "&kind2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                $(".modal-backdrop").hide();
                $("#progressModal").modal("hide");
                this.dataList = response.body;
                if (this.dataList["nums"] > 200) {
                  alert(
                    "该字段共" +
                      this.dataList["nums"] +
                      "条数据，数据量过大，只为您显示前200条"
                  );
                }
                this.title = this.dataList[colname2];

                var arr_axis = [];
                var kind1 = this.dataList["data"][colname];
                var arr2 = [];
                for (var key in kind1) {
                  arr_axis.push(key);

                  var kind2 = kind1[key][colname2];
                  var arr = [];
                  for (var i = 0; i < this.dataList[colname2].length; i++) {
                    arr.push(0);
                  }
                  for (var key2 in kind2) {
                    for (var n = 0; n < arr.length; n++) {
                      if (key2 == this.dataList[colname2][n]) {
                        arr[n] = kind2[key2];
                      }
                    }
                  }
                  console.log(arr);
                  arr2.push(arr);
                }

                for (var m = 0; m < arr2.length; m++) {
                  var arr = [];
                  var dict = {};
                  dict[colname] = arr_axis[m];
                  for (var n = 0; n < this.title.length; n++) {
                    arr.push(arr2[m][n]);
                  }
                  this.tableData.push(dict);
                  this.data_list.push(arr);
                }

                var arr3 = [];
                for (var k = 0; k < arr2[0].length; k++) {
                  var arr4 = [];
                  for (var j = 0; j < arr2.length; j++) {
                    arr4.push(arr2[j][k]);
                  }
                  arr3.push(arr4);
                }
                for (var m = 0; m < arr3.length; m++) {
                  this.option["series"][m] = {
                    name: this.dataList[colname2][m],
                    data: arr3[m],
                    type: "bar"
                  };
                }
                if (this.dataList[colname2].length <= 20) {
                  this.option["legend"]["data"] = this.dataList[colname2];
                } else {
                  this.option["legend"]["data"] = [];
                }

                this.option["xAxis"]["data"] = arr_axis;
                this.option["xAxis"]["name"] = colname;

                this.$nextTick(() => {
                  console.log(this.colname2);
                  console.log(this.title);
                  console.log(this.data_list);

                  this.show3 = true;
                  this.show4 = false;
                  this.show8 = false;
                  this.show9 = true;

                  var dom = document.getElementById("graph3");
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option);
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else if (this.list5.length == 1 && this.list6.length == 1) {
          var colname = this.list5[0]["name"];
          var colname2 = this.list6[0]["name"];
          this.colname2 = this.list6[0]["name"];
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];
          var arr4 = [];
          var arr5 = [];
          var arr6 = [];
          this.show4List = [];
          this.show3List = [];
          this.show8List = [];
          this.show9List = [];
          this.$http
            .get(
              this.$store.state.URL4 +
                "/twokind?tabname=" +
                this.tableName +
                "&kind1=" +
                colname +
                "&kind2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                console.log(this.dataList);
                if (this.dataList["nums"] > 200) {
                  alert(
                    "该字段共" +
                      this.dataList["nums"] +
                      "条数据，数据量过大，只为您显示前200条"
                  );
                }
                for (var key in this.dataList["data"][colname]) {
                  arr1.push(key);
                }
                for (var i = 0; i < arr1.length; i++) {
                  if (i == 0) {
                    this.show4List.push(colname);
                  } else {
                    this.show4List.push("");
                  }
                }
                console.log(arr1);
                for (var i = 0; i < this.dataList[colname2].length; i++) {
                  arr2.push(this.dataList[colname2][i]);
                  this.show3List.push(this.dataList[colname2][i]);
                }

                for (var key3 in this.dataList["data"][colname]) {
                  if (
                    this.dataList["data"][colname][key3][colname2][arr2[0]] !=
                    undefined
                  ) {
                    arr3.push(
                      this.dataList["data"][colname][key3][colname2][arr2[0]]
                    );
                  } else {
                    arr3.push(0);
                  }
                  if (
                    this.dataList["data"][colname][key3][colname2][arr2[1]] !=
                    undefined
                  ) {
                    arr4.push(
                      this.dataList["data"][colname][key3][colname2][arr2[1]]
                    );
                  } else {
                    arr4.push(0);
                  }
                }
                for (var key3 in this.dataList["data"][colname]) {
                  var arr5 = [];
                  arr5.push(key3);
                  for (var i = 0; i < arr2.length; i++) {
                    if (
                      this.dataList["data"][colname][key3][colname2][arr2[0]] !=
                      undefined
                    ) {
                      arr5.push(
                        this.dataList["data"][colname][key3][colname2][arr2[0]]
                      );
                    } else {
                      arr5.push(0);
                    }
                  }
                  this.show8List.push(arr5);
                }
                var sum1 = 0;
                var sum2 = 0;
                for (var j = 0; j < arr3.length; j++) {
                  sum1 += arr3[j];
                }
                this.show9List.push(sum1);
                for (var k = 0; k < arr4.length; k++) {
                  sum2 += arr4[k];
                }
                this.show9List.push(sum2);
                this.show9List.push(sum1 + sum2);
                if (arr2.length <= 20) {
                  this.option2["legend"]["data"] = arr2;
                } else {
                  this.option2["legend"]["data"] = [];
                }

                this.option2["xAxis"]["data"] = arr1;
                var item = {
                  name: "",
                  type: "bar",
                  stack: "总量",
                  label: {
                    normal: {
                      show: true,
                      position: "insideRight"
                    }
                  },
                  data: []
                };
                this.option2["yAxis"]["name"] = "计数";
                this.option2["xAxis"]["name"] = colname;
                this.option2["series"][0] = Object.assign({}, item);
                this.option2["series"][0]["name"] = arr2[0];
                this.option2["series"][0]["data"] = arr3;

                this.option2["series"][1] = Object.assign({}, item);
                this.option2["series"][1]["name"] = arr2[1];
                this.option2["series"][1]["data"] = arr4;

                var arr5 = [];
                var arr6 = [];
                for (var j = 0; j < arr3.length; j++) {
                  if (arr3[j] + arr4[j] != 0) {
                    var num1 = ((arr3[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    var num2 = ((arr4[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    arr5.push(num1);
                    arr6.push(num2);
                  } else {
                    arr5.push(0);
                    arr6.push(0);
                  }
                }
                var option3 = JSON.parse(JSON.stringify(this.option2));
                option3["yAxis"]["name"] = "百分比";
                option3["xAxis"]["name"] = colname;
                option3["series"][0] = JSON.parse(JSON.stringify(item));
                option3["series"][0]["name"] = arr2[0];
                option3["series"][0]["data"] = arr5;

                option3["series"][1] = JSON.parse(JSON.stringify(item));
                option3["series"][1]["name"] = arr2[1];
                option3["series"][1]["data"] = arr6;

                this.$nextTick(() => {
                  var dom = document.getElementById("graph4");
                  console.log(this.option3);
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option2);

                  var dom = document.getElementById("graph5");
                  // $("#graph2").css( 'width', $("#graph2").width() );
                  console.log(dom);

                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(option3);
                  this.show1 = false;
                  this.show2 = false;
                  this.show3 = false;
                  this.show4 = true;
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else {
          alert("最多只能分析两个维度");
          var item = this.list5.pop();
          this.list3.push(item);
        }
      }
    },
    list6: {
      handler: function() {
        //alert(this.list2.length);
        if (this.list5.length == 0 && this.list6.length == 0) {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
        } else if (
          (this.list5.length == 1 && this.list6.length == 0) ||
          (this.list5.length == 0 && this.list6.length == 1)
        ) {
          if (this.list5.length == 1) {
            this.show8 = false;
            var colname = this.list5[0]["name"];
            this.show7List = [];
            this.$http
              .get(
                this.$store.state.URL3 +
                  "/column_count?tabname=" +
                  this.tableName +
                  "&colname=" +
                  colname +
                  "&kind=set"
              ) //跨域加{emulateJSON: true}
              .then(
                response => {
                  this.dataList = response.body;
                  if (this.dataList["nums"] > 200) {
                    alert(
                      "该字段共" +
                        this.dataList["nums"] +
                        "条数据，数据量过大，只为您显示前200条"
                    );
                  }
                  var arr1 = [];
                  var arr2 = [];
                  for (var key in this.dataList["data"]) {
                    arr1.push(key);
                    arr2.push(this.dataList["data"][key]);
                  }
                  this.option["xAxis"]["name"] = colname;
                  this.option["yAxis"]["name"] = "计数";
                  this.option["xAxis"]["data"] = arr1;
                  this.option["series"] = [];
                  this.option["legend"]["data"] = [];
                  this.option["series"][0] = { data: arr2, type: "bar" };

                  var sum = 0;
                  for (var i = 0; i < arr2.length; i++) {
                    sum += arr2[i];
                  }
                  for (var j = 0; j < arr2.length; j++) {
                    var arr3 = {};
                    arr3["Value"] = arr1[j];
                    arr3["Count"] = arr2[j];
                    arr3["Percent"] = ((arr2[j] / sum) * 100).toFixed(2);
                    this.show7List.push(arr3);
                  }
                  console.log(this.show7List);

                  this.$nextTick(() => {
                    var dom = document.getElementById("graph3");
                    this.myChart = echarts.init(dom);
                    this.myChart.clear();
                    this.myChart.setOption(this.option);

                    this.show3 = true;
                    this.show4 = false;
                    this.show8 = true;
                    this.show9 = false;
                  });
                },
                response => {
                  console.log("请求失败了");
                  // alert("请求失败，请刷新重试哦");
                }
              );
          } else {
            var colname = this.list6[0]["name"];
            this.$http
              .get(
                this.$store.state.URL3 +
                  "/column_count?tabname=" +
                  this.tableName +
                  "&colname=" +
                  colname +
                  "&kind=flag"
              ) //跨域加{emulateJSON: true}
              .then(
                response => {
                  this.dataList = response.body;

                  this.show1List["colname"] = colname;

                  this.show1List["data"] = [];
                  for (var key in this.dataList["data"]) {
                    var arr1 = [];
                    arr1.push(key);
                    arr1.push(this.dataList["data"][key]);
                    this.show1List["data"].push(arr1);
                  }
                  this.show1List["data"][0].push(
                    this.show1List["data"][0][1] /
                      (this.show1List["data"][0][1] +
                        this.show1List["data"][1][1])
                  );
                  this.show1List["data"][0].push(
                    (
                      (this.show1List["data"][0][1] /
                        (this.show1List["data"][0][1] +
                          this.show1List["data"][1][1])) *
                      100
                    ).toFixed(2)
                  );
                  this.show1List["data"][1].push(
                    this.show1List["data"][1][1] /
                      (this.show1List["data"][0][1] +
                        this.show1List["data"][1][1])
                  );
                  this.show1List["data"][1].push(
                    (
                      (this.show1List["data"][1][1] /
                        (this.show1List["data"][0][1] +
                          this.show1List["data"][1][1])) *
                      100
                    ).toFixed(2)
                  );
                  this.$nextTick(() => {
                    this.show1 = true;
                    this.show2 = false;
                    this.show3 = false;
                    this.show4 = false;
                  });
                },
                response => {
                  console.log("请求失败了");
                  // alert("请求失败，请刷新重试哦");
                }
              );
          }
        } else if (this.list5.length == 0 && this.list6.length == 2) {
          var colname = this.list6[0]["name"];
          var colname2 = this.list6[1]["name"];
          this.show6List = [];
          this.show4List[0] = colname;
          this.show4List[1] = "";
          this.colname2 = colname2;
          this.$http
            .get(
              this.$store.state.URL3 +
                "/twokind?tabname=" +
                this.tableName +
                "&kind1=" +
                colname +
                "&kind2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                var arr_axis = [];
                var kind1 = this.dataList["data"][colname];
                var arr2 = [];
                for (var key in kind1) {
                  arr_axis.push(key);

                  var kind2 = kind1[key][colname2];
                  var arr = [];
                  for (var i = 0; i < this.dataList[colname2].length; i++) {
                    arr.push(0);
                  }
                  for (var key2 in kind2) {
                    for (var n = 0; n < arr.length; n++) {
                      if (key2 == this.dataList[colname2][n]) {
                        arr[n] = kind2[key2];
                      }
                    }
                  }

                  arr2.push(arr);
                }
                var arr3 = [];
                for (var k = 0; k < arr2[0].length; k++) {
                  var arr4 = [];
                  for (var j = 0; j < arr2.length; j++) {
                    arr4.push(arr2[j][k]);
                  }
                  arr3.push(arr4);
                }
                for (var m = 0; m < arr3.length; m++) {
                  this.option["series"][m] = {
                    name: this.dataList[colname2][m],
                    data: arr3[m],
                    type: "bar"
                  };
                }
                if (this.dataList[colname2].length <= 20) {
                  this.option["legend"]["data"] = this.dataList[colname2];
                }

                this.option["xAxis"]["data"] = arr_axis;
                this.show2List = arr_axis;
                this.show3List = this.dataList[colname2];
                this.show5List = arr3;

                for (var i = 0; i < this.show5List.length; i++) {
                  var arr6 = [];
                  arr6.push(this.show5List[i][0] + this.show5List[i][1]);
                  arr6.push(
                    (
                      ((this.show5List[i][0] + this.show5List[i][1]) /
                        (this.show5List[0][0] +
                          this.show5List[0][1] +
                          this.show5List[1][0] +
                          this.show5List[1][1])) *
                      100
                    ).toFixed(2)
                  );
                  arr6.push(
                    (
                      (this.show5List[i][0] /
                        (this.show5List[i][0] + this.show5List[i][1])) *
                      100
                    ).toFixed(2)
                  );
                  arr6.push(
                    (
                      (this.show5List[i][1] /
                        (this.show5List[i][0] + this.show5List[i][1])) *
                      100
                    ).toFixed(2)
                  );
                  this.show6List.push(arr6);
                }
                this.option["xAxis"]["name"] = colname;
                this.option["yAxis"]["name"] = "计数";
                this.$nextTick(() => {
                  this.show1 = false;
                  this.show2 = true;
                  this.show3 = false;
                  this.show4 = false;
                  var dom = document.getElementById("graph2");
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.setOption(this.option);
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else if (this.list5.length == 2 && this.list6.length == 0) {
          var colname = this.list5[0]["name"];
          var colname2 = this.list5[1]["name"];
          this.colname = colname;
          this.colname2 = colname2;
          this.show9 = false;
          this.show3 = false;

          this.tableData = [];
          this.data_list = [];
          this.title = [];
          $(".modal-backdrop").show();
          $("#progressModal").modal("show");

          this.$http
            .get(
              this.$store.state.URL3 +
                "/twokind?tabname=" +
                this.tableName +
                "&kind1=" +
                colname +
                "&kind2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                $(".modal-backdrop").hide();
                $("#progressModal").modal("hide");
                this.dataList = response.body;
                if (this.dataList["nums"] > 200) {
                  alert(
                    "该字段共" +
                      this.dataList["nums"] +
                      "条数据，数据量过大，只为您显示前200条"
                  );
                }
                this.title = this.dataList[colname2];

                var arr_axis = [];
                var kind1 = this.dataList["data"][colname];
                var arr2 = [];
                for (var key in kind1) {
                  arr_axis.push(key);

                  var kind2 = kind1[key][colname2];
                  var arr = [];
                  for (var i = 0; i < this.dataList[colname2].length; i++) {
                    arr.push(0);
                  }
                  for (var key2 in kind2) {
                    for (var n = 0; n < arr.length; n++) {
                      if (key2 == this.dataList[colname2][n]) {
                        arr[n] = kind2[key2];
                      }
                    }
                  }
                  console.log(arr);
                  arr2.push(arr);
                }

                for (var m = 0; m < arr2.length; m++) {
                  var arr = [];
                  var dict = {};
                  dict[colname] = arr_axis[m];
                  for (var n = 0; n < this.title.length; n++) {
                    arr.push(arr2[m][n]);
                  }
                  this.tableData.push(dict);
                  this.data_list.push(arr);
                }

                var arr3 = [];
                for (var k = 0; k < arr2[0].length; k++) {
                  var arr4 = [];
                  for (var j = 0; j < arr2.length; j++) {
                    arr4.push(arr2[j][k]);
                  }
                  arr3.push(arr4);
                }
                for (var m = 0; m < arr3.length; m++) {
                  this.option["series"][m] = {
                    name: this.dataList[colname2][m],
                    data: arr3[m],
                    type: "bar"
                  };
                }
                if (this.dataList[colname2].length <= 20) {
                  this.option["legend"]["data"] = this.dataList[colname2];
                } else {
                  this.option["legend"]["data"] = [];
                }

                this.option["xAxis"]["data"] = arr_axis;
                this.option["xAxis"]["name"] = colname;

                this.$nextTick(() => {
                  console.log(this.colname2);
                  console.log(this.title);
                  console.log(this.data_list);

                  this.show3 = true;
                  this.show4 = false;
                  this.show8 = false;
                  this.show9 = true;

                  var dom = document.getElementById("graph3");
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option);
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else if (this.list5.length == 1 && this.list6.length == 1) {
          var colname = this.list5[0]["name"];
          var colname2 = this.list6[0]["name"];
          this.colname2 = this.list6[0]["name"];
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];
          var arr4 = [];
          var arr5 = [];
          var arr6 = [];
          this.show4List = [];
          this.show3List = [];
          this.show8List = [];
          this.show9List = [];
          this.$http
            .get(
              this.$store.state.URL4 +
                "/twokind?tabname=" +
                this.tableName +
                "&kind1=" +
                colname +
                "&kind2=" +
                colname2
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                console.log(this.dataList);
                if (this.dataList["nums"] > 200) {
                  alert(
                    "该字段共" +
                      this.dataList["nums"] +
                      "条数据，数据量过大，只为您显示前200条"
                  );
                }
                for (var key in this.dataList["data"][colname]) {
                  arr1.push(key);
                }
                for (var i = 0; i < arr1.length; i++) {
                  if (i == 0) {
                    this.show4List.push(colname);
                  } else {
                    this.show4List.push("");
                  }
                }
                console.log(arr1);
                for (var i = 0; i < this.dataList[colname2].length; i++) {
                  arr2.push(this.dataList[colname2][i]);
                  this.show3List.push(this.dataList[colname2][i]);
                }

                for (var key3 in this.dataList["data"][colname]) {
                  if (
                    this.dataList["data"][colname][key3][colname2][arr2[0]] !=
                    undefined
                  ) {
                    arr3.push(
                      this.dataList["data"][colname][key3][colname2][arr2[0]]
                    );
                  } else {
                    arr3.push(0);
                  }
                  if (
                    this.dataList["data"][colname][key3][colname2][arr2[1]] !=
                    undefined
                  ) {
                    arr4.push(
                      this.dataList["data"][colname][key3][colname2][arr2[1]]
                    );
                  } else {
                    arr4.push(0);
                  }
                }
                for (var key3 in this.dataList["data"][colname]) {
                  var arr5 = [];
                  arr5.push(key3);
                  for (var i = 0; i < arr2.length; i++) {
                    if (
                      this.dataList["data"][colname][key3][colname2][arr2[0]] !=
                      undefined
                    ) {
                      arr5.push(
                        this.dataList["data"][colname][key3][colname2][arr2[0]]
                      );
                    } else {
                      arr5.push(0);
                    }
                  }
                  this.show8List.push(arr5);
                }
                var sum1 = 0;
                var sum2 = 0;
                for (var j = 0; j < arr3.length; j++) {
                  sum1 += arr3[j];
                }
                this.show9List.push(sum1);
                for (var k = 0; k < arr4.length; k++) {
                  sum2 += arr4[k];
                }
                this.show9List.push(sum2);
                this.show9List.push(sum1 + sum2);
                if (arr2.length <= 20) {
                  this.option2["legend"]["data"] = arr2;
                } else {
                  this.option2["legend"]["data"] = [];
                }

                this.option2["xAxis"]["data"] = arr1;
                var item = {
                  name: "",
                  type: "bar",
                  stack: "总量",
                  label: {
                    normal: {
                      show: true,
                      position: "insideRight"
                    }
                  },
                  data: []
                };
                this.option2["yAxis"]["name"] = "计数";
                this.option2["xAxis"]["name"] = colname;
                this.option2["series"][0] = Object.assign({}, item);
                this.option2["series"][0]["name"] = arr2[0];
                this.option2["series"][0]["data"] = arr3;

                this.option2["series"][1] = Object.assign({}, item);
                this.option2["series"][1]["name"] = arr2[1];
                this.option2["series"][1]["data"] = arr4;

                var arr5 = [];
                var arr6 = [];
                for (var j = 0; j < arr3.length; j++) {
                  if (arr3[j] + arr4[j] != 0) {
                    var num1 = ((arr3[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    var num2 = ((arr4[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    arr5.push(num1);
                    arr6.push(num2);
                  } else {
                    arr5.push(0);
                    arr6.push(0);
                  }
                }
                var option3 = JSON.parse(JSON.stringify(this.option2));
                option3["yAxis"]["name"] = "百分比";
                option3["xAxis"]["name"] = colname;
                option3["series"][0] = JSON.parse(JSON.stringify(item));
                option3["series"][0]["name"] = arr2[0];
                option3["series"][0]["data"] = arr5;

                option3["series"][1] = JSON.parse(JSON.stringify(item));
                option3["series"][1]["name"] = arr2[1];
                option3["series"][1]["data"] = arr6;

                this.$nextTick(() => {
                  var dom = document.getElementById("graph4");
                  console.log(this.option3);
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option2);

                  var dom = document.getElementById("graph5");
                  // $("#graph2").css( 'width', $("#graph2").width() );
                  console.log(dom);

                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(option3);
                  this.show1 = false;
                  this.show2 = false;
                  this.show3 = false;
                  this.show4 = true;
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        } else {
          alert("最多只能分析两个维度");
          var item = this.list6.pop();
          this.list4.push(item);
        }
      }
    },
    list9: {
      handler: function() {
        if (this.list9.length == 0 || this.list10.length == 0) {
          this.show6 = false;
          this.show7 = false;
          if (this.list9.length > 1) {
            alert("二元分类最多为1个");
            var item = this.list9.pop();
            this.list7.push(item);
          }
          if (this.list10.length > 1) {
            alert("数值变量最多为1个");
            var item = this.list10.pop();
            this.list8.push(item);
          }
        } else if (this.list9.length > 1) {
          alert("二元分类最多为1个");
          var item = this.list9.pop();
          this.list7.push(item);
        } else if (this.list9.length == 1 && this.list10.length == 1) {
          this.show11 = true;
          var colname = this.list9[0]["name"];
          var colname2 = this.list10[0]["name"];
          this.colname2_2 = colname;
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];
          var arr4 = [];
          var arr5 = [];
          var arr6 = [];
          this.show13List = [];
          this.show14List = [];
          this.show18List = [];
          this.show19List = [];
          this.$http
            .get(
              this.$store.state.URL4 +
                "/range_cate?tabname=" +
                this.tableName +
                "&rangename=" +
                colname2 +
                "&catename=" +
                colname
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                for (var key in this.dataList["data"]) {
                  arr1.push(key);
                }
                for (var i = 0; i < arr1.length; i++) {
                  if (i == 0) {
                    this.show14List.push(colname2);
                  } else {
                    this.show14List.push("");
                  }
                }
                for (var key2 in this.dataList["data"][arr1[0]]) {
                  arr2.push(key2);
                  this.show13List.push(key2);
                }
                for (var key3 in this.dataList["data"]) {
                  arr3.push(this.dataList["data"][key3][arr2[0]]);
                  arr4.push(this.dataList["data"][key3][arr2[1]]);
                }
                console.log(arr1);
                console.log(arr2);
                console.log(arr3);
                console.log(arr4);
                for (var key3 in this.dataList["data"]) {
                  var arr5 = [];
                  arr5.push(key3);
                  for (var i = 0; i < arr2.length; i++) {
                    if (this.dataList["data"][key3][arr2[i]] != undefined) {
                      arr5.push(this.dataList["data"][key3][arr2[i]]);
                    } else {
                      arr5.push(0);
                    }
                  }
                  this.show18List.push(arr5);
                }
                var sum1 = 0;
                var sum2 = 0;
                for (var j = 0; j < arr3.length; j++) {
                  sum1 += arr3[j];
                }
                this.show19List.push(sum1);
                for (var k = 0; k < arr4.length; k++) {
                  sum2 += arr4[k];
                }
                this.show19List.push(sum2);
                this.show19List.push(sum1 + sum2);
                if (arr2.length <= 20) {
                  this.option2["legend"]["data"] = arr2;
                } else {
                  this.option2["legend"]["data"] = [];
                }

                this.option2["xAxis"]["data"] = arr1;
                var item = {
                  name: "",
                  type: "bar",
                  stack: "总量",
                  label: {
                    normal: {
                      show: true,
                      position: "insideRight"
                    }
                  },
                  data: []
                };
                this.option2["yAxis"]["name"] = "计数";
                this.option2["xAxis"]["name"] = colname;
                this.option2["series"][0] = Object.assign({}, item);
                this.option2["series"][0]["name"] = arr2[0];
                this.option2["series"][0]["data"] = arr3;

                this.option2["series"][1] = Object.assign({}, item);
                this.option2["series"][1]["name"] = arr2[1];
                this.option2["series"][1]["data"] = arr4;

                var arr5 = [];
                var arr6 = [];
                for (var j = 0; j < arr3.length; j++) {
                  if (arr3[j] + arr4[j] != 0) {
                    var num1 = ((arr3[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    var num2 = ((arr4[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    arr5.push(num1);
                    arr6.push(num2);
                  } else {
                    arr5.push(0);
                    arr6.push(0);
                  }
                }
                var option3 = JSON.parse(JSON.stringify(this.option2));
                option3["yAxis"]["name"] = "百分比";
                option3["xAxis"]["name"] = colname;
                option3["series"][0] = JSON.parse(JSON.stringify(item));
                option3["series"][0]["name"] = arr2[0];
                option3["series"][0]["data"] = arr5;

                option3["series"][1] = JSON.parse(JSON.stringify(item));
                option3["series"][1]["name"] = arr2[1];
                option3["series"][1]["data"] = arr6;

                this.$nextTick(() => {
                  var dom = document.getElementById("graph7");
                  console.log(this.option3);
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option2);

                  var dom = document.getElementById("graph8");
                  // $("#graph2").css( 'width', $("#graph2").width() );
                  console.log(dom);

                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(option3);

                  this.show6 = true;
                  this.show7 = false;
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        }
      }
    },
    list10: {
      handler: function() {
        if (this.list9.length == 0 || this.list10.length == 0) {
          this.show6 = false;
          this.show7 = false;
          if (this.list9.length > 1) {
            alert("二元分类最多为1个");
            var item = this.list9.pop();
            this.list7.push(item);
          }
          if (this.list10.length > 1) {
            alert("数值变量最多为1个");
            var item = this.list10.pop();
            this.list8.push(item);
          }
        } else if (this.list10.length > 1) {
          alert("数值变量最多为1个");
          var item = this.list10.pop();
          this.list8.push(item);
        } else if (this.list9.length == 1 && this.list10.length == 1) {
          this.show11 = true;
          var colname = this.list9[0]["name"];
          var colname2 = this.list10[0]["name"];
          this.colname2_2 = colname;
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];
          var arr4 = [];
          var arr5 = [];
          var arr6 = [];
          this.show13List = [];
          this.show14List = [];
          this.show18List = [];
          this.show19List = [];
          this.$http
            .get(
              this.$store.state.URL4 +
                "/range_cate?tabname=" +
                this.tableName +
                "&rangename=" +
                colname2 +
                "&catename=" +
                colname
            ) //跨域加{emulateJSON: true}
            .then(
              response => {
                this.dataList = response.body;
                for (var key in this.dataList["data"]) {
                  arr1.push(key);
                }
                for (var i = 0; i < arr1.length; i++) {
                  if (i == 0) {
                    this.show14List.push(colname2);
                  } else {
                    this.show14List.push("");
                  }
                }
                for (var key2 in this.dataList["data"][arr1[0]]) {
                  arr2.push(key2);
                  this.show13List.push(key2);
                }
                for (var key3 in this.dataList["data"]) {
                  arr3.push(this.dataList["data"][key3][arr2[0]]);
                  arr4.push(this.dataList["data"][key3][arr2[1]]);
                }
                console.log(arr1);
                console.log(arr2);
                console.log(arr3);
                console.log(arr4);
                for (var key3 in this.dataList["data"]) {
                  var arr5 = [];
                  arr5.push(key3);
                  for (var i = 0; i < arr2.length; i++) {
                    if (this.dataList["data"][key3][arr2[i]] != undefined) {
                      arr5.push(this.dataList["data"][key3][arr2[i]]);
                    } else {
                      arr5.push(0);
                    }
                  }
                  this.show18List.push(arr5);
                }
                var sum1 = 0;
                var sum2 = 0;
                for (var j = 0; j < arr3.length; j++) {
                  sum1 += arr3[j];
                }
                this.show19List.push(sum1);
                for (var k = 0; k < arr4.length; k++) {
                  sum2 += arr4[k];
                }
                this.show19List.push(sum2);
                this.show19List.push(sum1 + sum2);
                if (arr2.length <= 20) {
                  this.option2["legend"]["data"] = arr2;
                } else {
                  this.option2["legend"]["data"] = [];
                }

                this.option2["xAxis"]["data"] = arr1;
                var item = {
                  name: "",
                  type: "bar",
                  stack: "总量",
                  label: {
                    normal: {
                      show: true,
                      position: "insideRight"
                    }
                  },
                  data: []
                };
                this.option2["yAxis"]["name"] = "计数";
                this.option2["xAxis"]["name"] = colname;
                this.option2["series"][0] = Object.assign({}, item);
                this.option2["series"][0]["name"] = arr2[0];
                this.option2["series"][0]["data"] = arr3;

                this.option2["series"][1] = Object.assign({}, item);
                this.option2["series"][1]["name"] = arr2[1];
                this.option2["series"][1]["data"] = arr4;

                var arr5 = [];
                var arr6 = [];
                for (var j = 0; j < arr3.length; j++) {
                  if (arr3[j] + arr4[j] != 0) {
                    var num1 = ((arr3[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    var num2 = ((arr4[j] / (arr3[j] + arr4[j])) * 100).toFixed(
                      2
                    );
                    arr5.push(num1);
                    arr6.push(num2);
                  } else {
                    arr5.push(0);
                    arr6.push(0);
                  }
                }
                var option3 = JSON.parse(JSON.stringify(this.option2));
                option3["yAxis"]["name"] = "百分比";
                option3["xAxis"]["name"] = colname;
                option3["series"][0] = JSON.parse(JSON.stringify(item));
                option3["series"][0]["name"] = arr2[0];
                option3["series"][0]["data"] = arr5;

                option3["series"][1] = JSON.parse(JSON.stringify(item));
                option3["series"][1]["name"] = arr2[1];
                option3["series"][1]["data"] = arr6;

                this.$nextTick(() => {
                  var dom = document.getElementById("graph7");
                  console.log(this.option3);
                  console.log(dom);
                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(this.option2);

                  var dom = document.getElementById("graph8");
                  // $("#graph2").css( 'width', $("#graph2").width() );
                  console.log(dom);

                  this.myChart = echarts.init(dom);
                  this.myChart.clear();
                  this.myChart.setOption(option3);
                  this.show6 = true;
                  this.show7 = false;
                });
              },
              response => {
                console.log("请求失败了");
                // alert("请求失败，请刷新重试哦");
              }
            );
        }
      }
    },
    deep: true
  },
  components: {
    draggable
  }
};
</script>
<style scoped>
.el-table__body,
.el-table__footer,
.el-table__header {
  width: 100% !important;
}
.el-table__fixed {
  z-index: 0;
}
tr div {
  font-size: 12px !important;
}
.el-select .el-input {
  width: 100%;
}
#graph,
#graph11,
#graph21 {
  height: 15px;
  border: 1px solid black;
  /* padding-top:5px; */
  border-left: none;
  background: #ddd;
  text-align: center;
  line-height: 15px;
}
#graph11 {
  border-right: none;
  background: #ddd;
}
#graph21 {
  border-right: none;
  background: #555;
}
.predashboard {
  position: static;
}
.connbtn2 {
  display: flex;
  justify-content: center;
}
.prehd {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #bbb;
  line-height: 45px;
  padding: 5px 20px;
  background-color: #f5f7fa;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1),
    0 10px 12px 0 rgba(170, 182, 206, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
    margin-bottom: 20px;
}
.pretitle {
  font-size: 22px;
  font-family: 微软雅黑;
  color: rgb(71, 172, 253);
  margin-left: 30px;
}
div,
span {
  font-size: 12px;
}
.lf {
  border-right: 1px solid #ddd;
  width: 25%;
  min-height: 70vh;
  /* position: relative; */
  float: left;
}
.content_da {
  padding: 10px 5%;
  height: 100%;
}
.hd {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
}
html {
  background-image: -webkit-linear-gradient(bottom, #f4e2c9 20%, #f4d7c9 100%);
  background-image: -ms-linear-gradient(bottom, #f4e2c9 20%, #f4d7c9 100%);
  background-image: linear-gradient(to bottom, #f4e2c9 20%, #f4d7c9 100%);
}

html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  color: #464637;
  min-height: 100%;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

h1 {
  color: #ff3f00;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  text-align: center;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.container {
  width: 98%;
  margin: auto;
  min-width: 98%;
  max-width: 100%;
  position: relative;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 75vh;
  padding: 20px;
  box-sizing: border-box;
}
.sortable-ghost {
  opacity: 0.2;
}

#foo .sortable-drag {
  background: #daf4ff;
}

img {
  border: 0;
  vertical-align: middle;
}

.logo {
  top: 55px;
  left: 30px;
  position: absolute;
}

.title {
  color: #fff;
  padding: 3px 10px;
  display: inline-block;
  position: relative;
  background-color: #ff7373;
  width: 80px;
}

.title_xl {
  padding: 3px 15px;
  font-size: 40px;
}

.tile {
  color: #ff7270;
  padding: 10px 30px;
  text-align: center;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 30px;
  background-color: #fff;
  display: inline-block;
  vertical-align: top;
}

.tile__name {
  cursor: move;
  padding-bottom: 10px;
  border-bottom: 1px solid #ff7373;
}

.tile__list {
  margin-top: 10px;
}

.tile__list:last-child {
  margin-right: 0;
  min-height: 80px;
}

.tile__list img {
  cursor: move;
  margin: 10px;
  border-radius: 100%;
}

.block {
  opacity: 1;
  height: 300px;
}

.block__list {
  padding: 20px 0;
  max-width: 95%;
  margin-top: -8px;
  margin-left: 5px;

  border: 1px solid #ddd;
  cursor: move;
  font-size: 16px;
}
.block__list2 {
  padding: 20px 0 10px 0;
  height: 80px;
  margin-top: -8px;
  margin-left: 5px;
  border: 1px solid #ddd;
  cursor: move;
  font-size: 16px;
}
.block__list-title {
  margin: -20px 0 0;
  padding: 10px;
  text-align: center;
  background: #5f9edf;
}

.block__list li {
  cursor: move;
}

.block__list_words div {
  padding: 10px 40px;
  color: #000;
  font-size: 16px;
  width: 100%;
}

.block__list_words .sortable-ghost {
  opacity: 0.4;
  background-color: #f4e2c9;
}

.block__list_words li:first-letter {
  text-transform: uppercase;
}

.block__list_tags {
  padding-left: 30px;
}

.block__list_tags:after {
  clear: both;
  content: "";
  display: block;
}

.block__list_tags div {
  color: #fff;
  float: left;
  margin: 8px 20px 10px 0;
  padding: 5px 10px;
  min-width: 10px;
  background-color: #5f9edf;
  text-align: center;
}

.block__list_tags li:first-child:first-letter {
  text-transform: uppercase;
}
#editable li {
  position: relative;
}
#editable i {
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  opacity: 0;
  display: block;
  cursor: pointer;
  color: #c00;
  top: 10px;
  right: 40px;
  position: absolute;
  font-style: normal;
}

#editable li:hover i {
  opacity: 1;
}

#filter {
}

#filter button {
  color: #fff;
  width: 100%;
  border: none;
  outline: 0;
  opacity: 0.5;
  margin: 10px 0 0;
  transition: opacity 0.1s ease;
  cursor: pointer;
  background: #5f9edf;
  padding: 10px 0;
  font-size: 20px;
}

#filter button:hover {
  opacity: 1;
}

#filter .block__list {
  padding-bottom: 0;
}

.drag-handle {
  margin-right: 10px;
  font: bold 20px Sans-Serif;
  color: #5f9edf;
  display: inline-block;
  cursor: move;
  cursor: -webkit-grabbing;
  /* overrides 'move' */
}

#todos input {
  padding: 5px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

#nested ul li {
  background-color: rgba(0, 0, 0, 0.05);
}

.table {
  box-sizing: border-box;
  width: 63%;
  border: 1px solid black;
  color: black;
  float: left;
  margin-top: 160px;
  margin-left: 60px;
}
.table_body {
  max-height: 400px;
  overflow: scroll;
}
.table2,
.table2_2 {
  box-sizing: border-box;
  width: 63%;
  border: 1px solid black;
  color: black;
  margin-left: 60px;
  float: left;
}
.table2_2 {
  margin-top: 160px;
  font-size: 12px;
}
.table3,
.table4,
.table4_1,
.table5,
.table6 {
  width: 54vw;
  height: 280px;
  border: 1px solid black;
  float: right;
  margin-right: 6vw;
  margin-top: 160px;
}
.table3 {
  margin-top: 20px;
}
.table4 {
  height: 450px;
  margin-top: 20px;
}
.table4_1 {
  margin-top: 20px;
}
.table5 {
  margin-top: 30px;
}
.table6 {
  margin-top: 160px;
  width: 54vw;
  height: 400px;
}
.output6 {
  position: absolute;
  left: 31%;
  top: 140px;
}
.output6 span {
  cursor: pointer;
  font-size: 12px;
  color: #409eff;
}
.table_title {
  width: calc(100% - 1em);
}
.thead {
  display: flex;
  width: 100%;
}
.capital {
  width: 100%;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.thead div {
  /* flex: auto; */
  text-align: center;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
}
.tr {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
}
.tr div {
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.tr2 div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-fanhui {
  font-size: 23px;
  color: #89c7f9;
}
</style>