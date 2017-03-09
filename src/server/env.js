import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';
import morgan from 'morgan';

const isDeveloping = process.env.NODE_ENV == 'development';

// Stub for assets, in case running in dev mode.
let assets;

export default (server) => {
    // Webpack (for development)
    if (isDeveloping) {
        const compiler = webpack(webpackConfig);
        server.use(morgan('dev'));
        server.use(webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            contentBase: './src/app',
            serverSideRender: true,
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
        const buildPath = require('../../webpack.config.prod').output.path;
        assets = require('../../assets.json');
        server.use(morgan('combined'));
        server.use('/build/public', express.static(buildPath));

        return assets;
    }
}
