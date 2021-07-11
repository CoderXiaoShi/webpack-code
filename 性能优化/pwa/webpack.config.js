const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const workboxWebpackPlugin = require('workbox-webpack-plugin');
/*
    pwa: 渐进式网络开发应用程序（让网站可以离线访问）
        workbox --> workbox-webpack-plugin
*/

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                // include: path.resolve('./src'),
                options: {
                    fix: true
                }
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
            }
        ]
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new workboxWebpackPlugin.GenerateSW({
            /*
                1. 帮助 servicework 快速启动
                2. 删除旧的 servicework

                生成 servicework 配置文件
            */
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true,
    }
}

