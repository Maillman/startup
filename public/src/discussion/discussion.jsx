import React from "react";
import './discussion.css';

export function Discussion({ setInitateThread }) {
    return (
        <main>
            <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '0px 10%' }}>
                <h1>Discussions</h1>
                <button className="btn btn-dark" onClick={setInitateThread} style={{ float: 'right' }}>Create a new discussion</button>
            </span>
            <div onClick={setInitateThread} className="card">
                Discussion #1: Click here to go to the Thread page... (Database data)
            </div>
            <div onClick={setInitateThread} className="card">
                Discussion #2: Click here to go to the Thread page... (Database data)
            </div>
            <div onClick={setInitateThread} className="card">
                Discussion #3: Click here to go to the Thread page... (Database data)
            </div>
            <hr/>
        </main>
    );
}