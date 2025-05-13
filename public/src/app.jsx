import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import fetchRetry from 'fetch-retry';
import { Home } from './home/home';
import { Application } from './application/application';
import { Login } from './login/login';
import { Discussion } from './discussion/discussion';
import { Thread } from './thread/thread';
import { AuthState } from './login/authState';
import applyCipher from "./application/cipher/core/applyCipher";
import { ListCipher } from './application/cipher/core/listCipher';
//import * as Cipher from './application/cipher';
//import applyCipher from "./application/applyCipher";

const fetch = fetchRetry(window.fetch);

// const { 
//     atbashCipher,
//     enBaconCipher,
//     caesarCipher,
//     vigenèreCipher 
// } = Cipher;
const ciphers = new ListCipher();
export default function App() {
    const [challenge, setChallenge] = useState(null);
    const [logout, setLogout] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = useState(currentAuthState);
    const [toolTipOpen, setToolTipOpen] = useState(false);
    const [selectedDiscussion, setSelectedDiscussion] = useState({
        title: 'Discussion Title',
        body: 'Body Text',
        author: 'Author'
    });

    let navigate = useNavigate();

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
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    function logoutUser() {
        localStorage.removeItem('userName');
        setLogout(true);
    }

    return (
        <>
        <header>
            <nav className="navbar navbar-expand-sm bg-light" style={{paddingInline: "20px"}}>
                <ul className="navbar-nav me-auto">
                    <h1 className="navbar-brand">Cipher Application</h1>
                    <li className="nav-item"><NavLink className="nav-link" to='/'>Home</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to='/application'>Cipher Application</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to='/discussion'>Discussions</NavLink></li>
                </ul>
                <ul className="navbar-nav">
                    {authState === AuthState.Authenticated ? <li className="nav-item"><NavLink className="nav-link" to='/login' onClick={() => logoutUser()}>Logout</NavLink></li> : null}
                    {authState === AuthState.Unauthenticated ? <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li> : null}
                </ul>
                <hr/>
            </nav>
        </header>
        {/*{(initiateThread) ? <Navigate to={`/thread/${initiateThread}`}/> : null}-->*/}
        <Tooltip anchorSelect=".copy-text-button" place="top" isOpen={toolTipOpen}>Copied to clipboard</Tooltip>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element=
                {<Login 
                    userName={userName} 
                    authState={authState} 
                    onAuthChange={(userName, authState) => {
                        localStorage.setItem('userName', userName);
                        setUserName(userName);
                        setAuthState(authState);
                        setLogout(false);
                    }}
                    logout={logout}
                />} />
            <Route path="/application" element={<Application setToolTipOpen={(open) => {setToolTipOpen(open)}}/>} />
            <Route path="/discussion" element={<Discussion setInitateThread={(id) => setTimeout(() => {navigate(`/thread/${id}`)}, 1000)} setSelectedDiscussion={(discussion) => setSelectedDiscussion(discussion)}/>} />
            <Route path="/thread/:threadId" element={<Thread challenge={challenge} selectedDiscussion={selectedDiscussion} userName={userName}/>} />
            <Route path="*" element={<Home />} />
        </Routes>
        <footer className="navbar bg-dark">
            <div className="container-fluid ">
                <span className="text-secondary">Cipher Application's GitHub</span>
            </div>
            <br/>
            <div className="container-fluid ">
                <a href="https://github.com/Maillman/startup">GitHub</a><br/>
            </div>
        </footer>
        </>
    );
}

function updateChallenge() {
    fetch('/api/quote',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        retryOn: [503],
        retries: 5,
        retryDelay: function(attempt, error, response) {
            return Math.pow(2, attempt) * 500; // 500, 1000, 2000, 4000, 8000
          }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let numQuotes = data.Quotes.length;
        let quote = data.Quotes[Math.floor(Math.sqrt(Math.random() * Math.pow(numQuotes, 2)))]; //Get a random quote, favoring the last quotes.
        fetch('/api/challenge', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ challenge: quote, time: new Date().getTime() })
        })
        .then((data) => {
            console.log(data);
            storeChallenge(quote);
        });
    })
}

// function storeChallengeOld(challenge){
//     let id;
//     const title = challenge.Title;
//     //Step 1: Pick a random cipher to encrypt the challenge.
//     const setOfCiphers = [
//         (c, index, key) => atbashCipher(c),
//         (c, index, key) => enBaconCipher(c),
//         (c, index, key) => caesarCipher(c, -1*parseInt(key)),
//         (c, index, key) => vigenèreCipher(c, index, key.toLowerCase().split('').map(
//             (char) => Cipher.alphabet[(-1*Cipher.alphabet.indexOf(char))+Cipher.alphabet.length]
//         ).join(''))
//     ];
//     let index = Math.floor(Math.random() * setOfCiphers.length)
//     let cipher = setOfCiphers[index];
//     let name = ["Atbash", "Bacon", "Caesar", "Vigenère"][index];
//     let key = index==2 ? Math.floor(Math.random() * 26) : index==3 ? challenge.Keywords[Math.floor(Math.random() * challenge.Keywords.length)] : null;
//     //Step 2: Encrypt the challenge with the cipher.
//     console.log(challenge.Quote);
//     const convertText = applyCipher(challenge.Quote, cipher, key);
//     console.log(convertText);
//     //Step 3: Create hints to the user to decrypt the challenge.
//     let hints = [];
//     hints.push(`A related word is ${challenge.Keywords[Math.floor(Math.random() * challenge.Keywords.length)]}.`);
//     hints.push(challenge.Context);
//     hints.push(`The challenge is encrypted using a ${name} cipher.`);
//     //Step 4: Store created challenge in the backend.
//     fetch('/api/challenge/discussion', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: title, encryptedtext: convertText, hints: hints })
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         id = data.id;
//         //Step 5: Create a discussion thread for the challenge.
//         document.cookie = `token=3767390d-81db-4640-a171-e86594008ee7`;
//         fetch('/api/discussion', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title: `Challenge #${id}: ${title}`,
//                 body: `Cipher Text: \n${convertText}\n\n${hints.map((hint, index) => (`Hint #${index+1}: ${hint}`)).join('\n')}`
//             })
//         })
//         .then((response) => {
//             if(response.ok) {
//                 console.log('Challenge created');
//                 document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//             }else{
//                 response.json().then((data) => {
//                     console.log(`⚠ Error: ${data.error}`);
//                 });
//             }
//         });
//     });
// }

function storeChallenge(challenge){
    let id;
    const title = challenge.Title;
    //Step 1: Pick a random cipher to encrypt the challenge.
    const allCiphers = ciphers.getAllCiphers();
    console.log(allCiphers);
    const exampleCiphers = ciphers.getCiphersForCategory("Example Ciphers");
    const setOfCiphers = allCiphers.filter(cipher => !exampleCiphers.includes(cipher) && cipher.name !== "Affine Cipher");
    console.log(setOfCiphers);
    let index = Math.floor(Math.random() * setOfCiphers.length)
    let cipher = setOfCiphers[index];
    // let name = ["Atbash", "Bacon", "Caesar", "Vigenère"][index];
    let key;
    switch(cipher.name) {
        case "A1Z26 Cipher":
            key = "-";
            break;
        case "Caesar Cipher":
            key = Math.floor(Math.random() * 26);
            break;
        case "Vigenère Cipher":
            key = challenge.Keywords[Math.floor(Math.random() * challenge.Keywords.length)];
            break;
        default:
            key = null;
    }
    //Step 2: Encrypt the challenge with the cipher.
    console.log(challenge.Quote);
    const convertText = applyCipher(challenge.Quote, cipher, key);
    console.log(convertText);
    //Step 3: Create hints to the user to decrypt the challenge.
    let hints = [];
    hints.push(`A related word is ${challenge.Keywords[Math.floor(Math.random() * challenge.Keywords.length)]}.`);
    hints.push(challenge.Context);
    hints.push(`The challenge is encrypted using a ${cipher.name}.`);
    //Step 4: Store created challenge in the backend.
    fetch('/api/challenge/discussion', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, encryptedtext: convertText, hints: hints })
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        id = data.id;
        //Step 5: Create a discussion thread for the challenge.
        document.cookie = `token=3767390d-81db-4640-a171-e86594008ee7`;
        fetch('/api/discussion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `Challenge #${id}: ${title}`,
                body: `Cipher Text: \n${convertText}\n\n${hints.map((hint, index) => (`Hint #${index+1}: ${hint}`)).join('\n')}`
            })
        })
        .then((response) => {
            if(response.ok) {
                console.log('Challenge created');
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }else{
                response.json().then((data) => {
                    console.log(`⚠ Error: ${data.error}`);
                });
            }
        });
    });
}