import { ALL_TODOS } from './constants';

export type NowShowing = string;
export type Todo = {
	id: number;
	text: string;
	completed: boolean;
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

export const reducer = (state: AppState, action: Action): AppState => {
	const { type, payload } = action;

	console.log(type, payload);

	switch (action.type) {
		case 'create':
			return { ...state, todos: [...state.todos, payload] };
		case 'update':
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === payload.id
						? { ...todo, text: payload.text }
						: todo
				),
			};
		case 'toggle':
			return {
				...state,
				todos: state.todos.map(todo =>
					todo.id === payload.id
						? { ...todo, completed: !todo.completed }
						: todo
				),
			};
		case 'toggleAll':
			return {
				...state,
				todos: state.todos.map(todo => ({
					...todo,
					completed: payload.completed,
				})),
			};
		case 'destroy':
			return {
				...state,
				todos: state.todos.filter(todo => todo.id !== payload.id),
			};
		case 'clearCompleted':
			return {
				...state,
				todos: state.todos.filter(todo => !todo.completed),
			};
		case 'toggleShowing':
			return { ...state, nowShowing: payload.nowShowing };
		default:
			return state;
	}
};
