import { AphroditeStyles } from './../components.mock';

import TitleComponent from './Title';

describe('Component: TitleComponent', () => {
    test('should be imported', () => {
        expect(TitleComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(TitleComponent.renderTitle).toBeDefined();
        expect(typeof TitleComponent.renderTitle).toBe('function');
    });

    describe('- static renderTitle () =>', () => {
        beforeEach(() => {
            AphroditeStyles.before();
        });

        test('should return title app', () => {
            expect(TitleComponent.renderTitle()).toBeDefined();
            expect(typeof TitleComponent.renderTitle()).toBe('string');
        });

        afterEach(() => {
            AphroditeStyles.after();
        });
    });
});
