import { AphroditeStyles, event, document, fetch, state } from './../components.mock';

import { store, getInitialState } from './../../state';
import { addTodo } from './Input.actions';

import callAPIMiddleware from '../../middlewares/callAPImiddleware';

import SeverityComponent from '../Severity/Severity';

import StylesInputToDoItemComponent from './Input.styles';
import InputTodoItemComponent, { InputToDoItemComponent } from './Input';

//noinspection JSAnnotator
global.document = document;

//noinspection JSAnnotator
global.fetch = fetch;

describe('Component: InputToDoItemComponent', () => {
    beforeEach(() => {
        AphroditeStyles.before();
    });

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
        let todo = {text: 'data value', severity: 'normal'};

        beforeEach(() => {
            spyOn(callAPIMiddleware, 'FETCH_REQUEST').and.callThrough();
        });

        test('should fetch to api the new todo item', () => {
            InputTodoItemComponent.renderInput(state.severities);
            InputToDoItemComponent.addTodoItem(event);
            expect(callAPIMiddleware.FETCH_REQUEST).toHaveBeenCalledWith('/todos', 'POST', {
                text: 'data value',
                severity: 'normal'
            });
        });

        test('should dispatch new state todo items with new todo item added', () => {
            const mockAddTodo = jest.fn(addTodo);
            return getInitialState()
                .then(() => {
                    spyOn(event, 'stopPropagation');
                    spyOn(store, 'dispatch');
                    InputToDoItemComponent.addTodoItem(event);
                    return callAPIMiddleware.FETCH_REQUEST('/todos', 'POST', todo)
                        .then((todo) => {
                            expect(store.dispatch).toHaveBeenCalledWith(mockAddTodo(todo));
                            expect(mockAddTodo).toHaveBeenCalledWith(todo);
                            expect(event.stopPropagation).toHaveBeenCalled();
                        });
                });
        });

        test('should be throw and console error when error happen on fetch', () => {
            return getInitialState()
                .then(() => {
                    todo.text = true;
                    event.target.value = true;
                    spyOn(console, 'error');

                    InputToDoItemComponent.addTodoItem(event);
                    return callAPIMiddleware.FETCH_REQUEST('/todos', 'POST', todo)
                        .then(todo => {
                            expect(todo.error).toBeDefined();
                            expect(console.error).toHaveBeenCalledWith(todo.error);
                            expect(todo.error).toThrow();
                        });
                });
        });

        test('should add error class for input when was empty', () => {
            jest.useFakeTimers();
            let inputErrorClass = StylesInputToDoItemComponent.inputError._name;
            event.target.value = '';
            spyOn(event.target.classList, 'add');
            spyOn(event.target.classList, 'remove');

            InputToDoItemComponent.addTodoItem(event);
            let mockTimeOut = setTimeout.mock.calls[0][0];
            expect(event.target.classList.add).toHaveBeenCalledWith(inputErrorClass);
            mockTimeOut();
            expect(event.target.classList.remove).toHaveBeenCalledWith(inputErrorClass);
        });
    });

    describe('renderInput () =>', () => {
        test('should return input app for add todo', () => {
            expect(InputTodoItemComponent.renderInput(state.severities)).toBeDefined();
            expect(typeof InputTodoItemComponent.renderInput(state.severities)).toBe('string');
        });

        test('should be rendered the severity component for select severity to todo item', () => {
            spyOn(SeverityComponent, 'render');

            InputTodoItemComponent.renderInput(state.severities);
            expect(SeverityComponent.render).toHaveBeenCalledWith(state.severities);
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
