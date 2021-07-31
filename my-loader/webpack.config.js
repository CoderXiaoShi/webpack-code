const path = require('path');

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
                    path.resolve(__dirname, './loaders/async-loader.js'),
                    path.resolve(__dirname, './loaders/replace.js'),
                ]
            }
        ]
    },
    mode: 'development'
}
