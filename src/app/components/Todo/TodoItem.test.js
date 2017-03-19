import { state, AphroditeStyles, event } from './../components.mock';

import { todos } from './../../state';
import { toggleTodoState } from './../../actions';

import ToDoItemComponent, { TodoItemComponent } from './TodoItem';

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
        test('should toggle status todo item', () => {
            const mockToggleTodoItem = jest.fn(toggleTodoState);
            spyOn(todos, 'dispatch');

            TodoItemComponent.toggleStatusTodoItem(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockToggleTodoItem(2));
            expect(mockToggleTodoItem).toHaveBeenCalledWith(2);
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
