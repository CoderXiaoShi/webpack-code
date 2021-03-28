const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        // 目录 + 文件名
        /*
            [name]
            [id]
            [chunkhash]
            [contenthash]
        */
        filename: 'js/[name]_[chunkhash:5].js',
        // 打包后所有资源存放的地方
        path: path.resolve(__dirname, './dist'),
        // 所有静态资源 url 的前缀 (src="https://cdn.xxx.xx.com/0.js")
        publicPath: '/',
        // 非入口 chunk 的名称 (例如: 动态导入)
        chunkFilename: 'js_chunk/[name].js',
        // 为 bundole 暴露一个全局变量
        library: {
            name: '$',
            type: 'window',
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    mode: "development"
}

