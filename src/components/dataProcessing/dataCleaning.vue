<template>

    <div id="demo">
        <div class="prehd">
            <a>
                <i class="iconfont icon-fanhui" @click="back()"></i>
            </a>
            <span class='pretitle'>数据清洗{{excelName}}</span>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-2 col-sm-2" style="min-height: 700px;padding: 12px 0 0 0;">
                    <div class="content_wrap" style="width: 100%;">
                        <div class="left" style="width: 100%;">
                            <div id="leftMenu" style="margin: 0px;padding:0px;">
                                <div>
                                    <!-- <p class='typetitle'>
                                        <span class="icon expand-icon glyphicon glyphicon-minus"></span>&nbsp;&nbsp;输入
                                    </p>

                                    <ul id="leftMenu1">
                                        <li id='node25' model_type='node25'>数据表输入</li>
                                    </ul> -->
                                </div>
                                <div style="margin-top:90px">
                                    <p class='typetitle'>
                                        <span class="icon expand-icon glyphicon glyphicon-minus"></span>&nbsp;&nbsp;转换
                                    </p>
                                    <div style="overflow:auto;overflow-x:hidden;height:380px;">
                                        <ul id="leftMenu2">
                                            <!-- <li id='node4' model_type='node4'>值替换</li>
                                            <li id='node5' model_type='node5'>拆分字段</li> -->
                                            <li id='node6' model_type='node6'>去除重复记录</li>
                                            <li id='node7' model_type='node7'>忽略字段</li>
                                            <li id='node8' model_type='node8'>填充空值</li>
                                            <li id='node11' model_type='node11'>数据分段</li>
                                            <li id='node24' model_type='node24'>自定义数据分段</li>
                                            <li id='node12' model_type='node12'>条件筛选</li>
                                            <li id='node13' model_type='node13'>记录排序</li>
                                            <!-- <li id='node18' model_type='node18'>重新编码(相同变量)</li>
                                            <li id='node14' model_type='node14'>重新编码(不同变量)</li> -->
                                            <li id='node15' model_type='node15'>添加记录</li>
                                            <li id='node16' model_type='node16'>重新赋值</li>
                                            <li id='node17' model_type='node17'>查询重复记录</li>
                                            <li id='node19' model_type='node19'>字段类型转换</li>
                                            <li id='node20' model_type='node20'>字符提取</li>
                                            <li id='node21' model_type='node21'>数值运算</li>
                                            <li id='node22' model_type='node22'>文本合并</li>
                                            <li id='node23' model_type='node23'>字符分割</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <p class='typetitle'>
                                        <span class="icon expand-icon glyphicon glyphicon-minus"></span>&nbsp;&nbsp;输出
                                    </p>

                                    <ul id="leftMenu3">
                                        <!-- <li id='node9' model_type='node9'>CSV文件</li>
                                        <li id='node10' model_type='node10'>Excel文件</li> -->
                                        <li id='node26' model_type='node26'>数据表输出</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-10 col-sm-10 bd-right">
                    <div class='conhd'>
                        <!-- <p @click='jump1'><span class="glyphicon glyphicon-cog"></span>&nbsp;设置</p> -->
                        <p @click='run'>
                            <span class="glyphicon glyphicon-play"></span>&nbsp;运行</p>
                        <!-- <p><span class="glyphicon glyphicon-pause"></span>&nbsp;暂停</p> -->
                        <p data-toggle="modal" data-target="#myModal">
                            <span class="glyphicon glyphicon-save"></span>&nbsp;保存</p>
                    </div>
                    <div id="containers"></div>
                    <!-- <div class='conft'>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="日志" name="first">日志</el-tab-pane>
                            <el-tab-pane label="步骤度量" name="second">步骤度量</el-tab-pane>
                            <el-tab-pane label="数据预览" name="third">数据预览</el-tab-pane>
                        </el-tabs>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- 保存功能的弹出框 -->
        <div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog  tasksave">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">保存任务</h4>
                    </div>
                    <div class="modal-body">
                        <div style="width:100%;padding:0 1%">
                            <el-form :label-position="labelPosition" label-width="70px" :model="form">
                                <el-form-item label="任务名称">
                                    <el-input v-model="taskName"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="功能描述">
                                    <el-input type="textarea" v-model="taskDes"></el-input>
                                </el-form-item> -->

                            </el-form>
                            <div class="connbtn2" style="margin-top:20px;">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="saveTask">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 输入综合模态框（Modal） -->
        <div class="modal fade" id="myModalall" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:50%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">输入文件选择</h4>
                    </div>
                    <div class="modal-body">
                        <div style="width:100%;padding:0 1%">
                            <el-form :label-position="labelPosition" label-width="90px" :model="form">

                                <el-form-item label="文件名称">

                                    <el-autocomplete style="width:100%" class="inline-input" v-model="inputNameAll" :fetch-suggestions="querySearch" placeholder="请输入文件名" @select="handleSelect"></el-autocomplete>

                                </el-form-item>

                            </el-form>
                            <div class="connbtn">
                                <router-link to="/dataProcessing/dataCleaning">
                                    <el-button data-dismiss="modal" type="primary" style="margin-right:30px">确定</el-button>
                                </router-link>
                                <el-button data-toggle="modal" data-target="#myModallook" @click="look">预览</el-button>
                            </div>

                        </div>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--综合模态框输出-->
        <div class="modal fade" id="myModalout" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                            <el-form :label-position="labelPosition" label-width="90px" :model="form">
                                <el-form-item label="输出表名称">
                                    <el-input v-model="outputNameAll"></el-input>
                                </el-form-item>

                            </el-form>
                            <div class="connbtn2">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
        <!--excel模态框输出-->
        <div class="modal fade" id="myModalout2" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:40%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">表输出设置——Excel文件</h4>
                    </div>
                    <div class="modal-body">

                        <div style="width:100%;padding:0 1%">
                            <el-form :label-position="labelPosition" label-width="90px" :model="form">
                                <el-form-item label="输出表名称">
                                    <el-input v-model="outputName2"></el-input>
                                </el-form-item>

                            </el-form>
                            <div class="connbtn2">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 模态框（Modaledit） -->
        <div class="modal fade" id="myModaledit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div style="width:50%;height:100%;margin:0 0 0 40%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">编辑</h4>
                    </div>
                    <div class="modal-body">
                        <div id="div2" style="display: none">

                            <div style="padding:0 10%">
                                <el-form :label-position="labelPosition" label-width="90px" :model="form">
                                    <div style="overflow:hidden">
                                        <div style="width:480px" class="cd3-left">
                                            <p>设置</p>
                                            <div class="cd3-form">
                                                <el-form :label-position="labelPosition" label-width="90px" :model="formLabelAlign">
                                                    <el-form-item label="主机名称">
                                                        <el-input v-model="formLabelAlign.name"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="数据库名称">
                                                        <el-input v-model="formLabelAlign.region"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="端口号">
                                                        <el-input v-model="formLabelAlign.type"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="用户名">
                                                        <el-input v-model="formLabelAlign.type"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="密码">
                                                        <el-input v-model="formLabelAlign.type"></el-input>
                                                    </el-form-item>
                                                </el-form>

                                            </div>
                                        </div>
                                    </div>
                                </el-form>

                            </div>
                        </div>
                        <div id="div1" style="display:block">

                            <div style="padding:0 10%">
                                <el-form :label-position="left" label-width="70px" :model="form">
                                    <el-form-item label="连接名称">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <div style="overflow:hidden">
                                        <div style="width:400px" class="cd3-left">
                                            <p>连接类型</p>
                                            <div class="con-type">
                                                <ul>
                                                    <li v-for="(list, index) in list_type" :class="{'cd3-active':ind === index}" @click="changeBgc(index)">{{list}}</li>
                                                </ul>
                                            </div>
                                            <p>连接方式</p>
                                            <div class="con-fun">

                                                <ul>
                                                    <li v-for="(list, index) in list_fun" :class="{'cd3-active':ind2 === index}" @click="changeBgc2(index)">{{list}}</li>
                                                </ul>

                                            </div>
                                        </div>

                                    </div>
                                </el-form>
                                <!--<div class="connbtn">
                                            <el-button type="primary" style="margin-right:30px" @click="alert">测试</el-button>
                                            <el-button data-dismiss="modal" style="margin-right:30px">确定</el-button>
                                            <el-button data-dismiss="modal" style="margin-right:30px">取消</el-button>
                                        </div>-->
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <el-button type="primary" style="margin-right:20px;display: none" @click="setlink" id="pre">上一步</el-button>
                        <el-button type="primary" style="margin-right:20px;display:none;" @click="alert" id="test">测试</el-button>
                        <el-button data-dismiss="modal" style="margin-right:20px;display: none" id="sure">确定</el-button>
                        <el-button type="primary" style="margin-right:20px" @click="setdb" id="next">下一步</el-button>
                        <el-button data-dismiss="modal" style="margin-right:20px" id="deny">取消</el-button>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--模框转换-->
        <div class="modal fade" id="myModaltrans" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——值替换</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">
                            <el-form :label-position="labelPosition2" label-width="140px" :model="form2">
                                <el-form-item label="步骤名称">
                                    <el-input v-model="form2.name"></el-input>
                                </el-form-item>
                                <el-form-item label="使用的字段">

                                    <el-select v-model="form2.type" placeholder="请选择字段" style="width:100%;">
                                        <el-option label="PREG_AGE" value="PREG_AGE"></el-option>
                                        <el-option label="PREG_SEX" value="PREG_SEX"></el-option>
                                    </el-select>

                                </el-form-item>
                                <el-form-item label="不匹配时的默认值">
                                    <el-input v-model="form2.default"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="bar">
                                <div class="bar-title">
                                    <p>字段值</p>
                                    <el-button type="primary" v-on:click="add" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData3" height="250" border>
                                    <el-table-column label="#" prop="id">

                                    </el-table-column>
                                    <el-table-column prop="name" label="源值">
                                        <template scope="scope">

                                            <el-input v-model="tableData3[scope.$index].sourcedata"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="目标值">
                                        <template scope="scope">

                                            <el-input v-model="tableData3[scope.$index].targetdata"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--忽略字段-->
        <div class="modal fade" id="myModaltrans7" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——忽略字段</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">

                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-form-item label="字段名：">
                                        <el-checkbox-group v-model="checkList">
                                            <el-checkbox v-for="item in columnList" :label="item"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-form>

                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--去除重复字段-->
        <div class="modal fade" id="myModaltrans6" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:40%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——去除重复记录</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要去除重复记录的列</p>
                                    <el-button type="primary" v-on:click="add6" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="removeCol" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="removeCol[scope.$index]" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--填充空值-->
        <div class="modal fade" id="myModaltrans8" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——填充空值</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行空值替换的列并输入替换值</p>
                                    <el-button type="primary" v-on:click="add8" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData8" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData8[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="填充值">
                                        <template scope="scope">

                                            <el-input v-model="tableData8[scope.$index].targetdata"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 数据分段 -->
        <div class="modal fade" id="myModaltrans11" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——数据分段</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行分段的字段并输入分段规则和新字段</p>
                                    <el-button type="primary" v-on:click="add2" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData2" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData2[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="rule" label="分层规则">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData2[scope.$index].rule" placeholder="请选择规则" style="width:100%;">
                                                    <el-option v-for="item in rules" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="分层数">
                                        <template scope="scope">

                                            <el-input v-model="tableData2[scope.$index].targetdata"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="新字段名">
                                        <template scope="scope">

                                            <el-input v-model="tableData2[scope.$index].sourcedata2"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 条件筛选 -->
        <div class="modal fade" id="myModaltrans12" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——条件筛选</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择筛选条件</p>
                                    <el-button type="primary" v-on:click="add4" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData4" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData4[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="fuhao" label="符号">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData4[scope.$index].targetdata" placeholder="请选择符号" style="width:100%;">
                                                    <el-option label=">" value=">"></el-option>
                                                    <el-option label="<" value="<"></el-option>
                                                    <el-option label="=" value="="></el-option>
                                                    <el-option label="≥" value=">="></el-option>
                                                    <el-option label="≤" value="<="></el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="value" label="值">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData4[scope.$index].sourcedata2" placeholder="请选择值" style="width:100%;">
                                                    <el-option v-for="item in tableData4[scope.$index].valueList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
        <!--记录排序-->
        <div class="modal fade" id="myModaltrans13" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——记录排序</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行排序的列并选择排序规则</p>
                                    <el-button type="primary" v-on:click="add5" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData5" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData5[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="排序规则">
                                        <template scope="scope">

                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData5[scope.$index].targetdata" placeholder="请选择排序规则" style="width:100%;">
                                                    <el-option v-for="item in sortList" :label="item[0]" :value="item[1]">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
        <!--模态框预览-->
        <div class="modal fade" id="myModallook" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%;margin:5% 0 0 40%" class="modal-dialog">
                <div style="padding-bottom:50px" class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">预览</h4>
                    </div>
                    <div class="modal-body">

                        <el-table v-loading="loading" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 80%;margin:10px 10%;" height="500">
                            <el-table-column v-for="item in tablehead" :prop="item.name" :label="item.name">
                            </el-table-column>
                        </el-table>
                        <div class="Pagination" style="text-align: left;margin-top: 10px; float:right; margin-right: 10%">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="tableData.length">
                            </el-pagination>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--重新编码（相同变量）-->
        <div class="modal fade" id="myModaltrans18" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:40%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——重新编码（相同变量）</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择需要进行编码的列</p>
                                    <el-button type="primary" v-on:click="add18" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="codeSame" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="codeSame[scope.$index]" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--查询重复记录-->
        <div class="modal fade" id="myModaltrans17" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:40%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——查询重复记录</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要查询重复记录的列</p>
                                    <el-button type="primary" v-on:click="add17" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="SearchDup" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="SearchDup[scope.$index]" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--重新编码（不同变量）-->
        <div class="modal fade" id="myModaltrans14" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——重新编码（不同变量）</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行重新编码的列并输入新列名</p>
                                    <el-button type="primary" v-on:click="add14" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData14" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData14[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="新字段名">
                                        <template scope="scope">

                                            <el-input v-model="tableData14[scope.$index].targetdata"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 重新赋值 -->
        <div class="modal fade" id="myModaltrans16" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——重新赋值</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择查询的列名、查询值和要替换的值</p>
                                    <el-button type="primary" v-on:click="add16" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData16" height="250" border>

                                    <el-table-column prop="name" label="查询列名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData16[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="查询值">
                                        <template scope="scope">

                                            <el-input v-model="tableData16[scope.$index].targetdata"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="替换值">
                                        <template scope="scope">

                                            <el-input v-model="tableData16[scope.$index].sourcedata2"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--添加记录-->
        <div class="modal fade" id="myModaltrans15" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——添加记录</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>添加记录</p>
                                    <el-button type="primary" v-on:click="add15" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData15" height="250" border>

                                    <el-table-column v-for="(item,index) in columnList" :label="item" :property="item">
                                        <template scope="scope">

                                            <el-input v-model="tableData15[scope.$index][index]"></el-input>

                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showadd">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--字段类型转换-->
        <div class="modal fade" id="myModaltrans19" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——字段类型转换</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行类型转换的字段并选择转换类型</p>
                                    <el-button type="primary" v-on:click="add19" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData19" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData19[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="转换类型">
                                        <template scope="scope">

                                            <el-select v-model="tableData19[scope.$index].targetdata" placeholder="请选择类型">
                                                <el-option label="数值型" value="0"></el-option>
                                                <el-option label="字符型" value="1"></el-option>
                                            </el-select>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 字符提取 -->
        <div class="modal fade" id="myModaltrans20" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——字符提取</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要提取字符的列名、提取位置和要提取位数</p>
                                    <el-button type="primary" v-on:click="add20" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData20" height="250" border>

                                    <el-table-column prop="name" label="选择列名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData20[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="address" label="选择位置">
                                        <template scope="scope">

                                            <el-select v-model="tableData20[scope.$index].targetdata" placeholder="请选择位置">
                                                <el-option label="左" value="0"></el-option>
                                                <el-option label="右" value="1"></el-option>
                                            </el-select>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="num" label="个数">
                                        <template scope="scope">

                                            <el-input v-model="tableData20[scope.$index].sourcedata2"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="new" label="新字段名">
                                        <template scope="scope">

                                            <el-input v-model="tableData20[scope.$index].new"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 数值运算 -->
        <div class="modal fade" id="myModaltrans21" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——数值运算</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行数值运算的字段及运算方式</p>
                                    <el-button type="primary" v-on:click="add21" style="float:right">添加一条</el-button>
                                </div>

                                <el-radio v-model="radio" label="0">字段&amp;字段</el-radio>
                                <el-radio v-model="radio" label="1">字段&amp;数值</el-radio>
                                <el-radio v-model="radio" label="2">数值&amp;字段</el-radio>
                                <br /><br />

                                <el-table :data="tableData21" height="250" border>

                                    <el-table-column prop="name" label="字段名" v-if="radio == '0'||radio=='1'">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-if="radio == '0'||radio=='1'" v-model="tableData21[scope.$index].sourcedata" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="radio =='2'" prop="radio" label="数值">
                                        <template scope="scope">

                                            <el-input v-if="radio =='2'" v-model="tableData21[scope.$index].sourcedata"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="fuhao" label="符号">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData21[scope.$index].targetdata" placeholder="请选择符号" style="width:100%;">
                                                    <el-option label="+" value="+"></el-option>
                                                    <el-option label="-" value="-"></el-option>
                                                    <el-option label="×" value="*"></el-option>
                                                    <el-option label="÷" value="/"></el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="radio == '0'||radio=='2'" prop="radio" label="字段名">
                                        <template scope="scope">
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-if="radio =='0'||radio=='2'" v-model="tableData21[scope.$index].sourcedata2" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="radio =='1'" prop="radio" label="数值">
                                        <template scope="scope">

                                            <el-input v-if="radio =='1'" v-model="tableData21[scope.$index].sourcedata2"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="new" label="新字段名">
                                        <template scope="scope">

                                            <el-input v-model="tableData21[scope.$index].new"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 文本合并 -->
        <div class="modal fade" id="myModaltrans22" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——文本合并</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要进行文本合并的字段及合并方式</p>
                                    <el-button type="primary" v-on:click="add22" style="float:right">添加一条</el-button>
                                </div>

                                <el-radio v-model="radio1" label="0">字段&amp;字段</el-radio>
                                <el-radio v-model="radio1" label="1">字段&amp;字符</el-radio>
                                <br /><br />

                                <el-table :data="tableData22" height="250" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData22[scope.$index].name1" placeholder="请选择字段1" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name1" label="字段名" v-if="radio1 == '0'">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-if="radio1 == '0'" v-model="tableData22[scope.$index].name2" placeholder="请选择字段2" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="weizhi" label="位置" v-if="radio1 == '1'">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form" v-if="radio1 == '1'">

                                                <el-select v-if="radio1 == '1'" v-model="tableData22[scope.$index].location" placeholder="请选择位置" style="width:100%;">
                                                    <el-option label="左" value="0"></el-option>
                                                    <el-option label="右" value="1"></el-option>
                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="radio1 =='1'" prop="zifu" label="字符">
                                        <template scope="scope">

                                            <el-input v-if="radio1 =='1'" v-model="tableData22[scope.$index].name2"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="new" label="新字段名">
                                        <template scope="scope">

                                            <el-input v-model="tableData22[scope.$index].newname"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 字符分割 -->
        <div class="modal fade" id="myModaltrans23" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——字符分割</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要分割的列名、分割字符和两个新字段名</p>
                                    <el-button type="primary" v-on:click="add23" style="float:right">添加一条</el-button>
                                </div>

                                <el-table :data="tableData23" height="250" border>

                                    <el-table-column prop="name" label="列名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData23[scope.$index].sourcedata1" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zifu" label="分割字符">
                                        <template scope="scope">

                                            <el-input v-model="tableData23[scope.$index].sourcedata2"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="new1" label="新字段名1">
                                        <template scope="scope">

                                            <el-input v-model="tableData23[scope.$index].targetdata1"></el-input>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="new1" label="新字段名2">
                                        <template scope="scope">

                                            <el-input v-model="tableData23[scope.$index].targetdata2"></el-input>

                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!--自定义数据分段-->
        <div class="modal fade" id="myModaltrans24" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div style="width:60%;height:100%" class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">转换设置——自定义数据分段</h4>
                    </div>
                    <div class="modal-body">

                        <div style="padding:0 10%">

                            <div class="bar">
                                <div class="bar-title">
                                    <p>选择要数据分段的字段，定义新字段名，并定义分段规则</p>
                                    <!-- <el-button type="primary" v-on:click="add19" style="float:right">添加一条</el-button> -->
                                </div>
                                <el-table :data="tableData24_1" height="115" border>

                                    <el-table-column prop="name" label="字段名">
                                        <template scope="scope">

                                            <!-- <el-input v-model="tableData3[scope.$index].sourcedata"></el-input> -->
                                            <el-form :label-position="labelPosition" label-width="130px" :model="form">

                                                <el-select v-model="tableData24_1[scope.$index].name" placeholder="请选择字段" style="width:100%;">
                                                    <el-option v-for="item in columnList" :label="item" :value="item">
                                                    </el-option>

                                                </el-select>

                                            </el-form>

                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="newname" label="新字段名">
                                        <template scope="scope">
                                            <el-input v-model="tableData24_1[scope.$index].newname"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <div class="bar-title">
                                    <el-button type="primary" v-on:click="add24" style="float:right">添加一条</el-button>
                                </div>
                                <el-table :data="tableData24" height="250" border>

                                    <el-table-column prop="fanwei" label="范围(包括所选值)">
                                        <template scope="scope">
                                            <el-select v-model="tableData24[scope.$index].from" placeholder="请选择值" style="width:40%;">
                                                <el-option v-for="item in valueList" :label="item" :value="item">
                                                </el-option>
                                            </el-select>
                                            &nbsp;&nbsp;&nbsp;～&nbsp;&nbsp;&nbsp;
                                            <el-select v-model="tableData24[scope.$index].to" placeholder="请选择值" style="width:40%;">
                                                <el-option v-for="item in valueList" :label="item" :value="item">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="biaoji" label="分段标记">
                                        <template scope="scope">
                                            <el-input v-model="tableData24[scope.$index].tab"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table>

                                <el-row>
                                    <el-col :span="12">
                                        <el-input :disabled="true" placeholder="其他值分段标记"></el-input>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-input v-model="others"></el-input>
                                    </el-col>
                                </el-row>
                            </div>

                            <div class="connbtn">
                                <el-button data-dismiss="modal" type="primary" style="margin-right:30px" @click="showList">确定</el-button>
                                <el-button data-dismiss="modal">取消</el-button>
                            </div>
                        </div>

                    </div>
                    <!-- <div class="modal-footer">
                     &lt;!&ndash;    <div class="connbtn">
                             <router-link to="/prepro/taskboard"><el-button type="primary" style="margin-right:30px">确定</el-button></router-link>
                             <router-link to="/prepro/conndata/conndata2"><el-button>预览</el-button></router-link>
                         </div>&ndash;&gt;
                     </div>-->
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>

        <!-- 进度条的弹出框 -->
        <div class="modal fade " id="progressModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog  tasksave">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel" style="font-size:16px;color:#595e66">运行中，请等待....</h4>
                    </div>
                    <div class="modal-body">
                        <div style="width:100%;padding:0 1%;text-align:center">
                            <img src="../../../static/img/progress.gif" style="height:15px;">
                        </div>
                    </div>

                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
        </div>
    </div>

</template>

<script>
import $ from "jquery";
import "../../../static/js/demo.js"
export default {
  data() {
    return {
      excelName    : sessionStorage.getItem("dataName"),
      realname     : sessionStorage.getItem("dataName"),
      csvS         : [],
      excelS       : [],
      allS         : [],
      loading      : true,
      others       : "",                                   //其他值分段标记
      radio        : "0",
      radio1       : "0",
      activeName   : "first",
      labelPosition: "right",
      tablehead    : [],
      datatosend   : {},
      allList      : [],
      csvList      : [],
      excelList    : [],
      hiveList     : [],
      columnList   : [],
      columnList1  : ["列1", "列2", "列3", "列4"],
      checkList    : [],
      inputName    : "",
      inputNameAll : "",
      inputName_xls: "",
      inputHive    : "",
      outputName   : "",
      outputName2  : "",
      outputNameAll: "",
      removeCol    : [""],
      codeSame     : [""],
      SearchDup    : [""],
      left         : "left",
      valueList    : [],                                   //自定义数据分段中的值
      form         : {
        name  : "",
        region: "",
        type  : [],
        desc  : ""
      },
      formLabelAlign: {
        name  : "",
        region: "",
        type  : ""
      },
      labelPosition2: "right",
      form2         : {
        name   : "",
        region : "",
        type   : "",
        desc   : "",
        default: ""
      },
      labelPosition3: "top",
      tableData2    : [
        {
          id         : 1,
          sourcedata : "",
          targetdata : "",
          sourcedata2: "",
          rule       : ""
        }
      ],
      tableData16: [
        {
          id         : 1,
          sourcedata : "",
          targetdata : "",
          sourcedata2: ""
        }
      ],
      tableData3: [
        {
          id        : 1,
          sourcedata: "",
          targetdata: ""
        }
      ],
      tableData4: [
        {
          id         : 1,
          sourcedata : "",
          targetdata : "",
          sourcedata2: "",
          valueList  : []
        }
      ],
      tableData21: [
        {
          id         : 1,
          sourcedata : "",
          targetdata : "",
          sourcedata2: "",
          new        : ""
        }
      ],
      tableData5: [
        {
          sourcedata: "",
          targetdata: ""
        }
      ],
      tableData8: [
        {
          id        : 1,
          sourcedata: "",
          targetdata: ""
        }
      ],
      tableData14: [
        {
          id        : 1,
          sourcedata: "",
          targetdata: ""
        }
      ],
      tableData15: [[]],
      tableData19: [
        {
          id        : 1,
          sourcedata: "",
          targetdata: ""
        }
      ],
      tableData20: [
        {
          id         : 1,
          sourcedata : "",
          targetdata : "",
          sourcedata2: "",
          new        : ""
        }
      ],
      tableData22: [
        {
          name1   : "",
          name2   : "",
          location: "",
          newname : ""
        }
      ],
      tableData23: [
        {
          sourcedata1: "",
          sourcedata2: "",
          targetdata1: "",
          targetdata2: ""
        }
      ],
      tableData24_1: [
        {
          name   : "",
          newname: ""
        }
      ],
      tableData24: [
        {
          from: "",
          to  : "",
          tab : ""
        }
      ],
      sortList   : [["升序", 1], ["降序", 0]],
      id         : 1,
      id2        : 1,
      id4        : 1,
      id5        : 1,
      id8        : 1,
      id14       : 1,
      id16       : 1,
      id15       : 1,
      id19       : 1,
      id20       : 1,
      id21       : 1,
      show1      : true,
      show2      : false,
      list_type  : ["Hadoop Hive", "Hadoop Hive2", "NoSQL", "Oracle"],
      list_fun   : ["Native(JDBC)", "ODBC", "OCI", "JNDI"],
      ind        : 0,
      ind2       : 0,
      pagesize   : 6,                                                    //每页的条数限制
      currentPage: 1,

      tableData   : [],
      taskName    : "",
      taskDes     : "",
      flag        : "",
      inputResult : "",
      outputResult: "",
      flag2       : "",
      rules       : [
        {
          value: "0",
          label: "等比例"
        },
        {
          value: "1",
          label: "等个数"
        }
      ],
      success: false,
      taskinfo:"",
    };
  },
  mounted() {
    $(".el-select .el-input").css("width", "initial");
      this.inputNameAll = this.excelName;
      this.allList.push(this.excelName);
      for (var i = 0; i < this.allList.length; i++) {
        var obj       = { value: "", real: "" };
            obj.value = this.allList[i].split(".")[0];
            obj.real  = this.allList[i];
        this.allS.push(obj);
        this.realname = obj;
      }
                        this.allS = [];
                    var len       = this.allList.length;
                    var arr       = [];
        for (var i = 0; i < len; i++) {
          //如果字符串中不包含目标字符会返回-1
          if (this.allList[i].indexOf(this.inputNameAll) >= 0) {
            arr.push(this.allList[i]);
          }
        }
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var obj       = { value: "", real: "" };
              obj.value = arr[i].split(".")[0];
              obj.real  = arr[i];
          this.allS.push(obj);
        }

        console.log(this.realname);
        if (this.realname.real.split(".")[1] == "csv") {
          this.$http
            .get("CAD/csv_columns?name=" + this.realname.real)
            .then(response => {
              var data = JSON.parse(response.body);
              console.log(data);
                                                                                  this.columnList = data.data;
                                                                                  this.columnList = this.columnList.split(",");
                                                                 this.tableData15[0].length       = 0;
              console.log(this.columnList.length);
              console.log(this.tableData15[0].length);
              for (var i = 0; i < this.columnList.length; i++) {
                this.tableData15[0].push("");
              }
              console.log(this.columnList.length);
              console.log(this.tableData15[0].length);
              for (var i = 0; i < this.columnList.length; i++) {
                this.columnList[i] = this.columnList[i]
                  .replace(/\'/g, "")
                  .replace(/\[/g, "")
                  .replace(/\]/g, "");
                console.log(this.columnList[i]);
              }
            });
        } else {
          this.$http
            .get("CAD/excel_columns?name=" + this.realname.real)
            .then(response => {
              var data = JSON.parse(response.body);
              console.log(data);
                                                                                  this.columnList = data.data;
                                                                                  this.columnList = this.columnList.split(",");
                                                                 this.tableData15[0].length       = 0;
              console.log(this.columnList.length);
              console.log(this.tableData15[0].length);
              for (var i = 0; i < this.columnList.length; i++) {
                this.tableData15[0].push("");
              }
              console.log(this.columnList.length);
              console.log(this.tableData15[0].length);
              for (var i = 0; i < this.columnList.length; i++) {
                this.columnList[i] = this.columnList[i]
                  .replace(/\'/g, "")
                  .replace(/\[/g, "")
                  .replace(/\]/g, "");
                console.log(this.columnList[i]);
              }
            });
        }
  },
  created: function() {
    // $('#container').html('');
    this.$nextTick(() => {
      setLeftMenu();
      //监听新的连接
      instance.bind("connection", function(connInfo, originalEvent) {
        init(connInfo.connection);
      });
      instance.bind("dblclick", function(conn, originalEvent) {
        if (
          confirm(
            "要删除从 " +
              conn.source.getElementsByTagName("span")[0].innerHTML +
              " —— " +
              conn.target.getElementsByTagName("span")[0].innerHTML +
              " 的连接么?"
          )
        ) {
          instance.detach(conn);
        }
      });
    });
  },
  methods: {
    //返回
    back() {
      this.$router.push({
        name  : "proTaskboard",
        params: { name: this.excelName }
      });
    },
    //分页
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    showList() {
      console.log(this.tableData21);
      var arr_21 = this.radio + ";";

      for (var i = 0; i < this.tableData21.length; i++) {
        var str_21 = "";
        for (var key in this.tableData21[i]) {
          if (key != "id" && key != "new") {
            str_21 = str_21 + this.tableData21[i][key].toString().trim() + ",";
          } else if (key == "new") {
            str_21 = str_21 + this.tableData21[i][key].toString().trim() + ";";
          }
        }
        arr_21 = arr_21 + str_21;
      }
      console.log(arr_21);
    },
    showadd() {
      console.log(this.tableData15);
      var arr_15 = "";
      for (var i = 0; i < this.tableData15.length; i++) {
        for (var j = 0; j < this.tableData15[i].length; j++) {
          if (j == this.tableData15[i].length - 1) {
            arr_15 = arr_15 + this.tableData15[i][j] + ";";
          } else {
            arr_15 = arr_15 + this.tableData15[i][j] + ",";
          }
        }
      }
      console.log(arr_15);
    },
    querySearch(queryString, cb) {
      var allS = this.allS;
      cb(allS);
    },
    querySearchExcel(queryString, cb) {
      var excelS = this.excelS;
      cb(excelS);
    },
    run() {
      function getElementByAttr(tag, attr, value) {
        var aElements = document.getElementsByTagName(tag);
        var aEle      = [];
        for (var i = 0; i < aElements.length; i++) {
          if (aElements[i].getAttribute(attr) == value) aEle.push(aElements[i]);
        }
        return aEle;
      }
      //在删除完一个拖拽对象后，要真正删除其对应的数据，可以通过以下方式判断在运行时这个对象到底是否还存在，以此来确定它对应的值是否为空
      var node1 = getElementByAttr("div", "data-id", "node1_model");
      //alert(node1.length);

      // this.datatosend = {'read_name':encodeURI(encodeURI(this.inputName.trim())),'checkList':encodeURI(encodeURI(this.checkList)),'removeCol':encodeURI(encodeURI(this.removeCol.trim())),'fillNan':encodeURI(encodeURI(this.tableData3)),'write_name':encodeURI(encodeURI(this.outputName.trim()))};
      // console.log(JSON.stringify(this.datatosend));
      // this.datatosend = JSON.stringify(this.datatosend);
      //填充空值
      var arr = [];
      for (var i = 0; i < this.tableData8.length; i++) {
        for (var key in this.tableData8[i]) {
          var arr2 = [];
          var str  = this.tableData8[i][key].toString();
          console.log(str);
          arr2.push(str.trim());
          arr.push(arr2);
        }
      }

      //重新编码（不同变量）
      var arr_14 = "";

      for (var i = 0; i < this.tableData14.length; i++) {
        var str_14 = "";
        for (var key in this.tableData14[i]) {
          if (key != "id") {
            str_14 = str_14 + this.tableData14[i][key].toString().trim() + ",";
          }
        }
        arr_14 = arr_14 + str_14;
      }

      //字段类型转换
      var arr_19 = "";

      for (var i = 0; i < this.tableData19.length; i++) {
        var str_19 = "";
        for (var key in this.tableData19[i]) {
          if (key != "id" && key != "targetdata") {
            str_19 = str_19 + this.tableData19[i][key].toString().trim() + ",";
          } else if (key == "targetdata") {
            str_19 = str_19 + this.tableData19[i][key].toString().trim() + ";";
          }
        }
        arr_19 = arr_19 + str_19;
      }

      //记录排序
      var arr_sort = [];
      for (var i = 0; i < this.tableData5.length; i++) {
        for (var key in this.tableData5[i]) {
          var arr2_sort = [];
          var str       = this.tableData5[i][key].toString();
          console.log(str);
          arr2_sort.push(str.trim());
          arr_sort.push(arr2_sort);
        }
      }

      //添加记录
      var arr_15 = "";
      for (var i = 0; i < this.tableData15.length; i++) {
        for (var j = 0; j < this.tableData15[i].length; j++) {
          if (j == this.tableData15[i].length - 1) {
            arr_15 = arr_15 + this.tableData15[i][j] + ";";
          } else {
            arr_15 = arr_15 + this.tableData15[i][j] + ",";
          }
        }
      }

      // 数据分段
      var arr_11 = "";

      for (var i = 0; i < this.tableData2.length; i++) {
        var str_11 = "";
        for (var key in this.tableData2[i]) {
          if (key != "id" && key != "rule") {
            str_11 = str_11 + this.tableData2[i][key].toString().trim() + ",";
          } else if (key == "rule") {
            str_11 = str_11 + this.tableData2[i][key].toString().trim() + ";";
          }
        }
        arr_11 = arr_11 + str_11;
      }

      // 重新赋值
      var arr_16 = "";

      for (var i = 0; i < this.tableData16.length; i++) {
        var str_16 = "";
        for (var key in this.tableData16[i]) {
          if (key != "id" && key != "sourcedata2") {
            str_16 = str_16 + this.tableData16[i][key].toString().trim() + ",";
          } else if (key == "sourcedata2") {
            str_16 = str_16 + this.tableData16[i][key].toString().trim() + ",";
          }
        }
        arr_16 = arr_16 + str_16;
      }

      //字符提取
      var arr_20 = "";

      for (var i = 0; i < this.tableData20.length; i++) {
        var str_20 = "";
        for (var key in this.tableData20[i]) {
          if (key != "id" && key != "new") {
            str_20 = str_20 + this.tableData20[i][key].toString().trim() + ",";
          } else if (key == "new") {
            str_20 = str_20 + this.tableData20[i][key].toString().trim() + ";";
          }
        }
        arr_20 = arr_20 + str_20;
      }

      //数值运算
      var arr_21 = this.radio + ";";

      for (var i = 0; i < this.tableData21.length; i++) {
        var str_21 = "";
        for (var key in this.tableData21[i]) {
          if (key != "id" && key != "new") {
            str_21 = str_21 + this.tableData21[i][key].toString().trim() + ",";
          } else if (key == "new") {
            str_21 = str_21 + this.tableData21[i][key].toString().trim() + ";";
          }
        }
        arr_21 = arr_21 + str_21;
      }

      //字符分割
      var arr_23 = "";

      for (var i = 0; i < this.tableData23.length; i++) {
        var str_23 = "";
        for (var key in this.tableData23[i]) {
          if (key != "id" && key != "targetdata2") {
            str_23 = str_23 + this.tableData23[i][key].toString().trim() + ",";
          } else if (key == "targetdata2") {
            str_23 = str_23 + this.tableData23[i][key].toString().trim() + ";";
          }
        }
        arr_23 = arr_23 + str_23;
      }

      //条件筛选
      var arr_12 = "";

      for (var i = 0; i < this.tableData4.length; i++) {
        var str_12 = "";
        for (var key in this.tableData4[i]) {
          if (key != "id" && key != "sourcedata2" && key != "valueList") {
            str_12 = str_12 + this.tableData4[i][key].toString().trim() + ",";
          } else if (key == "sourcedata2") {
            str_12 = str_12 + this.tableData4[i][key].toString().trim() + ";";
          }
        }
        arr_12 = arr_12 + str_12;
      }

      //文本合并
      var arr_22 = this.radio1 + ";";

      for (var i = 0; i < this.tableData22.length; i++) {
        var str_22 = "";
        for (var key in this.tableData22[i]) {
          if (key != "id" && key != "newname") {
            str_22 = str_22 + this.tableData22[i][key].toString().trim() + ",";
          } else if (key == "newname") {
            str_22 = str_22 + this.tableData22[i][key].toString().trim() + ";";
          }
        }
        arr_22 = arr_22 + str_22;
      }

      //自定义数据分段
      var arr_24 = 
        this.tableData24_1[0].name.toString().trim() +
        ";" +
        this.tableData24_1[0].newname.toString().trim() +
        ";" +
        this.others.toString().trim() +
        ";";

      for (var i = 0; i < this.tableData24.length; i++) {
        var str_24 = "";
        for (var key in this.tableData24[i]) {
          str_24 = str_24 + this.tableData24[i][key].toString().trim() + ",";
        }
        arr_24 = arr_24 + str_24;
      }

      this.checkList = this.checkList.map(function(item) {
        return item.trim();
      });
      //去除重复记录
      for (var i = 0; i < this.removeCol.length; i++) {
        this.removeCol[i] = this.removeCol[i].trim();
      }
      var removeCol = this.removeCol.join();
      console.log(removeCol);

      //重新编码（相同变量）
      for (var i = 0; i < this.codeSame.length; i++) {
        this.codeSame[i] = this.codeSame[i].trim();
      }
      var codeSame = this.codeSame.join();
      console.log(codeSame);

      //查询重复记录
      for (var i = 0; i < this.SearchDup.length; i++) {
        this.SearchDup[i] = this.SearchDup[i].trim();
      }
      var SearchDup = this.SearchDup.join();
      console.log(SearchDup);

      if (
        this.inputNameAll == ""
        // &&
        // this.inputHive == "" &&
        // this.inputName_xls == ""
      ) {
        alert("请选择输入文件名");
        return false;
      }
      if (
        this.checkList.length == 0 &&
        removeCol == "" &&
        codeSame == "" &&
        SearchDup == "" &&
        arr_14 == "" &&
        arr[2][0] == "" &&
        arr_sort[0][0] == "" &&
        arr_11 == "" &&
        arr_16 == "" &&
        arr_12 == "" &&
        arr_15 == "" &&
        arr_19 == "" &&
        arr_20 == "" &&
        arr_21 == "" &&
        arr_22 == "" &&
        arr_23 == "" &&
        arr_24 == ""
      ) {
        alert("请设置转换规则");
        return false;
      }
      // if (this.outputName == "" && this.outputName2 == "") {
      if (this.outputNameAll == "") {
        alert("请填写输出文件名");
        return false;
      }
      if (this.realname.real.split(".")[1] == "csv") {
        this.flag         = "csv,csv";
        this.inputResult  = this.realname.real;
        this.outputResult = this.outputNameAll;
        this.flag2        = "csv";
      } else {
        this.flag         = "excel,csv";
        this.inputResult  = this.realname.real;
        this.outputResult = this.outputNameAll;
        this.flag2        = "csv";
      }
      //   $("#progressModal").modal("show");
      this.$http
        .get(
          "CAD/run_job?read_name=" +
            this.inputResult.trim() +
            "&checkList=" +
            this.checkList +
            "&removeCol=" +
            removeCol +
            "&codeSame=" +
            codeSame +
            "&SearchDup=" +
            SearchDup +
            "&fillNan=" +
            arr +
            "&sortList=" +
            arr_sort +
            "&cutRows=" +
            arr_12 +
            "&divides=" +
            arr_11 +
            "&write_name=" +
            this.outputResult.trim() +
            "&flag=" +
            this.flag +
            "&codeDiff=" +
            arr_14 +
            "&SearchReplace=" +
            arr_16 +
            "&addRow=" +
            arr_15 +
            "&change=" +
            arr_19 +
            "&charExtra=" +
            arr_20 +
            "&numCompute=" +
            arr_21 +
            "&textCombine=" +
            arr_22 +
            "&charSeg=" +
            arr_23 +
            "&selfDivides=" +
            arr_24
        )
        .then(response => {
          //   $("#progressModal").modal("hide");
          var data = response.body;
          console.log(data);
          var data = JSON.parse(data);
          // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {
        this.taskinfo = data.taskinfo;
          if (data.data == true) {
            alert("运行成功！请点击保存按钮保存输出文件");
            this.success = true;
          } else {
            this.success = false;
            if (data.detail) {
              alert(data.detail);
            } else {
              alert("操作不当！运行失败！请重新操作！");
            }
          }
        });
    },
    look() {
      this.loading   = true;
      this.tablehead = [];
      this.tableData = [];

      var flag = this.realname.real.split(".")[1];
      if (flag == "csv") {
        this.$http
          .get("CAD/csv_select?name=" + this.realname.real)
          .then(response => {
            // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

            var data = JSON.parse(response.body);
            console.log(data);
            this.tablehead = data.schema.fields;
            this.tableData = data.data;
            this.loading   = false;
          });
      } else {
        this.$http
          .get("CAD/excel_select?name=" + this.realname.real)
          .then(response => {
            // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

            var data = JSON.parse(response.body);
            console.log(data);
            this.tablehead = data.schema.fields;
            this.tableData = data.data;
            this.loading   = false;
          });
      }
      //   this.$http
      //     .get(this.$store.state.URL1 + "/csv_select?name=" + this.inputName)
      //     .then(response => {
      //       // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

      //       var data = JSON.parse(response.body);
      //       console.log(data);
      //       this.tablehead = data.schema.fields;
      //       this.tableData = data.data;
      //       this.loading = false;
      //     });
    },
    lookExcel() {
      this.loading   = true;
      this.tablehead = [];
      this.tableData = [];
      this.$http
        .get("CAD/excel_select?name=" + this.inputName_xls)
        .then(response => {
          // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

          var data = JSON.parse(response.body);
          console.log(data);
          this.tablehead = data.schema.fields;
          this.tableData = data.data;
          this.loading   = false;
        });
    },
    lookHive() {
      this.$http
        .get("CAD/hive_select?name=" + this.inputHive)
        .then(response => {
          // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

          var data = JSON.parse(response.body);
          console.log(data);
          this.tablehead = data.schema.fields;
          this.tableData = data.data;
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    jump1() {
      alert("test");
    },
    handleSelect(item) {
      console.log(item);
      this.realname = item;
      console.log(this.realname);
    },
    saveTask() {
      //   if (this.outputName == "" && this.outputName2 == "") {
      if (this.outputNameAll == "") {
        alert("请先执行完预处理流程");
        return false;
      }
      if (this.success == false) {
        alert("请执行正确的流程");
        return false;
      }
    //   $("#myModal").modal("toggle");
      $(".modal-backdrop.fade.in").remove();
        var userID = 66;
      console.log(sessionStorage.getItem("userId"));
      this.$http
        .get(
          "CAD/databaseProcess/save?user=" +
            userID +
            "&taskname=" +
            this.taskName +
            "&taskinfo=" +
            this.taskinfo +
            "&tablebefore=" +
            this.inputResult +
            "&tableafter=" +
            this.outputResult +
            "&flag=" +
            this.flag2
        )
        .then(response => {
          var data = JSON.parse(response.body);
          console.log(data);
          if (data.data == true) {
            alert("保存成功！");
            this.$router.push({ path: "/dataProcessing/proTaskboard" });
          } else {
            alert("保存失败！");
          }
        });
    },

    handleDelete(index, row) {
      row.splice(index, 1);
    },
    changeBgc: function(index) {
      this.ind = index;
    },
    changeBgc2: function(index) {
      this.ind2 = index;
    },
    alert() {
      alert("连接成功！");
    },
    setlink: function() {
      var a               = document.getElementById("div1");
          a.style.display = "block";
      var b               = document.getElementById("div2");
          b.style.display = "none";
      $("#test").css("display", "none");
      $("#sure").css("display", "none");
      $("#pre").css("display", "none");
      $("#next").css("display", "inline");
    },
    setdb: function() {
      var a               = document.getElementById("div1");
          a.style.display = "none";
      var b               = document.getElementById("div2");
          b.style.display = "block";
      $("#test").css("display", "inline");
      $("#sure").css("display", "inline");
      $("#pre").css("display", "inline");
      $("#next").css("display", "none");
    },
    add() {
                      this.id = this.id + 1;
                  var _data   = {
        id        : parseInt(this.id),
        sourcedata: "",
        targetdata: ""
      };
      this.tableData3.push(_data);
    },
    add8() {
                      this.id8 = this.id8 + 1;
                  var _data    = {
        id        : parseInt(this.id8),
        sourcedata: "",
        targetdata: ""
      };
      this.tableData8.push(_data);
    },
    add19() {
                      this.id19 = this.id19 + 1;
                  var _data     = {
        id        : parseInt(this.id19),
        sourcedata: "",
        targetdata: ""
      };
      this.tableData19.push(_data);
    },
    add14() {
                      this.id14 = this.id14 + 1;
                  var _data     = {
        id        : parseInt(this.id14),
        sourcedata: "",
        targetdata: ""
      };
      this.tableData14.push(_data);
    },
    add2() {
                      this.id2 = this.id2 + 1;
                  var _data    = {
        id         : parseInt(this.id2),
        sourcedata : "",
        targetdata : "",
        sourcedata2: "",
        rule       : ""
      };
      this.tableData2.push(_data);
    },
    add16() {
                      this.id16 = this.id16 + 1;
                  var _data     = {
        id         : parseInt(this.id16),
        sourcedata : "",
        targetdata : "",
        sourcedata2: ""
      };
      this.tableData16.push(_data);
    },
    add21() {
                      this.id21 = this.id21 + 1;
                  var _data     = {
        id         : parseInt(this.id21),
        sourcedata : "",
        targetdata : "",
        sourcedata2: "",
        new        : ""
      };
      this.tableData21.push(_data);
    },
    add22() {
      var _data = {
        name1   : "",
        name2   : "",
        location: "",
        newname : ""
      };
      this.tableData22.push(_data);
    },
    add20() {
                      this.id20 = this.id20 + 1;
                  var _data     = {
        id         : parseInt(this.id20),
        sourcedata : "",
        targetdata : "",
        sourcedata2: "",
        new        : ""
      };
      this.tableData20.push(_data);
    },
    add23() {
      var _data = {
        sourcedata1: "",
        sourcedata2: "",
        targetdata1: "",
        targetdata2: ""
      };
      this.tableData23.push(_data);
    },
    add15() {
      var _data = [];
      this.tableData15.push(_data);
    },
    add4() {
                      this.id4 = this.id4 + 1;
                  var _data    = {
        id         : parseInt(this.id4),
        sourcedata : "",
        targetdata : "",
        sourcedata2: ""
      };
      this.tableData4.push(_data);
    },
    add5() {
      var _data = {
        sourcedata: "",
        targetdata: ""
      };
      this.tableData5.push(_data);
    },
    add24() {
      var _data = {
        from: "",
        to  : "",
        tab : ""
      };
      this.tableData24.push(_data);
    },
    add6() {
      this.removeCol.push("");
    },
    add18() {
      this.codeSame.push("");
    },
    add17() {
      this.SearchDup.push("");
    },
    print() {
      console.log(this.tableData3);
    }
  },
  watch: {
    $route(to, from) {
      $("#containers").html("");
      this.$nextTick(() => {
        setLeftMenu();
        //监听新的连接
        instance.bind("connection", function(connInfo, originalEvent) {
          init(connInfo.connection);
        });
        instance.bind("dblclick", function(conn, originalEvent) {
          if (
            confirm(
              "要删除从 " +
                conn.source.getElementsByTagName("span")[0].innerHTML +
                " —— " +
                conn.target.getElementsByTagName("span")[0].innerHTML +
                " 的连接么?"
            )
          ) {
            instance.detach(conn);
          }
        });
      });
    },
    // inputNameAll: {
    //   handler: function() {
        
    // },
    tableData4: {
      handler: function(val, oldVal) {
        for (var i = 0; i < val.length; i++) {
          //alert('hhh');

          console.log(i);
          if (val[i]["sourcedata"] != "") {
            console.log(val[i]["sourcedata"]);
            this.inputResult = 
              this.inputName ||
              this.inputName_xls ||
              this.inputHive ||
              this.realname.real;
            //alert(this.inputResult);
            console.log(i);
            this.$http
              .get(
                "CAD/value_set?name=" +
                  this.inputResult +
                  "&col=" +
                  val[i]["sourcedata"].trim()
              )
              .then(response => {
                // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

                var data  = JSON.parse(response.body);
                var value = data.data.split(",");
                console.log(i);
                for (var j = 0; j < value.length; j++) {
                  value[j] = value[j]
                    .replace(/\'/g, "")
                    .replace(/\[/g, "")
                    .replace(/\]/g, "")
                    .replace(/ /g, "");
                }
                console.log(value);
                // this.valueList.length = 0;
                //this.valueList[i] = value;
                console.log(this.tableData4[i - 1]);
                //this.tableData4[i-1].id = value;
                console.log(this.tableData4[i - 1].valueList);
                this.tableData4[i - 1].valueList = value;
              });
          }
        }
      },
      deep: true
    },
    tableData24_1: {
      handler: function(val, oldVal) {
        this.inputResult = 
          this.inputName ||
          this.inputName_xls ||
          this.inputHive ||
          this.realname.real;
        //alert(this.inputResult);

        this.$http
          .get(
            "CAD/value_set?name=" +
              this.inputResult +
              "&col=" +
              val[0]["name"].trim()
          )
          .then(response => {
            // this.$http.get(BASE_URL+'all/columns?flag=kylin&table_name='+this.tableName).then((response) => {

            var data  = JSON.parse(response.body);
            var value = data.data.split(",");
            for (var j = 0; j < value.length; j++) {
              value[j] = value[j]
                .replace(/\'/g, "")
                .replace(/\[/g, "")
                .replace(/\]/g, "")
                .replace(/ /g, "");
            }
            console.log(value);
            this.valueList = value;
          });
      },
      deep: true
    }
  },
  radio(val, oldVal) {
    //普通的watch监听
    console.log("radio: " + val, oldVal);
    this.tableData21 = [
      {
        id         : 1,
        sourcedata : "",
        targetdata : "",
        sourcedata2: "",
        new        : ""
      }
    ];
  },
  radio1(val, oldVal) {
    //普通的watch监听
    console.log("radio1: " + val, oldVal);
    this.tableData22 = [
      {
        name1   : "",
        name2   : "",
        location: "",
        newname : ""
      }
    ];
  }
};
</script>
<style scoped>
.container-fluid {
  margin-top: 30px;
}
.bd-right {
  height: 90vh;
}
.conhd {
  height         : 5%;
  width          : 100%;
  display        : flex;
  align-items    : center;
  justify-content: flex-end;
  font-size      : 16px;
}
.conhd p {
  margin-right: 30px;
  color       : #428bca;
  cursor      : pointer;
}
.conft {
  margin-top: 2%;
  height    : 25%;
  width     : 100%;
  border    : 1px solid#ddd;
}
#tab-first,
#tab-second,
#tab-third {
  text-align: center;
}
#containers {
  height          : 85%;
  position        : relative;
  border          : 1px solid #ddd;
  background-color: #ffffff;
  border-radius   : 5px;
  z-index         : 0;
  overflow        : auto;
}
#containers .model {
  border       : 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 0;
  min-width    : 160px;
}
#containers .model h4 {
  text-align      : center;
  background-image: none;
  font-size       : 16px;
  color           : #fff;

  margin        : 0px;
  height        : 30px;
  vertical-align: middle;
  padding       : 0 3px;
  line-height   : 30px;
  cursor        : move;
}
#containers .model1 h4 {
  background-color: #00c0ef;
  border          : 1px solid #00c0ef;
}
#containers .model3 h4 {
  background-color: #00a659;
  border          : 1px solid #00a659;
}
#containers .model2 h4 {
  background-color: #5182e4;
  border          : 1px solid #5182e4;
}

#containers .model h4 a {
  color: #fff !important;
}
#containers .model ul {
  max-height: 320px;
  overflow  : auto;
  margin    : 0px;
  width     : 100%;
  padding   : 0px;
}
#containers .model ul li {
  font-size      : 15px;
  list-style-type: none;
}
.jtk-endpoint,
.endpointTargetLabel,
.endpointSourceLabel {
  cursor: pointer;
}
#leftMenu p {
  font-size  : 14px;
  font-family: "微软雅黑";
  color      : #428bca;
  font-weight: bold;
  text-align : left;
}
.typetitle {
  padding-left: 20px;
}
.icon {
  font-weight: bold;
  font-size  : 16px;
}
#leftMenu li {
  height         : 40px;
  width          : 100%;
  font-size      : 14px;
  color          : #428bca;
  list-style-type: none;
  vertical-align : middle;
  line-height    : 40px;
  z-index        : 1;
  cursor         : move;
  padding-left   : 60px;
}
#leftMenu li:hover {
  background: #f5f5f5;
}
#leftMenu1,
#leftMenu2,
#leftMenu3 {
  padding   : 0px !important;
  margin-top: 10px;
}
.tasksave {
  width: 40% !important;
}

.predashboard {
  position        : fixed;
  left            : 0px;
  right           : 0px;
  bottom          : 0px;
  top             : 125px;
  background-color: #eee;
}
.prehd {
  width        : 100%;
  height       : 65px;
  border-bottom: 0px solid #bbb;
  line-height  : 45px;
  padding      : 10px 20px;
}
.pretitle {
  font-size  : 24px;
  font-family: 微软雅黑;
  color      : #3a8ab8;
}
.prebtn {
  float     : right;
  background: #3a8ab8;
  color     : #fff;
}
.runbtn {
  background: #00a659;
  color     : #fff;
}
.conn-box-card {
  width : 70%;
  height: 550px;
  margin: 20px auto;
}
.connbtn {
  display        : flex;
  justify-content: center;
  margin-top     : 20px;
}
.connbtn2 {
  text-align: center;
}
.el-button {
  border-color: #bbb7b7;
}
.prehd {
  width : 100%;
  height: 55px;
  /* border-bottom: 1px solid #bbb; */
  line-height     : 45px;
  padding         : 5px 20px;
  background-color: #f5f7fa;
  box-shadow      : 0 0 6px 0 rgba(0, 0, 0, 0.1),
    0 10px 12px 0 rgba(170, 182, 206, 0.2),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3);
}
.pretitle {
  font-size  : 22px;
  font-family: 微软雅黑;
  color      : rgb(71, 172, 253);
  margin-left: 30px;
}
.icon-fanhui {
  font-size: 23px;
  color    : #89c7f9;
}
</style>
