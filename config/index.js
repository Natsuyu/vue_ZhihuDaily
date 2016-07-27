// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // target: 'http://news-at.zhihu.com/',
    // changeOrigin: true,  
    pathRewrite: {
            '^/old/api' : '/new/api',     // rewrite path 
            '^/remove/api' : '/api'       // remove path 
    },//不懂
    proxyTable: { 
        '/api': {target: 'http://news-at.zhihu.com/',changeOrigin:true},
        // '/pic/*': {target: ' ',changeOrigin:true},
        '/news/**': {target: "http://news-at.zhihu.com/api/4/", changeOrigin: true},
        '/css': {target: 'http://news-at.zhihu.com/',changeOrigin:true}
        // //加一个changeOrigin就对了，嘤嘤嘤
    },

    
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  }
}
