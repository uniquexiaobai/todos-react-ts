import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from '@lokibai/react-store';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants';
import { AppState, Action, NowShowing } from './store';

const Footer: React.FC = () => {
	const { nowShowing, todos } = useSelector(
		(state: AppState): AppState => state
	);
	const dispatch = useDispatch();

	const activeTodoCount: number = todos.reduce(
		(total: number, todo: { completed: any }) =>
			todo.completed ? total : total + 1,
		0
	);

	const onToggleShowing = (nowShowing: NowShowing): void => {
		dispatch({
			type: 'toggleShowing',
			payload: { nowShowing },
		} as Action);
	};

	const onClearCompleted = (): void => {
		dispatch({ type: 'clearCompleted' } as Action);
	};

	return todos.length ? (
		<footer className='footer'>
			<span className='todo-count'>
				<strong>{activeTodoCount}</strong> item
				{activeTodoCount === 1 ? '' : 's'} left
			</span>

			<ul className='filters'>
				<li>
                    {/* eslint-disable-next-line */}
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
                    {/* eslint-disable-next-line */}
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
