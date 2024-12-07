import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ReplNotifier } from './replyNotifier.js';

export function Thread({ setInitateThread, selectedDiscussion }) {
    const { threadId } = useParams();
    const [discussion, setDiscussion] = React.useState(selectedDiscussion);
    const [replyText, setReplyText] = React.useState('');

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
                author: data.author,
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
                //window.location.reload();
                console.log("Success");
            } else {
                response.json().then((data) => {
                    console.log(`⚠ Error: ${data.error}`);
                });
            }
        });
        // Send the reply to the websocket
        console.log("Sending the reply through WebSocket", reply);
        ReplNotifier.broadcastEvent('TestWebsocket', 'reply', {reply: reply});
        document.getElementById('reply').value = '';
        setReplyText('');
    }
    //Websocket Replies
    useEffect(() => {
        ReplNotifier.addHandler(handleReplies);

        return () => {
            ReplNotifier.removeHandler(handleReplies);
        };
    }, []);

    function handleReplies(event) {
        console.log(event);
        if(event.type === 'reply') {
            setDiscussion((prev) => {
                if (prev.replies === undefined) {
                    prev.replies = [];
                }
                return {
                    ...prev,
                    replies: [ ...prev.replies, {author: event.from, reply: event.value.reply}]
                }
            });
        }
    }

    return (
        <main>
            <div className="card">
                <p className="text-secondary" style={{fontStyle: 'italic'}}>{discussion.author}</p>
                <h2>{discussion.title}</h2>
                <p>{discussion.body}</p>
            </div>
            {/* Display replies */
            discussion.replies && discussion.replies.map((reply, index) => {
                return (
                    <div key={index} className="card">
                        <p className="text-secondary" style={{fontStyle: 'italic'}}>{reply.author}</p>
                        <p>{reply.reply}</p>
                    </div>);})
            }
            <form>
                <textarea style={{ border: '1px solid black', padding: '20px' }} id="reply" name="reply" rows="2" placeholder="Reply to the discussion..." onChange={(e) => setReplyText(e.target.value)}></textarea>
                <button type="button" className="btn btn-dark" onClick={sendReply} disabled={!replyText}>Send</button>
            </form>
            <hr/>
        </main>
    );
}