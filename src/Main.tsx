import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from '@lokibai/react-store';
import { ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY } from './constants';
import { AppState, Todo, Action } from './store';

const Main: React.FunctionComponent = () => {
	const { nowShowing, todos } = useSelector(
		(state: AppState): AppState => state
	);
	const dispatch = useDispatch();

	const activeTodoCount: number = todos.reduce(
		(total: number, todo: Todo) => (todo.completed ? total : total + 1),
		0
	);

	const showTodos: Todo[] = todos.filter((todo: Todo) => {
		switch (nowShowing) {
			case ACTIVE_TODOS:
				return !todo.completed;
			case COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
		}
	});

	const onToggleAll = (e: { target: { checked: boolean } }): void => {
		const checked = e.target.checked;

		dispatch({
			type: 'toggleAll',
			payload: { completed: checked },
		} as Action);
	};

	return (
		<div className='main'>
			<input
				className='toggle-all'
				type='checkbox'
				onChange={onToggleAll}
				checked={activeTodoCount === 0}
			/>

			<ul className='todo-list'>
				{showTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>
		</div>
	);
};

const TodoItem: React.FunctionComponent<{ todo: Todo }> = ({ todo }) => {
	const editingInput = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const [editingText, setEditingText] = useState<string>(todo.text);
	const [editing, setEditing] = useState<boolean>(false);

	useEffect(() => {
		if (editing && editingInput && editingInput.current) {
			editingInput.current.focus();
		}
	}, [editing]);

	const onToggle = (): void => {
		dispatch({ type: 'toggle', payload: { id: todo.id } } as Action);
	};

	const onDestroy = (): void => {
		dispatch({ type: 'destroy', payload: { id: todo.id } } as Action);
	};

	const onEdit = (): void => {
		setEditing(true);
	};

	const onChange = (e: { target: { value: string } }): void => {
		setEditingText(e.target.value);
	};

	const onBlur = (): void => {
		const text: string = editingText.trim();

		if (!text) {
			onDestroy();
		} else if (text !== todo.name) {
			dispatch({
				type: 'update',
				payload: {
					id: todo.id,
					text: editingText,
				},
			} as Action);
			setEditing(false);
		}
	};

	const onKeyDown = (e: { which: number }): void => {
		if (e.which === ENTER_KEY) {
			onBlur();
		}
	};

	return (
		<li
			className={classNames({
				completed: todo.completed,
				editing: editing,
			})}
		>
			<div className='view'>
				<input
					className='toggle'
					type='checkbox'
					checked={todo.completed}
					onChange={onToggle}
				/>
				<label onDoubleClick={onEdit}>{todo.text}</label>
				<button className='destroy' onClick={onDestroy} />
			</div>

			<input
				ref={editingInput}
				className='edit'
				value={editingText}
				onChange={onChange}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
		</li>
	);
};

export default Main;
