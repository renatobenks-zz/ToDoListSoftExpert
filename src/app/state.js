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
        },
        {
            id: 3,
            text: 'Filter todos by text',
            done: false
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
            if (change.status == null) {
                state.todos = TODOS;
                break;
            } else {
                let todos = [];
                for (let todo of TODOS) {
                    if (todo.done === change.status) {
                        todos.push(todo);
                    }
                }
                state.todos = todos;
                break;
            }
            break;
    }
};

export const todos = createStore(todoChangeHandler, initialState);
