const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 决定使用 browserList 的哪一个环境
// process.env.NODE_ENV = 'development'

module.export = {
    entry:  './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash:5].js',
    },
    module: {
        rules: [
            {
                // oneOf 只能生效一个配置
                oneOf: [
                        {
                            // 在 package.json 中 eslientConfig 继承 airbnb-base
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            [
                                                '@babel/preset-env',
                                                {
                                                    useBuiltIns: 'usage', 
                                                    corejs: {
                                                        version: 3,
                                                    },
                                                    targets: {
                                                        chrome: '60',
                                                        firefox: '60',
                                                    }
                                                }
                                            ]
                                        ],
                                        // 开启 babel 缓存, 第二次构建时会读取之前的缓存
                                        cacheDirectory: true,
                                    }
                                }
                            ]
                        },
                        {
                            test: /.(jpg|png|gif)$/,
                            loader: 'url-loader',
                            options: {
                                limit: 8 * 1024,
                                name: '[hahs:10].[ext]',
                                outputPath: 'imgs',
                            }
                        },
                        // 打包其他资源
                        {
                            exclude: /\.(js|css|less|html|jpg|jpeg|png|gjf|)$/,
                            loader: 'file-loader',
                            options: {
                                outputPath: 'media',
                            }
                        }
                ]
            }
        ]
    },
    // mode: 'production',
    mode: 'development',
    plugions: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,   // 压缩
                removeComments: true,       // 移除注释
            }
        }),
    ],
}
