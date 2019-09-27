<template>
  <div style="padding:0px 15px">
    <el-row :gutter="20" v-for="">
      <el-col :span="6" v-for="(project,index) in allprojects">
        <div class=" bg-purple" :id="'number'+index"><span class="name">{{project.pname}}</span></div>
        <div class="pname"><span>{{project.pcname}}</span></div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
export default {
  name: "numberDisplay",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      newId: this.id,
      allprojects: [
        {
          pid: "123",
          pname: "订单量",
          pcname: "53%",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "用户量",
          pcname: "49%",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "注册量",
          pcname: "90%",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        },
        {
          pid: "123",
          pname: "成功率",
          pcname: "99%",
          pdatesave: "2018-4-9 11:11:11",
          ppageview: 10
        }
      ]
    };
  },
  mounted: function() {
    this.draw();
  },
  methods: {
    draw() {
      for (var i = 0; i < this.allprojects.length; i++) {
        $("#number" + i).resizable({
          ghost: true
        });
      }
    }
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 5px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: white;
}
.bg-purple {
  background: white;
  padding: 20px;
  font-size: 20px;
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 130px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.name {
  background: white;
  padding: 10px;
  font-size: 25px;
  border-radius: 4px;
  color: #56384f;
}
.pname {
  background: white;
  padding: 10px;
  font-size: 20px;
  border-radius: 4px;
  color: #009bff;
}
</style>
