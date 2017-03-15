import { StyleSheetTestUtils } from 'aphrodite';

export const state = {
    todos: [
        { id: 0, text: 'Take a look at the application', done: true },
        { id: 1, text: 'Add ability to filter todos', done: false },
        { id: 2, text: 'Filter todos by status', done: false },
        { id: 3, text: 'Filter todos by text', done: false }
    ]
};

export const window = {
    location: {
        hash: '#renderBottom'
    }
};

export const AphroditeStyles = {
    before: () => StyleSheetTestUtils.suppressStyleInjection(),
    after: () => StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
};
