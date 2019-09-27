<template>
    <div class="box">
        <el-row>
            <b>我的图谱</b>
        </el-row>
        <el-row :gutter="5">
            <el-col :span="6">
                <div class="create" @click="create">
                    <i class="iconfont icon-add" style="font-size: 40px;"></i>
                    <p>新建图谱</p>
                </div>
            </el-col>
        </el-row>
        <hr/>
        <br/>
        <el-row>
            <b>示例图谱</b>
        </el-row>
        <el-row :gutter="5">
            <el-col :span="6" v-for="(item,index) in examples" :key="item.id">
                <div class="example" @click="example(item)">
                    <div>
                        <p style="color:white;padding:8px;">{{item.name}}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 新建弹窗 -->
        <el-dialog title="新建图谱" :visible.sync="createset" width="40%">
            <div style="margin-left:40px;margin-right:40px">
                <el-row>
                    <el-col :span="6" style="margin-top:10px;">图谱名称：</el-col>
                    <el-col :span="18">
                        <el-input v-model="setname" placeholder="请输入新数据集名称"></el-input>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createset = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      createset: false,
      setname: "",
      examples: [
        {
          id: 1,
          name: "示例图谱1"
        },
        {
          id: 2,
          name: "示例图谱2"
        },
        {
          id: 3,
          name: "示例图谱3"
        }
      ]
    };
  },
  methods: {
    create() {
      this.createset = true;
    },
    example(item) {
      alert(item.name);
      this.$router.push({
        name: "Example",
        params: { name: item.name}
      });
    },
    save() {
      alert(111);
      this.createset = false;
    }
  }
};
</script>

<style>
.box {
  margin: 20px;
  margin-top: 60px;
}
.create {
  border: 2px dashed rgb(83, 86, 101);
  height: 130px;
  margin: 20px;
  text-align: center;
  padding-top: 18px;
  cursor: pointer;
}
.example {
  height: 130px;
  margin: 20px;
  background: url(/static/img/dataset.jpeg);
  background-size: 100%;
  opacity: 0.9;
  cursor: pointer;
}
.example:hover {
  margin-top: 15px;
  opacity: 0.75;
}
</style>
