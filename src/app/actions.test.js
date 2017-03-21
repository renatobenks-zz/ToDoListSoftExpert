import { addTodo, toggleTodoState } from './actions';

describe('Actions: App', () => {
    test('should be imported', () => {
        expect(addTodo).toBeDefined();
        expect(typeof addTodo).toBe('function');
        expect(typeof toggleTodoState).toBe('function');
        expect(toggleTodoState).toBeDefined();
    });

    describe('toggleTodoState () =>', () => {
        test('should toggle todo item status', () => {
            expect(toggleTodoState(2)).toEqual({
                type: 'TODO_TOGGLE_DONE',
                id: 2
            });
        });
    });

    describe('addTodo () =>', () => {
        test('should return new todo item', () => {
            let todo = {
                id: 4,
                text: 'my new task',
                done: false,
                severity: 'normal'
            };
            expect(addTodo(todo)).toEqual({
                type: 'ADD_TODO',
                todo
            });
        });
    });
});
