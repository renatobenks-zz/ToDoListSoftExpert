import React from 'react';

import { css } from 'aphrodite';

import StylesheetTitleComponent from './TitleComponent.styles';

export default class TitleComponent extends React.Component {
    render () {
        return <div className={css(StylesheetTitleComponent.Title)}>
            <img src="public/images/logo.png" className={css(StylesheetTitleComponent.TitleImage)} alt=""/>
            <h1 className={css(StylesheetTitleComponent.TextTitle)}>ToDoList</h1>
            <h3 className={css(StylesheetTitleComponent.TextSubtitle)}>A simple ToDo list App</h3>
        </div>;
    }
}
