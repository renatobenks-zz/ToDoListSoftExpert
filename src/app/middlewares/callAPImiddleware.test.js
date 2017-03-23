import 'babel-polyfill';
import callAPIMiddleware from './callAPImiddleware';

import { fetch, state } from '../components/components.mock';

//noinspection JSAnnotator
global.fetch = fetch;

fdescribe('middleware: callAPI', () => {
    test('should be imported', () => {
        expect(callAPIMiddleware).toBeDefined();
        expect(typeof callAPIMiddleware).toBe('object');
    });

    describe('async FETCH_REQUEST () =>', () => {
        test('should get FETCH_REQUEST', () => {
            expect(callAPIMiddleware.FETCH_REQUEST).toBeDefined();
            expect(typeof callAPIMiddleware.FETCH_REQUEST).toBe('function');
        });

        test('should try fetch request for get data from api with body request', () => {
            const params = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            };
            const mockFetchAPI = jest.fn(fetch);
            expect(state.todos.length).toBe(4);
            return callAPIMiddleware.FETCH_REQUEST('/todos/1', 'DELETE')
                .then((todo) => {
                    expect(state.todos.length).toBe(3);
                    return mockFetchAPI('/api/v1/todos/1', params)
                        .then(data => data.json())
                        .then(data => {
                            expect(todo).toEqual(data);
                            expect(mockFetchAPI).toHaveBeenCalledWith('/api/v1/todos/1', params);
                        });
                });
        });

        test('should get data from fetch request api with no params', () => {
            try {
                return callAPIMiddleware.FETCH_REQUEST('/todos', 'GET')
                    .then((data) => {
                        expect(data).toEqual(state.todos);
                    });
            } catch (e) {
                console.log(e);
            }
        });

        test('should handler error if catch fetch request', async () => {
            spyOn(console, 'error');
            try {
                callAPIMiddleware.FETCH_REQUEST();
            } catch (e) {
                expect(console.error).toHaveBeenCalledWith(e);
            }
        });
    });
});
