import { Router } from 'express';
import middlewareFileSystem from './middlewares/manipulationFileSystem';

const router = new Router;

export const APITodoList = () => {
    router
        .get('/todos', (request, response) => {
            middlewareFileSystem.getJSONFile((err, data) => {
                if (err) {
                    response.status(500);
                }

                response.statusCode = 200;
                response.json({todos: JSON.parse(data).todos});
            });
        })
        .post('/todos', (request, response) => {
            middlewareFileSystem.getJSONFile((err, data) => {
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

                    data = middlewareFileSystem.updateJSONFile(data);
                    if (data.error) {
                        response.statusCode = data.statusCode;
                        response.json(data);
                    }

                    response.statusCode = 201;
                    response.json(data.todos[data.todos.length-1]);
                } else {
                    response.json({error: 'Bad request'});
                }
            });
        })
        .put('/todos/:id', (request, response) => {
            const id = parseInt(request.params.id, 10);
            if (!id || !request.body) {
                response.statusCode = 400;
                response.json({
                    error: 'Bad request. Please, send us request body or check field id on request'
                });
            } else {
                middlewareFileSystem.getJSONFile((err, data) => {
                    if (err) {
                        console.error(err);
                        response.status(500);
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

                    data = middlewareFileSystem.updateJSONFile(data);
                    if (data.error) {
                        response.status(500);
                    } else {
                        data = data.todos.filter(todo => todo.id === id)[0];
                        response.statusCode = 200;
                    }

                    response.json(data);
                });
            }
        })
        .delete('/todos/:id', (request, response) => {
            const id = parseInt(request.params.id, 10);
            if (!id && id !== 0) {
                response.statusCode = 400;
                response.json({error: 'Bad request. Please, send field id on request'});
            } else {
                middlewareFileSystem.getJSONFile((err, data) => {
                    if (err) {
                        console.error(err);
                        response.status(500);
                    }

                    data = JSON.parse(data);
                    let todo = data.todos.filter(todo => todo.id === id);
                    if (todo.length === 1) {
                        data.todos.splice(data.todos.indexOf(todo[0]), 1);
                        data = middlewareFileSystem.updateJSONFile(data);
                        if (data.error) {
                            response.statusCode = 500;
                            response.json(data);
                        } else {
                            response.statusCode = 200;
                            response.json({id: id});
                        }
                    } else {
                        response.statusCode = 400;
                        response.json({error: 'Bad request! Please, this id is not valid for no one todo item'});
                    }
                });
            }
        });

    return router
};

export const APIFilters = () => {
    router.get('/filters', (request, response) => {
        middlewareFileSystem.getJSONFile((err, data) => {
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
        middlewareFileSystem.getJSONFile((err, data) => {
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
