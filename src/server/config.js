import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import compression from 'compression';

const port = process.env.PORT || 5000;

export default (server) => {
    // HTTP server security
    server.disable('x-powered-by');

    server.set('port', port);

    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());

    server.use(hpp());
    server.use(helmet.xssFilter());
    server.use(helmet.frameguard('deny'));
    server.use(helmet.ieNoOpen());
    server.use(helmet.noSniff());

    server.use(cookieParser());
    server.use(compression());
};
