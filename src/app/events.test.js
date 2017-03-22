import { event, document } from './components/components.mock';
import { listen } from './lib/events';

import { registerEventHandlers } from './events';

import { getInitialState } from './state';

import { InputToDoItemComponent } from './components/Input/Input';
import { TodoItemComponent } from './components/Todo/TodoItem';
import { FilterComponent } from './components/Filter/Filter';

//noinspection JSAnnotator
global.document = document;

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

            getInitialState()
                .then(() => {
                    mockRegisterEventHandlers();
                    expect(mockRegisterEventHandlers).toHaveBeenCalled();
                });
        });

        test('should been listen events', () => {
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

        test('should been handler listeners', () => {
            spyOn(InputToDoItemComponent, 'addTodoItem');
            spyOn(InputToDoItemComponent, 'addTodoItemWithEnter');
            spyOn(TodoItemComponent, 'toggleStatusTodoItem');
            spyOn(FilterComponent, 'filterTodoList');
            spyOn(TodoItemComponent, 'removeTodoItem');

            registerEventHandlers();
            expect(InputToDoItemComponent.addTodoItem).toHaveBeenCalledWith(event);
            expect(InputToDoItemComponent.addTodoItemWithEnter).toHaveBeenCalledWith(event);
            expect(TodoItemComponent.toggleStatusTodoItem).toHaveBeenCalledWith(event);
            expect(FilterComponent.filterTodoList).toHaveBeenCalledWith(event);
            expect(TodoItemComponent.removeTodoItem).toHaveBeenCalledWith(event);
        });
    });
});
