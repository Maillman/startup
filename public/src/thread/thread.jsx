import React from "react";

export function Thread({ setInitateThread }) {
    setInitateThread();

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