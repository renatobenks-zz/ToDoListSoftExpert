import { store } from './../../state';

import { addTodo } from './../../actions';

import { css } from 'aphrodite';
import styles from './../../styles';

export class InputToDoItemComponent {
    static addTodoItem (event) {
        const todoInputValue = document.getElementById('todoInput').value;
        if (todoInputValue) {
            fetch('/api/v1/todos', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    text: todoInputValue,
                    severity: 'normal'
                })
            }).then((data) => {
                return data.json();
            }).then((todo) => {
                if (!todo.error){
                    store.dispatch(addTodo(todo));
                    event.stopPropagation();
                    document.getElementById('todoInput').focus();
                } else {
                    console.error(todo.error);
                    throw todo.error;
                }
            });
        } else {
            styles.inputAddTodo._definition.borderColor = 'red';
            styles.inputAddTodo._definition.boxShadow = '0 0 10px red';
            event.target.classList.add(css(styles.inputAddTodo));
        }
    }

    static addTodoItemWithEnter (event) {
        if (event.key === 'Enter' && event.which === 13) {
            event.preventDefault();
            InputToDoItemComponent.addTodoItem(event);
        }
    }

    renderInput () {
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

export default new InputToDoItemComponent
