const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
/*
    three shaking: 去除无用的代码
        前提：
            1. 必须使用 ES6 模块化
            2. 必须开启 production 环境（自动启用 threeShaking ）
        
    three shaking 问题
        需要在 package.json 中配置 “sideEffects”
        “sideEffects” 的默认值是 false, 这意味着所有的代码都可能会被 three shaking
        但有些是不希望被 three shaking 的

        所以我们需要这样配置
        “sideEffects”: ["*.css", "*.less"]


*/

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[name].[hash:5].[ext]', 
                    // esModule: false,
                }
            },
            {
                exclude: /\.(html|js|css|less|sass|jpg|jpeg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:5].[ext]',
                }
            }
        ]
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true,
    }
}

