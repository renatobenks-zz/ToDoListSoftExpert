import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';
import webpackConfigProd from '../../webpack.config.prod';
import morgan from 'morgan';

const isDeveloping = process.env.NODE_ENV === 'development';

let assets;

export default (server) => {
    const PATH_PUBLIC = __dirname.split('server')[0].concat('public');
    server.use('/public', express.static(PATH_PUBLIC));

    // Webpack (for development)
    if (isDeveloping) {
        const compiler = webpack(webpackConfig);
        // Stub for assets, in case running in dev mode.
        assets = {};
        server.use(morgan('dev'));
        server.use(webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            contentBase: './src/app',
            serverSideRender: true,
            hot: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: true,
                modules: false
            }
        }));

        server.use(webpackHotMiddleware(compiler, {
            log: console.log
        }));
    } else {
        assets = require('../../assets.json');
        server.use(morgan('combined'));
        server.use('/build/public', express.static(webpackConfigProd.output.path));
    }

    return {
        assets
    }
}
