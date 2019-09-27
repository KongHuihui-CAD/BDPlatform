<template>
    <div class="box">
        <div class="half" style="float:left;">

            <el-form :model="form" style="margin:10px;">
                <el-form-item label="模型名称" label-positon="left">
                    <el-input :disabled="disabledModel" v-model="form.name" auto-complete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="模型描述" label-positon="left">
                    <el-input :disabled="disabledModel" v-model="form.description" auto-complete="off" size="mini" type="textarea" autosize></el-input>
                </el-form-item>
                <el-form-item label="唯一标识" label-positon="left" size="mini">
                    <el-input :disabled="disabledModel" v-model="form.mark" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="模型接口" label-positon="left">
                    <el-input :disabled="disabledModel" v-model="form.url" auto-complete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" label-positon="left">
                    <!-- <el-select v-model="form.method" placeholder="请选择方式" size="mini">
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="POST" value="POST"></el-option>
                    </el-select> -->
                    <el-input :disabled="disabledModel" v-model="form.method" auto-complete="off" size="mini"></el-input>

                </el-form-item>
                <el-form-item label="模型输入" label-positon="left">
                    <el-input :disabled="disabledModel" v-model="form.input" auto-complete="off" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="模型输出" label-positon="left">
                    <el-input :disabled="disabledModel" v-model="form.output" auto-complete="off" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="margin:10px;text-align:center">
                <el-button type="primary" @click="disabledModel=Boolean(false)" size="mini" style="margin-right:30px;">编 辑</el-button>
                <el-button @click="save" plain type="primary" size="mini">保 存</el-button>

            </div>

        </div>
        <div class="half" style="float:right">
            <!-- <p>接口演示</p>
            <span>输入样例</span>
            <el-button type="primary" icon="el-icon-plus" circle v-on:click="addInput" size="mini" style="margin-left:20px"></el-button> -->

            <el-row>
                <span style="margin-left:12px">输入样例</span>
                <el-button type="primary" icon="el-icon-plus" circle v-on:click="addExample" size="mini"></el-button>

                <!-- <el-col :span="3" :offset="1">
                    
                </el-col> -->
                <!-- <el-col :span="20" > -->

                <el-table :data="tableDataExample" border style="margin:12px;width:96%">
                    <el-table-column prop="inputExample" label="样例" align="center" min-width="70%">
                        <template scope="scope">
                            <el-input v-model="tableDataExample[scope.$index].inputExample" size="mini" type="textarea" :autosize='{ minRows: 5}'></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="action" label="操作"  align="center"  min-width="30%">
                        <template scope="scope">
                            <el-button type="text" @click="useExample(scope.$index,scope.row)">运行</el-button>
                            <el-button type="text" @click="delExample(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- </el-col> -->

            </el-row>
            <el-row style="margin-top:20px;">
                <p style="margin-left:12px">模型输出</p>
                <!-- <el-col :span="21" offset="3"> -->
                <el-input v-model="result" :disabled="true" type="textarea" :autosize='{ minRows: 10}' size="mini" style="margin:12px;width:96%"></el-input>
                <!-- <el-card v-model="result" ></el-card> -->

                <!-- </el-col> -->
            </el-row>
            <div slot="footer" style="margin:10px;text-align:center">
                <!-- <el-button type="primary" @click="editModel" size="mini" style="margin-right:30px;">编 辑</el-button> -->
                <el-button @click="close" type="primary">关 闭</el-button>

            </div>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: "企业同义词模型",
                description: "模型描述",
                mark: '123456',
                url: "/model/enterprise/word",
                method: "get",
                input: "text",
                output: 'text'
            },
            disabledModel: true,
            // disabledModel: ,
            tableDataExample: [{
                inputExample: ''
            }],
            result: '',
            modelname: this.$route.params.name,
            // formLabelWidth:"60%",

        }
    },
    methods: {
        close() {
            // this.$router.push({ name: "textmodelList" })
            this.$router.go(-1)

        },
        save() {
            this.disabledModel=true
            alert("保存成功")

        },
        editModel() {

        },
        delExample(index) {
            this.tableDataExample.splice(index, 1)
        },
        useExample(index, row) {//执行

        },
        addExample() {
            var _data = {
                inputExample: ""
            };
            this.tableDataExample.push(_data);
        },
        // edit(){
        //     alert(typeof( this.disabledModel))
        //     alert(this.disabledModel)
        //     this.disabledModel=Boolean(false)
        //     alert(typeof(this.disabledModel))
        //     alert(this.disabledModel)


        // }

    }
}
</script>
<style>
.box {
  margin: 25px;
}
.half {
  width: 47%;
  position: relative;
  border-radius: 3px;
  background: #eaedf1;
  border-top: 3px solid #d2d6de;
  margin-bottom: 20px;
  /* width: 100%; */
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.el-form-item {
  margin-bottom: 8px;
}
.el-form-item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 25px;
  padding: 0 10px 0 0;
  box-sizing: border-box;
  margin-bottom: 0;
}
.el-button--mini.is-circle {
  padding: 5px;
  margin: 10px;
}
</style>


