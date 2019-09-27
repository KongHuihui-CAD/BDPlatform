<template>
  <div class="box">
    <el-steps :active="active" align-center="" finish-status="success">
      <el-step title="数据库选择"></el-step>
      <el-step title="表选择"></el-step>
      <el-step title="字段选择"></el-step>
      <el-step title="模型选择"></el-step>
      <el-step title="构建任务"></el-step>
    </el-steps>

    <!-- 选择数据库 -->
    <div v-if="active =='0'" style="margin:50px;margin-top:20px;" :key="0">
      <el-table :data="tableDataDatabase" style="width: 100%" class="heig" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="id" label="序号" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name" label="数据源名称" align="center">
        </el-table-column>
        <el-table-column prop="dis" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="owner" label="拥有者" align="center">
        </el-table-column>
        <el-table-column prop="date" label="建库时间" align="center" width="200" sortable>
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" @click="chooseDatabase(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="pages">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total1">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 选择数据库结束 -->

    <!-- 选择数据表 -->
    <div v-if="active =='1'" style="margin:50px;margin-top:20px;" :key="1">
      <!-- <el-row>
        <el-col :span="6" style="margin-top:20px;">已选数据库：{{database}}</el-col>
      </el-row> -->
      <el-table :data="tableDataTable" style="width: 100%" class="heig" :default-sort="{prop: 'num', order: 'descending'}">
        <el-table-column prop="id" label="序号" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name" label="数据表名称" align="center">
        </el-table-column>
        <el-table-column prop="dis" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="num" label="记录数" align="center" sortable>
        </el-table-column>
        <el-table-column prop="relation" label="关系" align="center">
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" @click="chooseTable(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="pages">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage2" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total2">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 选择数据表结束 -->

    <!-- 字段选择 -->
    <div v-if="active =='2'" style="margin:50px;margin-top:20px;" :key="2">
      <!-- <el-row>
        已选数据库：{{database}}，已选数据表：{{table}}
      </el-row> -->
      <el-table ref="multipleTable" :data="tableDataFields" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column prop="id" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="field" label="字段名" align="center">
        </el-table-column>
        <el-table-column prop="dis" label="字段描述" align="center">
        </el-table-column>
        <el-table-column prop="type" label="字段类型" align="center">
        </el-table-column>
        <el-table-column type="selection" width="55">
        </el-table-column>
      </el-table>
      <el-row>
        <div class="pages">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total3">
          </el-pagination>
        </div>
      </el-row>

    </div>

    <!-- 选择模型 -->
    <div v-if="active =='3'" style="margin:50px;margin-top:20px;" :key="3">
      <el-table :data="tableDataModel" style="width: 100%" class="heig" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="id" label="序号" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name" label="模型名称" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="editTime" label="最后更改时间" align="center">
        </el-table-column>
        <el-table-column prop="action" label="操作" align="center">
          <template scope="scope">
            <el-button type="text" @click="chooseModel(scope.row)">选择</el-button>
            <!-- <el-button type="text" @click="seeModel(scope.row)">查看</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="pages">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total1">
          </el-pagination>
        </div>
      </el-row>
    </div>

    <!-- 构建任务 -->
    <div v-if="active =='4'" style="margin:50px;margin-top:20px;" :key="4">
      <el-table :data="tableData" style="width: 100%" class="heig" :default-sort="{prop: 'date', order: 'descending'}">
        <el-table-column prop="issue" label="类别" align="center">
        </el-table-column>
        <el-table-column prop="choice" label="选择" align="center">
        </el-table-column>

      </el-table>

    </div>

    <el-row class="botm">
      <el-button style="margin-top: 12px;" @click="last" v-if="active !='0'">上一步</el-button>
      <el-button style="margin-top: 5px;" @click="active++" v-if="active =='2' && multipleSelection.length>0">下一步</el-button>
      <el-button style="margin-top: 12px;" @click="finish = true;" v-if="active =='4'">构建</el-button>
    </el-row>

    <el-dialog title="构建任务" :visible.sync="finish" width="45%">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="7" style="margin-top:10px;">任务名称：</el-col>
          <el-col :span="17">
            <el-input v-model="taskName" placeholder="请输入任务名称" type="textarea"  :autosize="{ minRows: 3}"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-top:30px">
          <el-col :span="7" style="margin-top:10px;">任务描述：</el-col>
          <el-col :span="17">
            <el-input v-model="taskDis" placeholder="请输入任务描述" type="textarea"  :autosize="{ minRows: 3}"></el-input>
          </el-col>
        </el-row>   
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="finish = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>



<script>
export default {
  data() {
    return {
      active: 0,
      database: '',
      table: '',
      fields: [],
      model: "",
      tableDataDatabase: [
        {
          id: "1",
          name: "数据库111",
          dis: "IT桔子",
          owner: "admin",
          date: "2018-09-09"
        },
        {
          id: "2",
          name: "数据库222",
          dis: "企查查",
          owner: "admin",
          date: "2018-11-13"
        }
      ],
      tableDataTable: [
        {
          id: "1",
          name: "数据表1",
          dis: "新闻",
          num: "156830",
          relation: "dhdjddodm"
        },
        {
          id: "2",
          name: "数据表2",
          dis: "企业",
          num: "363840",
          relation: "dhdjddodm"
        },
        {
          id: "3",
          name: "数据表3",
          dis: "法人",
          num: "363840",
          relation: "dhdjddodm"
        }
      ],
      tableDataFields: [{
        id: "1",
        field: "经营范围",
        dis: "描述",
        type: "string"
      },
      {
        id: "2",
        field: "专利",
        dis: "描述",
        type: "string"
      },
      {
        id: "3",
        field: "投融资",
        dis: "描述",
        type: "number"
      }],
      tableDataModel: [{
        id: "1",
        name: "技术同义词模型",
        createTime: "2018-11-13",
        editTime: "2018-11-13",
      }, {
        id: "2",
        name: "企业同义词模型",
        createTime: "2018-11-13",
        editTime: "2018-11-13",
      }, {
        id: "3",
        name: "技术关键词模型",
        createTime: "2018-11-13",
        editTime: "2018-11-13",
      }, {
        id: "4",
        name: "企业关键词模型",
        createTime: "2018-11-13",
        editTime: "2018-11-13",
      },
      {
        id: "5",
        name: "投融资抽取模型",
        createTime: "2018-11-13",
        editTime: "2018-11-13",
      }, {
        id: "6",
        name: "新闻摘要模型",
        createTime: "2018-11-13",
        editTime: "2018-11-13",
      }],
      tableData: [],
      multipleSelection: [],
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1,
      currentPage5: 1,
      pagesize: 5,
      total1: 23, //总条数,每次访问后台获取到数据要更新this.total
      total2: 23,
      total3: 23,
      total4: 23,
      total5: 23,
      taskName: '',
      taskDis: '',
      finish: false
    };
  },

  methods: {
    chooseDatabase: function (row) {
      this.active += 1
      console.log(row);
      this.database = row.name;
      this.currentPage = 1;
    },
    chooseTable: function (row) {
      this.active += 1
      console.log(row);
      this.table = row.name;
      this.currentPage = 1;
    },
    chooseModel: function (row) {

      this.active += 1
      console.log(row);

      this.currentPage = 1;
      this.model = row.name;
      let fieldsChoice = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        // alert(multipleSelection[i])
        this.fields.push(this.multipleSelection[i].field)
        fieldsChoice.push(this.multipleSelection[i].field + " ")
      }
      console.log(this.database, this.table)
      console.log(this.fields)
      console.log(this.model)

      this.tableData = [{
        issue: "数据库",
        choice: this.database
      }, {
        issue: "数据表",
        choice: this.table
      }, {
        issue: "字段",
        choice: fieldsChoice
      }, {
        issue: "模型",
        choice: this.model
      }]
      console.log(this.tableData[2].choice)
    },
    handleCurrentChange(val) {
      //切换页面时触发
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },

    handleSelectionChange(val) {
      // alert("###############3")
      this.multipleSelection = val;
      // alert(val)
      // 
      // console.log(this.multipleSelection[1].field)
    },

    // seeModel(row) {
    //   this.$router.push({name:"seeModel", params: { name: row.name } })

    // },

    last() {
      if (this.active > 0) {
        this.active--;
      } else {
        this.active = 0;
      }
    },
    save() {
      //保存任务
      this.finish = false;
      this.$router.push({ name: "taskList" });
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },

  }
};
</script>

<style>
.box {
  margin: 20px;
  margin-top: 50px;
}
.pages {
  float: right;
  margin: 15px;
}
.botm {
  text-align: right;
  margin-top: 50px;
  margin-right: 70px;
}
</style>
