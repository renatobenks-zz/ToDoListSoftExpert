import { getInitialState, store } from './state';
import { registerEventHandlers } from './events';

import AppComponent from './components/App';

const root = document.getElementById('root');
const App = new AppComponent();

getInitialState()
    .then(() => {
        App.renderApp(root, store.getState());

        store.subscribe(newState => App.renderApp(root, newState));
        registerEventHandlers();
    });
