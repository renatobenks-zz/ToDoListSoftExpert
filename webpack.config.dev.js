// jscs:disable
var path = require('path');
var webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        bundle: [
            'babel-polyfill',
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            './src/app/main.js',
            './src/public/styles/main.less'
        ],
        vendor: [
            'aphrodite', // Stylesheet Javascript for styles components
            'semantic-ui/dist/semantic.min.css'
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
        }),
        new ExtractTextPlugin("[name].css")
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: path.join(__dirname, 'node_modules'),
            use: 'babel-loader',
            include: path.join(__dirname, 'src/app')
        }, {
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader'
        }]
    }
};
