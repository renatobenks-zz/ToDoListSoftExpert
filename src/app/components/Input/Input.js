import { todos } from './../../state';

import { addTodo } from './../../actions';

import { css } from 'aphrodite'
import styles from './../../styles';

export class InputToDoItemComponent {
    static addTodoItem (event) {
        const todoInput = document.getElementById('todoInput').value;

        todos.dispatch(addTodo(todoInput));
        event.stopPropagation();
        document.getElementById('todoInput').focus();
    }

    static addTodoItemWithEnter (event) {
        if (event.key === 'Enter' && event.which === 13) {
            event.preventDefault();
            InputToDoItemComponent.addTodoItem(event);
        }
    }

    static renderInput () {
        return `<div class="todo__input ${css(styles.divFullWidth, styles.divAlignFlex, styles.divAddTodo)}">
            <button class="${css(styles.buttonAddTodo)}" id="addTodo">
                <i class="add circle icon ${css(styles.iconAddTodoButton)}"></i>
            </button>
            <input placeholder="Add a Task" class="${css(styles.fullWidth, styles.inputAddTodo)}" type="text" id="todoInput">
            <label class="${css(styles.fieldSelectSeverity)} severity">
                <p class="${css(styles.textSeveritySelected)}">Set severity</p>
                <select class="${css(styles.selectSeverity)}" id="set-severity">
                    <option value="important">important</option>
                    <option value="urgent">urgent</option>
                </select>
            </label>
        </div>`;
    }
}
