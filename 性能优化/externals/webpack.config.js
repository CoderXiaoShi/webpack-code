const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: path.resolve('dist'),
    },
    module: {
        rules: [
            
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        })
    ],
    /*
        需要通过 cdn 饮用等包，可以通过 externals 来忽略
        库名：包的导出的变量名
    */
    externals: {
        jquery: 'jQuery',
    },
    mode: 'production',
}