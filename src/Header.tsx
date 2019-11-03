import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from '@lokibai/react-store';

const Header: React.FunctionComponent = () => {
	const input = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const [text, setText] = useState<string>('');

	useEffect(() => {
		if (input && input.current) {
			input.current.focus();
		}
	});

	const onChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setText(e.target.value);
	};

	const onKeyDown = (e: { keyCode: number }) => {
		if (e.keyCode !== 13) return;

		const value = text.trim();

		if (value) {
			const todo = {
				id: Date.now(),
				text: value,
				completed: false,
			};

			dispatch({ type: 'create', payload: todo });
			setText('');
		}
	};

	return (
		<header className='header'>
			<h1>todos</h1>

			<input
				ref={input}
				className='new-todo'
				placeholder='What needs to be done?'
				value={text}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
		</header>
	);
};

export default Header;
