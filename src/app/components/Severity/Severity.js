import { css } from 'aphrodite';
import StylesheetSeverityComponent from './Severity.styles';

import { store } from '../../state';

import { toggleSeverity } from './Severity.actions';

export class SeverityComponent {
    constructor () {
        this.render = (SEVERITIES) => {
            this.getSeverities(SEVERITIES);
            return this.renderSeveritiesList();
        };
    }

    changeTodoSeverity (event) {
        for (let severity of event.target.querySelectorAll('option')) {
            if (event.target.value === severity.value) this.severity = severity
        }

        const id = Number.parseInt(this.severity.getAttribute('data-id'), 10);
        this.severity = this.severity.value;
        store.dispatch(toggleSeverity(id));
    }

    renderSeveritiesList () {
        return `<p class="${css(StylesheetSeverityComponent.labelSeverity)}">${this.severity}</p>
            <select class="${css(StylesheetSeverityComponent.selectSeverity)}" id="set-severity">
                ${this.severities}
            </select>`;
    }

    getSeverities (SEVERITIES) {
        this.severities = [];
        for (let severity of SEVERITIES) {
            if (severity.selected) {
                this.severity = severity.priority;
            }

            this.getSeverity(severity);
        }

        if (this.severities.length === SEVERITIES.length) this.severities = this.severities.join('');
    }

    getSeverity (severity) {
        this.severities.push(`<option 
            data-id="${severity.id}"
            class="${css(StylesheetSeverityComponent[severity.selected ? 'severitySelected' : 'severity'])}" 
            value="${severity.priority}"
            ${severity.selected ? 'selected' : ''}
            >
            ${severity.priority}
        </option>`);
    }
}

export default new SeverityComponent;
