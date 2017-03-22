export const toggleTodoState = (id) => {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
};

export const removeTodoItem = (id) => {
    return {
        type: 'REMOVE_TODO_ITEM',
        id
    }
};
