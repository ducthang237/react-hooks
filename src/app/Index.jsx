import React, { useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert, Auth, Home, Products } from '@/components';
import PrivateRoute from '../PrivateRoute';
import { AuthContext } from "../context/auth";

function App() {
    const { pathname } = useLocation();  

    const [authTokens, setAuthTokens] = useState();
  
    const setTokens = (data) => {
        localStorage.setItem("token", JSON.stringify(data));
        setAuthTokens(data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <div className="app-container bg-light">
                <Nav />
                <Alert />
                <div className="container pt-4 pb-4">
                    <Switch>
                        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                        <Route path="/auth" component={Auth} />
                        <Route exact path="/" component={Home} />
                        <PrivateRoute path="/products" component={Products} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </div>
        </AuthContext.Provider>
       
    );
}

export { App }; 