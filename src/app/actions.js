export const toggleTodoState = (id) => {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
};

export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    }
};
