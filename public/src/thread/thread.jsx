import React, { useEffect, useState } from "react";

export function Thread({ setInitateThread }) {
    const [challenge, setChallenge] = useState(null);

    useEffect(() => {
        setInitateThread();
    }, [setInitateThread]);
    
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
        });
    }, []);

    return (
        <main>
            <div className="card">
                <h2>Discussion Thread</h2>
                <p>{challenge}</p>
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

function updateChallenge() {
    fetch('/api/challenge', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ challenge: 'This is a challenge', time: new Date().getTime() })
    })
    .then((data) => {
        console.log(data);
    });
}
