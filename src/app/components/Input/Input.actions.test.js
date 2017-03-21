import { addTodo } from './Input.actions';

describe('Actions: InputComponent', () => {
    test('should be imported', () => {
        expect(addTodo).toBeDefined();
        expect(typeof addTodo).toBe('function');
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
