import path from 'path';
import express from 'express';

import config from './config';
import env from './env';

const server = express();

let assets = env(server);

config(server);

// Render Document
const renderFullPage = (assets) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body>
            <script type="text/javascript" src="${assets.vendor.js}"></script>
            <script type="text/javascript" src="${assets.bundle.js}"></script>
          </body>
        </html>`;
};

server.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'development') {
        const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

        const getAssetConcat = (Assets, key) => {
            Assets.filter(asset => {
                if (asset.endsWith('.js')) assets[key] = {js: '/build/public/'.concat(asset)}
            });
        };

        for (let key in assetsByChunkName) {
            if (assetsByChunkName.hasOwnProperty(key)) {
                getAssetConcat(assetsByChunkName[key], key);
            }
        }
    }

    res.status(200).send(renderFullPage(assets));
});

export default server
