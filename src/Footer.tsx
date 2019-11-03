import React, { useContext } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from '@lokibai/react-store';

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';

const Footer: React.FunctionComponent = () => {
	const { nowShowing, todos } = useSelector((state: any) => state);
	const dispatch = useDispatch();

	const activeTodoCount = todos.reduce(
		(total: number, todo: { completed: any }) =>
			todo.completed ? total : total + 1,
		0
	);

	const onToggleShowing = (nowShowing: any) => {
		dispatch({
			type: 'toggleShowing',
			payload: { nowShowing: nowShowing },
		});
	};

	const onClearCompleted = () => {
		dispatch({ type: 'clearCompleted' });
	};

	return todos.length ? (
		<footer className='footer'>
			<span className='todo-count'>
				<strong>{activeTodoCount}</strong> item
				{activeTodoCount === 1 ? '' : 's'} left
			</span>

			<ul className='filters'>
				<li>
					<a
						onClick={() => onToggleShowing(ALL_TODOS)}
						className={classNames({
							selected: nowShowing === ALL_TODOS,
						})}
					>
						All
					</a>
				</li>{' '}
				<li>
					<a
						onClick={() => onToggleShowing(ACTIVE_TODOS)}
						className={classNames({
							selected: nowShowing === ACTIVE_TODOS,
						})}
					>
						Active
					</a>
				</li>{' '}
				<li>
					<a
						onClick={() => onToggleShowing(COMPLETED_TODOS)}
						className={classNames({
							selected: nowShowing === COMPLETED_TODOS,
						})}
					>
						Completed
					</a>
				</li>
			</ul>

			<button className='clear-completed' onClick={onClearCompleted}>
				Clear completed
			</button>
		</footer>
	) : null;
};

export default Footer;
