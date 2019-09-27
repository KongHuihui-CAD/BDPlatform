<template>
    <div class="box">
        <!-- <el-row>
            <el-input placeholder="请输入任务名称" prefix-icon="el-icon-search" v-model="searchTask" style="width:25%;margin-left:30px;margin-bottom:10px" size="medium"></el-input>
            <el-button type="primary" icon="el-icon-search" circle plain style="margin-left:15px;margin-bottom:10px"></el-button>
            <el-button @click="createTask" type="primary" round style="float:right;margin-right:30px;margin-bottom:10px">新建任务</el-button>
        </el-row> -->
        <el-input style="width:30%" placeholder="请输入任务名称"
          v-model="search" prefix-icon="el-icon-search"></el-input>
        <el-table :key="0" :data="tableDataTaskList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
            <el-table-column prop="id" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="任务名称" align="center">
            </el-table-column>
             <el-table-column prop="dis" label="任务描述" align="center">
            </el-table-column>
            <el-table-column prop="creatTime" label="创建时间" align="center">
            </el-table-column>
            <el-table-column prop="num" label="数据量" align="center">
            </el-table-column>
            <el-table-column prop="state" label="执行状态" align="center">
            </el-table-column>
             <el-table-column prop="action" label="操作" align="center">
                 <template scope="scope">
            <!-- <el-button type="text" @click="seeTask(scope.row)">查看</el-button> -->
            <el-button type="text" @click="delTask(scope.$index,scope.row)">删除</el-button>
             
          </template>
            </el-table-column>
            
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchTask:'',
            tableDataTaskList:[{//在工作区，每构建一个任务就要添加进来
                id:"1",
                name:"任务1",
                dis:"任务1的描述",
                creatTime:"2018-11-14",
                num:"3",
                state:"正在执行",
            },{
                id:"2",
                name:"任务2",
                 dis:"任务2的描述",
                creatTime:"2018-11-13",
                num:"3",
                state:"已完成",
            },{
                id:"3",
                name:"任务3",
                 dis:"任务3的描述",
                creatTime:"2018-11-14",
                num:"3",
                state:"已完成",
            },{
                id:"4",
                name:"任务4",
                 dis:"任务4的描述",
                creatTime:"2018-11-14",
                num:"3",
                state:"已完成",
            }],
            search:''
        }

    },
    methods:{
        // seeTask(){

        // },
        delTask(index,row) {
            this.tableDataTaskList.splice(index, 1); 

        },
        createTask(){
            this.$router.push({name:"unstructuredDataPreprocessing"})
            
        }

    }
}
</script>
<style>
.box {
  margin: 20px;
  margin-top: 40px;
}
</style>


