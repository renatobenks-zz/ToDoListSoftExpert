import { todos } from './../../state';
import { css } from 'aphrodite'
import StylesTodoListComponent from './TodoList.styles';

import TodoItemComponent from './TodoItem';

export class TodoListComponent {
    constructor () {
        this.getToDos = TODOS => TodoListComponent.getToDoItems(TODOS);
    }

    static getToDoItems (TODOS) {
        return TODOS.map(TodoItemComponent.renderToDoItem).join('');
    }

    renderToDoItems (TODOS) {
        return `<ul class="todo full-width justify ${css(StylesTodoListComponent.TodoListPadding)}">
            ${this.getToDos(TODOS)}
        </ul>`;
    }
}

export default new TodoListComponent
