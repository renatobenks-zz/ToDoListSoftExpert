import { AphroditeStyles, event, state } from './../components.mock';
import { css } from 'aphrodite';

import { todos } from './../../state';
import { filterTodoList, toggleFilter } from './Filter.actions';

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
        expect(filterComponent.getFilters).toBeDefined();
        expect(typeof filterComponent.getFilters).toBe('function');
        expect(FilterComponent.filterTodoList).toBeDefined();
        expect(typeof FilterComponent.filterTodoList).toBe('function');
        expect(FilterComponent.todoShouldFilter).toBeDefined();
        expect(typeof FilterComponent.todoShouldFilter).toBe('function');
    });

    describe('static filterTodoList () =>', () => {
        const mockFilterTodoList = jest.fn(filterTodoList);
        const mockToggleFilterSelected = jest.fn(toggleFilter);
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

        test('should update state filter selected', () => {
            FilterComponent.filterTodoList(event);
            expect(todos.dispatch).toHaveBeenCalledWith(mockToggleFilterSelected(2));
            expect(mockToggleFilterSelected).toHaveBeenCalledWith(2);
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

    describe('getFilters () =>', () => {
        test('should get filters', () => {
            expect(filterComponent.getFilters(state.filters)).toBeDefined();
            expect(typeof filterComponent.getFilters(state.filters)).toBe('string');
        });
    });

    describe('renderFilter () =>', () => {
        test('should be render filter to app', () => {
            expect(filterComponent.renderFilter(state.filters)).toBeDefined();
            expect(typeof filterComponent.renderFilter(state.filters)).toBe('string');
        });

        test('should render got filters for todo list', () => {
            spyOn(filterComponent, 'getFilters');

            filterComponent.renderFilter(state.filters);
            expect(filterComponent.getFilters).toHaveBeenCalledWith(state.filters);
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
