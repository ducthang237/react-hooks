import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { authService } from '@/services';

function Logout() {

    const { setAuthTokens } = useAuth();
    const history = useHistory();

    useEffect(() => {
        authService.logout().then(result => {
            if (result.status === 200) {
                setAuthTokens();
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("language");
                sessionStorage.removeItem("roles");
                history.push('/auth/login')
            } else {
                console.log('Logout failed: ' )
            }
        }).catch(e => {
            console.log('Logout error: ', e)
        });
        
    }, []);
    
    return <></>; 
}
export { Logout };