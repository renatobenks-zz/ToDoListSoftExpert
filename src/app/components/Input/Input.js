import { css } from 'aphrodite';
import StylesInputToDoItemComponent from './Input.styles';

import { store } from './../../state';
import { addTodo } from './Input.actions';

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
            event.target.classList.add(css(StylesInputToDoItemComponent.inputError));

            setTimeout(() => {
                event.target.classList.remove(StylesInputToDoItemComponent.inputError._name);
            }, 1000);
        }
    }

    static addTodoItemWithEnter (event) {
        if (event.key === 'Enter' && event.which === 13) {
            event.preventDefault();
            InputToDoItemComponent.addTodoItem(event);
        }
    }

    renderInput () {
        return `<div class="todo__input ${css(StylesInputToDoItemComponent.inputComponent)}">
            <button class="${css(StylesInputToDoItemComponent.inputButtonAddInputText)}" id="addTodo">
                <i class="add circle icon ${css(StylesInputToDoItemComponent.inputIconInButton)}"></i>
            </button>
            <input placeholder="Add a Task" class="${css(StylesInputToDoItemComponent.input)}" type="text" id="todoInput">
            <label class="${css(StylesInputToDoItemComponent.severity)} severity">
                <p class="${css(StylesInputToDoItemComponent.labelSeverity)}">Set severity</p>
                <select class="${css(StylesInputToDoItemComponent.selectSeverity)}" id="set-severity">
                    <option value="important">important</option>
                    <option value="urgent">urgent</option>
                </select>
            </label>
        </div>`;
    }
}

export default new InputToDoItemComponent
