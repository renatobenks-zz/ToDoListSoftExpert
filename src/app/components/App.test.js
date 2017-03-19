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
        expect(AppViewComponent.renderAddToDoItemAt).toBeDefined();
        expect(AppViewComponent.render).toBeDefined();
    });

    describe('constructor component () =>', () => {
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
                AppViewComponent.renderAddToDoItemAt(mockIsEnabled('renderBottom'), state)
            );
        });

        test('should be rendered the todo list data to the app across with hash passed', () => {
            spyOn(AppViewComponent, 'renderAddToDoItemAt');

            AppViewComponent.renderApp(element, state);
            expect(AppViewComponent.renderAddToDoItemAt).toHaveBeenCalledWith(mockIsEnabled('renderBottom'), state);
            expect(mockIsEnabled).toHaveBeenCalledWith('renderBottom');
        });
    });

    describe('- renderAddToDoItemAt () =>', () => {
        test('should get data from app components', () => {
            const components = [
                { component: TitleComponent, method: 'renderTitle' },
                { component: InputToDoItemComponent, method: 'renderInput' },
                { component: TodoListComponent, method: 'renderToDoItems' },
                { component: FilterComponent, method: 'renderFilter' }
            ];

            for (let component of components) {
                spyOn(component.component, component.method);
                AppViewComponent.renderAddToDoItemAt(false, state);
                if (component.component === TodoListComponent) {
                    expect(component.component[component.method]).toHaveBeenCalledWith(state.todos);
                } else {
                    expect(component.component[component.method]).toHaveBeenCalled();
                }
            }
        });

        test('should be render input to add todo item at top when renderButton is disabled', () => {
            let App = String.prototype.concat(
                TitleComponent.renderTitle(),
                FilterComponent.renderFilter(),
                InputToDoItemComponent.renderInput(),
                TodoListComponent.renderToDoItems(state.todos)
            );

            expect(AppViewComponent.renderAddToDoItemAt(false, state))
                .toBe(`<div id="app">${App}</div>`);
        });

        test('should be render input to add todo item at bottom when renderButton is enabled', () => {
            let App = String.prototype.concat(
                TitleComponent.renderTitle(),
                FilterComponent.renderFilter(),
                TodoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput()
            );

            expect(AppViewComponent.renderAddToDoItemAt(true, state))
                .toBe(`<div id="app">${App}</div>`)
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
