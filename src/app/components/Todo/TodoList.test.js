import { AphroditeStyles, state } from './../mock';

import { TodoListComponent } from './TodoList';
import { TodoItemComponent } from './TodoItem';

describe('Component: TodoListComponent', () => {
    const testComponentStaticMethod = (rendered) => {
        expect(rendered).toBeDefined();
        expect(typeof rendered).toBe('string');
    };

    test('should be imported', () => {
        expect(TodoListComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(TodoListComponent.renderToDoItems).toBeDefined();
        expect(typeof TodoListComponent.renderToDoItems).toBe('function');
        expect(TodoListComponent.getToDoItems).toBeDefined();
        expect(typeof TodoListComponent.getToDoItems).toBe('function');
    });

    beforeEach(() => {
        AphroditeStyles.before();
    });

    describe('- static renderToDoItems () =>', () => {
        test('should return all items listing on ToDo list', () => {
            testComponentStaticMethod(TodoListComponent.renderToDoItems(state.todos));
        });

        test('should get ToDo list from initial state list', () => {
            spyOn(TodoListComponent, 'getToDoItems');

            TodoListComponent.renderToDoItems();
            expect(TodoListComponent.getToDoItems).toHaveBeenCalled();
        });
    });

    describe('- static getToDos () =>', () => {
        test('should render all ToDo items to the list ToDos', () => {
            spyOn(TodoItemComponent, 'renderToDoItem');

            TodoListComponent.getToDoItems(state.todos);
            expect(TodoItemComponent.renderToDoItem).toHaveBeenCalledTimes(state.todos.length);
        });

        test('should return elements like string to the ToDo list', () => {
            testComponentStaticMethod(TodoListComponent.getToDoItems(state.todos));
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});

