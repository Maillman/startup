import React, { useEffect } from "react";

export function Thread({ setInitateThread }) {
    useEffect(() => {
        setInitateThread();
    }, [setInitateThread]);
    //Create a challenge if time is greater than 24 hours since the last challenge
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
            console.log(`Challenge: ${challenge}`);
            if(!challenge.challenge){
                fetch('/api/challenge',{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({challenge: 'This is a challenge', time: new Date().getTime()})
                })
                .then((data) => {
                    console.log(data);
                });
            }
        });
    }, []);
    return (
        <main>
            <div className="card">
                <h2>Discussion Thread</h2>
                <p>This is some example text. A person who wants to post a new discussion would have their post displayed here!</p>
                <p>
                    Random Cipher Text:<br/>
                    LQ BGXQL KLW VEMBX<br/>
                    IEH KVOB IMM WMWPDE<br/>
                    P BMVOWPD QHHIGI<br/>
                    AU ANDZB KS LCKQ HMIGI
                </p>
            </div>
            <div className="card">
                <p>A reply to the discussion would appear here! (Websocket Data)</p>
            </div>
            <form>
                <textarea style={{ border: '1px solid black', padding: '20px' }} id="reply" name="reply" rows="2" placeholder="Reply to the discussion..." required></textarea>
                <input className="btn btn-dark" type="submit" value="Send"/>
            </form>
            <hr/>
        </main>
    );
}