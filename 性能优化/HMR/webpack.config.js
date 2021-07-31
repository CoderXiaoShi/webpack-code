const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name]_[chunkhash:5].js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env']
                    ]
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    mode: "development",
    devServer: {
        // 静态资源目录
        contentBase: path.resolve(__dirname, './dist'),
        // 端口
        port: 8000,
        // 定义域名
        // host: 'localhost'    只能本机访问
        // host: '0.0.0.0'      局域网访问
        host: 'localhost',
        // 开启 gzip 压缩
        compress: true,
        // 监视 contentBase, 一旦静态资源发生改变, 重新加载页面
        watchContentBase: true,
        watchOptions: {
            ignored: /node_modules/, // 忽略 node_modules
        },

        // 不显示服务端日志, 
        clientLogLevel: 'none', 
        // 安静: 保证控制台的清洁, 尽量只输出我们自己的 console
        quiet: true,

        // /api/login
            // http://localhost:8080/login
        // 服务端代理
        proxy: {
            '/api': {
                target: 'http://poetry.apiopen.top',
                pathRewrite: {
                    '^/api': '' // 发送请求时, 把 /api 替换为 ''
                }
            }
        },

        // HMR: 模块热更新
        hot: true,
    }
}

