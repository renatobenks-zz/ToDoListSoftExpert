import { createStore } from './lib/state';

import { todos, todoChangeHandler } from './state';

import { addTodo, toggleTodoState } from './actions';
import { filterTodoList } from './components/Filter/Filter.actions';

import { state } from './components/components.mock';

describe('State: App', () => {
    test('should be imported reducer', () => {
        expect(todoChangeHandler).toBeDefined();
        expect(typeof todoChangeHandler).toBe('function');
    });

    test('should be created store', () => {
        expect(todos).toBeDefined();
        expect(typeof todos).toBe('object');
    });

    const mockReducer = jest.fn(todoChangeHandler);
    const mockCreateStore = jest.fn(createStore);

    let store = mockCreateStore(mockReducer, state);

    describe('createStore () =>', () => {
        test('should be created the store for control app state', () => {
            expect(store.dispatch).toBeDefined();
            expect(store.subscribe).toBeDefined();
            expect(store.getState).toBeDefined();
        });

        test('should use reducer for update store state', () => {
            store.dispatch(filterTodoList(null));
            expect(mockReducer).toHaveBeenCalledWith(state, filterTodoList(null));
        });
    });

    describe('todoChangeHandler () =>', () => {
        describe('change: ADD_TODO', () => {
            test('should add new todo to state todo list', () => {
                expect(state.todos.length).toBe(4);
                mockReducer(state, addTodo('my task'));
                expect(state.todos.length).toBe(5);
                expect(state.todos[state.todos.length-1]).toEqual({
                    id: state.todos.length-1,
                    text: 'my task',
                    done: false
                });
            });
        });

        describe('change: TODO_TOGGLE_DONE', () => {
            test('should toggle done status todo item', () => {
                expect(state.todos[0].done).toBe(true);
                mockReducer(state, toggleTodoState(0));
                expect(state.todos[0].done).toBe(false);
                expect(state.todos[1].done).toBe(false);
                mockReducer(state, toggleTodoState(1));
                expect(state.todos[1].done).toBe(true);
            });
        });

        describe('change: FILTER_TODO', () => {
            test('should filter for all todo items', () => {
                expect(state.todos.length).toBe(5);
                mockReducer(state, filterTodoList(false));
                expect(state.todos.length).toBe(4);
                mockReducer(state, filterTodoList(true));
                expect(state.todos.length).toBe(1);
            });
        });
    });
});