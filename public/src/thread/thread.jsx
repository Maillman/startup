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
                body: data.body,
                replies: data.replies
            }
            setDiscussion(discussion);
        });
    }, []);

    //Send reply to discussion.
    function sendReply() {
        const reply = document.getElementById('reply').value;
        fetch(`/api/discussion/${threadId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reply: reply
            })
        }).then((response) => {
            if(response.ok) {
                // Reload the page to show the new discussion
                window.location.reload();
            } else {
                response.json().then((data) => {
                    console.log(`⚠ Error: ${data.error}`);
                });
            }
        });
    }
    return (
        <main>
            <div className="card">
                <h2>{discussion.title}</h2>
                <p>{discussion.body}</p>
            </div>
            {/* Display replies */
            discussion.replies && discussion.replies.map((reply, index) => {
                return (
                    <div key={index} className="card">
                        <p>{reply}</p>
                    </div>);})
            }
            <form>
                <textarea style={{ border: '1px solid black', padding: '20px' }} id="reply" name="reply" rows="2" placeholder="Reply to the discussion..." required></textarea>
                <button className="btn btn-dark" onClick={sendReply}>Send</button>
            </form>
            <hr/>
        </main>
    );
}