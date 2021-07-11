const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
/*
    组建懒加载
*/

module.exports = {
    entry: './src/index.js',
    // 多入口
    // entry: {
    //     main: './src/index.js',
    //     test: './src/test.js',
    // },
    output: {
        filename: 'built.[name].[contenthash:5].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        })
    ],
    mode: 'production',
    devtool: 'source-map',
    /*
        单入口：可以将 node_modules 中的 js 代码单独打包为一个 chunk 最终输出
        多入口：自动分析多入口中有没有公共文件，如果有，单独打包为一个 chunk
    */
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
