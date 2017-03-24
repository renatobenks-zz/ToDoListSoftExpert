import { isEnabled } from './../lib/feature';

import Component from  './View';

import TitleComponent from './Title/Title';
import InputToDoItemComponent from './Input/Input';
import TodoListComponent from './Todo/TodoList';
import FilterComponent from './Filter/Filter';
import { TestingFeaturesComponent } from './TestingFeatures/TestingFeatures';

export class AppComponent extends Component {
    constructor () {
        super();
    }

    renderApp (el, state) {
        TestingFeaturesComponent.windowHashChange(el, state);
        let whereRender = isEnabled(['filter', 'renderBottom', 'filterTop']);
        this.render(el, AppComponent.renderAddToDoItemAt(whereRender, state));
    }

    static joinComponents (Components) {
        return Components.join('\n');
    }

    static renderAddToDoItemAt (whereRender, state) {
        let Components = [TitleComponent.renderTitle(), TodoListComponent.renderToDoItems(state.todos)];
        let isEnabled = whereRender.next();
        if (isEnabled.done) {
            Components.splice(1, 0,
                InputToDoItemComponent.renderInput(state.severities),
            );
        } else {
            switch (isEnabled.value) {
                case 'filter':
                    let next = whereRender.next();
                    if (next.done) {
                        Components.splice(1, 0,
                            FilterComponent.renderFilter(state.filters),
                            InputToDoItemComponent.renderInput(state.severities)
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
                                Components.splice(2, 0, FilterComponent.renderFilter(state.filters));
                            }
                        }
                    }
                    break;
                case 'renderBottom':
                    Components.splice(2, 0,
                        InputToDoItemComponent.renderInput(state.severities),
                    );
                    break;
            }
        }

        return `<div id="app">${AppComponent.joinComponents(Components)}</div>`;
    }
}

export default new AppComponent;
