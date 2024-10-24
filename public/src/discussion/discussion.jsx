import React from "react";
import './discussion.css';

export function Discussion() {
    return (
        <main>
            <span class="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '0px 10%' }}>
                <h1>Discussions</h1>
                <button class="btn btn-dark" onclick="window.location.href='thread.html'" style={{ float: 'right' }}>Create a new discussion</button>
            </span>
            <div onclick="window.location.href='thread.html'" class="card">
                Discussion #1: Click here to go to the Thread page... (Database data)
            </div>
            <div onclick="window.location.href='thread.html'" class="card">
                Discussion #2: Click here to go to the Thread page... (Database data)
            </div>
            <div onclick="window.location.href='thread.html'" class="card">
                Discussion #3: Click here to go to the Thread page... (Database data)
            </div>
            <hr/>
        </main>
    );
}