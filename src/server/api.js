import { Router } from 'express';

const router = new Router;

export const APITodoList = (TODOS) => {
    router.get('/todos', (request, response) => {
        response.statusCode = 200;
        response.json({data: TODOS});
    });

    return router
};

export const APIFilters = (FILTERS) => {
    router.get('/filters', (request, response) => {
        response.statusCode = 200;
        response.json({data: FILTERS});
    });

    return router
};

export default { APITodoList, APIFilters }
