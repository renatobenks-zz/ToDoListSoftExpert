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
        margin: '0 0 4rem 0'
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
        border: 'none',
        background: 'none',
        fontSize: '2rem',
        padding: '5px 0 5px 2em',
        outline: 'none',
        transition: 'border 1s 0.25s ease-in-out',
        ':active': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        },
        ':focus': {
            borderBottom: '1px solid rgb(192, 192, 192)'
        }
    },
    todoListJustify: {
        textAlign: 'justify'
    }
});
