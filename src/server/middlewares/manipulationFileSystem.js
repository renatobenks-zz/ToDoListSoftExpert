import fs from 'fs';

let file = __dirname.split('middlewares')[0].concat('data/data.json');

const updateJSONFile = (todo, callback) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        data.todos.push(todo);

        fs.writeFile(file, JSON.stringify(data, null, 2), callback);
    });

    return todo;
};

const getJSONFile = (callback) => {
    fs.readFile(file, 'utf-8', callback);
};

export default { updateJSONFile, getJSONFile };
