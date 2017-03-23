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
        let renderBottom = isEnabled(['renderBottom', 'filter']);
        this.render(el, AppComponent.renderAddToDoItemAt(renderBottom, state));
    }

    static joinComponents (Components) {
        return Components.join('\n');
    }

    static renderAddToDoItemAt (renderBottom, state) {
        let Components = [TitleComponent.renderTitle()];
        if (renderBottom.next().value) {
            Components.push(
                TodoListComponent.renderToDoItems(state.todos),
                InputToDoItemComponent.renderInput(state.severities)
            );

            if (renderBottom.next().value) {
                Components.push(FilterComponent.renderFilter(state.filters));
            } else {
                Components.splice(1, 0, FilterComponent.renderFilter(state.filters));
            }
        } else {
            Components.push(
                FilterComponent.renderFilter(state.filters),
                InputToDoItemComponent.renderInput(state.severities),
                TodoListComponent.renderToDoItems(state.todos)
            );
        }

        return `<div id="app">${AppComponent.joinComponents(Components)}</div>`;
    }
}
