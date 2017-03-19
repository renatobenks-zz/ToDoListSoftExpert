import { AphroditeStyles, event } from './../components.mock';
import { css } from 'aphrodite';

import { todos } from './../../state';
import { filterTodoList } from './Filter.actions';

import filterComponent, { FilterComponent } from './Filter';

describe('Component: FilterComponent', () => {
    beforeEach(() => {
        AphroditeStyles.before();
    });

    test('should be imported', () => {
        expect(FilterComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(filterComponent.renderFilter).toBeDefined();
        expect(typeof filterComponent.renderFilter).toBe('function');
        expect(FilterComponent.filterTodoList).toBeDefined();
        expect(typeof FilterComponent.filterTodoList).toBe('function');
        expect(FilterComponent.todoShouldFilter).toBeDefined();
        expect(typeof FilterComponent.todoShouldFilter).toBe('function');
    });

    describe('filterTodoList () =>', () => {
        const mockFilterTodoList = jest.fn(filterTodoList);
        beforeEach(() => {
            spyOn(todos, 'dispatch');
        });

        test('should filter for todo items than its done', () => {
            event.target.value = 'true';

            FilterComponent.filterTodoList(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockFilterTodoList(true));
            expect(mockFilterTodoList).toHaveBeenCalledWith(true);
        });

        test('should filter for todo items than its not done', () => {
            event.target.value = 'false';

            FilterComponent.filterTodoList(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockFilterTodoList(false));
            expect(mockFilterTodoList).toHaveBeenCalledWith(false);
        });

        test('should filter all todo items', () => {
            event.target.value = 'null';

            FilterComponent.filterTodoList(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockFilterTodoList(null));
            expect(mockFilterTodoList).toHaveBeenCalledWith(null);
        });
    });

    describe('static todoShouldFilter () =>', () => {
        test('should return all items when filter its null', () => {
            expect(FilterComponent.todoShouldFilter('null')).toBe(null);
        });

        test('should return what items would filter', () => {
            expect(FilterComponent.todoShouldFilter('true')).toBe(true);
            expect(FilterComponent.todoShouldFilter('false')).toBe(false);
        });
    });

    describe('static renderFilter () =>', () => {
        test('should be render filter to app', () => {
            expect(filterComponent.renderFilter()).toBeDefined();
            expect(typeof filterComponent.renderFilter()).toBe('string');
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
