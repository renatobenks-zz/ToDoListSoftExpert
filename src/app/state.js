import 'babel-polyfill';
import { createStore } from './lib/state';

let TODOS;
export let store;

export const todoChangeHandler = (state, change) => {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push(change.todo);
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
            break;
        case 'REMOVE_TODO_ITEM':
            state.todos.splice(change.id, 1);
            break;
        case 'FILTER_TODO':
            let todos = change.status === null ? TODOS : [];
            if (todos.length === 0) {
                for (let todo of TODOS) {
                    if (todo.done === change.status) {
                        todos.push(todo);
                    }
                }
            }
            state.todos = todos;
            break;
        case 'TOGGLE_FILTER':
            for (let filter of state.filters) {
                if (filter.selected || filter.id === change.id) {
                    filter.selected = !filter.selected;
                }
            }
            break;
    }
};

export const getInitialState = async () => {
    try {
        const initialState = {
            todos: await fetch('/api/v1/todos')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    TODOS = data.todos;
                    return data.todos;
                }),
            filters: await fetch('/api/v1/filters')
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    return data.filters;
                }),
            severities: await fetch('/api/v1/severities')
                .then(response => response.json())
                .then(data => data.severities.map(severity => {
                    severity.selected = severity.priority === 'normal';
                    return severity;
                }))
        };

        store = await createStore(todoChangeHandler, initialState);
        return initialState
    } catch (error) {
        throw error;
    }
};
