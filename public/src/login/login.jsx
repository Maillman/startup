import React from "react";
import './login.css';

export function Login() {
    return (
        <main>
            <form id="login-form" class="a-flex">      { /*Replace <form> with <form action="login.php" method="post"> in time*/ }
                <h1>Sign In</h1>
                <p>
                    <input type="text" id="username" name="username" placeholder="Username" class="form-control" size="60" required/>
                </p>
                <p>
                    <input type="password" id="password" name="password" placeholder="Password" class="form-control" required/>
                </p>
                <input type="submit" value="Login" class="btn btn-primary"/>
                <input type="submit" value="Register" class="btn btn-primary"/>
            </form>
        </main>
    );
}