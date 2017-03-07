var path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/app/main'
    ],
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src', 'app')],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                loader: 'style!css',
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src', 'public/styles')]
            }
        ]
    }
};
