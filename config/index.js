'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '/^api': '/'
        }
      },
      '/ms': {
        target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
        changeOrigin: true
      },
      '/CAD': {//数据处理的接口
        target: 'http://10.108.211.136:5011/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/CAD': 'http://10.108.211.136:5011/'
        }
      },
      // '/analysis': {//多维分析的接口
      //   target: 'http://10.108.211.136:6992/',
      //   // 改变源
      //   changeOrigin: true,
      //   // 路径重写
      //   pathRewrite: {
      //     '/analysis': 'http://10.108.211.136:6992/'
      //   }
      // },
      '/analysis': {//多维分析的接口
        target: 'http://10.108.212.17:6992/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/analysis': 'http://10.108.212.17:6992/'
        }
      },
      '/static': {//统计处理的接口
        target: ' http://10.108.211.130:5005/expVisual/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/static': ' http://10.108.211.130:5005/expVisual/'
        }
      },
      '/graph': {//保存到大屏的接口
        target: ' http://172.29.31.101:8081/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/graph': ' http://172.29.31.101:8081/'
        }
      },
      '/DATA': {//王园的接口爬虫采集
        // target: 'http://10.108.213.73:8081/',
        target: 'http://10.108.211.32:8081/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          // '/DATA': 'http://10.108.213.73:8081/'
          '/DATA': 'http://10.108.211.32:8081/'
        }
      },
      '/HIVE': {//王园的接口Hive仓库
        target: 'http://10.108.211.32:8082/',
        // target: 'http://10.108.213.73:8082/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/HIVE': 'http://10.108.211.32:8082/'
          // '/HIVE': 'http://10.108.213.73:8082/'
        }
      },
      '/GRAPH': {//王园的接口图谱
        target: 'http://10.108.211.32:8083/',
        // target: 'http://192.168.31.141:8083/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/GRAPH': 'http://10.108.211.32:8083/'
          // '/GRAPH': 'http://192.168.31.141:8083/'
        }
      },
      '/Lake': {//谭泽华的接口
        // target: 'http://10.108.209.210:32111/',
        target: 'http://10.108.210.227:32111/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          // '/Lake': 'http://10.108.209.210:32111/'
          '/Lake': 'http://10.108.210.227:32111/'

        }
      },
      '/Etl': {//毕秋波的接口
        target: 'http://10.108.211.130:9111/',
        // 改变源
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/Etl': 'http://10.108.211.130:9111/'
        }
      },
      '/largeScreen': { // 宋雅的接口
        target: 'http://127.0.0.1:8081/', // http://127.0.0.1:8081/ 本地 // http://10.108.211.22:8099/ 线上
        changeOrigin: true,
        // 路径重写
        pathRewrite: {
          '/largeScreen': 'http://127.0.0.1:8081/'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
