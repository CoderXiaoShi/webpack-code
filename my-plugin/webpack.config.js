const path = require('path');
const LicenseWebpackPlugin = require('./plugins/license-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'development',
    plugins: [
        new LicenseWebpackPlugin('MIT')
    ]
}
