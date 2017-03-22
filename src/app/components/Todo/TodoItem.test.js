import { state, AphroditeStyles, event, fetch } from '../components.mock';

import { store, getInitialState } from '../../state';
import { toggleTodoState, removeTodoItem } from './TodoItem.actions';

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

    getInitialState().then();

    describe('static toggleStatusTodoItem () =>', () => {
        beforeEach(() => {
            spyOn(callAPIMiddleware, 'FETCH_REQUEST').and.callThrough();
        });

        test('should fetch params to api for update todo item ', () => {
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

    describe('static removeTodoItem () =>', () => {
        beforeEach(() => {
            event.target.parentNode = event.target;
            spyOn(callAPIMiddleware, 'FETCH_REQUEST').and.callThrough();
        });

        test('should fetch todo item id for delete it', () => {
            TodoItemComponent.removeTodoItem(event);
            expect(callAPIMiddleware.FETCH_REQUEST).toHaveBeenCalledWith('/todos/2', 'DELETE');
        });

        test('should delete todo item', () => {
            const mockRemoveTodoItem = jest.fn(removeTodoItem);
            spyOn(store, 'dispatch').and.callThrough();
            TodoItemComponent.removeTodoItem(event);
            return callAPIMiddleware.FETCH_REQUEST('/todos/2', 'DELETE')
                .then(todo => {
                    expect(todo.id).toBe(2);
                    expect(store.dispatch).toHaveBeenCalledWith(mockRemoveTodoItem(todo.id));
                    expect(mockRemoveTodoItem).toHaveBeenCalledWith(todo.id);
                });
        });

        test('should throw and console error when bad request', () => {
            spyOn(store, 'dispatch').and.callThrough();
            spyOn(console, 'error').and.callThrough();
            event.target.parentNode.querySelector().getAttribute = attr => 'id';

            TodoItemComponent.removeTodoItem(event);
            return callAPIMiddleware.FETCH_REQUEST('/todos/id', 'DELETE')
                .then((todo) => {
                    expect(store.dispatch).not.toHaveBeenCalled();
                    expect(console.error).toHaveBeenCalledWith(todo.error);
                    expect(todo.error).toThrow();
                });
        });
    });

    describe('renderToDoItem () =>', () => {
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
