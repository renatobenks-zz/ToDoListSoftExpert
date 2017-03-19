import { css } from 'aphrodite'
import styles from './../../styles';

export class TitleComponent {
    renderTitle () {
        return `<div class="${css(styles.divTitle)}">
            <img src="public/images/logo.png" class="${css(styles.imageRounded, styles.imageTitle)}" alt="">
            <h1 class="${css(styles.fontTitle, styles.noMargin)}">ToDoList</h1>
            <h3 class="${css(styles.fontSubtitle, styles.noMargin, styles.colorTitleSubtitle)}">A simple ToDo list App</h3>
        </div>`;
    }
}

export default new TitleComponent
