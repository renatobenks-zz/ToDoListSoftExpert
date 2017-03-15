import { isEnabled } from './../lib/feature';
import Component from  './View';
import { TitleComponent } from './Title/Title';
import { InputToDoItemComponent } from './Input/Input';
import { TodoListComponent } from './Todo/TodoList';

export default class AppComponent extends Component {
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
                TitleComponent.renderTitle(),
                TodoListComponent.renderToDoItems(TODOS),
                InputToDoItemComponent.renderInput()
            );
        } else {
            App = String.prototype.concat(
                TitleComponent.renderTitle(),
                InputToDoItemComponent.renderInput(),
                TodoListComponent.renderToDoItems(TODOS)
            );
        }

        return `<div id="app">${App}</div>`;
    }
}
