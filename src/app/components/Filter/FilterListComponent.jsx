import React from 'react';
import { css } from 'aphrodite';

import { store } from '../../state';

import StylesFilterComponent from './Filter.styles';
import FilterComponent from './FilterComponent.jsx';

export default class FilterListComponent extends React.Component{
    constructor (props) {
        super(props);

        this.state = store.getState()
    }

    render () {
        return (
            <div className={css(StylesFilterComponent.filter)}>
                {this.state.filters.map(filter =>
                    <FilterComponent
                        key={filter.id}
                        id={filter.id}
                        name={filter.name}
                        selected={filter.selected}
                        value={filter.value}
                        />
                    )
                }
            </div>
        );
    }
}
