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
            if (err) {
                console.error(err);
                data = {error: 'Server error for save todo item!'};
                response.statusCode = 500;
            } else {
                response.statusCode = 200;
                let body = {
                    id: JSON.parse(data).todos.length,
                    text: request.body.text,
                    done: false,
                    severity: request.body.severity
                };

                data = manipulationFileSystem.updateJSONFile(body, (err) => {
                    if (err) {
                        console.error(err);
                        response.statusCode = 500;
                    }
                });
            }

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

export default { APITodoList, APIFilters }
