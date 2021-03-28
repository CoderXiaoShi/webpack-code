const path = require('path')
const HTMLWebpackPlugins = require('html-webpack-plugin')

/*

    chunk: 文件的引用结构, (chunk 名称默认为 main)
    bundle: 根据引用结构, 和解析规则生产的内容

    入口: entry (string | arr | JSON)
        string: 1个 chunk, 1个 bundle (单入口配置)
        arr: 所有的入口, 最终形成一个 chunk, 1个 bundle (多入口配置)
        JSON: 有几个 key 就有一个 chunk , 
            同时也会有几个 bundle (多入口配置). key 是 chunk 的名称
*/

module.exports = {
    // entry: './src/index.js',
    // entry: [
    //     './src/index.js',
    //     './src/add.js',
    // ],
    entry: {
        index: ['./src/index.js', './src/subtract.js'],
        add:'./src/add.js',
    },
    output: {
        filename: '[name].js', // [name]
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HTMLWebpackPlugins()
    ],
    mode: 'development'
}
