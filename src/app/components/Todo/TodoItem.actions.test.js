import { toggleTodoState } from './TodoItem.actions';

describe('Actions: TodoItemComponent', () => {
    test('should be imported', () => {
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
});
