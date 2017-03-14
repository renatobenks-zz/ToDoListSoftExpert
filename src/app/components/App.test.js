import { state, window, AphroditeStyles } from './mock.js';

import { isEnabled } from './../lib/feature';

import AppComponent from './App';

import Component from './View';
import { TitleComponent } from './Title/Title';
import { InputToDoItemComponent } from './Input/Input';
import { ToDoListComponent } from './Todo/TodoList';

//noinspection JSAnnotator
global.window = window;

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

    describe('- constructor component () =>', () => {
        test('should instance super class', () => {
            expect(AppViewComponent instanceof Component).toBe(true);
        });
    });

    describe('- renderApp () =>', () => {
        test('should be render app to element', () => {
            spyOn(AppViewComponent, 'render');

            AppViewComponent.renderApp(element, state);
            expect(AppViewComponent.render).toHaveBeenCalledWith(
                element,
                AppViewComponent.renderAddToDoItemAt(isEnabled('renderBottom'), state.todos)
            );
        });

        test('should be rendered the todo list data to the app across with hash passed', () => {
            spyOn(AppViewComponent, 'renderAddToDoItemAt');

            AppViewComponent.renderApp(element, state);
            expect(AppViewComponent.renderAddToDoItemAt).toHaveBeenCalledWith(isEnabled('renderBottom'), state.todos)
        });
    });

    describe('- renderAddToDoItemAt () =>', () => {
        test('should get data from app components', () => {
            const components = [
                { component: TitleComponent, method: 'renderTitle' },
                { component: InputToDoItemComponent, method: 'renderInput' },
                { component: ToDoListComponent, method: 'renderToDoItems' }
            ];

            for (let component of components) {
                spyOn(component.component, component.method);
                AppViewComponent.renderAddToDoItemAt(false, state.todos);
                if (component.component === ToDoListComponent) {
                    expect(component.component[component.method]).toHaveBeenCalledWith(state.todos);
                } else {
                    expect(component.component[component.method]).toHaveBeenCalled();
                }
            }
        });

        test('should be render input to add todo item at top when renderButton is disabled', () => {
            let App = String.prototype.concat(
                TitleComponent.renderTitle(),
                InputToDoItemComponent.renderInput(),
                ToDoListComponent.renderToDoItems(state.todos)
            );

            expect(AppViewComponent.renderAddToDoItemAt(false, state.todos))
                .toBe(`<div id="app">${App}</div>`);
        });

        test('should be render input to add todo item at bottom when renderButton is enabled', () => {
            let App = String.prototype.concat(
                TitleComponent.renderTitle(),
                ToDoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput()
            );

            expect(AppViewComponent.renderAddToDoItemAt(true, state.todos))
                .toBe(`<div id="app">${App}</div>`)
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
