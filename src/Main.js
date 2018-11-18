import React, {useContext, useState, useEffect, useRef} from 'react';
import classNames from 'classnames';

import {Context} from './store';
import {ACTIVE_TODOS, COMPLETED_TODOS} from './constants';

const Main = () => {
    const {state, dispatch} = useContext(Context);
    const {nowShowing, todos} = state;

    const activeTodoCount = todos.reduce((total, todo) => todo.completed ? total : total + 1, 0);

    const showTodos = todos.filter(todo => {
        switch (nowShowing) {
            case ACTIVE_TODOS:
                return !todo.completed;
            case COMPLETED_TODOS:
                return todo.completed;
            default:
                return true; 
        }
    });

    const onToggleAll = (e) => {
        const checked = e.target.checked;

        dispatch({type: 'toggleAll', payload: {completed: checked}});
    };

    return (
        todos.length ? (
            <div className="main">
                <input className="toggle-all" type="checkbox" onChange={onToggleAll} checked={activeTodoCount === 0} />

                <ul className="todo-list">
                    {
                        showTodos.map(todo => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))
                    }
                </ul>
            </div>
        ) : null
    );
};

const TodoItem = ({todo}) => {
    const editingInput = useRef(null);
    const {dispatch} = useContext(Context);
    const [editingText, setEditingText] = useState(todo.text);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) {
            editingInput.current.focus();
        }
    });

    const onToggle = () => {
        dispatch({type: 'toggle', payload: {id: todo.id}});
    };

    const onDestroy = () => {
        dispatch({type: 'destroy', payload: {id: todo.id}});
    };

    const onEdit = () => {
        setEditing(true);
    };

    const onChange = e => {
        setEditingText(e.target.value);
    };

    const onBlur = () => {
        const text = editingText.trim();

        if (!text) {
            onDestroy();
        } else if (text !== todo.name) {
            dispatch({type: 'update', payload: {
                id: todo.id,
                text: editingText
            }});
            setEditing(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.which === 13) {
            onBlur();
        }
    };

    return (
        <li className={
            classNames({completed: todo.completed, editing: editing})
        }>
            <div className="view">
                <input 
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                />
                <label onDoubleClick={onEdit}>{todo.text}</label>
                <button className="destroy" onClick={onDestroy} />
            </div>

            <input 
                ref={editingInput}
                className="edit"
                value={editingText}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
            />
        </li>
    );
};

export default Main;
