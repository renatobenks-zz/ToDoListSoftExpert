import { store } from './../../state';

import { toggleTodoState } from './TodoItem.actions';

import { css } from 'aphrodite'
import styles from './../../styles';

export class TodoItemComponent {
    static toggleStatusTodoItem (event) {
        const id = Number.parseInt(event.target.getAttribute('data-id'), 10);
        store.dispatch(toggleTodoState(id));
    }

    renderToDoItem (todo) {
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
                    <div class="${css(styles.todoItemPrioryOutstanding, styles['urgent'])}">
                        <i class="circle icon"></i>
                    </div>
                </label>
            </div>
            <div class="${css(styles.divPriorityTodoItem)}">
                urgent
            </div>
        </li>`;
    }
}

export default new TodoItemComponent
