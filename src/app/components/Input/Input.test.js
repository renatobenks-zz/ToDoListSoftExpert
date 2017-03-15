import { AphroditeStyles } from './../components.mock';

import { todos } from './../../state';
import { addTodo } from './../../actions';

import { InputToDoItemComponent } from './Input';

const event = {
    target: {
        matches: selector => true,
        getAttribute: attribute => '1'
    },
    stopPropagation: () => true
};

global.document = {
    getElementById: id => { return {value: `data ${id}`} }
};

describe('Component: InputToDoItemComponent', () => {
    test('should be imported', () => {
        expect(InputToDoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(InputToDoItemComponent.renderInput).toBeDefined();
        expect(typeof InputToDoItemComponent.renderInput).toBe('function');
        expect(InputToDoItemComponent.addTodoItem).toBeDefined();
        expect(typeof InputToDoItemComponent.addTodoItem).toBe('function');
    });

    describe('addTodoItem () =>', () => {
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
