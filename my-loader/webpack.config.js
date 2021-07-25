const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    path.resolve(__dirname, './loaders/async-loader.js'), //异步 loader
                    path.resolve(__dirname, './loaders/replace-loader.js'),
                ]
            }
        ]
    },
    mode: 'development',
}
