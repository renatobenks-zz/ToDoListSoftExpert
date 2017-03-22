import { GetStylesComponent, FontRoboto } from './../../styles';

export const StylesTodoItemComponent = {
    TodoItemText: {
        fontFamily: [FontRoboto, 'sans-serif'],
        fontSize: '2rem'
    },
    SeverityLabelText: {
        width: '100%',
        padding: '10px 0',
        margin: '0 5rem',
        fontSize: '1rem',
        color: 'rgba(102, 102, 102, .6)'
    },
    ItemSeverityIcon: {
        position: 'absolute',
        top: '-5px',
        right: '5px',
        marginRight: '-2rem',
        fontSize: '1rem'
    },
    RemoverTodoItem: {
        float: 'right',
        fontSize: '2rem',
        cursor: 'pointer',
        transition: '0.3s 0.15s color ease-in-out',
        ':hover': {
            color: 'red'
        }
    }
};

export default GetStylesComponent(StylesTodoItemComponent);
