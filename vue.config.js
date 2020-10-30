module.exports = {
  publicPath: "./", // 公共路径 默认为"/"，建议使用"./"相对路径
  devServer: {   // 本地服务器配置(npm run serve)
    https: false, // 是否开启https
    open: true,	// 是否在开启服务器后自动打开浏览器访问该服务器
    proxy: {
      '/': {
        target: 'http://0.0.0.0:5000/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  lintOnSave: false,  // 取消lint语法检测，此处可不配置
  outputDir: "dist", // build打包输出目录
  assetsDir: "assets", // 静态文件输出目录，基于dist
  indexPath: "index.html",  // 输出html文件名
  productionSourceMap: false, // 取消.map文件的打包，加快打包速度
  configureWebpack: (config) => {
    // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
    if (process.env.NODE_ENV !== 'production') return;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;	//生产环境去掉console.log
    return {  // 此处配置webpack.config.js的相关配置
      plugins: [],
      performance: {}
    };
  }
};