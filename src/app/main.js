import { todos } from './state';
import { render } from './view';
import { registerEventHandlers } from './events';

const App = document.getElementById('root');

todos.subscribe(newState => render(App, newState));

render(App, todos.getState());

registerEventHandlers();
