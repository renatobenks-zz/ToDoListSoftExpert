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
        this.render(el, AppComponent.renderAddToDoItemAt(isEnabled('renderBottom'), state));
    }

    static joinComponents (Components) {
        return Components.join('\n');
    }

    static renderAddToDoItemAt (isEnabled, state) {
        let Components = [TitleComponent.renderTitle(), FilterComponent.renderFilter(state.filters)];
        if (isEnabled) {
            Components.push(
                TodoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput(state.severities)
            );
        } else {
            Components.push(
                InputToDoItemComponent.renderInput(state.severities),
                TodoListComponent.renderToDoItems(state.todos)
            );
        }

        return `<div id="app">${AppComponent.joinComponents(Components)}</div>`;
    }
}
