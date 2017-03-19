import { filterTodoList, toggleFilter } from './Filter.actions';

describe('Actions: FilterComponent', () => {
    test('should be imported', () => {
        expect(filterTodoList).toBeDefined();
        expect(toggleFilter).toBeDefined();
    });

    describe('filterTodoList', () => {
        test('should return filters for filter todo list', () => {
            expect(filterTodoList(true)).toEqual({
                type: 'FILTER_TODO',
                status: true
            });

            expect(filterTodoList(false)).toEqual({
                type: 'FILTER_TODO',
                status: false
            });
        });
    });

    describe('toggleFilter', () => {
        test('should change selected filter', () => {
            expect(toggleFilter(1)).toEqual({
                type: 'TOGGLE_FILTER',
                id: 1
            });
        });
    });
});
