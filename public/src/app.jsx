import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import fetchRetry from 'fetch-retry';
import { Home } from './home/home';
import { Application } from './application/application';
import { Login } from './login/login';
import { Discussion } from './discussion/discussion';
import { Thread } from './thread/thread';
import { AuthState } from './login/authState';

const fetch = fetchRetry(window.fetch);

export default function App() {
    const [initiateThread, setInitiateThread] = useState(false);
    const [challenge, setChallenge] = useState(null);
    const [logout, setLogout] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = useState(currentAuthState);

    //Get the challenge from the backend
    useEffect(() => {
        fetch('/api/challenge',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((challenge) => {
            console.log(challenge);
            console.log(`Challenge: ${challenge.challenge}`);
            console.log(`Time: ${challenge.time}`);
            //If there is no challenge or the last challenge was more than 24 (86400000 milliseconds) hours ago, create a new challenge
            if(!challenge.challenge || new Date().getTime() - 86400000 > challenge.time){
                updateChallenge();
            }
            setChallenge(challenge.challenge);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <BrowserRouter>
        <header>
            <nav className="navbar navbar-expand-sm bg-light" style={{paddingInline: "20px"}}>
                <ul className="navbar-nav me-auto">
                    <h1 className="navbar-brand">Cipher Application</h1>
                    <li className="nav-item"><NavLink className="nav-link" to='/'>Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to='/application'>Cipher Application</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to='/discussion'>Discussions</NavLink></li>
                </ul>
                <ul className="navbar-nav">
                    {authState === AuthState.Authenticated ? <li className="nav-item"><NavLink className="nav-link" to='/login' onClick={() => setLogout(true)}>Logout</NavLink></li> : null}
                    {authState === AuthState.Unauthenticated ? <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li> : null}
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
            <Route path="/discussion" element={<Discussion setInitateThread={() => setTimeout(() => {setInitiateThread(true)}, 1000)}/>} />
            <Route path="/thread" element={<Thread setInitateThread={() => setInitiateThread(false)} challenge={challenge}/>} />
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

function updateChallenge() {
    fetch('/api/quote',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        retries: 3,
        retryDelay: 1000
    })
    .then((response) => response.json())
    .then((quote) => {
        fetch('/api/challenge', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ challenge: quote.quote, time: new Date().getTime() })
        })
        .then((data) => {
            console.log(data);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
