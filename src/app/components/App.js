import { isEnabled } from './../lib/feature';
import { store } from '../state';

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
        AppComponent.windowHashChange();
        let whereRender = isEnabled(['filter', 'renderBottom', 'filterTop']);
        this.render(el, AppComponent.renderAddToDoItemAt(whereRender, state));
    }

    static windowHashChange () {
        window.addEventListener('hashchange', (event) => {
            const App = new AppComponent;
            App.renderApp(document.getElementById('root'), store.getState());
            event.stopImmediatePropagation();
        });
    }

    static joinComponents (Components) {
        return Components.join('\n');
    }

    static renderAddToDoItemAt (whereRender, state) {
        let isEnabled = whereRender.next();
        let Components = [TitleComponent.renderTitle(), TodoListComponent.renderToDoItems(state.todos)];
        if (isEnabled.done) {
            Components.splice(1, 0,
                FilterComponent.renderFilter(state.filters),
                InputToDoItemComponent.renderInput(state.severities),
            );
        } else {
            switch (isEnabled.value) {
                case 'filter':
                    let next = whereRender.next();
                    if (next.done) {
                        Components.splice(1, 0,
                            InputToDoItemComponent.renderInput(state.severities),
                            FilterComponent.renderFilter(state.filters)
                        );
                    } else {
                        if (next.value === 'filterTop') {
                            Components.splice(1, 0,
                                FilterComponent.renderFilter(state.filters),
                                InputToDoItemComponent.renderInput(state.severities)
                            );
                        }

                        if (next.value === 'renderBottom') {
                            Components.splice(2, 0, InputToDoItemComponent.renderInput(state.severities));
                            if (whereRender.next().value === 'filterTop') {
                                Components.splice(0, 0, FilterComponent.renderFilter(state.filters));
                            } else {
                                Components.splice(1, 0, FilterComponent.renderFilter(state.filters));
                            }
                        }
                    }
                    break;
                case 'renderBottom':
                    Components.splice(2, 0,
                        InputToDoItemComponent.renderInput(state.severities),
                        FilterComponent.renderFilter(state.filters)
                    );
                    break;
            }
        }

        return `<div id="app">${AppComponent.joinComponents(Components)}</div>`;
    }
}
