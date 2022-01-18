import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/products" className="nav-item nav-link">Products</NavLink>
            </div>
            <div className="navbar-nav">
                <NavLink to="/auth/logout" className="nav-item nav-link">Logout</NavLink>
            </div>
        </nav>
    );
}

export { Nav };