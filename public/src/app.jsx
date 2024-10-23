import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';

export default function App() {
    return (
        <BrowserRouter>
        <header>
            <nav class="navbar navbar-expand-sm bg-light">
                <ul class="navbar-nav">
                    <h1 class="navbar-brand">Cipher Application</h1>
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="application.html">Cipher Application</a></li>
                    <li class="nav-item"><a class="nav-link" href="discussion.html">Discussions</a></li>
                    <li class="nav-item"><a class="nav-link" href="thread.html">Thread</a></li>
                </ul>
                <hr/>
            </nav>
        </header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
        </Routes>
        <footer class="navbar bg-dark">
            <div class="container-fluid ">
                <span class="text-muted">Cipher Application's GitHub</span>
            </div>
            <br/>
            <div class="container-fluid ">
                <a href="https://github.com/Maillman/startup">GitHub</a><br/>
            </div>
        </footer>
        </BrowserRouter>
    );
}