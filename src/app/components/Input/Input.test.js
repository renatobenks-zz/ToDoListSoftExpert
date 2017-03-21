import { AphroditeStyles, event, document, fetch, state } from './../components.mock';

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
        test.skip('should fetch to api the new todo item', () => {
            const mockFetch = jest.fn(fetch);
        });

        test('should dispatch new state todo items with new todo item added', () => {
            const mockAddTodo = jest.fn(addTodo);
            spyOn(event, 'stopPropagation');
            return getInitialState()
                .then(() => {
                    spyOn(store, 'dispatch');
                    InputToDoItemComponent.addTodoItem(event);
                    expect(store.dispatch).toHaveBeenCalledWith(mockAddTodo('data todoInput'));
                    expect(mockAddTodo).toHaveBeenCalledWith('data todoInput');
                    expect(event.stopPropagation).toHaveBeenCalled();
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
