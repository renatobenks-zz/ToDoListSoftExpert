import { Router } from 'express';
import manipulationFileSystem from './middlewares/manipulationFileSystem';

const router = new Router;

export const APITodoList = () => {
    router
        .get('/todos', (request, response) => {
            manipulationFileSystem.getJSONFile((err, data) => {
                if (err) {
                    response.status(500);
                }

                response.statusCode = 200;
                response.json({todos: JSON.parse(data).todos});
            });
        })
        .post('/todos', (request, response) => {
            manipulationFileSystem.getJSONFile((err, data) => {
                if (err) {
                    console.error(err);
                    response.statusCode = 500;
                    response.json({error: 'Server error!'});
                }

                data = JSON.parse(data);
                if (request.body.text && request.body.severity) {
                    data.todos.push({
                        id: data.todos[data.todos.length-1].id + 1,
                        text: request.body.text,
                        done: false,
                        severity: request.body.severity
                    });

                    data = manipulationFileSystem.updateJSONFile(data);
                    if (data.error) {
                        response.statusCode = data.statusCode;
                        response.json(data);
                    }

                    response.statusCode = 200;
                    response.json(data.todos[data.todos.length-1]);
                } else {
                    response.json({error: 'Bad request'});
                }
            });
        })
        .put('/todos/:id', (request, response) => {
            const id = parseInt(request.params.id, 10);
            manipulationFileSystem.getJSONFile((err, data) => {
                if (err) {
                    console.error(err);
                    response.status(500);
                }

                if (!id && !request.body) {
                    response.statusCode = 500;
                    response.json({error: 'Bad request'})
                }

                data = JSON.parse(data);
                data.todos.map(todo => {
                    if (todo.id === id) {
                        for (let param in request.body) {
                            if (request.body.hasOwnProperty(param)) {
                                todo[param] = request.body[param];
                            }
                        }
                    }

                    return todo;
                });

                data = manipulationFileSystem.updateJSONFile(data);
                if (data.error) response.status(500);

                data = data.todos.filter(todo => todo.id === id)[0];

                response.statusCode = 200;
                response.json(data);
            });
        });

    return router
};

export const APIFilters = () => {
    router.get('/filters', (request, response) => {
        manipulationFileSystem.getJSONFile((err, data) => {
            if (err) {
                data = {error: 'Server error for save todo item!'};
                response.statusCode = 500;
            } else {
                data = {filters: JSON.parse(data).filters};
                response.statusCode = 200;
            }

            response.json(data);
        });
    });

    return router
};

export const APISeverities = () => {
    router.get('/severities', (request, response) => {
        manipulationFileSystem.getJSONFile((err, data) => {
            if (err) {
                data = {error: 'Server error for save todo item!'};
                response.statusCode = 500;
            } else {
                data = {severities: JSON.parse(data).severities};
                response.statusCode = 200;
            }

            response.json(data);
        });
    });

    return router
};

export default { APITodoList, APIFilters, APISeverities }
