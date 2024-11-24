import React, { useEffect, useState } from "react";
import { CreateDiscussion } from './createDiscussion.jsx';
import './discussion.css';
import { MessageDialog } from '../login/messageDialog.jsx';


export function Discussion({ setInitateThread, setSelectedDiscussion }) {
    const [discussion, setDiscussion] = useState([]);
    const [hideElement, setHideElement] = useState(false);
    const [indexSelected, setIndexSelected] = useState(-1);
    const [displayModal, setDisplayModal] = useState(null);
    const [displayError, setDisplayError] = useState(null);
    //Get all discussions from the database
    useEffect(() => {
        fetch('/api/discussion')
            .then((response) => response.json())
            .then((data) => {
                const discussions = data.map((discussion, index) => {
                    return {
                        display: discussion.title,
                        title: discussion.title,
                        body: discussion.body,
                        div: (
                            <>
                                <h2>{discussion.title}</h2>
                                <p>{discussion.body}</p>
                            </>
                        ),
                        id: discussion._id
                    };
            }   );
                setDiscussion(discussions);
            });
    }, []);
    const handleClick = (index) => {
        setSelectedDiscussion(discussion[index]);
        setInitateThread(discussion[index].id);
        const discuss = [...discussion];
        discuss.splice(index+1, 0, "PLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDER")
        discuss[index].display = (
            <>
                {discussion[index].div}
            </>
        );
        setHideElement(true);
        setDiscussion(discuss);
        //const pickedDiscussion = document.querySelector('#selected');
        //const rect = pickedDiscussion.getBoundingClientRect();
        //pickedDiscussion.style.setProperty('--top', `${rect.top}px`);
        const docDiscussion = document.querySelector('.discussion');
        const pickedDiscussion = document.querySelector('#selected');
        if(pickedDiscussion!=null){
            const rect = pickedDiscussion.getBoundingClientRect();
            const disccussionRect = docDiscussion.getBoundingClientRect();
            console.log(rect.top);
            console.log(disccussionRect.top);
            pickedDiscussion.style.setProperty('--top', `${rect.top - (disccussionRect.top > 0 ? disccussionRect.top : 0)}px`);
        }
    }
    return (
        <main className={`${hideElement ? 'hide' : 'discussion'}`}>
            <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '0px 10%' }}>
                <h1>Discussions</h1>
                <button className="btn btn-dark" onClick={() => {setDisplayModal(true)}} style={{ float: 'right' }}>Create a new discussion</button>
                <CreateDiscussion show={displayModal} onHide={() => setDisplayModal(null)} onError={(message) => setDisplayError(message)} />
                <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
            </span>
            {discussion.map((discussion, index) => (
                <div onClick={() => handleClick(index)} onMouseEnter={!hideElement ? () => setIndexSelected(index) : null} key={index} className="card" id={`${index==indexSelected ? 'selected' : index-1==indexSelected ? 'placeholder' : ''}`}>
                    {discussion.display}
                </div>
            ))}
            <hr/>
        </main>
    );
}