import { css } from 'aphrodite';
import StylesFilterComponent from './Filter.styles';

import { store } from './../../state';
import { filterTodoList, toggleFilter } from './Filter.actions';

export class FilterComponent {
    static filterTodoList (event) {
        event.preventDefault();
        store.dispatch(filterTodoList(FilterComponent.todoShouldFilter(event.target.value)));
        store.dispatch(toggleFilter(parseInt(event.target.getAttribute('data-id'), 10)));
    }

    static todoShouldFilter (value) {
        if (value !== 'null') return value === 'true';
        return null;
    }

    getFilters (FILTERS) {
        return FILTERS.map((filter) => {
            return `<label class="${css(StylesFilterComponent.filterOptions)}" for="filter-${filter.id}">
                <i class="${css(StylesFilterComponent.filterOptionText)}">${filter.name}</i>
                <input 
                    type="radio" 
                    name="filter" 
                    id="filter-${filter.id}" 
                    data-id="${filter.id}" 
                    value="${filter.value}"
                    ${filter.selected ? 'checked' : ''}
                    >
            </label>`
        }).join('');
    }

    renderFilter (FILTERS) {
        return `<div id="filter" class="${css(StylesFilterComponent.filter)}">
            <h1 class="${css(StylesFilterComponent.filterTitle)}">Filter your tasks:</h1>
            ${this.getFilters(FILTERS)}
        </div>`;
    }
}

export default new FilterComponent
