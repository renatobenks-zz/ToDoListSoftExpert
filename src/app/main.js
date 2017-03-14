import { todos } from './state';
import { AppComponent } from './view';
import { registerEventHandlers } from './events';

const root = document.getElementById('root');
new AppComponent(root, todos.getState());

todos.subscribe(newState => new AppComponent(root, newState));

registerEventHandlers();
