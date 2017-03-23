import { GetStylesComponent } from '../../styles';

export const StylesheetSeverityComponent = {
    labelSeverity: {
        textAlign: 'left',
        padding: '0 10px 0',
        margin: '0',
        fontSize: '1rem',
        color: 'rgba(102, 102, 102, .6)'
    },
    selectSeverity: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: '0',
        top: '0',
        margin: '0',
        padding: '0',
        borderRadius: '4px',
        background: 'transparent',
        color: 'transparent',
        border: 'none',
        outline: 'none',
        display: 'inline-block',
        appearance: 'none',
        cursor: 'pointer'
    },
    severity: {
    },
    severitySelected: {
        color: 'cornflowerblue'
    }
};

export default GetStylesComponent(StylesheetSeverityComponent);
