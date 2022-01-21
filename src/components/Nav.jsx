import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import { useAuth } from "../context/auth";

function Nav() {
    const { authTokens } = useAuth();
    const { t } = useTranslation();

    const language = sessionStorage.getItem('language');
    const languageSelected = language || 'en';

    function changeLanguage(e) {
        sessionStorage.setItem('language', e.target.value);
        i18n.changeLanguage(e.target.value);
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
                <NavLink exact to="/" className="nav-item nav-link">{t('nav.home')}</NavLink>
                <NavLink to="/products" className="nav-item nav-link">{t('nav.product')}</NavLink>
                <NavLink to="/posts" className="nav-item nav-link">{t('nav.post')}</NavLink>
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
                {(authTokens || sessionStorage.getItem("token")) &&
                    <NavLink to="/auth/logout" className="nav-item nav-link">{t('nav.logout')}</NavLink>
                }
            </div>
        </nav>
    );
}

export { Nav };