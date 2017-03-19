export const filterTodoList = (status) => {
    return {
        type: 'FILTER_TODO',
        status
    }
};
