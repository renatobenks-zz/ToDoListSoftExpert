import { AphroditeStyles } from './../mock';

import { InputToDoItemComponent } from './Input';

describe('Component: InputToDoItemComponent', () => {
    test('should be imported', () => {
        expect(InputToDoItemComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(InputToDoItemComponent.renderInput).toBeDefined();
        expect(typeof InputToDoItemComponent.renderInput).toBe('function');
    });

    describe('- static renderInput () =>', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return title app', () => {
            expect(InputToDoItemComponent.renderInput()).toBeDefined();
            expect(typeof InputToDoItemComponent.renderInput()).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});
