import { css } from 'aphrodite'
import styles from './styles';

import { isEnabled } from './lib/feature';

export class Component {
    render (el, data) {
        el.innerHTML = data;
    }
}

export class AppComponent extends Component {
    constructor () {
        super();
    }

    renderApp (el, state) {
        this.render(el, this.renderAddToDoItemAt(isEnabled('renderBottom'), state.todos));
    }

    renderAddToDoItemAt (isEnabled, TODOS) {
        let App;
        if (isEnabled) {
            App = String.prototype.concat(
                AppComponent.renderTitle(),
                AppComponent.renderToDoItems(TODOS),
                AppComponent.renderInput()
            );
        } else {
            App = String.prototype.concat(
                AppComponent.renderTitle(),
                AppComponent.renderInput(),
                AppComponent.renderToDoItems(TODOS)
            );
        }

        return `<div id="app">${App}</div>`;
    }

    static renderTitle () {
        return `<div class="${css(styles.divTitle)}">
            <img src="public/images/logo.png" class="${css(styles.imageRounded, styles.imageTitle)}" alt="">
            <h1 class="${css(styles.fontTitle, styles.noMargin)}">ToDoList</h1>
            <h3 class="${css(styles.fontSubtitle, styles.noMargin, styles.colorTitleSubtitle)}">A simple ToDo list App</h3>
        </div>`;
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
