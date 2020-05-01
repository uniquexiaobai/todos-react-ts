import produce from 'immer';
import { ALL_TODOS } from './constants';

export type NowShowing = string;
export type Todo = {
	id: number;
	text: string;
	completed?: boolean;
	name?: string;
};
export type AppState = {
	nowShowing: NowShowing;
	todos: Todo[];
};

export type Action =
	| { type: 'create'; payload: Todo }
	| { type: 'update'; payload: any } // why error
	| { type: 'toggle'; payload: { id: Todo['id'] } }
	| { type: 'toggleAll'; payload: { completed: Todo['completed'] } }
	| { type: 'destroy'; payload: { id: Todo['id'] } }
	| { type: 'clearCompleted'; payload: null }
	| {
			type: 'toggleShowing';
			payload: { nowShowing: AppState['nowShowing'] };
	  };

export const initialState: AppState = {
	nowShowing: ALL_TODOS,
	todos: [],
};

export const reducer = produce(
	(state: AppState, action: Action): AppState => {
		const { type, payload } = action;

		console.log(type, payload);

		switch (action.type) {
			case 'create':
				state.todos.push(payload);
				return state;
			case 'update':
				state.todos.forEach((todo) => {
					if (todo.id === payload.id) {
						todo.text = payload.text;
					}
				});
				return state;
			case 'toggle':
				state.todos.forEach((todo) => {
					if (todo.id === payload.id) {
						todo.completed = !todo.completed;
					}
				});
				return state;
			case 'toggleAll':
				state.todos.forEach((todo) => {
					todo.completed = payload.completed;
				});
				return state;
			case 'destroy':
				state.todos.splice(
					state.todos.findIndex((todo) => todo.id === payload.id)
				);
				return state;
			case 'clearCompleted':
				state.todos = state.todos.filter((todo) => !todo.completed);
				return state;
			case 'toggleShowing':
				state.nowShowing = payload.nowShowing;
				return state;
			default:
				return state;
		}
	}
);
