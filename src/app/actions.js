export const toggleTodoState = (id) => {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
};

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        text
    }
};
