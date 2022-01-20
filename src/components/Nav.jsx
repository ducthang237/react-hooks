import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';

function Nav() {
    const { t } = useTranslation();

    const language = localStorage.getItem('language');
    const languageSelected = language || 'en';

    function changeLanguage(e) {
        localStorage.setItem('language', e.target.value);
        i18n.changeLanguage(e.target.value);
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
                <NavLink exact to="/" className="nav-item nav-link">{t('nav.home')}</NavLink>
                <NavLink to="/products" className="nav-item nav-link">{t('nav.product')}</NavLink>
            </div>
            <div className="navbar-nav">
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <select defaultValue={languageSelected} onChange={changeLanguage}>
                            <option value="vi" >
                                Vietnamese
                            </option>
                            <option value="en">
                                English
                            </option>
                        </select>
                    </div>
                </div>
                <NavLink to="/auth/logout" className="nav-item nav-link">{t('nav.logout')}</NavLink>
            </div>
        </nav>
    );
}

export { Nav };