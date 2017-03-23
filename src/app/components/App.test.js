import { state, window, document, AphroditeStyles } from './components.mock.js';

import { isEnabled } from './../lib/feature';

import AppComponent from './App';

import Component from './View';
import TitleComponent from './Title/Title';
import InputToDoItemComponent from './Input/Input';
import TodoListComponent from './Todo/TodoList';
import FilterComponent from './Filter/Filter';

//noinspection JSAnnotator
global.window = window;
//noinspection JSAnnotator
global.document = document;

describe('Component: AppComponent', () => {
    let element = Object.prototype;

    beforeEach(() => {
        AphroditeStyles.before();
    });

    AphroditeStyles.before();
    const AppViewComponent = new AppComponent();
    AphroditeStyles.after();

    test('should be imported', () => {
        expect(AppComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(AppViewComponent.renderApp).toBeDefined();
        expect(AppComponent.renderAddToDoItemAt).toBeDefined();
        expect(AppViewComponent.render).toBeDefined();
    });

    describe('constructor () =>', () => {
        test('should instance super class', () => {
            expect(AppViewComponent instanceof Component).toBe(true);
        });
    });

    describe('renderApp () =>', () => {
        const mockIsEnabled = jest.fn(isEnabled);
        test('should be render app to element', () => {
            spyOn(AppViewComponent, 'render');

            AppViewComponent.renderApp(element, state);
            expect(AppViewComponent.render).toHaveBeenCalledWith(
                element,
                AppComponent.renderAddToDoItemAt(mockIsEnabled('renderBottom'), state)
            );
        });

        test('should be rendered the todo list data to the app across with hash passed', () => {
            spyOn(AppComponent, 'renderAddToDoItemAt');

            AppViewComponent.renderApp(element, state);
            expect(AppComponent.renderAddToDoItemAt).toHaveBeenCalledWith(mockIsEnabled('renderBottom'), state);
            expect(mockIsEnabled).toHaveBeenCalledWith('renderBottom');
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

    describe('renderAddToDoItemAt () =>', () => {
        test('should get data from app components', () => {
            const components = [
                { component: TitleComponent, method: 'renderTitle' },
                { component: InputToDoItemComponent, method: 'renderInput' },
                { component: TodoListComponent, method: 'renderToDoItems' },
                { component: FilterComponent, method: 'renderFilter' }
            ];

            for (let component of components) {
                spyOn(component.component, component.method);
                AppComponent.renderAddToDoItemAt(false, state);
                expect(component.component[component.method]).toHaveBeenCalled();
            }

            expect(TodoListComponent.renderToDoItems).toHaveBeenCalledWith(state.todos);
            expect(FilterComponent.renderFilter).toHaveBeenCalledWith(state.filters);
            expect(InputToDoItemComponent.renderInput).toHaveBeenCalledWith(state.severities);
        });

        test('should be render input to add todo item at top when renderButton is disabled', () => {
            let Components = [
                TitleComponent.renderTitle(),
                FilterComponent.renderFilter(state.filters),
                InputToDoItemComponent.renderInput(state.severities),
                TodoListComponent.renderToDoItems(state.todos)
            ];

            spyOn(AppComponent, 'joinComponents');

            AppComponent.renderAddToDoItemAt(false, state);
            expect(AppComponent.joinComponents).toHaveBeenCalledWith(Components);
        });

        test('should be render input to add todo item at bottom when renderButton is enabled', () => {
            let Components = [
                TitleComponent.renderTitle(),
                FilterComponent.renderFilter(state.filters),
                TodoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput(state.severities)
            ];

            spyOn(AppComponent, 'joinComponents');

            AppComponent.renderAddToDoItemAt(true, state);
            expect(AppComponent.joinComponents).toHaveBeenCalledWith(Components);
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
