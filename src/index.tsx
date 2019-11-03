import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, createStore } from '@lokibai/react-store';
import * as serviceWorker from './serviceWorker';
import { initialState, reducer } from './store';
import App from './App';
import './index.css';

const store = createStore(reducer, initialState);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
