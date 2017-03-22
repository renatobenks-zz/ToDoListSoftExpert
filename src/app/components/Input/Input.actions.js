export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    }
};

export const toggleTodoSeverity = (severity) => {
    return {
        type: 'TOGGLE_TODO_SEVERITY',
        severity
    }
};
