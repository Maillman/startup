import React from 'react';
import { useState } from 'react';
import { MessageDialog } from './messageDialog.jsx';

export function Unauthenticated(props) {
    const [userName, setUserName] = useState(props.username);
    const [password, setPassword] = useState('');
    const [displayError, setDisplayError] = useState(null);

    async function loginUser() {
        loginOrRegisterUser("/api/auth/login");
    }

    async function registerUser() {
        loginOrRegisterUser("/api/auth");
    }

    async function loginOrRegisterUser(endpoint) {
        //Change localStorage to an api fetch call to register the user
        //localStorage.setItem('userName', userName);
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: userName, password: password})
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.error){
                setDisplayError(`⚠ Error: ${data.error}`);
            } else {
                localStorage.setItem('token', data.token);
                props.onLogin(userName);
            }
        });
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
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </span>
    );
}