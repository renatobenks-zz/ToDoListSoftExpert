import { toggleSeverity } from './Severity.actions';

describe('Actions: SeverityComponent', () => {
    test('should be imported', () => {
        expect(toggleSeverity).toBeDefined();
        expect(typeof toggleSeverity).toBe('function');
    });

    describe('toggleSeverity () =>', () => {
        test('should toggle severity selected', () => {
            expect(toggleSeverity(1)).toEqual({
                type: 'TOGGLE_SEVERITY_TODO',
                id: 1
            });
        });
    });
});
