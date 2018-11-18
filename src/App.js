import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import {withContext} from './store';

const App = () => (
    <div className="todoapp">
        <Header />
        <Main />
        <Footer />
    </div>
);

export default withContext(App);
