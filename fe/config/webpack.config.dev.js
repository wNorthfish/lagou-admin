const path = require('path')   // webpack的path模块
const htmlWebpackPlugin = require('html-webpack-plugin')  // 编译、打包HTML文件
const copyWebpackPlugin = require('copy-webpack-plugin')  // 拷贝公共资源


module.exports = {
    // 模式
    mode: 'development',       // 开发环境

    entry : './src/app.js',    // 入口
    output : {                 // 出口
        path : path.resolve(__dirname, '../dev'),  // 必须写相对路径 __dirname表示当前文件的相对路径
        filename : 'app.js'
    },

    // 做webpack-dev-server的配置
    devServer: {
        contentBase: path.resolve(__dirname, '../dev'),
        port: 8000,
        proxy: {                     // 代理 devServer.proxy使用了非常强大的http-proxy-middleware包
            '/api': {
              target: 'http://localhost:3000'
            }
        }
    },

    //loader
    module: {
        rules: [
            {
                test: /\.art$/,
                loader: 'art-template-loader'   //加载  .art 文件
            },
            {
                test: /\.(scss|css)$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']   
                // css-loader负责将css编译成模块放入js中， 
                // style-loader负责将js处理出来放在界面上 包含将样式处理成.css文件放入页面
                // sass-loader编译scss文件
            }
        ]
    },

    // 插件
    plugins:[
        // 编译、打包HTML()  插件使用
        new htmlWebpackPlugin({
            template:'./index.html',
            filename:'index.html'
        }),
        // 拷贝公共资源 public source 
        new copyWebpackPlugin([{
            from:'./public',
            to:'./public'
        }])
    ]
}