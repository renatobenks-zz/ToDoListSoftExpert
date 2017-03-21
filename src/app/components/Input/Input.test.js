import { AphroditeStyles, event, document, fetch } from './../components.mock';

import { store, getInitialState } from './../../state';
import { addTodo } from './../../actions';

import InputTodoItemComponent, { InputToDoItemComponent } from './Input';

//noinspection JSAnnotator
global.document = document;

//noinspection JSAnnotator
global.fetch = fetch;

describe('Component: InputToDoItemComponent', () => {
    test('should be imported', () => {
        expect(InputToDoItemComponent).toBeDefined();
        expect(InputTodoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(InputToDoItemComponent.addTodoItem).toBeDefined();
        expect(typeof InputToDoItemComponent.addTodoItem).toBe('function');
        expect(InputToDoItemComponent.addTodoItemWithEnter).toBeDefined();
        expect(typeof InputToDoItemComponent.addTodoItemWithEnter).toBe('function');
        expect(InputTodoItemComponent.renderInput).toBeDefined();
        expect(typeof InputTodoItemComponent.renderInput).toBe('function');
    });

    describe('static addTodoItemWithEnter', () => {
        test('should dispatch new state with new todo item added when type enter key', () => {
            spyOn(InputToDoItemComponent, 'addTodoItem');

            InputToDoItemComponent.addTodoItemWithEnter(event);
            expect(InputToDoItemComponent.addTodoItem).toHaveBeenCalledWith(event);
        });

        test('should not dispatch new add todo item when not type enter key', () => {
            spyOn(InputToDoItemComponent, 'addTodoItem');

            event.which = 27;

            InputToDoItemComponent.addTodoItemWithEnter(event);
            expect(InputToDoItemComponent.addTodoItem).not.toHaveBeenCalled();

            event.which = 'Esc';

            InputToDoItemComponent.addTodoItemWithEnter(event);
            expect(InputToDoItemComponent.addTodoItem).not.toHaveBeenCalled();
        });
    });

    describe('static addTodoItem () =>', () => {
        let todo = {text: 'data todoInput', severity: 'normal'};
        const mockFetch = jest.fn(() => {
            return fetch('/api/v1/todos', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(todo)
            })
        });

        test('should fetch to api the new todo item', () => {
            return getInitialState()
                .then(() => {
                    return mockFetch()
                        .then((data) => {
                            InputToDoItemComponent.addTodoItem(event);
                            expect(data.json()).toEqual({
                                id: 4,
                                text: todo.text,
                                severity: todo.severity,
                                done: false
                            });
                        });
                });
        });

        test('should dispatch new state todo items with new todo item added', () => {
            const mockAddTodo = jest.fn(addTodo);
            return getInitialState()
                .then(() => {
                    spyOn(event, 'stopPropagation');
                    spyOn(store, 'dispatch');
                    InputToDoItemComponent.addTodoItem(event);
                    return mockFetch()
                        .then(data => {
                            return data.json();
                        })
                        .then((data) => {
                            expect(store.dispatch).toHaveBeenCalledWith(mockAddTodo(data));
                            expect(mockAddTodo).toHaveBeenCalledWith(data);
                            expect(event.stopPropagation).toHaveBeenCalled();
                        });
                });
        });
    });

    describe('static renderInput () =>', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return title app', () => {
            expect(InputTodoItemComponent.renderInput()).toBeDefined();
            expect(typeof InputTodoItemComponent.renderInput()).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});
