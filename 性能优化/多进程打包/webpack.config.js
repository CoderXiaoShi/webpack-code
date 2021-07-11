const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'biult.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                /*
                    js兼容处理： babel-loader @babel/preset-env @babel/core 
                        1. 可满足基本的兼容处理， 但只能转化基本语法 类似于 promise 的就不能转化
                        2. 全面兼容 @babel/polyfill
                            问题：打包后的体积过大
                        3. 按需做兼容处理：corejs
                */
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    /*
                        针对 babel-loader 开启多进程打包
                        注意： 
                            1. 进程开启需要600ms时间，进程通信也需要时间。所以使用不当会拖慢打包时间
                            2. 一定要放在 babel-loader 等前面
                    */ 
                    // 'thread-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2, // 开启进程数
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            // 预设，指示 babel 怎样做兼容处理
                            presets: [
                                // '@babel/preset-env'
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3,
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '50',
                                            safari:  '10',
                                            ie: '9',
                                            edge: 17,  
                                        }
                                    }
                                ]
                            ]
                        }

                    }
                ],
            }
        ]
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
