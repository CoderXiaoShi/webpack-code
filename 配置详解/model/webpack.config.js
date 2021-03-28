const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name]_[chunkhash:5].js',
        // 打包后所有资源存放的地方
        path: path.resolve(__dirname, './dist'),
    },
    model: { // 应该如何解析模块
        // --> node_modules/1.js
        rules: [
            {
                oneOf: [ // 当规则匹配时，只使用第一个匹配规则。
                    {
                        test: /.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /.js$/,   // 筛选模块
                        
                        // 只编译哪些文件
                        include: path.resolve('./src'),

                        // 哪些文件不编译
                        // exclude: /node_modules/,

                        // loader 有两种写法, loader, use
        
                        // loader: 'babel-loader',
                        //     options: {
                        //         presets: [
                        //           ['@babel/preset-env', { targets: "defaults" }]
                        //         ]
                        //     }                    
        
                        // use: [
                        //     {
                        //         loader: 'babel-loader',
                        //             options: {
                        //                 presets: [
                        //                     ['@babel/preset-env', { targets: "defaults" }]
                        //                 ]
                        //             }                    
                        //     },
                        //     'xx-loader',
                        // ]
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

