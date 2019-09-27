<template>
  <div class="cloud-sidebar">
    <div class="mian-bar">
      <!-- 展开和隐藏按钮 -->
      <div class="narrow-wrapper" @click="changeUnfoldStatus(1)" v-if="!isUnfold">
        <i class="iconfont narrow-icon icon-zhankai3"></i>
      </div>
      <div class="unfold-wrapper" @click="changeUnfoldStatus(0)" v-else>
        <i class="iconfont unfold-icon icon-zhankai1"></i>
      </div>
      <!-- 展开和隐藏按钮 END -->

      <!-- 一级菜单列表 -->
      <ul class="first-menu-wrapper">
        <li class="item-menu-wrapper" v-for="(unfoldItem,unfoldItemIndex) in menuList" :key="unfoldItemIndex">
          <div class="item-menu-title" @click="unfoldItemMenu(unfoldItem,unfoldItemIndex)">
            <img src="../assets/img/down.png" alt="" v-if="unfoldItemMenuIndex==unfoldItemIndex">
            <img src="../assets/img/right.png" alt="" v-else>
            <span v-if="!isUnfold">{{unfoldItem.mainTitle}}</span>
          </div>
          <ul class="item-menu-list" :unfoldItemIndex="unfoldItemIndex" v-show="unfoldItemMenuIndex==unfoldItemIndex">
            <li v-for="(mainMenuItem,index) in unfoldItem.submenuList" :key="index" @click="computeSubMenuList(mainMenuItem)">
              <div class="submenu">
                <i class="iconfont" :class="mainMenuItem.icon"></i>
                <span v-if="!isUnfold">{{mainMenuItem.submenuTitle}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <!-- 一级菜单列表 END -->
    </div>
    <div class="sub-bar">
      <div class="sub-fold-wrapper" v-if="!isHideSubMenu" @click="hideSubMenu">
        <i class="iconfont sub-fold-icon icon-zhankai2"></i>
      </div>
      <div class="sub-unfold-wrapper" v-else @click="hideSubMenu">
        <i class="iconfont sub-unfold-icon icon-zhankai"></i>
      </div>
      <div class="sub-header-title">{{submenuTitle}}</div>
      <div class="sub-menu-list">
        <router-link :to="submenuItem.path" v-for="(submenuItem,index) in subMenuList" class="sub-menu-item" :key="index" active-class="sub-menu-item-active">{{submenuItem.submenuItemTitle}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isUnfold: false, //判断展开还是隐藏一级菜单,
      unfoldItemMenuIndex: 0, //判断展开还是隐藏一个菜单列表
      isHideSubMenu: false,
      menuArr: [
        {
          type: 1,
          menuList: [
            {
              main_memu_id: 0,
              mainTitle: "数据收集",
              submenuList: [
                {
                  submenuTitle: "爬虫采集",
                  icon: "icon-shujucaiji",
                  submenuID: 1,
                  submenuItemList: [
                    {
                      submenuItemTitle: "企业爬虫",
                      path: "/dataCollection/dataCollectionQ"
                    },
                    {
                      submenuItemTitle: "专利爬虫",
                      path: "/dataCollection/dataCollectionZ"
                    },
                    {
                      submenuItemTitle: "新闻爬虫",
                      path: "/dataCollection/dataCollectionX"
                    },
                    {
                      submenuItemTitle: "投融资爬虫",
                      path: "/dataCollection/dataCollectionT"
                    }
                  ]
                },
                {
                  submenuTitle: "ETL收集",
                  icon: "icon-shujucaiji2",
                  submenuID: 2,
                  submenuItemList: [
                    {
                      submenuItemTitle: "工作区",
                      path: "/dataCollection/etlCollection"
                    },
                    {
                      submenuItemTitle: "任务列表",
                      path: "/dataCollection/etlList"
                    }
                  ]
                }
              ]
            },
            {
              main_memu_id: 1,
              mainTitle: "数据湖管理",
              submenuList: [
                {
                  submenuTitle: "数据湖",
                  icon: "icon-cangku",
                  submenuID: 3,
                  submenuItemList: [
                    {
                      submenuItemTitle: "仓库概览",
                      path: "/dataWarehouse/dataOverview"
                    },
                    {
                      submenuItemTitle: "数据资产管理",
                      path: "/dataWarehouse/dataManagement"
                    }
                  ]
                },
                {
                  submenuTitle: "数据治理",
                  icon: "icon-shujuzhili",
                  submenuID: 4,
                  submenuItemList: [
                    {
                      submenuItemTitle: "元数据治理",
                      path: "/dataWarehouse/metadata"
                    },
                    {
                      submenuItemTitle: "主数据治理",
                      path: "/dataWarehouse/maindata"
                    },
                    {
                      submenuItemTitle: "生命周期管理",
                      path: "/dataWarehouse/lifeCycle"
                    }
                  ]
                },
                {
                  submenuTitle: "Hive仓库管理",
                  icon: "icon-cangku1",
                  submenuID: 5,
                  submenuItemList: [
                    {
                      submenuItemTitle: "Hive建仓",
                      path: "/dataWarehouse/hiveMaker"
                    },
                    {
                      submenuItemTitle: "Hive建模",
                      path: "/dataWarehouse/hiveModel"
                    },
                    {
                      submenuItemTitle: "Hive仓库",
                      path: "/dataWarehouse/hiveManagement"
                    }
                  ]
                }
              ]
            },
            {
              main_memu_id: 2,
              mainTitle: "数据处理",
              submenuList: [
                {
                  submenuTitle: "文本数据处理",
                  icon: "icon-shujucaiji1",
                  submenuID: 6,
                  submenuItemList: [
                    {
                      submenuItemTitle: "工作区",
                      path: "/dataProcessing/unstructuredDataPreprocessing"
                    },
                    {
                      submenuItemTitle: "模型列表",
                      path: "/dataProcessing/modelList"
                    },
                    {
                      submenuItemTitle: "任务列表",
                      path: "/dataProcessing/taskList"
                    }
                  ]
                },
                {
                  submenuTitle: "结构化数据处理",
                  icon: "icon-shujuchuli",
                  submenuID: 7,
                  submenuItemList: [
                    {
                      submenuItemTitle: "数据选择",
                      path: "/dataProcessing/structuredDataPreprocessing"
                    },
                    {
                      submenuItemTitle: "任务处理",
                      path: "/dataProcessing/proTaskboard"
                    }
                  ]
                }
              ]
            },
            {
              main_memu_id: 3,
              mainTitle: "大数据分析建模",
              submenuList: [
                {
                  submenuTitle: "OLAP建模",
                  submenuID: 8,
                  icon: "icon-jianmojiankong",
                  submenuItemList: [],
                  path: "/analyticalModeling/OLAPModeling"
                },
                {
                  submenuTitle: "探索式分析",
                  submenuID: 9,
                  icon: "icon-fenxi",
                  submenuItemList: [
                    {
                      submenuItemTitle: "数据源选择",
                      path: "/analyticalModeling/dataChoose"
                    },
                    {
                      submenuItemTitle: "探索式分析",
                      path: "/analyticalModeling/exploratoryAnalysis"
                    },
                    // 探索式分析（改过）
                    {
                      submenuItemTitle: "",
                      path: "/analyticalModeling/exploratoryAnalysisNew"
                    },
                    // 探索式分析（没改过）
                    {
                      submenuItemTitle: "",
                      path: "/analyticalModeling/exploratoryAnalysisOld"
                    }
                  ]
                }
              ]
            },
            {
              main_memu_id: 4,
              mainTitle: "数据对外服务",
              submenuList: [
                {
                  submenuTitle: "服务生成",
                  submenuID: 10,
                  icon: "icon-icons-fuwu",
                  submenuItemList: [],
                  path: "/dataService/serviceGeneration"
                },
                {
                  submenuTitle: "数据API管理",
                  submenuID: 11,
                  icon: "icon-APIguanli",
                  submenuItemList: [],
                  path: "/dataService/apiManagement"
                }
              ]
            },
            {
              main_memu_id: 5,
              mainTitle: "大数据应用",
              submenuList: [
                {
                  submenuTitle: "可视化图谱",
                  submenuID: 12,
                  icon: "icon-chanyetupu",
                  submenuItemList: [
                    {
                      submenuItemTitle: "图谱定义",
                      path: "/dataApplication/Definition"
                    },
                    {
                      submenuItemTitle: "图谱导入",
                      path: "/dataApplication/Maker"
                    },
                    {
                      submenuItemTitle: "图谱展示",
                      path: "/dataApplication/Collection"
                    }
                  ]
                },
                {
                  submenuTitle: "可视化大屏",
                  submenuID: 13,
                  icon: "icon-daping",
                  submenuItemList: [
                    {
                      submenuItemTitle: "我的数据",
                      path: "/dataApplication/dataUpload1"
                    },
                    {
                      submenuItemTitle: "图表创建",
                      path: "/dataApplication/datashow"
                    },
                    {
                      submenuItemTitle: "可视化大屏",
                      path: "/dataApplication/largeScreen"
                    },
                    {
                      submenuItemTitle: "可视化报告",
                      path: "/dataApplication/dataReport"
                    }
                  ]
                },
                {
                  submenuTitle: "在线报告生成",
                  submenuID: 14,
                  icon: "icon-baogao",
                  submenuItemList: [
                    {
                      submenuItemTitle: "图表选择/数据上传",
                      path: "/dataApplication/dataUpload2"
                    },
                    {
                      submenuItemTitle: "报告创建",
                      path: "/dataApplication/reportGeneration"
                    }
                  ]
                },
                {
                  submenuTitle: "驾驶舱",
                  submenuID: 15,
                  icon: "icon-BI_jiashicang",
                  submenuItemList: [
                    {
                      submenuItemTitle: "创建仪表盘",
                      path: "/dataApplication/saveGraph"
                    },
                    {
                      submenuItemTitle: "创建故事",
                      path: "/dataApplication/Story"
                    },
                    {
                      submenuItemTitle: "故事报告",
                      path: "/dataApplication/storyList"
                    },
                    {
                      submenuItemTitle: "驾驶舱一",
                      path: "/dataApplication/Cockpit"
                    },
                    {
                      submenuItemTitle: "驾驶舱二",
                      path: "/dataApplication/Cockpit1"
                    },
                    {
                      submenuItemTitle: "驾驶舱三",
                      path: "/dataApplication/Cockpit2"
                    },
                    {
                      submenuItemTitle: "北京地图",
                      path: "/dataApplication/beijing"
                    }
                  ]
                }
              ]
            },
            {
              main_memu_id: 6,
              mainTitle: "可视化机器学习",
              submenuList: [
                {
                  submenuTitle: "可视化机器学习",
                  icon: "icon-jiqixuexi",
                  submenuID: 16,
                  submenuItemList: [
                    {
                      submenuItemTitle: "工作区",
                      path: "/machineLearning/workingSpace"
                    },
                    {
                      submenuItemTitle: "任务列表",
                      path: "/machineLearning/missionList"
                    },
                    {
                      submenuItemTitle: "模型列表",
                      path: "/machineLearning/modelList"
                    },
                    {
                      submenuItemTitle: "结果列表",
                      path: "/machineLearning/resultList"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      subMenuList: [], //当前三级菜单数组
      submenuTitle: "", //当前二级菜单名称
      menuList: [] //当前角色的菜单组
    };
  },
  methods: {
    changeUnfoldStatus(code) {
      //一级菜单展开/隐藏转变
      if (code == 1) {
        //此时一级菜单正在显示
        this.isUnfold = true;
        sessionStorage.setItem("isUnfold", "1");
      } else {
        //此时正在隐藏
        this.isUnfold = false;
        sessionStorage.setItem("isUnfold", "0");
      }
    },
    unfoldItemMenu(unfoldItem, unfoldItemIndex) {
      //点一级菜单触发，传入一级菜单及index
      if (this.unfoldItemMenuIndex == unfoldItemIndex) {
        this.unfoldItemMenuIndex = 0;
      } else {
        this.unfoldItemMenuIndex = unfoldItemIndex;
      }
      sessionStorage.setItem("unfoldItemMenuIndex", unfoldItemIndex);
    },
    hideSubMenu() {
      //三级菜单展开/隐藏
      let subbarObj = document.getElementsByClassName("sub-bar")[0]; //三级菜单div元素
      if (this.isHideSubMenu) {
        //三级菜单隐藏改为显示
        this.isHideSubMenu = false;
        subbarObj.style.width = "180px";
      } else {
        //三级菜单显示改为隐藏
        this.isHideSubMenu = true;
        subbarObj.style.width = "0px";
      }
    },
    activateSubmenu() {
      //将被点击的二级菜单的i存上
      let submenuObj = document.getElementsByClassName("submenu");
      for (let i = 0; i < submenuObj.length; i++) {
        submenuObj[i].onclick = function() {
          for (let j = 0; j < submenuObj.length; j++) {
            submenuObj[j].className = "submenu";
          }
          submenuObj[i].className = "submenu submenu-active";
          sessionStorage.setItem("mainMenuItemIndex", i);
        };
      }
    },
    computeSubMenuList(info) {
      //点击二级菜单触发，传入二级菜单
      sessionStorage.setItem("submenuID1", info.submenuID);
      // alert(sessionStorage.getItem("submenuID1"));
      this.subMenuList = info.submenuItemList;
      this.submenuTitle = info.submenuTitle;
      sessionStorage.setItem("submenuTitle", this.submenuTitle);
      sessionStorage.setItem("subMenuList", this.subMenuList);
      if (info.submenuItemList.length == 0) {
        //无三级菜单
        // alert("meiyou");
        this.isHideSubMenu = false;
        this.hideSubMenu();
        this.$router.push({ path: info.path });
      } else {
        //有三级菜单
        // alert("you");
        this.isHideSubMenu = true;
        this.hideSubMenu();
        this.$router.push({ path: info.submenuItemList[0].path });
      }
    }
  },
  created() {
    // 通过不同权限显示不同页面
    let type = 1;
    this.menuArr.map(v => {
      if (v.type == type) {
        this.menuList = v.menuList;
      }
    });
  },
  mounted() {
    if (sessionStorage.getItem("isUnfold")) {
      if (sessionStorage.getItem("isUnfold") == 1) {
        //一级菜单在隐藏
        this.isUnfold = true;
      } else {
        this.isUnfold = false;
      }
    }
    this.activateSubmenu(); //为二级菜单绑定点击事件
    //alert(sessionStorage.getItem("mainMenuItemIndex"));
    // alert(sessionStorage.getItem("submenuID1"));
    //alert(sessionStorage.getItem("submenuTitle"));
    if (sessionStorage.getItem("mainMenuItemIndex")) {
      //如果二级菜单被点击
      let index = Number(sessionStorage.getItem("mainMenuItemIndex"));
      let submenuObj = document.getElementsByClassName("submenu");
      submenuObj[index].className = "submenu submenu-active";
      this.unfoldItemMenuIndex = submenuObj[
        index
      ].parentNode.parentNode.getAttribute("unfoldItemIndex");
    }
    if (sessionStorage.getItem("submenuID1")) {
      //如果二级菜单被点击
      let submenuObj = document.getElementsByClassName("submenu");
      for (let i = 0; i < submenuObj.length; i++) {
        submenuObj[i].className = "submenu";
      }
      let index = Number(sessionStorage.getItem("submenuID1"));
      submenuObj[index - 1].className = "submenu submenu-active";
      this.menuList.map(v => {
        v.submenuList.map(vm => {
          if (Number(sessionStorage.getItem("submenuID1")) == vm.submenuID) {
            // alert(Number(sessionStorage.getItem("submenuID")));
            // alert(vm.submenuID);
            // alert(111);
            this.subMenuList = vm.submenuItemList;
          }
        });
      });
    }
    if (sessionStorage.getItem("submenuTitle")) {
      this.submenuTitle = sessionStorage.getItem("submenuTitle");
    }

    if (sessionStorage.getItem("subMenuList")) {
      if (sessionStorage.getItem("subMenuList").length == 0) {
        this.hideSubMenu();
      }
    }
  },
  watch: {
    $route(to, from) {
      this.menuList.map(v => {
        v.submenuList.map(vm => {
          vm.submenuItemList.map(cm => {
            if (cm.path == to.path) {
              this.submenuTitle = vm.submenuTitle; //dui
              this.unfoldItemMenuIndex = v.main_memu_id;
              let submenuObj = document.getElementsByClassName("submenu");
              for (let i = 0; i < submenuObj.length; i++) {
                submenuObj[i].className = "submenu";
              }
              submenuObj[vm.submenuID - 1].className = "submenu submenu-active"; //dui
              sessionStorage.setItem("submenuID", vm.submenuID - 1);
              sessionStorage.setItem("unfoldItemMenuIndex", v.main_memu_id); //dui
              sessionStorage.setItem("submenuTitle", vm.submenuTitle); //dui
              this.menuList.map(v => {
                v.submenuList.map(am => {
                  if (am.submenuID == vm.submenuID) {
                    this.subMenuList = am.submenuItemList; //dui
                  }
                });
              });
            }
          });
        });
      });
    }
  }
};
</script>

<style lang='scss'>
.cloud-sidebar {
  height: 100%;
  .mian-bar {
    float: left;
    height: 100%;
    background: #333744;
    .narrow-wrapper {
      width: 180px;
      height: 30px;
      background: #4a5064;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .narrow-icon {
        font-size: 12px;
        color: #aeafa7;
      }
    }
    .narrow-wrapper:hover .narrow-icon {
      color: #fff;
    }
    .unfold-wrapper {
      width: 50px;
      height: 30px;
      background: #4a5064;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .unfold-icon {
        font-size: 20px;
        color: #aeafa7;
      }
    }
    .unfold-wrapper:hover .unfold-icon {
      color: #fff;
    }
    .first-menu-wrapper {
      color: #fff;
      font-size: 12px;
      .item-menu-wrapper {
        .item-menu-title {
          display: flex;
          height: 40px;
          align-items: center;
          background: #42485b;
          cursor: pointer;
          img {
            margin-left: 18px;
            margin-right: 8px;
          }
        }
        .item-menu-title:hover {
          background: #00c1de;
        }
        .item-menu-list {
          .submenu {
            color: #aeb9c2;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            i {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin: 0 17px;
            }
          }
          .submenu:hover {
            background: #4a5064;
          }
          .submenu-active {
            background: #00c1de;
            color: #fff;
          }
          .submenu-active:hover {
            background: #00c1de;
            color: #fff;
          }
        }
      }
    }
  }
  .sub-bar {
    float: left;
    width: 180px;
    height: 100%;
    transition: width 0.2s;
    background: #eaedf1;
    position: relative;
    .sub-fold-wrapper {
      width: 20px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #f7f7f7;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      margin: auto 0;
      .sub-fold-icon {
        font-size: 16px;
        color: #546478;
      }
    }
    .sub-unfold-wrapper {
      width: 20px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #d9dee4;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 2;
      margin: auto 0;
      .sub-unfold-icon {
        font-size: 16px;
        color: #546478;
      }
    }
    .sub-header-title {
      height: 70px;
      line-height: 70px;
      background: #d9dee4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
      font-size: 12px;
      text-indent: 20px;
      box-sizing: border-box;
    }
    .sub-menu-list {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding-top: 70px;
      box-sizing: border-box;
      overflow-y: auto;
      .sub-menu-item {
        display: block;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-indent: 20px;
        color: #333;
        font-size: 12px;
      }
      .sub-menu-item:hover {
        background: #f4f6f8;
      }
      .sub-menu-item-active {
        background: #fff;
      }
      .sub-menu-item-active:hover {
        background: #fff;
      }
    }
  }
}
</style>
