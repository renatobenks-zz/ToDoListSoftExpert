import { state, AphroditeStyles, event, fetch } from '../components.mock';

import { store, getInitialState } from '../../state';
import { toggleTodoState } from './TodoItem.actions';

import callAPIMiddleware from '../../middlewares/callAPImiddleware';

import ToDoItemComponent, { TodoItemComponent } from './TodoItem';

//noinspection JSAnnotator
global.fetch = fetch;

describe('Component: TodoItemComponent', () => {
    test('should be imported', () => {
        expect(TodoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(ToDoItemComponent.renderToDoItem).toBeDefined();
        expect(typeof ToDoItemComponent.renderToDoItem).toBe('function');
        expect(TodoItemComponent.toggleStatusTodoItem).toBeDefined();
        expect(typeof TodoItemComponent.toggleStatusTodoItem).toBe('function');
    });

    describe('toggleStatusTodoItem () =>', () => {
        beforeEach(() => {
            spyOn(callAPIMiddleware, 'FETCH_REQUEST').and.callThrough((endpoint, method, data) => {
                return fetch('/api/v1'.concat(endpoint), {
                    method: method,
                    body: data
                }).then(data => data.json());
            });
        });

        test('should fetch params todo item to update', () => {
            event.target.checked = true;
            TodoItemComponent.toggleStatusTodoItem(event);
            expect(callAPIMiddleware.FETCH_REQUEST).toHaveBeenCalledWith('/todos/2', 'PUT', {done: true});
        });

        test('should toggle status todo item', () => {
            const mockToggleTodoItem = jest.fn(toggleTodoState);
            return getInitialState()
                .then(() => {
                    spyOn(store, 'dispatch');

                    TodoItemComponent.toggleStatusTodoItem(event);
                    return callAPIMiddleware.FETCH_REQUEST('/todos/2', 'PUT', {done: true})
                        .then(todo => {
                            expect(store.dispatch).toHaveBeenCalledWith(mockToggleTodoItem(todo.id));
                            expect(mockToggleTodoItem).toHaveBeenCalledWith(todo.id);
                        });
                });
        });
    });

    describe('static renderToDoItem () =>', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return element', () => {
            expect(ToDoItemComponent.renderToDoItem(state.todos[0])).toBeDefined();
            expect(typeof ToDoItemComponent.renderToDoItem(state.todos[0])).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});
