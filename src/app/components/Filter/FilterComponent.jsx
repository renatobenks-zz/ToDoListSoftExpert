import React from 'react';
import { css } from 'aphrodite';

import { store } from '../../state';

import { toggleFilter, filterTodoList } from './Filter.actions';
import StylesFilterComponent from './Filter.styles';

export default class FilterComponent extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            selected: this.props.selected
        };

        this._onChangeFilter = this._onChangeFilter.bind(this);
    }

    _onChangeFilter (event) {
        event.preventDefault();
        store.dispatch(toggleFilter(this.props.id));
        store.dispatch(filterTodoList(this.props.value));
    }

    render () {
        return (
            <label className={css(StylesFilterComponent.filterOptions)} htmlFor={"filter-".concat(this.props.id)}>
                <i className={css(StylesFilterComponent.filterOptionText)}>{this.props.name}</i>
                <input
                    type="radio"
                    name="React-filter"
                    id={"filter-".concat(this.props.id)}
                    value={this.props.value === null ? '' : this.props.value}
                    checked={this.state.selected ? 'checked' : ''}
                    onChange={this._onChangeFilter}
                    />
                {this.state.selected}
            </label>
        );
    }
}
