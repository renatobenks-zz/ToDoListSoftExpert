import { getInitialState, store } from './state';
import { registerEventHandlers } from './events';

import AppComponent from './components/App';

const root = document.getElementById('root');

getInitialState()
    .then(() => {
        AppComponent.renderApp(root, store.getState());

        store.subscribe(newState => AppComponent.renderApp(root, newState));
        registerEventHandlers();
    });
