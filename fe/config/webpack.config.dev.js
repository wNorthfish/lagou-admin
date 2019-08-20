const path = require('path')   // webpack的path模块
const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode: 'development',       // 开发环境
    entry : './src/app.js',    // 入口
    output : {                 // 出口
        path : path.resolve(__dirname, '../dev'),  // 必须写相对路径 __dirname表示当前文件的相对路径
        filename : 'app.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dev'),
        port: 8000
    },

    plugins: [
        new htmlWebpackPlugin()
    ]
}