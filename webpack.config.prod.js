// jscs:disable
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: false,
    entry:  {
        bundle: [
            './src/app/main.js',
            './src/public/styles/main.less'
        ],
        vendor: [
            'aphrodite' // Stylesheet Javascript for styles components
        ]
    },
    output: {
        path: path.join(__dirname, '/build/public'),
        filename: '[name]_[hash].js',
        chunkFilename: '[id].chunk_[hash].js',
        publicPath: '/build/public/'
    },
    plugins: [
        OccurrenceOrderPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor_[hash].js',
            minChunks: 2
        }),
        new AssetsPlugin({filename: 'assets.json'}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            '__DEV__': false
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: path.join(__dirname, 'node_modules'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015', 'stage-0']
                }
            },
            include: path.join(__dirname, 'src/app')
        }, {
            test: /\.less$/,
            exclude: path.join(__dirname, 'node_modules'),
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        minimize: true,
                        camelCase: true,
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
