import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { App } from './app';

import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './styles.less';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
);