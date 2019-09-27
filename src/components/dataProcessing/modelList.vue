<template>
    <div class="box">
        <!-- <el-row>
            <el-input placeholder="请输入模型名称" prefix-icon="el-icon-search" v-model="searchModel" style="width:25%;margin-left:30px;margin-bottom:10px" size="medium"></el-input>
            <el-button type="primary" icon="el-icon-search" circle plain style="margin-left:15px;margin-bottom:10px"></el-button>
            <el-button @click="dialogCreate=true" type="primary" round style="float:right;margin-right:30px;margin-bottom:10px">新建模型</el-button>
        </el-row> -->
        <el-row>
            <el-input style="width:30%" placeholder="请输入模型名称" v-model="search" prefix-icon="el-icon-search"></el-input>
            <el-button @click="dialogCreate=true" type="primary" round style="float:right;margin-right:30px;margin-bottom:10px">新建模型</el-button>
        </el-row>
        <el-dialog title="新建模型" :visible.sync="dialogCreate" width="60%">
            <el-form :model="form" style="margin-right:50px">
                <el-form-item label="模型名称" :label-width="formLabelWidth" label-positon="left">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型描述" :label-width="formLabelWidth" label-positon="left">
                    <el-input v-model="form.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="唯一标识" :label-width="formLabelWidth" label-positon="left">
                    <el-input v-model="form.mark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型接口" :label-width="formLabelWidth" label-positon="left">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" :label-width="formLabelWidth" label-positon="left">
                    <el-select v-model="form.method" placeholder="请选择方式">
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="POST" value="POST"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="模型输入" :label-width="formLabelWidth" label-positon="left">
                    <el-input v-model="form.input" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型输出" :label-width="formLabelWidth" label-positon="left">
                    <el-input v-model="form.output" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="margin-right:50px">
                <el-button @click="dialogCreate = false" plain type="primary">取 消</el-button>
                <el-button type="primary" @click="createModel">新 建</el-button>
            </div>

        </el-dialog>
        <el-table :key="0" :data="tableDataModelList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">

            <el-table-column prop="id" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="模型名称" align="center">
            </el-table-column>
            <el-table-column prop="dis" label="模型描述" align="center">
            </el-table-column>
            <el-table-column prop="creatTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="editTime" label="最后更改时间" align="center">
            </el-table-column>

            <el-table-column prop="action" label="操作" align="center">
                <template scope="scope">
                    <el-button type="text" @click="seeModel">查看</el-button>
                    <el-button type="text" @click="delModel(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <!-- <el-row>
                <el-col :span="12">
                    
                </el-col>
                <el-col :span="12"></el-col>
            </el-row> -->

        </el-table>

    </div>
</template>
<script>
export default {
    data() {
        return {
            search: '',
            tableDataModelList: [{//在工作区，每构建一个模型就要添加进来
                id: "1",
                name: "技术同义词模型",
                dis: "模型1的描述",
                creatTime: "2018-11-14",
                editTime: "2018-11-15"
            }, {
                id: "2",
                name: "企业同义词模型",
                dis: "模型2的描述",
                creatTime: "2018-11-13",
                editTime: "2018-11-14"
            }, {
                id: "3",
                name: "技术关键词模型",
                dis: "模型2的描述",
                creatTime: "2018-11-13",
                editTime: "2018-11-14"
            }, {
                id: "4",
                name: "企业关键词模型",
                dis: "模型2的描述",
                creatTime: "2018-11-13",
                editTime: "2018-11-14"
            }, {
                id: "5",
                name: "投融资抽取模型",
                dis: "模型2的描述",
                creatTime: "2018-11-13",
                editTime: "2018-11-14"
            }, {
                id: "6",
                name: "新闻摘要模型",
                dis: "模型2的描述",
                creatTime: "2018-11-13",
                editTime: "2018-11-14"
            }],
            dialogCreate: false,
            formLabelWidth: "20%",
            form: {
                name: "",
                description: "",
                mark: '',
                URL: "",
                method: "",
                input: "",
                output: ''
            },
            searchModel: '',
        }

    },
    methods: {
        seeModel() {
            this.$router.push({ name: "seeModel" })
        },
        delModel(index, row) {
            this.tableDataModelList.splice(index, 1);

        },
        createModel() {
            // alert("新建模型")
            this.dialogCreate = false
        }
    }
}
</script>
<style>
.box {
  margin: 20px;
  margin-top: 50px;
}
</style>


