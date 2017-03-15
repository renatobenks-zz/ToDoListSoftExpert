import { state, AphroditeStyles } from './../mock';

import { TodoItemComponent } from './TodoItem';

describe('Component: TodoItemComponent', () => {
    test('should be imported', () => {
        expect(TodoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(TodoItemComponent.renderToDoItem).toBeDefined();
        expect(typeof TodoItemComponent.renderToDoItem).toBe('function');
    });

    describe('- static renderToDoItem', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return element', () => {
            expect(TodoItemComponent.renderToDoItem(state.todos[0])).toBeDefined();
            expect(typeof TodoItemComponent.renderToDoItem(state.todos[0])).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});
