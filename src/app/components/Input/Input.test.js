import { AphroditeStyles } from './../components.mock';

import { todos } from './../../state';
import { addTodo } from './../../actions';

import { InputToDoItemComponent } from './Input';

const event = {
    target: {
        matches: selector => true,
        getAttribute: attribute => '1'
    },
    stopPropagation: () => true,
    preventDefault: () => true,
    which: 13,
    key: 'Enter'
};

global.document = {
    getElementById: id => { return {value: `data ${id}`} }
};

describe('Component: InputToDoItemComponent', () => {
    test('should be imported', () => {
        expect(InputToDoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(InputToDoItemComponent.addTodoItem).toBeDefined();
        expect(typeof InputToDoItemComponent.addTodoItem).toBe('function');
        expect(InputToDoItemComponent.addTodoItemWithEnter).toBeDefined();
        expect(typeof InputToDoItemComponent.addTodoItemWithEnter).toBe('function');
        expect(InputToDoItemComponent.renderInput).toBeDefined();
        expect(typeof InputToDoItemComponent.renderInput).toBe('function');
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
        test('should dispatch new state todo items with new todo item added', () => {
            const mockAddTodo = jest.fn(addTodo);
            spyOn(todos, 'dispatch');
            spyOn(event, 'stopPropagation');

            InputToDoItemComponent.addTodoItem(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockAddTodo('data todoInput'));
            expect(mockAddTodo).toHaveBeenCalledWith('data todoInput');
            expect(event.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('static renderInput () =>', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return title app', () => {
            expect(InputToDoItemComponent.renderInput()).toBeDefined();
            expect(typeof InputToDoItemComponent.renderInput()).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});
