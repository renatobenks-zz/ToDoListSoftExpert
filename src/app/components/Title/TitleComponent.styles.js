import { GetStylesComponent, FontRobotoCondensedBold, FontRobotoBlack } from '../../styles';

const StylesheetTitleComponent = {
    Title: {
        margin: '0 0 2rem 0'
    },
    TitleImage: {
        width: '25%',
        height: 'auto',
        margin: '10px 0',
        borderRadius: '50%'
    },
    TextTitle: {
        fontFamily: [FontRobotoCondensedBold, 'sans-serif'],
        fontWeight: '800',
        fontSize: '4rem',
        margin: '0'
    },
    TextSubtitle: {
        fontFamily: [FontRobotoBlack, 'sans-serif'],
        fontWeight: '600',
        fontSize: '1.5rem',
        margin: '0',
        color: 'rgba(102, 102, 102, .6)'
    }
};

export default GetStylesComponent(StylesheetTitleComponent);
