module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 7777,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
