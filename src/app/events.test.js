import { listen } from './lib/events';

import { registerEventHandlers } from './events';

global.document = {
    body: {
        addEventListener: (eventName, event) => event({
            target: {
                matches: selector => true,
                getAttribute: attribute => '1'
            },
            stopPropagation: () => true
        })
    },
    getElementById: id => { return {value: `data input ${id}`} }
};

describe('Events: registerEventHandlers', () => {
    test('should be imported register of events handlers', () => {
        expect(registerEventHandlers).toBeDefined();
    });

    test('should get the recorder of the events app handlers', () => {
        expect(registerEventHandlers).toBeDefined();
        expect(typeof registerEventHandlers).toBe('function');
    });

    describe('registerEventHandlers () =>', () => {
        test('should register the handlers events in the app', () => {
            const mockRegisterEventHandlers = jest.fn(registerEventHandlers);

            mockRegisterEventHandlers();
            expect(mockRegisterEventHandlers).toHaveBeenCalled();
        });

        test('should been handler listener', () => {
            let paramsListener = {eventName: 'click', selector: '#addTodo', handler: event => event.target};
            const mockListener = jest.fn(listen);
            const mockRegisterEventHandlers = jest.fn(() => {
                mockListener(paramsListener.eventName, paramsListener.selector, paramsListener.handler);
            });

            mockRegisterEventHandlers();
            expect(mockListener).toHaveBeenCalledWith(
                paramsListener.eventName,
                paramsListener.selector,
                paramsListener.handler
            );
        });
    });
});
