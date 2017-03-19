import { createStore } from './lib/state';

const initialState = {
    todos: [
        {
            id: 0,
            text: 'Take a look at the application',
            done: true
        },
        {
            id: 1,
            text: 'Add ability to filter todos',
            done: false
        },
        {
            id: 2,
            text: 'Filter todos by status',
            done: false
        }
    ],
    filters: [
        {
            id: 1,
            name: 'Mostrar ToDos',
            selected: true,
            value: null
        }, {
            id: 2,
            name: 'Somente abertos',
            selected: false,
            value: false
        }, {
            id: 3,
            name: 'Somente fechados',
            value: true,
            selected: false
        }
    ]
};

const TODOS = initialState.todos;

export const todoChangeHandler = (state, change) => {
    switch(change.type) {
        case 'ADD_TODO':
            state.todos.push({
                id: state.todos.length,
                text: change.text,
                done: false
            });
            break;
        case 'TODO_TOGGLE_DONE':
            for(let todo of state.todos) {
                if(todo.id === change.id) {
                    todo.done = !todo.done;
                    break;
                }
            }
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
    }
};

export const todos = createStore(todoChangeHandler, initialState);
