import { StyleSheetTestUtils } from 'aphrodite';

import { isEnabled } from './lib/feature';

import { Component, AppComponent } from './view';

global.window = {
    location: {
        hash: '#renderBottom'
    }
};

describe('Component: ViewComponent', () => {
    test('should be imported', () => {
        expect(Component).toBeDefined();
    });

    const ViewComponent = new Component;

    describe('Component: render () => ', () => {
        test('should be rendered element data component to element', () => {
            let element = Object.prototype;
            ViewComponent.render(
                element,
                `<div id="app"></div>`
            );
            expect(element.innerHTML).toBe(`<div id="app"></div>`);
        });
    });
});

describe('Component: AppComponent', () => {
    const state = {
        todos: [
            { id: 0, text: 'Take a look at the application', done: true },
            { id: 1, text: 'Add ability to filter todos', done: false },
            { id: 2, text: 'Filter todos by status', done: false },
            { id: 3, text: 'Filter todos by text', done: false }
        ]
    };
    let element = Object.prototype;

    StyleSheetTestUtils.suppressStyleInjection();
    const AppViewComponent = new AppComponent();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();

    test('should be imported', () => {
        expect(AppComponent).toBeDefined();
    });

    test('should get methods of class', () => {
        expect(AppViewComponent.renderApp).toBeDefined();
        expect(AppViewComponent.renderAddToDoItemAt).toBeDefined();
        expect(AppViewComponent.render).toBeDefined();
    });

    test('should get static methods of class', () => {
        expect(AppComponent.renderTitle).toBeDefined();
        expect(AppComponent.renderInput).toBeDefined();
        expect(AppComponent.renderToDoItems).toBeDefined();
        expect(AppComponent.renderToDoItem).toBeDefined();
        expect(AppComponent.getToDoItems).toBeDefined();
    });

    describe('Component: constructor component () =>', () => {
        test('should instance super class', () => {
            expect(AppViewComponent instanceof Component).toBe(true);
        });
    });

    describe('Component: renderApp () =>', () => {
        test('should be rendered the app', () => {

        });

        test('should be render app to element', () => {
            StyleSheetTestUtils.suppressStyleInjection();
            spyOn(AppViewComponent, 'render');

            AppViewComponent.renderApp(element, state);
            expect(AppViewComponent.render).toHaveBeenCalledWith(
                element,
                AppViewComponent.renderAddToDoItemAt(isEnabled('renderBottom'), state.todos)
            );
            StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
        });
    });

    describe('Component: renderAddToDoItemAt () =>', () => {
        beforeEach(() => {
            StyleSheetTestUtils.suppressStyleInjection();
        });

        test('should be render input to add todo item at top when renderButton is disabled', () => {
            let App = String.prototype.concat(
                AppComponent.renderTitle(),
                AppComponent.renderInput(),
                AppComponent.renderToDoItems(state.todos)
            );

            expect(AppViewComponent.renderAddToDoItemAt(undefined, state.todos))
                .toBe(`<div id="app">${App}</div>`);
        });

        test('should be render input to add todo item at bottom when renderButton is enabled', () => {
            let App = String.prototype.concat(
                AppComponent.renderTitle(),
                AppComponent.renderToDoItems(state.todos),
                AppComponent.renderInput()
            );

            expect(AppViewComponent.renderAddToDoItemAt(isEnabled('renderBottom'), state.todos))
                .toBe(`<div id="app">${App}</div>`)
        });

        afterEach(() => {
            StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
        });
    });

    describe('Component: static methods -', () => {
        const renderComponent = (rendered) => {
            expect(rendered).toBeDefined();
            expect(typeof rendered).toBe('string');
        };

        beforeEach(() => {
            StyleSheetTestUtils.suppressStyleInjection();
        });

        describe('static renderTitle () =>', () => {
            test('should return title app', () => {
                renderComponent(AppComponent.renderTitle());
            });
        });

        describe('static renderInput () =>', () => {
            test('should return title app', () => {
                renderComponent(AppComponent.renderInput());
            });
        });

        describe('static renderToDos () =>', () => {
            test('should return all items listing on ToDo list', () => {
                renderComponent(AppComponent.renderToDoItems(state.todos));
            });

            test('should get ToDo list from initial state list', () => {
                spyOn(AppComponent, 'getToDoItems');

                AppComponent.renderToDoItems();
                expect(AppComponent.getToDoItems).toHaveBeenCalled();
            });

            describe('static getToDos () =>', () => {
                test('should render all ToDo items to the list ToDos', () => {
                    spyOn(AppComponent, 'renderToDoItem');

                    AppComponent.getToDoItems(state.todos);
                    expect(AppComponent.renderToDoItem).toHaveBeenCalledTimes(state.todos.length);
                });

                test('should return elements like string to the ToDo list', () => {
                    renderComponent(AppComponent.getToDoItems(state.todos));
                });

                describe('static renderToDoItem', () => {
                    test('should return element', () => {
                        renderComponent(AppComponent.renderToDoItem(state.todos[0]));
                    });
                });
            });
        });

        afterEach(() => {
            StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
        });
    });
});
