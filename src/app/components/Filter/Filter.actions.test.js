import { filterTodoList } from './Filter.actions';

describe('Actions: FilterComponent', () => {
    test('should be imported', () => {
        expect(filterTodoList).toBeDefined();
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
});
