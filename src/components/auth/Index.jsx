import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Login } from './Login';
import { Logout } from './Logout';
import { useAuth } from "../../context/auth";

function Auth({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route path={`${path}/login`} component={Login} />
            <Route path={`${path}/logout`} component={Logout} />
        </Switch>
    );
}

export { Auth };