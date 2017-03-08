// jscs:disable
var path = require('path');
var webpack = require('webpack');

const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        bundle: [
            'babel-polyfill',
            'webpack/hot/only-dev-server',
            'webpack-hot-middleware/client',
            './src/app/main.js',
            './src/public/styles/main.css'
        ],
        vendor: [
            'aphrodite' // Stylesheet Javascript for styles components
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/build/public/'
    },
    plugins: [
        OccurrenceOrderPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            filename: 'vendor.js',
            minChunks: 2
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__DEV__': true
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            include: path.join(__dirname, 'src/app')
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        camelCase: true,
                        importLoaders: 1
                    }
                }
            ],
            include: path.join(__dirname, 'src/public/styles')
        }]
    }
};
