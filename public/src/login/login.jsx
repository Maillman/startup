import React from "react";
import './login.css';

export function Login() {
    return (
        <main>
            <form id="login-form" className="a-flex">      { /*Replace <form> with <form action="login.php" method="post"> in time*/ }
                <h1>Sign In</h1>
                <p>
                    <input type="text" id="username" name="username" placeholder="Username" className="form-control" size="60" required/>
                </p>
                <p>
                    <input type="password" id="password" name="password" placeholder="Password" className="form-control" required/>
                </p>
                <input type="submit" value="Login" className="btn btn-primary"/>
                <input type="submit" value="Register" className="btn btn-primary"/>
            </form>
        </main>
    );
}