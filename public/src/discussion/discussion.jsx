import React, { useEffect, useState } from "react";
import { CreateDiscussion } from './createDiscussion.jsx';
import './discussion.css';

export function Discussion({ setInitateThread }) {
    const [discussion, setDiscussion] = useState([
        "Discussion #1: Click here to go to the Thread page... (Database data)",
        "Discussion #2: Click here to go to the Thread page... (Database data)",
        "Discussion #3: Click here to go to the Thread page... (Database data)",
        "Discussion #4: Click here to go to the Thread page... (Database data)",
        "Discussion #5: Click here to go to the Thread page... (Database data)",
    ]);
    const [hideElement, setHideElement] = useState(false);
    const [indexSelected, setIndexSelected] = useState(-1);
    const [displayModal, setDisplayModal] = useState(null);
    const handleClick = (index) => {
        setInitateThread();
        const discuss = [...discussion];
        discuss.splice(index+1, 0, "PLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDER")
        discuss[index] = (
            <>
                <h2>Discussion Thread</h2>
                <p>This is some example text. A person who wants to post a new discussion would have their post displayed here!</p>
                <p>
                    Random Cipher Text:<br/>
                    LQ BGXQL KLW VEMBX<br/>
                    IEH KVOB IMM WMWPDE<br/>
                    P BMVOWPD QHHIGI<br/>
                    AU ANDZB KS LCKQ HMIGI
                </p>
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
                <CreateDiscussion show={displayModal} onHide={() => setDisplayModal(null)} />
            </span>
            {discussion.map((discussion, index) => (
                <div onClick={() => handleClick(index)} onMouseEnter={!hideElement ? () => setIndexSelected(index) : null} key={index} className="card" id={`${index==indexSelected ? 'selected' : index-1==indexSelected ? 'placeholder' : ''}`}>
                    {discussion}
                </div>
            ))}
            <hr/>
        </main>
    );
}