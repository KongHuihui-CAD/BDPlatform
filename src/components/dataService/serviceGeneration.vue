<template>
    <div>

        <el-row style="margin-top:1%;margin-bottom:2%">
            <el-col :span="5" :offset="2">
                <el-select v-model="valueSource" clearable placeholder="请选择数据源">
                    <el-option v-for="item in optionsSource" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-col>
            <el-col :span="2" :offset="12" offset-right="1">
                <el-button type="primary" @click="publish">发布服务</el-button>
                <el-dialog title="服务生成" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="name" :label-width="formLabelWidth" label-positon="left">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="description" :label-width="formLabelWidth" label-positon="left">
                            <el-input v-model="form.description" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="URL" :label-width="formLabelWidth" label-positon="left">
                            <el-input v-model="form.url" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="parameters" :label-width="formLabelWidth" label-positon="left">
                            <el-input v-model="form.parameters" auto-complete="off" type="textarea" :autosize='{ minRows: 3}' :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="response" :label-width="formLabelWidth" label-positon="left">
                            <el-input v-model="form.response" auto-complete="off" type="textarea" :autosize='{ minRows: 3}' :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="method" :label-width="formLabelWidth" label-positon="left">
                            <el-select v-model="form.method" placeholder="请选择方式">
                                <el-option label="GET" value="GET"></el-option>
                                <el-option label="POST" value="POST"></el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="项目名称" :label-width="formLabelWidth" label-positon="left" size="medium">
                            <el-input v-model="form.project" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" plain type="primary">取 消</el-button>
                        <!-- <el-button type="primary" @click="test">测 试</el-button> -->
                        <el-button type="primary" @click="release">生 成</el-button>
                    </div>
                </el-dialog>
            </el-col>

        </el-row>

        <el-row>
            <el-col :span="4">
                <div style="height:420px;border-right:1px solid #eaedf1">
                    <h4 style="text-align:center">数据源详情</h4>
                    <!-- <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
                    <el-menu :unique-opened="true" @open="handleOpen" @close="handleClose">

                        <!-- <el-submenu  index="1">
                        <template slot="title">源1</template>
                        <el-submenu index="1-1">
                            <template slot="title">数据库1</template>
                            <el-menu-item index="1-1-1">表1</el-menu-item>
                            <el-menu-item index="1-1-2">表2</el-menu-item>
                            <el-menu-item index="1-1-3">表3</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-2">
                            <template slot="title">数据库2</template>
                            <el-menu-item index="1-2-1">表1</el-menu-item>
                            <el-menu-item index="1-2-2">表2</el-menu-item>
                            <el-menu-item index="1-2-3">表3</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-3">
                            <template slot="title">数据库3</template>
                            <el-menu-item index="1-3-1">表1</el-menu-item>
                            <el-menu-item index="1-3-2">表2</el-menu-item>
                            <el-menu-item index="1-3-3">表3</el-menu-item>
                        </el-submenu>
                        
                    </el-submenu> -->

                        <el-submenu v-for="(s,index1) in database" :key="index1" v-bind:index=s>
                            <template slot="title">{{s}}</template>
                            <el-submenu v-for="(k,index2) in table" :key="index2" v-bind:index=k>
                                <template slot="title">{{k}}</template>
                                <!-- <el-popover class="item" v-for="t in field" :key="t" effect="dark" :content="tip" placement="top"> -->
                                <el-popover v-for="(t,index3) in field" :key="t" placement="right-start" title="属性" width="400" trigger="hover" :content="tip[index3]" popper-class="popper">
                                    <el-menu-item  v-bind:index=t @click="selectField(t)" slot="reference">{{t}}</el-menu-item>
                                </el-popover>
                            </el-submenu>
                        </el-submenu>

                        <!-- <el-submenu  index="2">
                        <template slot="title">源2</template>
                        <el-submenu index="2-1">
                            <template slot="title">数据库1</template>
                            <el-menu-item index="2-1-1">导航1-1-1</el-menu-item>
                            <el-menu-item index="2-1-2">导航1-1-2</el-menu-item>
                            
                        </el-submenu>
                        <el-submenu index="2-2">
                            <template slot="title">数据库2</template>
                            <el-menu-item index="2-2-1">导航1-2-1</el-menu-item>
                            <el-menu-item index="2-2-2">导航1-2-2</el-menu-item>
                            <el-menu-item index="2-2-3">导航1-2-3</el-menu-item>
                        </el-submenu>
                        
                    </el-submenu>
 -->

                        <!-- <el-submenu  index="3">
                        <template slot="title">源3</template>
                        <el-submenu index="3-1">
                            <template slot="title">数据库1</template>
                            <el-menu-item index="3-1-1">导航1-1-1</el-menu-item>
                            <el-menu-item index="3-1-2">导航1-1-2</el-menu-item>
                            <el-menu-item index="3-1-3">导航1-1-3</el-menu-item>
                        </el-submenu>
                        
                       
                    </el-submenu> -->

                    </el-menu>
                </div>
            </el-col>

            <el-col :span="20">
                <el-row>
                    <el-col :span="14">
                        <el-row>
                            <!-- <span>select</span> -->
                            <el-col :span="3" :offset="1">
                                <p>select</p>
                                <el-button type="primary" icon="el-icon-plus" circle v-on:click="addSelect" size="mini"></el-button>
                            </el-col>
                            <el-col :span="20">

                                <el-table :data="tableDataSelect" border class="tableStyle">
                                    <el-table-column prop="inputSelect" label="属性" min-width="80%">
                                        <template scope="scope">
                                            <el-input v-model="tableDataSelect[scope.$index].inputSelect" size="mini"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="action" label="操作" min-width="20%">
                                        <template scope="scope">
                                            <el-button type="text" @click="delSelect(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </el-col>

                        </el-row>

                        <el-row>
                            <!-- <span>select</span> -->
                            <el-col :span="3" :offset="1">
                                <p>from</p>
                                <el-button type="primary" icon="el-icon-plus" circle v-on:click="addFrom" size="mini"></el-button>
                            </el-col>
                            <el-col :span="20">

                                <el-table :data="tableDataFrom" border class="tableStyle">
                                    <el-table-column prop="inputFrom" label="属性" min-width="80%">
                                        <template scope="scope">
                                            <el-input v-model="tableDataFrom[scope.$index].inputFrom" size="mini"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="action" label="操作" min-width="20%">
                                        <template scope="scope">
                                            <el-button type="text" @click="delFrom(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </el-col>

                        </el-row>

                        <el-row>

                            <el-col :span="3" :offset="1">
                                <p>where</p>
                                <el-button type="primary" icon="el-icon-plus" circle v-on:click="addWhere" size="mini"></el-button>
                            </el-col>
                            <el-col :span="20">
                                <el-input v-model="inputWhere" size="mini" style="margin-bottom:3px"></el-input>
                                <el-table :data="tableDataWhere" border class="tableStyle">
                                    <el-table-column prop="inputWhereConn" label="连接" min-width="20%">
                                        <template scope="scope">
                                            <!-- <el-input v-model="tableDataWhere[scope.$index].inputWhere2"></el-input> -->
                                            <el-select v-model="tableDataWhere[scope.$index].inputWhereConn" size="mini" placeholder="请选择">
                                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="inputWhereCond" label="条件" min-width="60%">
                                        <template scope="scope">
                                            <el-input v-model="tableDataWhere[scope.$index].inputWhereCond" size="mini"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="action" label="操作" min-width="20%">
                                        <template scope="scope">
                                            <el-button type="text" @click="delWhere(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </el-col>
                        </el-row>

                        <el-row>
                            <!-- <span>select</span> -->
                            <el-col :span="3" :offset="1">
                                <p>group by</p>
                                <el-button type="primary" icon="el-icon-plus" circle v-on:click="addGroup" size="mini"></el-button>
                            </el-col>
                            <el-col :span="20">

                                <el-table :data="tableDataGroup" border class="tableStyle">
                                    <el-table-column prop="inputGroup" label="属性" min-width="80%">
                                        <template scope="scope">
                                            <el-input v-model="tableDataGroup[scope.$index].inputGroup" size="mini"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="action" label="操作" min-width="20%">
                                        <template scope="scope">
                                            <el-button type="text" @click="delGroup(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </el-col>

                        </el-row>

                        <el-row>
                            <!-- <span>select</span> -->
                            <el-col :span="3" :offset="1">
                                <p>order by</p>
                                <el-button type="primary" icon="el-icon-plus" circle v-on:click="addOrder" size="mini"></el-button>
                            </el-col>
                            <el-col :span="20">

                                <el-table :data="tableDataOrder" border class="tableStyle">
                                    <el-table-column prop="inputOrder" label="属性" min-width="80%">
                                        <template scope="scope">
                                            <el-input v-model="tableDataOrder[scope.$index].inputOrder" size="mini"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="action" label="操作" min-width="20%">
                                        <template scope="scope">
                                            <el-button type="text" @click="delOrder(scope.$index)">删除</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </el-col>

                        </el-row>

                        <el-row>
                            <!-- <span>select</span> -->
                            <el-col :span="3" :offset="1">
                                <p>limit</p>
                                <!-- <el-button type="primary" icon="el-icon-plus" size="mini" v-on:click="addLimit"></el-button> -->
                            </el-col>
                            <el-col :span="20">

                                <el-input v-model="inputLimit" size="mini"></el-input>

                            </el-col>

                        </el-row>

                    </el-col>

                    <el-col :span="9" :offset="1">
                        <el-row>
                            <el-col :span="4">
                                <p style="margin-top:5px">sql语句</p>
                            </el-col>
                            <el-col :span="4" :offset="8">
                                <el-button type="primary" round @click="generate" size="mini">生成</el-button>
                            </el-col>
                            <el-col :span="4" :offset="1" offset-right="3">
                                <el-button type="primary" round @click="execute" size="mini">执行</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="21" offset-right="4">
                                <el-input class="sql" v-model="sql" :disabled="true" type="textarea" :autosize='{ minRows: 15}' size="mini" style="font-size:1.8rem;"></el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row>
                    <p>结果</p>
                    <el-col :span="23" offset-right="1">
                        <el-input v-model="result" :disabled="true" type="textarea" :autosize='{ minRows: 10}' size="mini"></el-input>
                        <!-- <el-card v-model="result" ></el-card> -->

                    </el-col>
                </el-row>

            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    data() {
        return {



            // database: ["源1", "源2", "源3"],
            // table: [["源1库1", "源1库2", "源1库3"], [], ["源3库1"]],
            // field: [[["源1库1表1", "源1库1表2"], ["源1库2表1"], ["源1库3表1", "源1库3表2", "源1库3表3"]], [["源2库1表1", "源2库1表2", "源2库1表3"], ["源2库2表1", "源2库2表2"]], [["源3库1表1", "源3库1表2", "源3库1表3"]]],

            database: [],
            table: [],
            field: [],
            tip: [],


            dialogFormVisible: false,
            form: {
                name: "",
                description: "",
                URL: "",
                parameters: [],
                response: {},
                method: "",
                project: ""
            },
            sessionID: '',
            formLabelWidth: "20%",
            tableDataSelect: [
                // {
                //     inputSelect: ""
                // }
            ],

            tableDataFrom: [
                {
                    inputFrom: ""
                }
            ],
            tableDataOrder: [
                {
                    inputOrder: ""
                }
            ],
            tableDataGroup: [
                {
                    inputGroup: ""
                }
            ],
            tableDataWhere: [
                {
                    inputWhereConn: "",
                    inputWhereCond: ""
                }
            ],
            valueWhere: "",
            inputLimit: "",
            inputWhere: "",
            //   inputSelect: "",
            options: [
                {
                    value: "AND",
                    label: "AND"
                },
                {
                    value: "OR",
                    label: "OR"
                }
            ],
            optionsSource: [],
            valueSource: "",

            sql: "",
            result: [],
            navMenuData: [

            ],
            //   treedata: [
            //     {
            //       label: "一级1",
            //       children: [
            //         {
            //           label: "二级1-1",
            //           children: [
            //             {
            //               label: "三级1-1-1"
            //             }
            //           ]
            //         }
            //       ]
            //     },
            //     {
            //       label: "一级2",
            //       children: [
            //         {
            //           label: "二级2-1",
            //           children: [
            //             {
            //               label: "三级2-1-1"
            //             }
            //           ]
            //         }
            //       ]
            //     },
            //     {
            //       label: "一级3",
            //       children: [
            //         {
            //           label: "二级3-1",
            //           children: [
            //             {
            //               label: "三级3-1-1"
            //             }
            //           ]
            //         }
            //       ]
            //     }
            //   ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },

    methods: {
        handleOpen(key, keyPath) {
            console.log("handleOpen");
            console.log(key);
            console.log(keyPath)


            if (keyPath.length == 1) {//获取表


                let lastThis = this
                let datatosend = {
                    databaseName: key
                }

                // lastThis.table = [key+"biao1",key+"biao2",key+"biao3"]
                $.ajax({
                    url: "http://182.92.222.75:5000/databases/tables",
                    async: false,
                    data: datatosend,
                    dataType: "json",
                    jsonp: "callback",
                    crossDomain: true,
                    contentType: "application/json",
                    type: "GET",
                    success: function (data) {
                        console.log(data)
                        // lastThis.result = JSON.stringify(data.result, null, 2)

                        lastThis.table = data.tables

                    },
                    error: function () {
                        alert("error search");
                    }
                });


            }
            else if (keyPath.length == 2) {//获取字段



                let lastThis = this
                let datatosend = {
                    databaseName: keyPath[0],
                    tableName: keyPath[1]
                }



                $.ajax({
                    url: "http://182.92.222.75:5000/databases/tables/" + keyPath[1],
                    async: false,
                    data: datatosend,
                    dataType: "json",
                    jsonp: "callback",
                    crossDomain: true,
                    contentType: "application/json",
                    type: "GET",
                    success: function (data) {
                        console.log(data)
                        lastThis.field = []
                        lastThis.tip = []
                        // lastThis.result = JSON.stringify(data.result, null, 2)
                        for (let i = 0; i < data.tableFields.length; i++) {
                            // lastThis.field.push(key)
                            lastThis.field.push(data.tableFields[i].columName)
                            lastThis.tip.push(JSON.stringify(data.tableFields[i], null, 2))
                        }
                        // lastThis.tip = '{"characterSetName":"utf8","columName":"URL","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"NO","privileges":"select,insert,update,references"}'

// alert(lastThis.field)

                        // {"tableFields":[
                        // {"characterSetName":"utf8","columName":"URL","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"NO","privileges":"select,insert,update,references"},
                        // {"characterSetName":"utf8","columName":"maintitle","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"YES","privileges":"select,insert,update,references"},
                        // {"characterSetName":"utf8","columName":"keywords","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"YES","privileges":"select,insert,update,references"},
                        // {"characterSetName":"utf8","columName":"tags","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"YES","privileges":"select,insert,update,references"},
                        // {"characterSetName":"utf8","columName":"description","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"YES","privileges":"select,insert,update,references"},
                        // {"characterSetName":"utf8","columName":"content","columnComment":"","columnKey":"","columnType":"varchar(255)","isNullAble":"YES","privileges":"select,insert,update,references"}]}


                        // lastThis.field = data.tableFields

                    },
                    error: function () {
                        alert("error search");
                    }
                });




            }

        },


        selectField(index) {
            this.tableDataSelect.push({ inputSelect: index })

            // var _data = {
            //     inputSelect: ""
            // };
            // this.tableDataSelect.push(_data);

        },
        mouseField() {


        },


        handleClose(key, keyPath) {
            console.log("handleClose");
            console.log(key, keyPath);
        },
        // handleNodeClick(data) {
        //     console.log("handleNodeClick")
        //   console.log(data);
        // },
        search() {
            //查询源获取数据库，表
            // this.source = ["库1", "库2", "库3"

            let lastThis = this
            // lastThis.database = ["库1111", "库2222", "库3333"]

            $.ajax({
                url: "http://182.92.222.75:5000/databases",
                async: false,
                // data: datatosendJSON,
                dataType: "json",
                jsonp: "callback",
                crossDomain: true,
                contentType: "application/json",
                type: "GET",
                success: function (data) {
                    console.log(data)
                    // lastThis.result = JSON.stringify(data.result, null, 2)

                    lastThis.database = data.databases

                },
                error: function () {
                    alert("error search");
                }
            });








        },
        release() {
            //发布服务


            let datatosend = {
                method: this.form.method,
                path: this.form.url,
                name: this.form.name,
                description: this.form.description,
                project: this.form.project,
                sessionID: this.sessionID

            };
            let datatosendJSON = JSON.stringify(datatosend);
            // alert(datatosendJSON)
            let lastThis = this

            $.ajax({
                url: "http://182.92.222.75:5000/service/generate",
                async: false,
                data: datatosendJSON,
                dataType: "json",
                jsonp: "callback",
                crossDomain: true,
                contentType: "application/json",
                type: "POST",
                success: function (data) {
                    console.log(data)
                    // lastThis.result = JSON.stringify(data.result, null, 2)
                    lastThis.$message({
                        message: '服务已生成',
                        type: 'success'
                    });

                    lastThis.dialogFormVisible = false;

                },
                error: function () {
                    alert("error22222");
                }
            });






        },
        test() {
            this.dialogFormVisible = false;
        },
        execute() {
            //sql语句执行

            let datatosend = {
                sql: this.sql
                // sql: "select Host, user from mysql.user where  host='localhost' OR user='root' limit 2"
            }
            let lastThis = this
            $.ajax({
                url: "http://182.92.222.75:5000/sql/test",
                async: false,
                data: datatosend,
                dataType: "json",
                jsonp: "callback",
                crossDomain: true,
                contentType: "application/json",
                type: "GET",
                success: function (data) {
                    console.log(data)
                    lastThis.result = JSON.stringify(data.result, null, 2)


                },
                error: function () {
                    alert("error");
                }
            });


        },


        publish() {
            this.dialogFormVisible = true;



            let datatosend1 = {
                sql: this.sql
                // sql: "select Host, user from mysql.user where  host='localhost' OR user='root' limit 2"
            }
            let lastThis = this
            $.ajax({
                url: "http://182.92.222.75:5000/service/parameter-type",
                async: false,
                data: datatosend1,
                dataType: "json",
                jsonp: "callback",
                crossDomain: true,
                contentType: "application/json",
                type: "GET",
                success: function (data) {
                    console.log(data)
                    lastThis.form.parameters = JSON.stringify(data.parameters, null, 2)
                    lastThis.form.response = JSON.stringify(data.response, null, 2)
                    lastThis.sessionID = data.sessionID


                },
                error: function () {
                    alert("error");
                }
            });

        },
        generate() {

            let where = []
            where.push(this.inputWhere)
            for (let i = 0; i < this.tableDataWhere.length; i++) {
                where.push(this.tableDataWhere[i].inputWhereConn)
                where.push(this.tableDataWhere[i].inputWhereCond)
            }

            let select = []
            for (let i = 0; i < this.tableDataSelect.length; i++) {
                select.push(this.tableDataSelect[i].inputSelect)
            }

            let from = []
            for (let i = 0; i < this.tableDataFrom.length; i++) {
                from.push(this.tableDataFrom[i].inputFrom)
            }

            let orderby = []
            for (let i = 0; i < this.tableDataOrder.length; i++) {
                orderby.push(this.tableDataOrder[i].inputOrder)
            }

            let groupby = []
            for (let i = 0; i < this.tableDataGroup.length; i++) {
                groupby.push(this.tableDataGroup[i].inputGroup)
            }

            var datatosend = {
                select: select,
                from: from,
                where: where,
                orderBy: orderby[0] ? orderby : [],
                groupBy: groupby[0] ? groupby : [],
                limit: this.inputLimit

            };
            var datatosendJSON = JSON.stringify(datatosend);
            // alert(datatosendJSON)
            // this.sql="222222"

            const lastThis = this

            $.ajax({
                url: "http://182.92.222.75:5000/sql/generate",
                async: false,
                data: datatosendJSON,
                dataType: "json",
                jsonp: "callback",
                crossDomain: true,
                contentType: "application/json",
                type: "POST",
                success: function (data) {
                    console.log(data)

                    if (data.error == null) {
                        lastThis.sql = data.sql
                        // alert(lastThis.sql)

                    } else {
                        alert(data.error)
                    }
                },
                error: function () {
                    alert("error");
                }
            });


        },
        addSelect() {
            var _data = {
                inputSelect: ""
            };
            this.tableDataSelect.push(_data);
        },

        delSelect(index) {
            this.tableDataSelect.splice(index, 1);
        },
        addFrom() {
            var _data = {
                inputFrom: ""
            };
            this.tableDataFrom.push(_data);
        },

        delFrom(index) {
            this.tableDataFrom.splice(index, 1);
        },
        addOrder() {
            var _data = {
                inputOrder: ""
            };
            this.tableDataOrder.push(_data);
        },

        delOrder(index) {
            this.tableDataOrder.splice(index, 1);
        },
        addGroup() {
            var _data = {
                inputGroup: ""
            };
            this.tableDataGroup.push(_data);
        },

        delGroup(index) {
            this.tableDataGroup.splice(index, 1);
        },
        addWhere() {
            var _data = {
                inputWhereConn: "",
                inputWhereCond: ""
            };
            this.tableDataWhere.push(_data);
        },

        delWhere(index) {
            this.tableDataWhere.splice(index, 1);
        }
    },
    mounted() {



        this.optionsSource = [
            {
                value: "1",
                label: "MySQL"
            },
        ]




    }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
.tableStyle .el-table__body td {
  padding: 1px;
}

.tableStyle .el-table__header-wrapper th {
  padding: 1px;
}

.sql textarea {
  line-height: 200%;
}

.popper{
    /* border:1px #409eff solid; */
    background-color:#f7f2f2;
}
</style>






