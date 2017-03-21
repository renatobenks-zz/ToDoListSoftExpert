export const toggleTodoState = (id) => {
    return {
        type: 'TODO_TOGGLE_DONE',
        id
    };
};
