import fs from 'fs';

let file = __dirname.split('middlewares')[0].concat('data/data.json');

const updateJSONFile = data => {
    fs.writeFile(file, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error(err);
            data = {error: 'Server error!'};
        }
    });

    return data;
};

const getJSONFile = (callback) => {
    fs.readFile(file, 'utf-8', callback);
};

export default { updateJSONFile, getJSONFile };
