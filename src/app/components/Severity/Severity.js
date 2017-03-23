import { css } from 'aphrodite';
import StylesheetSeverityComponent from './Severity.styles';

import { listen } from '../../lib/events';

import { store } from '../../state';

export class SeverityComponent {
    constructor () {
        this.render = (SEVERITIES) => {
            this.getSeverities(SEVERITIES);
            return this.renderSeveritiesList();
        };
    }

    changeTodoSeverity (event) {
        this.severity = event.target.value;
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
            class="${css(StylesheetSeverityComponent[severity.selected ? 'severitySelected' : 'severity'])}" 
            value="${severity.priority}"
            >
            ${severity.priority}
        </option>`);
    }
}

export default new SeverityComponent;
