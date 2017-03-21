import { Router } from 'express';
import manipulationFileSystem from './middlewares/manipulationFileSystem';

const router = new Router;

export const APITodoList = () => {
    router.get('/todos', (request, response) => {
        manipulationFileSystem.getJSONFile((err, data) => {
            if (err) {
                data = {error: 'Server error for save todo item!'};
                response.statusCode = 500;
            } else {
                data = {todos: JSON.parse(data).todos};
                response.statusCode = 200;
            }

            response.json(data);
        });
    });

    router.post('/todos', (request, response) => {
        manipulationFileSystem.getJSONFile((err, data) => {
            let todo;
            if (err) {
                console.error(err);
                response.statusCode = 500;
                todo = {error: 'Server error for save todo item!'};
            }

            let todos = JSON.parse(data).todos.filter(todo => request.body.id === todo.id);
            if (!todo) {
                if (todos.length > 0) {
                    response.statusCode = 500;
                    todo = {error: 'Todo already created!'};
                } else {
                    response.statusCode = 200;
                    todo = manipulationFileSystem.updateJSONFile(request.body, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
            }

            response.json(todo);
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

export default { APITodoList, APIFilters }
