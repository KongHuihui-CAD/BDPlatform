<template>
  <div class="boxQ">
    <el-button icon="el-icon-back" size="mini" @click="goback">返回</el-button>
    <br/> <br/>
    <el-row>
      任务
      <b>{{taskname}}</b>的{{length}}条示例数据：
    </el-row>
    <br/>

    <!-- <el-table :data="tableData" style="width: 100%" class="hei" border>
            <el-table-column v-for="(item,index) in columnList" :label="item" :property="item">
            </el-table-column>
        </el-table>

        <el-row>
            <div class="pages">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-row> -->
    <div class="aaa">
      <json-viewer :value="jsonData" :expand-depth=2 boxed></json-viewer>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      taskname: this.$route.params.name,
      currentPage: 1, //当前页
      pagesize: 10, //每页条数
      total: 10, //总条数
      tableData: [
        {
          企业id: "111",
          企业名称: "腾讯",
          组织机构代码: "shshjdivjmvk"
        },
        {
          企业id: "222",
          企业名称: "百度",
          组织机构代码: "qrqesysis"
        }
      ],
      columnList: ["企业id", "企业名称", "组织机构代码"],
      jsonData: JSON.parse(this.$route.params.data.data),
      length: JSON.parse(this.$route.params.data.data).length
    };
  },
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      //切换页面时触发
      console.log(`当前页: ${val}`);
    },
    goback() {
      this.$router.push({ name: "dataCollectionQ" });
    }
  }
};
</script>

<style>
.boxQ {
  margin: 20px;
  margin-top: 30px;
}
.hei .el-table__body td {
  padding: 0px;
}
.pages {
  float: right;
  margin: 15px;
}
.aaa .jv-container .jv-code {
  max-height: 600px !important;
  overflow: scroll !important;
}
.jv-more {
  display: none !important;
}
</style>