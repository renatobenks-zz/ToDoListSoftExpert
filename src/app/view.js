import { css } from 'aphrodite'
import styles from './styles';

import { isEnabled } from './lib/feature';

function renderApp(title, input, todoList) {
    if(isEnabled('renderBottom')) {
        return renderAddTodoAtBottom(title, input, todoList);
    } else {
        return renderAddTodoAtTop(title, input, todoList);
    }
}

function renderAddTodoAtTop(title, input, todoList) {
    return `<div class="ui ${css(styles.fontBodyApp)}" id="app">
        ${title}
        ${input}
        ${todoList}
    </div>`;
}

function renderAddTodoAtBottom(title, input, todoList) {
    return `<div id="app">
        ${title}
        ${todoList}
        ${input}
    </div>`;
}

function renderTitle() {
    return `<div class="${css(styles.divTitle)}">
        <img src="public/images/logo.png" class="${css(styles.imageRounded, styles.imageTitle)}" alt="">
        <h1 class="${css(styles.fontTitle, styles.noMargin)}">ToDoList</h1>
        <h3 class="${css(styles.fontSubtitle, styles.noMargin, styles.colorTitleSubtitle)}">A simple ToDo list App</h3>
    </div>`;
}

function renderInput() {
    return `<div class="todo__input ${css(styles.divFullWidth, styles.divAlignFlex, styles.divAddTodo)}">
        <button class="${css(styles.buttonAddTodo)}" id="addTodo">
            <i style="font-size: 1em; color: rgb(193, 193, 193); margin: 5px 0;" class="add circle icon"></i>
        </button>
        <input placeholder="Add a Task" class="${css(styles.fullWidth, styles.inputAddTodo)}" type="text" id="todoInput">
    </div>`;
}

function renderTodos(todoItems) {
    return `<ul class="todo ${css(styles.divFullWidth, styles.todoListJustify)}">${todoItems}</ul>`;
}

function renderTodoItem(todo) {
    const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
    return `<li>
        <div class="ui checkbox">
            <input 
                class="js_toggle_todo" 
                type="checkbox" 
                id="task-status-${todo.id}"
                data-id="${todo.id}"
                ${todo.done ? ' checked' : ''}
            >
            <label 
                class="${todoClass} ${css(styles.fontRoboto, styles.fontBodySize)}" 
                for="task-status-${todo.id}"
                >
                ${todo.text}
            </label>
        </div>
    </li>`;
}

export function render(el, state) {
    const todoItems = state.todos.map(renderTodoItem).join('');
    el.innerHTML = renderApp(
        renderTitle(),
        renderInput(),
        renderTodos(todoItems)
    );
}
