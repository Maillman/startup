import React, { useEffect } from "react";
import './login.css';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange, logout }) {
    useEffect(() => {
        if (logout) {
            //Change localStorage to an api fetch call to logout the user
            //localStorage.removeItem('userName');
            fetch('/api/auth/logout',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: localStorage.getItem('token')})
            })
            .then((response) => response?.status === 200 ? response.json() : null)
            .then((data) => {
                console.log(data);
                localStorage.removeItem('token');
            })
            onAuthChange(userName, AuthState.Unauthenticated);
        }
    });
    return (
        <main>
            {authState === AuthState.Authenticated && (
                <Authenticated userName={userName} />
            )}
            {authState === AuthState.Unauthenticated && (
                <Unauthenticated userName={userName} onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)}/>
            )}
        </main>
    );
}