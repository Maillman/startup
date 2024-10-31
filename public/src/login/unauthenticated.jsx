import React from 'react';
import { useState } from 'react';

export function Unauthenticated(props) {
    const [userName, setUserName] = useState(props.username);
    const [password, setPassword] = useState('');

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function registerUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return (
        <span id="login-form" className="a-flex">      { /*Replace <form> with <form action="login.php" method="post"> in time*/ }
            <h1>Sign In</h1>
            <p>
                <input type="text" id="username" name="username" placeholder="Username" className="form-control" size="60" onChange={(e) => setUserName(e.target.value)} required/>
            </p>
            <p>
                <input type="password" id="password" name="password" placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} required/>
            </p>
            <input type="submit" value="Login" className="btn btn-primary" onClick={() => loginUser()} disabled={!userName||!password} />
            <input type="submit" value="Register" className="btn btn-primary" onClick={() => registerUser()} disabled={!userName||!password} />
        </span>
    );
}