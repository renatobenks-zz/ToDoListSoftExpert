import AppComponent from '../App';

export class TestingFeaturesComponent {
    static windowHashChange (element, state) {
        window.addEventListener('hashchange', (event) => {
            AppComponent.renderApp(element, state);
            event.stopImmediatePropagation();
        });
    }

    static renderComponentAfterTitleComponent () {

    }
}

export default new TestingFeaturesComponent;
