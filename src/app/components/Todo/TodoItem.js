import { store } from './../../state';

import { toggleTodoState } from './TodoItem.actions';

import { css } from 'aphrodite'
import StylesTodoItemComponent from './TodoItem.styles';
import styles from './../../styles';

import callAPIMiddleware from '../../middlewares/callAPImiddleware';

export class TodoItemComponent {
    static toggleStatusTodoItem (event) {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        const done = event.target.checked;
        callAPIMiddleware.FETCH_REQUEST('/todos/'.concat(id), 'PUT', {done: done})
            .then((todo) => {
                store.dispatch(toggleTodoState(todo.id));
            });
    }

    static removeTodoItem (event) {
        let todoItem = event.target.parentNode;
        const id = todoItem.querySelector(".js_toggle_todo");
    }

    renderToDoItem (todo) {
        const todoClass = `todo__item todo__item--${todo.done ? 'done' : 'open'}`;
        return `<li>
            <i 
                id="removeTodoItem" 
                class="trash outline icon ${css(StylesTodoItemComponent.RemoverTodoItem)}"
                >
            </i>
            <div class="ui checkbox">
                <input 
                    class="js_toggle_todo" 
                    type="checkbox" 
                    id="task-status-${todo.id}"
                    data-id="${todo.id}"
                    ${todo.done ? ' checked' : ''}
                    >
                <label 
                    class="${todoClass} ${css(StylesTodoItemComponent.TodoItemText)}" 
                    for="task-status-${todo.id}"
                    >
                    ${todo.text}
                    <div class="${css(StylesTodoItemComponent.ItemSeverityIcon, styles[todo.severity])}">
                        <i class="circle icon"></i>
                    </div>
                </label>
            </div>
            <div class="${css(StylesTodoItemComponent.SeverityLabelText)}">
                ${todo.severity}
            </div>
        </li>`;
    }
}

export default new TodoItemComponent
