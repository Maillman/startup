import React, { useEffect } from "react";

export function Thread({ setInitateThread, challenge }) {
    const [title, setTitle] = React.useState('Discussion Thread');
    const [configuredChallenge, configureChallenge] = React.useState('This is a discussion thread for the challenge!');
    useEffect(() => {
        setInitateThread();
    }, [setInitateThread]);
    useEffect(() => {
        if(challenge){
            setTitle(challenge.Title);
            configureChallenge(challenge.Quote);
        }
    }, [challenge]);

    return (
        <main>
            <div className="card">
                <h2>{title}</h2>
                <p>{configuredChallenge}</p>
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