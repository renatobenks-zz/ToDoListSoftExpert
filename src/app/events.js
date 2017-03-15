import {listen} from './lib/events';

import { InputToDoItemComponent } from './components/Input/Input';
import { TodoItemComponent } from './components/Todo/TodoItem';

export const registerEventHandlers = () => {
    listen('click', '#addTodo', InputToDoItemComponent.addTodoItem);
    listen('click', '.js_toggle_todo', TodoItemComponent.toggleStatusTodoItem);
};
