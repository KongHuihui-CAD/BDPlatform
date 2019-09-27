// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Echarts from 'echarts';
import fullscreen from 'vue-fullscreen'
import 'jquery-ui-dist/jquery-ui';
import 'font-awesome/css/font-awesome.css'

import './assets/css/base.css'
import VueResource from 'vue-resource';
import Vuex from "vuex";
// import '../static/css/style.styl';
// import $ from 'jquery'
import JsonViewer from 'vue-json-viewer'
import gojs from 'gojs'

// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)
Vue.use(fullscreen)

Vue.prototype.go = gojs


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Echarts);
Vue.prototype.echarts = Echarts;
Vue.use(VueResource);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: {
    App
  },
  template: '<App/>'
})
