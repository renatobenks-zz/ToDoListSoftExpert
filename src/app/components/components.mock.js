import { StyleSheetTestUtils } from 'aphrodite';

export const state = {
    todos: [
        { id: 0, text: 'Take a look at the application', done: true },
        { id: 1, text: 'Add ability to filter todos', done: false },
        { id: 2, text: 'Filter todos by status', done: false },
        { id: 3, text: 'Filter todos by text', done: false }
    ]
};

export const event = {
    target: {
        matches: selector => true,
        getAttribute: attribute => '1'
    },
    stopPropagation: () => {},
    preventDefault: () => {},
    which: 13,
    key: 'Enter'
};

export const window = {
    location: {
        hash: '#renderBottom'
    }
};

export const document = {
    body: {
        addEventListener: (eventName, listener) => listener(event)
    },
    getElementById: id => {
        return {
            value: `data ${id}`,
            focus: () => {}
        }
    }
};

export const AphroditeStyles = {
    before: () => StyleSheetTestUtils.suppressStyleInjection(),
    after: () => StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
};
