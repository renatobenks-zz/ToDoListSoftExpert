export const filterTodoList = (status) => {
    return {
        type: 'FILTER_TODO',
        status
    }
};

export const toggleFilter = (id) => {
    return {
        type: 'TOGGLE_FILTER',
        id
    }
};
