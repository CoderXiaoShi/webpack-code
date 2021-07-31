const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

/*
    配置多页面
 */
module.exports = {
    // 多入口
    entry: {
        home: ['./src/index.js', './src/subtract.js'],
        add: './src/add.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        // 多页面
        new HTMLWebpackPlugin({
            filename: 'home.html',
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
        }),
        new HTMLWebpackPlugin({
            filename: 'add.html',
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
            },
        }),
    ],
    mode: "development"
}
