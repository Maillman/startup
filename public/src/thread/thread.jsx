import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';

export function Thread({ setInitateThread, selectedDiscussion }) {
    const { threadId } = useParams();
    const [discussion, setDiscussion] = React.useState(selectedDiscussion);

    useEffect(() => {
        setInitateThread();
    }, [setInitateThread]);
    
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