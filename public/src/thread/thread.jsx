import React, { useEffect } from "react";

export function Thread({ setInitateThread, challenge }) {
    useEffect(() => {
        setInitateThread();
    }, [setInitateThread]);
    

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