// jscs:disable
var path = require('path');
var webpack = require('webpack');

const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        bundle: [
            'babel-polyfill',
            'webpack-hot-middleware/client?localhost:5000/build/public',
            'webpack/hot/only-dev-server',
            './src/app/main.js',
            './src/public/styles/main.less'
        ],
        vendor: [
            'aphrodite' // Stylesheet Javascript for styles components
        ]
    },
    output: {
        path: path.join(__dirname, 'build/public'),
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
            exclude: path.join(__dirname, 'node_modules'),
            use: 'babel-loader',
            include: path.join(__dirname, 'src/app')
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }, {
                    loader: 'less-loader'
                }
            ],
            include: path.join(__dirname, 'src/public/styles')
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader'
        }]
    }
};
