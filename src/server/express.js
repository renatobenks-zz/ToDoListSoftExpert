import path from 'path';
import express from 'express';

import config from './config';
import env from './env';

const server = express();

const environment = env(server);

let assets = environment.assets;

config(server);

// Render Document
const renderPage = (assets) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ${process.env.NODE_ENV === 'production' ?
                `<link rel='stylesheet' href='${assets.vendor.css}'/>
                <link rel='stylesheet' href='${assets.bundle.css}'/>` :
                ''
            }
          </head>
          <body>
            <div id="root"></div>
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
                if (asset.endsWith('.js') || asset.endsWith('.css')) {
                    asset = '/build/public/'.concat(asset);
                    let Asset = asset.endsWith('.js') ? { js: { value: asset }} : { css: { value: asset }};
                    let Path = path.parse(path.parse(asset).name);
                    if (Path.base === Path.name && !Path.ext) {
                        if (!assets[key]) assets[key] = Object.create(Object.prototype);
                        assets[key] = Object.create(assets[key], Asset);
                    }
                }
            });
        };

        for (let key in assetsByChunkName) {
            if (assetsByChunkName.hasOwnProperty(key)) {
                getAssetConcat(assetsByChunkName[key], key);
            }
        }
    }

    res.status(200).send(renderPage(assets));
});

export default server
