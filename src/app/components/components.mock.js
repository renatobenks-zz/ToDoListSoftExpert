import { StyleSheetTestUtils, css } from 'aphrodite';

export const fetch = (url, params) => {
    // get url from fetch data
    url = url.split('/api/v1')[1].split('/');
    let data;
    if (params) {
        url.splice(0,1);
        let response;
        if (params.body) response = JSON.parse(params.body);
        switch (url[0]) {
            case 'todos':
                const id = (url[1]) ? parseInt(url[1], 10) : state.todos.length;
                switch (params.method) {
                    case 'GET':
                        response = state.todos;
                        break;
                    case 'POST':
                        if (response.text && typeof response.text === 'string' &&
                            response.severity && typeof response.severity === 'string')
                        {
                            response.id = id;
                            response.done = false;
                        } else {
                            data = {error: 'Bad request'};
                        }
                        break;
                    case 'PUT':
                        let new_todo = {};
                        let todo = state.todos.filter(todo => todo.id === id)[0];
                        for (let param in response) {
                            if (response.hasOwnProperty(param)) {
                                new_todo[param] = response[param];
                            } else {
                                data = {error: 'Bad request!'};
                                break;
                            }
                        }

                        if (id && !data) {
                            response = {
                                id: id,
                                text: new_todo.text || todo.text,
                                done: new_todo.done || todo.done,
                                severity: new_todo.severity || todo.severity
                            };
                        } else {
                            data = {error: 'Bad request!'};
                        }
                        break;
                    case 'DELETE':
                        if (id) {
                            let item = state.todos.filter(todo => todo.id === id);
                            state.todos.splice(state.todos.indexOf(item[0]), 1);
                            response = {id};
                        } else {
                            data = {error: 'Bad request'};
                        }
                        break;
                }
                break;
        }

        if (!data) data = response;
    } else {
        if (state[url[1]]) {
            data = state
        }
    }

    return new Promise((resolve, reject) => {
        if (data) {
            resolve({
                json () {
                    return data
                }
            });
        } else {
            reject('Error on request fetching');
        }
    });
};

export const state = {
    todos: [
        { id: 0, text: 'Take a look at the application', done: true },
        { id: 1, text: 'Add ability to filter todos', done: false },
        { id: 2, text: 'Filter todos by status', done: false },
        { id: 3, text: 'Filter todos by text', done: false }
    ],
    filters: [
        { id: 1, name: 'Mostrar ToDos', selected: true, value: null },
        { id: 2, name: 'Somente abertos', selected: false, value: false},
        { id: 3, name: 'Somente fechados', selected: true }
    ]
};

const ELEMENT = {
    addEventListener: (eventName, listener) => listener(event),
    getElementById: id => {
        if (id) {
            return {
                value: `data ${id}`,
                focus: () => {}
            }
        }
    },
    querySelector: selector => ELEMENT,
    matches: selector => true,
    getAttribute: attribute => {
        if (attribute === 'data-id') return '2'
    },
    classList: {
        classNames: [],
        add (classe) {this.classNames.push(classe)} ,
        remove (classe) {this.classNames.splice(this.classNames.indexOf(classe), 1)}
    },
    value: 'data value'
};

export const window = {
    location: {
        hash: '#renderBottom'
    }
};

export const document = {
    body: ELEMENT,
    ELEMENT
};

export const event = {
    target: ELEMENT,
    stopPropagation: () => {},
    preventDefault: () => {},
    which: 13,
    key: 'Enter'
};

export const AphroditeStyles = {
    css: () => css(),
    before: () => StyleSheetTestUtils.suppressStyleInjection(),
    after: () => StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
};
