const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name]_[chunkhash:5].js',
        // 打包后所有资源存放的地方
        path: path.resolve(__dirname, './dist'),
    },
    module: {   // 告诉 webpack 怎么解析文件内容
        rules: [    // 规则
            {
                oneOf: [
                    {
                        test: /.js$/,
                        loader: 'babel-loader',  // 模块解析的第三方仓库
                        // exclude: /node_modules/, // 不解析某些模块
                        include: path.resolve('./src'), // 只解析某些模块
                        options: {  // loader 参数
                            presets: [
                                ['@babel/preset-env']
                            ]
                        }
                    },
                    {
                        // xxx.css
                        test: /.css$/,
                        include: path.resolve('./src'), // 只解析某些模块
                        use: ['style-loader', 'css-loader']
                    },
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    mode: "development"
}

