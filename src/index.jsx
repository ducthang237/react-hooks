import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';

import { App } from './app';

import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import './styles.less';

render(
    <I18nextProvider i18n={i18n}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </I18nextProvider>,
    document.getElementById('app')
);