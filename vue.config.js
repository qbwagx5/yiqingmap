module.exports = {
  publicPath: './',
  devServer: {
    port:8081,

    proxy: {
      '/api': {
        target: 'https://interface.sina.cn/wap_api/wap_std_subject',//请求的目标地址的BaseURL
        changeOrigin: true, //是否开启跨域
        pathRewrite: {
          '^/api': '' //规定请求地址以什么作为开头
        }
      }
    }
  },
  lintOnSave: false
}