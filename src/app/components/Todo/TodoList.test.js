import { AphroditeStyles, state } from './../mock';

import { ToDoListComponent } from './TodoList';

describe('Component: ToDoListComponent', () => {
    const renderComponent = (rendered) => {
        expect(rendered).toBeDefined();
        expect(typeof rendered).toBe('string');
    };

    test('should be imported', () => {
        expect(ToDoListComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(ToDoListComponent.renderToDoItems).toBeDefined();
        expect(typeof ToDoListComponent.renderToDoItems).toBe('function');
        expect(ToDoListComponent.renderToDoItem).toBeDefined();
        expect(typeof ToDoListComponent.renderToDoItem).toBe('function');
        expect(ToDoListComponent.getToDoItems).toBeDefined();
        expect(typeof ToDoListComponent.getToDoItems).toBe('function');
    });

    beforeEach(() => {
        AphroditeStyles.before();
    });

    describe('- static renderToDoItems () =>', () => {
        test('should return all items listing on ToDo list', () => {
            renderComponent(ToDoListComponent.renderToDoItems(state.todos));
        });

        test('should get ToDo list from initial state list', () => {
            spyOn(ToDoListComponent, 'getToDoItems');

            ToDoListComponent.renderToDoItems();
            expect(ToDoListComponent.getToDoItems).toHaveBeenCalled();
        });
    });

    describe('- static getToDos () =>', () => {
        test('should render all ToDo items to the list ToDos', () => {
            spyOn(ToDoListComponent, 'renderToDoItem');

            ToDoListComponent.getToDoItems(state.todos);
            expect(ToDoListComponent.renderToDoItem).toHaveBeenCalledTimes(state.todos.length);
        });

        test('should return elements like string to the ToDo list', () => {
            renderComponent(ToDoListComponent.getToDoItems(state.todos));
        });
    });

    describe('- static renderToDoItem', () => {
        test('should return element', () => {
            renderComponent(ToDoListComponent.renderToDoItem(state.todos[0]));
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});

