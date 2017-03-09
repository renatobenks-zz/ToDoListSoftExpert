import server from './express';

const port = server.get('port');

// Run server up
server.listen(port, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
    }

    console.info('==> 🌎 Listening on port %s.' +
        'Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
