const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name]_[chunkhash:5].js',
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {  // 如何解析模块: 如何找到模块
        alias: {    // 路径别名
            '@css': path.resolve(__dirname, './src/access/css')
        },
        // 省略文件后缀
        /*
            注意: 如果目录下有 name.js 也有 name.css 那么会按照
            extensions 的顺序取第一个 name.js 
        */
        extensions: ['.js', '.css'],
        // 定位到模块的准确位置
        modules: [ path.resolve(__dirname, '../../node_modules') ]
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
    mode: "development"
}

