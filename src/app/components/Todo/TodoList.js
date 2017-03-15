import { css } from 'aphrodite'
import styles from './../../styles';

import { TodoItemComponent } from './TodoItem';

export class TodoListComponent {
    static renderToDoItems (TODOS) {
        return `<ul class="todo ${css(styles.divFullWidth, styles.todoListJustify)}">${this.getToDoItems(TODOS)}</ul>`;
    }

    static getToDoItems (TODOS) {
        return TODOS.map(TodoItemComponent.renderToDoItem).join('');
    }
}
