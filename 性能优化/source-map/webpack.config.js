const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/*
    HMR: hot moudle replacement 模块热替换
        作用：一个模块发生变化，只会更新变化的那个模块
    
    受影响的文件类型
        样式: 默认开启 HMR 功能， 因为 style-loader 内部已经实现
        js： 默认没有 HMR 功能
        html：默认没有开启 HMR 功能，需要吧HTML加入到 entry 中
*/

module.exports = {
    entry: [
        './src/index.js',
    ],
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
            },
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        // open: true,

        hot: true,
    },
    // devtool: 'eval-source-map',
    devtool: 'source-map',
}

/*
    sourceMap: 是一种提供了源代码映射构建后代码到技术：可以方便开发者调试被压缩后的代码
        [inline- | hidden- | eval- ][nosources-][cheap-[module-]]source-map

        source-map: 外联
            定位到错误代码到准确位置

        inline-source-map: 内联
            定位到错误代码到准确位置
            1. 只会生成一个内联
        hidden-source-map: 外联
            可以提示到错误到原因，但是不能提供源代码的错误位置
            只能提供构建后错误的位置（隐藏源代码）

        eval-source-map：  内联
            1. 每一个文件都会生成对应的source-map, 并且都在 eval 函数中
            定位到错误代码到准确位置

        nosources-source-map: 外联
            错误代码的准确信息，但是没有源代码（隐藏源代码）

        cheap-source-map: 外联
            定位到错误代码到准确位置，错误代码定位到行

        cheap-module-source-map: 外联
            定位到错误代码到准确位置，错误代码定位到行
            module: 会将 loader 的 source-map 也加进来 

        内联 和 外联的区别：
            1. 外部生成了文件，内联是不生成的
            2. 内联构建速度更快

        开发环境：速度快，开发更友好
            构建速度：eval > inline > cheap > ...
                最快到是 eval-cheap-source-map
                其次是： eval-source-map
                调试更友好： 
                    source-map
                    cheap-moudle-source-map
                    cheap-source-map

            所以结论是：开发时用 eval-source-map 

        生产环境：源代码要不要隐藏？调试要不要更友好

            nosources-source-map 全部隐藏，不会展示任何代码
            hidden-source-map   只隐藏源码，会提示构建后代码错误信息

*/

