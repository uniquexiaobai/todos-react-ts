import { ALL_TODOS } from './constants';

// type AppState = {};
// type Action = {};

export const initialState = {
	nowShowing: ALL_TODOS,
	todos: [],
};

export const reducer = (state, action) => {
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
