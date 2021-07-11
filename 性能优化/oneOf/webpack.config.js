const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 决定使用 browserList 的哪一个环境
// process.env.NODE_ENV = 'development'

const commonCssLoader = [
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]

module.export = {
    entry: path.resolve(__dirname, './src/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/biult.js',
    },
    module: {
        rules: [
            {
                // oneOf 只能生效一个配置
                oneOf: [
                        {
                            // 还需要在 package.json 中定义 browserList
                            test: /\.css$/,
                            use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                ...commonCssLoader,
                            ]
                        },
                        {
                            test: /\.less$/,
                            use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                ...commonCssLoader,
                                'less-loader',
                            ]
                        },
                        {
                            // 在 package.json 中 eslientConfig 继承 airbnb-base
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: 'eslient-loader',
                                    options: {
                                        fix: true,
                                    }
                                },
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
                                        ]
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
        new MiniCssExtractPlugin({
            filename: 'css/built.css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,   // 压缩
                removeComments: true,       // 移除注释
            }
        }),
    ],
}
