<template>
  <div class="boxs">
    <el-row>
      <el-col :span="12">
        <b>图谱元数据概念定义</b>
      </el-col>
      <el-col :span="12">
        <el-button size="mini" round style="float:right;" @click="change">切换到概念图形式</el-button>
      </el-col>
    </el-row>
    <div style="height:20px;"></div>
    <el-row>
      <el-button size="mini" round style="float:right;" @click="addsub" icon="el-icon-plus">添加子域</el-button>
    </el-row>
    <div style="height:10px;"></div>
    <el-row>
      <div>
        <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
          <el-table-column prop="name" label="图谱子域" align="center">
          </el-table-column>
          <el-table-column prop="entityNum" label="实体数" align="center">
          </el-table-column>
          <el-table-column prop="relationNum" label="关系数" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center">
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" align="center">
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center">
            <template scope="scope">
              <el-button type="text" @click="detail(scope.row)">进入该子域</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <!-- 添加弹窗 -->
    <el-dialog title="添加新子域" :visible.sync="add" width="40%">
      <div style="margin-left:40px;margin-right:40px">
        <el-row>
          <el-col :span="8" style="margin-top:10px;">新子域名称：</el-col>
          <el-col :span="16">
            <el-input v-model="newname" placeholder="请输入新子域名称"></el-input>
          </el-col>
        </el-row>
        <br/>
        <el-row>
          <el-col :span="8" style="margin-top:10px;">新子域描述：</el-col>
          <el-col :span="16">
            <el-input v-model="newdes" placeholder="请输入新子域描述" type="textarea" :rows="2"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      add: false,
      newname: "",
      newdes: ""
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      var that = this;
      axios
        .post("GRAPH/domain/all", qs.stringify({}))
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            that.tableData = data.data;
            that.loading = false;
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    },
    change() {
      this.$router.push({
        name: "Definition"
      });
    },
    detail(item) {
      this.$router.push({
        name: "SubDefinition",
        params: { subname: item.name, subid: item.domainId }
      });
    },
    addsub() {
      this.add = true;
    },
    save() {
      var that = this;
      axios
        .post(
          "GRAPH/domain/add",
          qs.stringify({
            name: this.newname,
            details: this.newdes
          })
        )
        .then(function(response) {
          console.log(response);
          var data = response.data;
          if (data.code == 200) {
            console.log(data.data);
            this.$message({
              message: "创建成功！",
              type: "success"
            });
            that.load();
          } else {
            that.$message.error(data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
          that.$message.error("出错啦～");
        });
    }
  }
};
</script>

<style>
.boxs {
  margin: 20px;
}
</style>
