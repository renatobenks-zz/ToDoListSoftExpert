// jscs:disable
const path = require('path');
const webpack = require('webpack');

const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        bundle: [
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            './src/app/main.js',
            './src/public/styles/main.less'
        ],
        vendor: [
            'react',
            'react-dom',
            'aphrodite', // Stylesheet Javascript for styles components
            'semantic-ui-css/semantic.min.css',
            'animate.css/animate.min.css'
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
            test: /\.(js|jsx)$/,
            exclude: path.join(__dirname, 'node_modules'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'es2015', 'stage-0', 'react']
                }
            },
            include: path.join(__dirname, 'src/app')
        }, {
            test: /\.(less|css)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        camelCase: true,
                        importLoaders: 1
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: 'url-loader'
        }]
    }
};
