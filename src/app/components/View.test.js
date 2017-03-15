import Component from './View';

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
