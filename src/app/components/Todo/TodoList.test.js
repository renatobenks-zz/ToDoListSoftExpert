import { AphroditeStyles, state } from './../components.mock';

import ToDoListComponent, { TodoListComponent } from './TodoList';
import TodoItemComponent from './TodoItem';

describe('Component: TodoListComponent', () => {
    const testComponentStaticMethod = (rendered) => {
        expect(rendered).toBeDefined();
        expect(typeof rendered).toBe('string');
    };

    test('should be imported', () => {
        expect(TodoListComponent).toBeDefined();
        expect(ToDoListComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(ToDoListComponent.renderToDoItems).toBeDefined();
        expect(typeof ToDoListComponent.renderToDoItems).toBe('function');
        expect(TodoListComponent.getToDoItems).toBeDefined();
        expect(typeof TodoListComponent.getToDoItems).toBe('function');
    });

    beforeEach(() => {
        AphroditeStyles.before();
    });

    describe('constructor () =>', () => {
        test('should create getter for todos list', () => {
            expect(ToDoListComponent.getToDos).toBeDefined();
            expect(typeof ToDoListComponent.getToDos).toBe('function');
        }); 
    });

    describe('getToDos () =>', () => {
        test('should get the todo list items', () => {
            spyOn(TodoListComponent, 'getToDoItems');

            let todos = ToDoListComponent.getToDos(state.todos);
            expect(TodoListComponent.getToDoItems).toHaveBeenCalledWith(state.todos);
            expect(todos).toEqual(TodoListComponent.getToDoItems(state.todos));
        });
    });

    describe('static getToDos () =>', () => {
        test('should render all ToDo items to the list ToDos', () => {
            spyOn(TodoItemComponent, 'renderToDoItem');

            TodoListComponent.getToDoItems(state.todos);
            expect(TodoItemComponent.renderToDoItem).toHaveBeenCalledTimes(state.todos.length);
        });

        test('should return elements like string to the ToDo list', () => {
            testComponentStaticMethod(TodoListComponent.getToDoItems(state.todos));
        });
    });

    describe('renderToDoItems () =>', () => {
        test('should return all items listing on ToDo list', () => {
            testComponentStaticMethod(ToDoListComponent.renderToDoItems(state.todos));
        });

        test('should get todo list app from initial state list', () => {
            spyOn(ToDoListComponent, 'getToDos');

            ToDoListComponent.renderToDoItems(state.todos);
            expect(ToDoListComponent.getToDos).toHaveBeenCalledWith(state.todos);
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});

