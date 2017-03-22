import { GetStylesComponent, FontRobotoMedium } from './../../styles';

export const StylesFilterComponent = {
    filter: {
        minHeight: '70px',
        padding: '10px 0',
        display: 'flex'
    },
    filterOptions: {
        margin: '7px 0',
        flexGrow: '1',
        fontFamily: FontRobotoMedium,
        fontSize: '1.25rem',
        cursor: 'pointer'
    },
    filterOptionText: {
        padding: '0 5px 0 0'
    }
};

export default GetStylesComponent(StylesFilterComponent);
