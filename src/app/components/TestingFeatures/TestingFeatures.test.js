import { AphroditeStyles, event, window, document, state } from '../components.mock';

import AppComponent from '../App';
import { TestingFeaturesComponent } from './TestingFeatures';

//noinspection JSAnnotator
global.document = document;
//noinspection JSAnnotator
global.window = window;

describe('Component: TestingFeatures', () => {
    test('should be imported', () => {
        expect(TestingFeaturesComponent).toBeDefined();
        // expect(TestingFeatures).toBeDefined();
    });

    describe('static windowHashChange () =>', () => {
        test('should update app components when window hash change', async () => {
            let element = {};
            AphroditeStyles.before();

            spyOn(event, 'stopImmediatePropagation');
            spyOn(AppComponent, 'renderApp').and.callFake((element, state) => {
                return {
                    element,
                    state
                }
            });

            TestingFeaturesComponent.windowHashChange(element, state);

            expect(AppComponent.renderApp).toHaveBeenCalledWith(element, state);
            expect(event.stopImmediatePropagation).toHaveBeenCalled();
            AphroditeStyles.after();
        });
    });
});
