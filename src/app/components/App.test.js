import { state, window, document, AphroditeStyles } from './components.mock.js';

import { isEnabled } from './../lib/feature';

import AppViewComponent, { AppComponent } from './App';

import Component from './View';
import TitleComponent from './Title/Title';
import InputToDoItemComponent from './Input/Input';
import TodoListComponent from './Todo/TodoList';
import { TestingFeaturesComponent } from './TestingFeatures/TestingFeatures';

//noinspection JSAnnotator
global.window = window;
//noinspection JSAnnotator
global.document = document;

describe('Component: AppComponent', () => {
    const element = Object.prototype;

    beforeEach(() => {
        AphroditeStyles.before();
    });

    test('should be imported', () => {
        expect(AppComponent).toBeDefined();
        expect(AppViewComponent).toBeDefined();
    });

    test('should get methods from component', () => {
        expect(AppViewComponent.renderApp).toBeDefined();
        expect(AppViewComponent.render).toBeDefined();
        expect(AppComponent.renderAddToDoItemAt).toBeDefined();
        expect(AppComponent.joinComponents).toBeDefined();
    });

    describe('constructor () =>', () => {
        test('should instance super class', () => {
            expect(AppViewComponent instanceof Component).toBe(true);
        });
    });

    const hashes = ['filter', 'renderBottom', 'filterTop'];

    describe('renderApp () =>', () => {
        beforeEach(() => {
            spyOn(TestingFeaturesComponent, 'windowHashChange').and.callFake((element, state) => {
                return {
                    element,
                    state
                }
            });
        });

        test('should be render app to element', () => {
            spyOn(AppViewComponent, 'render');

            AppViewComponent.renderApp(element, state);
            expect(TestingFeaturesComponent.windowHashChange).toHaveBeenCalledWith(element, state);
            expect(AppViewComponent.render).toHaveBeenCalledWith(
                element,
                AppComponent.renderAddToDoItemAt(isEnabled(hashes), state)
            );
        });

        test('should be rendered the todo list data to the app across with hash passed', () => {
            spyOn(AppComponent, 'renderAddToDoItemAt').and.callThrough();

            AppViewComponent.renderApp(element, state);
            expect(AppComponent.renderAddToDoItemAt).toHaveBeenCalled();
        });
    });

    describe('static joinComponents () =>', () => {
        test('should join app components to render', () => {
            let AppComponents = AppComponent.joinComponents([
                'Component 1',
                'Component 2'
            ]);

            expect(AppComponents)
                .toBe('Component 1\nComponent 2');
        });
    });

    describe('static renderAddToDoItemAt () =>', () => {
        test('should get data from app components', () => {
            const components = [
                { component: TitleComponent, method: 'renderTitle' },
                { component: InputToDoItemComponent, method: 'renderInput' },
                { component: TodoListComponent, method: 'renderToDoItems' }
            ];

            for (let component of components) {
                spyOn(component.component, component.method);
                AppComponent.renderAddToDoItemAt(isEnabled(hashes), state);
                expect(component.component[component.method]).toHaveBeenCalled();
            }

            expect(TodoListComponent.renderToDoItems).toHaveBeenCalledWith(state.todos);
            expect(InputToDoItemComponent.renderInput).toHaveBeenCalledWith(state.severities);
        });

        test('should be render input to add todo item at top when renderButton is disabled', () => {
            let Components = [
                TitleComponent.renderTitle(),
                InputToDoItemComponent.renderInput(state.severities),
                TodoListComponent.renderToDoItems(state.todos)
            ];

            spyOn(AppComponent, 'joinComponents');

            AppComponent.renderAddToDoItemAt(isEnabled(hashes), state);
            expect(AppComponent.joinComponents).toHaveBeenCalledWith(Components);
        });

        test('should be render input to add todo item at bottom when renderButton is enabled', () => {
            window.location.hash = '#renderBottom';
            let Components = [
                TitleComponent.renderTitle(),
                TodoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput(state.severities)
            ];

            spyOn(AppComponent, 'joinComponents');

            AppComponent.renderAddToDoItemAt(isEnabled(hashes), state);
            expect(AppComponent.joinComponents).toHaveBeenCalledWith(Components);
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
