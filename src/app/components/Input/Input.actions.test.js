import { addTodo, toggleTodoSeverity } from './Input.actions';

describe('Actions: InputComponent', () => {
    test('should be imported', () => {
        expect(addTodo).toBeDefined();
        expect(typeof addTodo).toBe('function');
        expect(toggleTodoSeverity).toBeDefined();
        expect(typeof toggleTodoSeverity).toBe('function');
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

    describe('toggleTodoSeverity () =>', () => {
        test('should return new severity choose', () => {
            expect(toggleTodoSeverity('urgent')).toEqual({
                type: 'TOGGLE_TODO_SEVERITY',
                severity: 'urgent'
            });
        });
    });
});
