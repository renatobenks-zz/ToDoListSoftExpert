import { css } from 'aphrodite';
import StylesFilterComponent from './Filter.styles';

import { todos } from './../../state';
import { filterTodoList } from './Filter.actions';

export class FilterComponent {
    static filterTodoList (event) {
        event.preventDefault();
        todos.dispatch(filterTodoList(FilterComponent.todoShouldFilter(event.target.value)));
    }

    static todoShouldFilter (value) {
        if (value !== 'null') return value === 'true';
        return null;
    }

    renderFilter () {
        return `<div id="filter" class="${css(StylesFilterComponent.filter)}">
            <h1 class="${css(StylesFilterComponent.filterTitle)}">Filter your tasks:</h1>
            <label class="${css(StylesFilterComponent.filterOptions)}" for="filter-all">
                <i class="${css(StylesFilterComponent.filterOptionText)}">all</i>
                <input type="radio" name="filter" id="filter-all" value="${null}">
            </label>
            <label class="${css(StylesFilterComponent.filterOptions)}" for="filter-doing">
                <i class="${css(StylesFilterComponent.filterOptionText)}">doing</i>
                <input type="radio" name="filter" id="filter-doing" value="${false}">
            </label>
            <label class="${css(StylesFilterComponent.filterOptions)}" for="filter-done">
                <i class="${css(StylesFilterComponent.filterOptionText)}">done</i>
                <input type="radio" name="filter" id="filter-done" value="${true}">
            </label>
        </div>`;
    }
}

export default new FilterComponent
