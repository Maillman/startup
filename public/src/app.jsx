import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Application } from './application/application';
import { Login } from './login/login';
import { Discussion } from './discussion/discussion';
import { Thread } from './thread/thread';
import { AuthState } from './login/authState';

export default function App() {
    const [initiateThread, setInitiateThread] = useState(false);
    const [logout, setLogout] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = useState(currentAuthState);

    return (
        <BrowserRouter>
        <header>
            <nav className="navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav">
                    <h1 className="navbar-brand">Cipher Application</h1>
                    <li className="nav-item"><NavLink className="nav-link" to='/'>Home</NavLink></li>
                    {authState === AuthState.Authenticated ? <li className="nav-item"><NavLink className="nav-link" to='/login' onClick={() => setLogout(true)}>Logout</NavLink></li> : null}
                    {authState === AuthState.Unauthenticated ? <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li> : null}
                    <li className="nav-item"><NavLink className="nav-link" to='/application'>Cipher Application</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to='/discussion'>Discussions</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to='/thread'>Thread</NavLink></li>
                </ul>
                <hr/>
            </nav>
        </header>
        {(initiateThread) ? <Navigate to='/thread'/> : null}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element=
                {<Login 
                    userName={userName} 
                    authState={authState} 
                    onAuthChange={(userName, authState) => {
                        setUserName(userName);
                        setAuthState(authState);
                        setLogout(false);
                    }}
                    logout={logout}
                />} />
            <Route path="/application" element={<Application />} />
            <Route path="/discussion" element={<Discussion setInitateThread={() => setInitiateThread(true)}/>} />
            <Route path="/thread" element={<Thread setInitateThread={() => setInitiateThread(false)}/>} />
            <Route path="*" element={<Home />} />
        </Routes>
        <footer className="navbar bg-dark">
            <div className="container-fluid ">
                <span className="text-secondary">Cipher Application's GitHub</span>
            </div>
            <br/>
            <div className="container-fluid ">
                <a href="https://github.com/Maillman/startup">GitHub</a><br/>
            </div>
        </footer>
        </BrowserRouter>
    );
}