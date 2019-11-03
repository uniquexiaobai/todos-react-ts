import React, { useState, useEffect, useRef, Props } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from '@lokibai/react-store';

import { ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

const Main: React.FunctionComponent = () => {
	const { nowShowing, todos } = useSelector((state: any) => state);
	const dispatch = useDispatch();

	const activeTodoCount = todos.reduce(
		(total: number, todo: { completed: any }) =>
			todo.completed ? total : total + 1,
		0
	);

	const showTodos = todos.filter((todo: { completed: any }) => {
		switch (nowShowing) {
			case ACTIVE_TODOS:
				return !todo.completed;
			case COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
		}
	});

	const onToggleAll = (e: { target: { checked: any } }) => {
		const checked = e.target.checked;

		dispatch({ type: 'toggleAll', payload: { completed: checked } });
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
				{showTodos.map((todo: { id: string | number | undefined }) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</ul>
		</div>
	);
};

const TodoItem: React.FunctionComponent<any> = ({ todo }) => {
	const editingInput = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const [editingText, setEditingText] = useState(todo.text);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		if (editing && editingInput && editingInput.current) {
			editingInput.current.focus();
		}
	});

	const onToggle = () => {
		dispatch({ type: 'toggle', payload: { id: todo.id } });
	};

	const onDestroy = () => {
		dispatch({ type: 'destroy', payload: { id: todo.id } });
	};

	const onEdit = () => {
		setEditing(true);
	};

	const onChange = (e: { target: { value: any } }) => {
		setEditingText(e.target.value);
	};

	const onBlur = () => {
		const text = editingText.trim();

		if (!text) {
			onDestroy();
		} else if (text !== todo.name) {
			dispatch({
				type: 'update',
				payload: {
					id: todo.id,
					text: editingText,
				},
			});
			setEditing(false);
		}
	};

	const onKeyDown = (e: { which: number }) => {
		if (e.which === 13) {
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
