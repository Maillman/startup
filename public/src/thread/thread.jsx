import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

export function Thread({ setInitateThread, selectedDiscussion }) {
    const { threadId } = useParams();
    const [discussion, setDiscussion] = React.useState(selectedDiscussion);

    useEffect(() => {
        setInitateThread();
    }, [setInitateThread]);
    // MOVE THIS CODE
    const [id, setId] = React.useState(0);
    const [title, setTitle] = React.useState('Challenge Title');
    const [configuredChallenge, setConfiguredChallenge] = React.useState('Configured Challenge');
    const [hints, setHints] = React.useState(['Hint 1', 'Hint 2', 'Hint 3']);
//    const challenge = (
//        <>
//            <div className="card">
//                <h2>Challenge #{id}: {title}</h2>
//                <p>Cipher Text: <br/>{configuredChallenge}</p>
//                {hints.map((hint, index) => (
//                    <p key={index}>Hint #{index+1}: {hint}</p>
//                ))}
//            </div>
//       </>
//    );
    
    useEffect(() => {
        fetch('/api/challenge/discussion', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setId(data.id);
            setTitle(data.title);
            setConfiguredChallenge(data.encryptedtext);
            setHints(data.hints);
        });
    }, []);
    // MOVE THIS CODE
    
    //Get discussion by id.
    useEffect(() => {
        console.log(`Fetching id: ${threadId}`);
        fetch(`/api/discussion/${threadId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let discussion = {
                title: data.title,
                body: data.body
            }
            setDiscussion(discussion);
        });
    }, []);
    return (
        <main>
            <div className="card">
                <h2>{discussion.title}</h2>
                <p>{discussion.body}</p>
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