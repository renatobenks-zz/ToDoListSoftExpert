import { todos } from './state';
import { AppComponent } from './view';
import { registerEventHandlers } from './events';

const root = document.getElementById('root');
const App = new AppComponent();

App.renderApp(root, todos.getState());

todos.subscribe(newState => App.renderApp(root, newState));

registerEventHandlers();
