import AppComponent from '../App';

export class TestingFeaturesComponent {
    static windowHashChange (element, state) {
        window.addEventListener('hashchange', (event) => {
            AppComponent.renderApp(element, state);
            event.stopImmediatePropagation();
        });
    }
}

export default new TestingFeaturesComponent;
