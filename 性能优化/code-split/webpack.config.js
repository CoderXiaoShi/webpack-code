const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name]_[contenthash:4].js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: 'js/[name]_[contenthash:4]_chunk.js'
    },
    resolve: {  // 如何解析模块: 如何找到模块
        alias: {    // 路径别名
            '@css': path.resolve(__dirname, './src/access/css')
        },
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
    mode: "production",
    optimization: {

        splitChunks: {
            chunks: 'async',

            // chunks: all 具体是什么意思, 他都做了什么

            // chunk 分割的最小文件为 30 kb (比如一个js文件很小只有 4 kb, 那么就不需要提取为公共的 chunk)
            minSize: 20 * 1024, // 最小分割的包体积
            maxSize: 0, // 没有限制
            minChunks: 1,  // 要提取的 chunks 最少被引用 1 次
            maxAsyncRequests: 30, // 按需加载时 ( import('路径') ), 并行加载的文件的最大数量为 4
            maxInitialRequests: 30, // 入口 js 文件最大并行请求数量为3个

            cacheGroups: { // 分割 chunk 组
                // 第一种分割规则: 打包 node_modules
                // 第二种分割规则: 打包 业务代码 (src) 
                    // node_modules 中的文件会被打包到 vendors 组的 chunk 中
                    // 我们将得到 verndors~xxx.js 这样的文件
                // 但不是所有的模块都会被打包的, 他们还要满足上面定义的那些规则
                    // 模块大小, 引用次数等
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,  // 打包优先级
                    // 如果某个模块, 在准备打包的时候发现之前已经打包过了, 那么就直接复用之前那个模块
                    reuseExistingChunk: true,
                },

                default: {
                    // 要提取的chunk至少要被引用 2 次
                    minChunks: 2,
                    // 优先级低
                    priority: -20,
                    // 如果某个模块, 在准备打包的时候发现之前已经打包过了, 那么就直接复用之前那个模块
                    reuseExistingChunk: true,
                }
            }

        },
        
        // 把模块引入其他模块的映射关系(名称哈希值) 单独提取出来
        runtimeChunk: {
            name: (entrypoint) => `runtime-${entrypoint.name}`
        },

        // 配置压缩方案: js / css
        minimizer: [
            new TerserWebpackPlugin({
                // 开启缓存
                cache: true,
                // 开启多进程打包
                parallel: true,
                // 如果需要 sourceMap 这里一定要设置为 true
                sourceMap: true,
            })
        ]
    }
    
}

