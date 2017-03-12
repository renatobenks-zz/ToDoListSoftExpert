import{ StyleSheet } from 'aphrodite/no-important';

const FontRoboto = {
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Roboto/roboto-regular.woff') format('woff2'), url('/public/fonts/Roboto/roboto-regular.woff') format('woff')"
};

const FontRobotoMedium = {
    fontFamily: 'Roboto Medium',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Roboto/roboto-medium.woff') format('woff2'), url('/public/fonts/Roboto/roboto-medium.woff') format('woff')"
};

const FontRobotoBlack = {
    fontFamily: 'Roboto Black',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Roboto/roboto-black.woff') format('woff2'), url('/public/fonts/Roboto/roboto-black.woff') format('woff')"
};

const FontRobotoCondensed = {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/RobotoCondensed/robotocondensed-regular.woff') format('woff2'), url('/public/fonts/RobotoCondensed/robotocondensed-regular.woff') format('woff')"
};

const FontRobotoCondensedBold = {
    fontFamily: 'Roboto Condensed Bold',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/RobotoCondensed/robotocondensed-bold.woff') format('woff2'), url('/public/fonts/RobotoCondensed/robotocondensed-bold.woff') format('woff')"
};

const FontArimo = {
    fontFamily: 'Arimo',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Arimo/arimo-regular.woff') format('woff2'), url('/public/fonts/Arimo/arimo-regular.woff') format('woff')"
};

const FontArimoBold = {
    fontFamily: 'Arimo Bold',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: "url('/public/fonts/Arimo/arimo-bold.woff') format('woff2'), url('/public/fonts/Arimo/arimo-bold.woff') format('woff')"
};

export default StyleSheet.create({
    divTitle: {
        margin: '0 0 2rem 0'
    },
    imageTitle: {
        width: '25%',
        height: 'auto',
        margin: '10px 0'
    },
    imageRounded: {
        borderRadius: '50%'
    },
    noMargin: {
        margin: '0'
    },
    fontRoboto: {
        fontFamily: [FontRobotoMedium, 'sans-serif']
    },
    fontBodySize: {
        fontSize: '2rem'
    },
    fontBodyApp: {
        fontFamily: [FontRobotoMedium, 'sans-serif'],
        fontSize: '2rem'
    },
    fontTitle: {
        fontFamily: [FontRobotoCondensedBold, 'sans-serif'],
        fontWeight: '800',
        fontSize: '4rem'
    },
    fontSubtitle: {
        fontFamily: [FontRobotoBlack, 'sans-serif'],
        fontWeight: '600',
        fontSize: '1.5rem'
    },
    colorTitleSubtitle: {
        color: 'rgba(102, 102, 102, .6)'
    },
    fullWidth: {
        width: '100%'
    },
    divFullWidth: {
        width: '100%'
    },
    divAlignFlex: {
        display: 'flex'
    },
    divAddTodo: {
        margin: '0',
        padding: '10px'
    },
    buttonAddTodo: {
        textTransform: 'uppercase',
        border: 'none',
        background: 'transparent',
        padding: '5px',
        position: 'absolute',
        height: '1.5em',
        outline: 'none'
    },
    inputAddTodo: {
        border: '1px solid transparent',
        background: 'none',
        fontSize: '2rem',
        padding: '5px 0 5px 2em',
        outline: 'none',
        transition: 'border 0.3s 0.15s ease-in-out',
        ':active': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        },
        ':focus': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        }
    },
    todoListJustify: {
        textAlign: 'justify'
    },
    divPriorityTodoItem: {
        width: '100%',
        padding: '10px 0',
        margin: '0 5rem',
        fontSize: '1rem',
        color: 'rgba(102, 102, 102, .6)'
    },
    todoItemPrioryOutstanding: {
        position: 'absolute',
        top: '-5px',
        right: '5px',
        marginRight: '-2rem'
    },
    priority: {
        fontSize: '1rem'
    },
    urgent: {
        color: 'red'
    },
    important: {
        color: 'yellow'
    },
    todoItemSetSeverity: {
        width: '20px',
        height: '20px',
        color: 'black'
    },
    iconAddTodoButton: {
        fontSize: '1em',
        color: 'rgb(193, 193, 193)',
        margin: '5px 0'
    }
});