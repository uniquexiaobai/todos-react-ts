import React, {useEffect, useRef, useState, useContext} from 'react';

import {Context} from './store';

const Header = () => {
    const input = useRef(null);
    const {dispatch} = useContext(Context);
    const [text, setText] = useState('');

    useEffect(() => {
        input.current.focus();
    });

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onKeyDown = (e) => {
        if (e.keyCode !== 13) return;

        const value = text.trim();

        if (value) {
            const todo = {
                id: Date.now(),
                text: value,
                completed: false,
            };

            dispatch({type: 'create', payload: todo});
            setText('');
        }
    };

    return (
        <header className="header">
            <h1>todos</h1>
            
            <input
                ref={input}
                className="new-todo"
                placeholder="What needs to be done?"
                value={text}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </header>
    );
}

export default Header;
