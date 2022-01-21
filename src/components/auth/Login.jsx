import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { authService } from '@/services';
import { useAuth } from "../../context/auth";
import { Card, Form, Input, Button, Error } from "./AuthForms";

function Login(props) {

    useEffect(() => {
        
    }, []);

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location?.state?.referer || '/';

    function login() {
        authService.login({email, password}).then(result => {
        if (result.status === 200) {
            setAuthTokens(result.data.data.token);
            sessionStorage.setItem('userId', result.data.data.userId)
            sessionStorage.setItem('roles', result.data.data.roles.toString())
            setLoggedIn(true);
        } else {
            setIsError(true);
        }
        }).catch(e => {
            console.log('has error: ', e)
            setIsError(true);
        });
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <Card>
            <Form>
                <Input
                    type="text"
                    value={email}
                    onChange={e => { setEmail(e.target.value); }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); }}
                    placeholder="password"
                />
                <Button onClick={login}>Login</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            { isError && <Error>The username or password provided is incorrect!</Error> }
        </Card>
    );
}

export { Login };