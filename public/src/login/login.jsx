import React, { useEffect } from "react";
import './login.css';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange, logout }) {
    useEffect(() => {
        if (logout) {
            localStorage.removeItem('userName');
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