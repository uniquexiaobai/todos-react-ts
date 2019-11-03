import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App: React.FC = () => (
	<div className='todoapp'>
		<Header />
		<Main />
		<Footer />
	</div>
);

export default App;
