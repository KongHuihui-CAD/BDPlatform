<template>
    <div>
        <el-container style=" border: 1px solid #eee; padding:0px; margin: 0px;">
            <el-container>

                <el-aside width="250px" style="height:85.5vh;">
                    <div class="md-item md-active" @click="choose(0)">
                        <img src="../../../static/img/largeScreen/image3.png">
                    </div>
                    <div class="md-item"  @click="choose(1)">
                        <img src="../../../static/img/largeScreen/image2.png">
                    </div>
                    <div class="md-item"  @click="choose(2)">
                        <img src="../../../static/img/largeScreen/image1.png">
                    </div>
                    <div class="md-item"  @click="choose(3)">
                        <img src="../../../static/img/largeScreen/image7.jpg">
                    </div>
                    <div class='md-item'  @click="choose(4)">
                        <img src='../../../static/img/largeScreen/image8.jpg'>
                    </div>
                    <div class='md-item'  @click='choose(5)'>
                        <img src='../../../static/img/largeScreen/image9.jpg'>
                    </div>
                    <div class='md-item' @click="choose(6)">
                        <img src='../../../static/img/largeScreen/blank.jpg'>
                    </div>
                </el-aside>
                <el-main>
                    <div id="view" class="view">
                        <img src="../../../static/img/largeScreen/image3.png">
                    </div>
                    <div class="btn">
                        <el-button type="primary" @click="dialogFormVisible = true;form.name=''">创建大屏</el-button>
                    </div>
                    <el-dialog title="可视化大屏" :visible.sync="dialogFormVisible" >
                        <el-form :model="form">
                            <el-form-item label="可视化报告名称" :label-width="formLabelWidth" >
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="open2">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>


    </div>
</template>
<script>
import echarts from "echarts";
    export default {
        data() {
            return {
                id: 0,
                dialogFormVisible: false,
                form: {
                    name: ''
                },
                formLabelWidth: '110px'
            }
        },
        created(){
          
        //    form.name='';
           $.get('./../../static/json/guangdong.json',function (geoJson) {
                                echarts.registerMap('guangdong', geoJson);
                              });
                            $.get('./../../static/json/china.json',function (geoJson) {
                                echarts.registerMap('china', geoJson);  
                                // alert("true00");
                                
                          });
        },
        mounted(){
                    
            var local = window.localStorage;

            var bigCache =JSON.parse(local.getItem("bigCache")) || [];
            console.log(bigCache);
           local.removeItem("bigCache");
           var bigCache1 = JSON.parse(local.getItem("bigCache")) || [];
           console.log(bigCache1);

        },
        methods: {
            choose(id) {
                this.id = id;
                $('.md-item').removeClass('md-active');
                $('.md-item:eq('+id+')').addClass('md-active');
                var html = $('.md-item:eq('+id+')').html();
                $('#view').html(html);
            },
            open2() {
                if(this.form.name == '') {
                    alert('大屏名称不能为空');
                }else {
                    
                    this.$router.push({path:'/dataApplication/createMod',query:{name: this.form.name,id: this.id}});

                }
                this.dialogFormVisible = false;
                

            }
            
        },
        watch: {
            $route(to, from) {
              
              var toPath = to.path;
              // alert(toPath);
              // console.log(fromPath);
              if (toPath == "/createMod") {
                // debugger;
                // alert("go")
                var local = window.localStorage;
                console.log(local);
                // var bigCache =JSON.parse(local.getItem("bigCache")) || [];
                // console.log(bigCache);
                local.removeItem("bigCache");
                // console.log(bigCache);
              } 
            }
          }

    } 
</script>
<style scoped>
.el-header,
.el-footer {
  background-color:#545b64;
  color: #333;
  text-align: center;
}

.el-aside {
  text-align: center;
  overflow: scroll;
}

.el-main {
  background-color: #eee;
  color: #333;
  text-align: center;
}

.md-item {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.md-item:hover img{
    border: 3px solid #00c1df;
}
.md-item img {
  width: 80%;
  height: 80%;
  border-radius: 0px !important;
  cursor: pointer;
}
.view img {
    margin-top: 20px;
    border-radius: 0px !important; 
    width: 750px;
}
.btn {
    float: right;
    margin-top: 20px;
}
.md-active {
    background: #bbb;
}
.el-dialog {
    width:30%;
}
</style>