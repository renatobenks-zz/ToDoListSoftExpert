import { css } from 'aphrodite'
import styles from './../../styles';

export class ToDoListComponent {
    constructor (TODOS) {
        return this.renderToDoItems(TODOS);
    }

    static renderToDoItems (TODOS) {
        return `<ul class="todo ${css(styles.divFullWidth, styles.todoListJustify)}">${this.getToDoItems(TODOS)}</ul>`;
    }

    static getToDoItems (TODOS) {
        return TODOS.map(this.renderToDoItem).join('');
    }

    static renderToDoItem (todo) {
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
