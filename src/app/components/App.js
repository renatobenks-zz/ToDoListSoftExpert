import { isEnabled } from './../lib/feature';
import Component from  './View';
import TitleComponent from './Title/Title';
import InputToDoItemComponent from './Input/Input';
import TodoListComponent from './Todo/TodoList';
import FilterComponent from './Filter/Filter';

export default class AppComponent extends Component {
    constructor () {
        super();
    }

    renderApp (el, state) {
        this.render(el, this.renderAddToDoItemAt(isEnabled('renderBottom'), state));
    }

    renderAddToDoItemAt (isEnabled, state) {
        let App;
        if (isEnabled) {
            App = String.prototype.concat(
                TitleComponent.renderTitle(),
                FilterComponent.renderFilter(),
                TodoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput()
            );
        } else {
            App = String.prototype.concat(
                TitleComponent.renderTitle(),
                FilterComponent.renderFilter(),
                InputToDoItemComponent.renderInput(),
                TodoListComponent.renderToDoItems(state.todos)
            );
        }

        return `<div id="app">${App}</div>`;
    }
}
