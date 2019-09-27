<template>
    <div class="box">
        <el-row>
            <el-steps :active="active" align-center finish-status="success">
                <el-step title="Hive表选择"></el-step>
                <el-step title="字段选择"></el-step>
                <el-step title="建模"></el-step>
            </el-steps>
        </el-row>
        <!-- Hive表选择 -->
        <div v-if="active =='0'" style="margin:50px;margin-top:40px;" :key="0">
            <el-table :data="tableData1.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)" style="width: 100%" :default-sort="{prop: 'update', order: 'descending'}">
                <el-table-column prop="name" label="Hive表名称" align="center">
                </el-table-column>
                <el-table-column prop="dis" label="描述" align="center">
                </el-table-column>
                <el-table-column prop="size" label="大小" align="center">
                </el-table-column>
                <el-table-column prop="num" label="列数" align="center">
                </el-table-column>
                <el-table-column prop="owner" label="拥有者" align="center">
                </el-table-column>
                <el-table-column prop="update" label="最新更新时间" align="center" width="180" sortable>
                </el-table-column>
                <el-table-column prop="date" label="建表时间" align="center" width="180" sortable>
                </el-table-column>
                <el-table-column prop="action" label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="choosebiao(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <div class="pages">
                    <el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size="pagesize1" layout="total, prev, pager, next, jumper" :total="total1">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <!-- 字段选择 -->
        <div v-if="active =='1'" style="margin:50px;margin-top:20px;" :key="1">
            <el-row>
                <el-col :span="6" style="margin-top:20px;">已选Hive表：{{hivename}}</el-col>
            </el-row>
            <br/>
            <el-table :data="tableData2.slice((currentPage2-1)*pagesize2,currentPage2*pagesize2)" style="width: 100%" :default-sort="{prop: 'id', order: 'ascending'}">
                <el-table-column prop="id" label="序号" align="center" sortable>
                </el-table-column>
                <el-table-column prop="name" label="字段名" align="center">
                </el-table-column>
                <el-table-column prop="dis" label="描述" align="center">
                </el-table-column>
                <el-table-column prop="action" label="选择" align="center">
                    <template scope="scope">
                        <el-checkbox v-model="tableData2[scope.$index].inputSelect" @change="handleCheckedChange(scope.$index)"></el-checkbox>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <div class="pages">
                    <el-pagination @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pagesize2" layout="total, prev, pager, next, jumper" :total="total2">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <!-- 建模 -->
        <div v-if="active =='2'" style="margin:50px;margin-top:30px;" :key="2">
            <el-row>
                已选Hive表：{{hivename}}
            </el-row>
            <el-row>
                已选字段：{{columns}}
            </el-row>
            <br/>
        </div>
        <!-- 按钮组 -->
        <el-row class="botm">
            <el-button style="margin-top: 12px;" @click="last" v-if="active !='0'">上一步</el-button>
            <el-button style="margin-top: 5px;" @click="active++" v-if="active =='1'&&columns!=''">下一步</el-button>
            <el-button style="margin-top: 12px;" @click="finish = true;" v-if="active =='2'">完成</el-button>
        </el-row>
        <!-- finish弹窗 -->
        <el-dialog title="建模结果保存" :visible.sync="finish" width="40%" :before-close="handleClose">
            <div style="margin-left:40px;margin-right:40px">
                <el-row>
                    <el-col :span="8" style="margin-top:10px;">新Hive表名：</el-col>
                    <el-col :span="16">
                        <el-input v-model="taskname" placeholder="请输入新Hive表名"></el-input>
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
      currentPage1: 1, //当前页
      pagesize1: 10, //每页条数
      total1: 0, //总条数
      currentPage2: 1, //当前页
      pagesize2: 10, //每页条数
      total2: 0, //总条数
      active: 0,
      finish: false,
      taskname: "",
      hivename: "",
      tableData1: [
        {
          id: "1",
          name: "Hive表111",
          dis: "222",
          owner: "admin",
          date: "2018-09-09"
        }
      ],
      tableData2: [
        {
          id: "1",
          name: "列1",
          dis: "hdjdkfkf",
          num: "156830",
          relation: "dhdjddodm",
          inputSelect: false
        },
        {
          id: "2",
          name: "列2",
          dis: "hdjdkfkf",
          num: "363840",
          relation: "dhdjddodm",
          inputSelect: false
        }
      ],
      columns: ""
    };
  },
  methods: {
    handleCurrentChange1(val) {
      //切换页面时触发
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange2(val) {
      //切换页面时触发
      this.currentPage2 = val;
      console.log(`当前页: ${val}`);
    },
    last() {
      if (this.active > 0) {
        this.active--;
      } else {
        this.active = 0;
      }
    },
    save() {
      //保存任务
      alert(111);
      this.finish = false;
      this.$router.push({ name: "hiveManagement" });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    choosebiao(row) {
      this.active = 1;
      console.log(row);
      this.hivename = row.name;
    },
    handleCheckedChange(index) {
      this.columns = "";
      for (var i = 0; i < this.tableData2.length; i++) {
        if (this.tableData2[i].inputSelect == true) {
          this.columns += this.tableData2[i].name + " ";
        }
      }
    }
  }
};
</script>

<style>
.box {
  margin: 20px;
  margin-top: 60px;
}
.botm {
  text-align: right;
  margin-top: 50px;
  margin-right: 100px;
}
.pages {
  float: right;
  margin: 15px;
}
</style>
