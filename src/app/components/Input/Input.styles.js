import { GetStylesComponent } from '../../styles';

export const StylesInputToDoItemComponent = {
    inputComponent: {
        width: '100%',
        display: 'flex',
        margin: '0',
        padding: '10px',
        transition: 'border 0.3s 0.15s ease-in-out',
        ':active': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        },
        ':focus': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        }
    },
    inputButtonAddInputText: {
        textTransform: 'uppercase',
        border: 'none',
        background: 'transparent',
        padding: '5px',
        position: 'absolute',
        height: 'auto',
        outline: 'none',
        fontSize: '2rem'
    },
    inputIconInButton: {
        color: 'rgb(193, 193, 193)',
        margin: '10px 0'
    },
    input: {
        width: '100%',
        border: '1px solid transparent',
        background: 'none',
        fontSize: '2rem',
        padding: '5px 0 5px 2em',
        outline: 'none'
    },
    inputError: {
        borderColor: 'red',
        boxShadow: '0 0 10px red'
    },
    severity: {
        position: 'relative',
        width: '120px',
        minWidth: '120px',
        height: '30px',
        overflow: 'hidden'
    },
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
    }
};

export default GetStylesComponent(StylesInputToDoItemComponent)
