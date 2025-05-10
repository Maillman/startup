import React, { useEffect } from "react";
import { ListCipher } from "./cipher/core/listCipher";
import applyCipher from "./cipher/core/applyCipher";
import { CryptState } from "./cipher/core/cryptState";

const ciphers = new ListCipher();
export function Application({ setToolTipOpen }) {
    const [cipherText, updateCipherText] = React.useState('Encrypted/Decrypted Cipher Text');
    const [plainText, updatePlainText] = React.useState('');
    const [key, setKey] = React.useState('a');
    //Do we even need this now?
    const [cipher, setCipher] = React.useState(ciphers.getAppliedCipher().name);
    const [cryptState, setCryptState] = React.useState(CryptState.Decrypted);
    useEffect(() => {
        const convertText = applyCipher(plainText, ciphers.getAppliedCipher(), key);
        console.log(convertText);
        updateCipherText(convertText ? convertText : 'Encrypted/Decrypted Cipher Text');
    }, [plainText, key, cipher, cryptState]);
    
    function changeCipherText(e) {
        updatePlainText(e.target.value);
        const getCipher = document.querySelector('.form-select');
        handleCipherChange(getCipher.value, cryptState, e.target.value);
    }

    function handleCipherChange(cipher, state, text) {
        ciphers.setAndApplyCipher(cipher, text, state);
        setCipher(cipher);
    }

    function changeKey(e) {
        setKey(e.target.value);
    }

    function changeCryptState(state) {
        setCryptState(state);
        const getCipher = document.querySelector('.form-select');
        handleCipherChange(getCipher.value, state, plainText);
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(cipherText);
        setToolTipOpen(true);
    }

    return (
        <main>
            <form>
                <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '10px 0px' }}>
                    <select className="form-select" style={{ width: '200px' }} onChange={(e) => handleCipherChange(e.target.value, cryptState, plainText)}>
                        {ciphers.getAllCategories().map((category) => {
                            console.log(category);
                            return <optgroup label={category}>
                                {ciphers.getCiphersForCategory(category).map((cipher) => {
                                    console.log(cipher);
                                    return <option>{cipher.name}</option>
                                })}
                            </optgroup>
                        })}
                    </select>
                    <input type="key" placeholder="Key" className="form-control col" style={{ minWidth: '125px' }} onChange={changeKey} required/>
                </span>
                <textarea cols="40" rows="8" placeholder="Text to encrypt or decrypt..." onChange={(e) => changeCipherText(e)} value={plainText}></textarea>
                <span className="d-flex flex-row-reverse align-items-end" style={{ padding: '0px' }}>
                    <textarea className="col" cols="40" rows="8" disabled style={{ color: 'gray' }} value={cipherText}></textarea>
                    <button type="button" className="btn btn-dark copy-text-button" disabled={!plainText} style={{ position: 'absolute', borderRadius: '3px', padding: '2px 7px' }} onClick={() => copyToClipboard()} onMouseLeave={() => setTimeout(() => {setToolTipOpen(false)}, 250)}>&#10697;</button>
                </span>
                <span className="container-fluid d-flex flex-wrap align-items-center" style={{ padding: '10px 0px' }}>
                    <button className="btn btn-secondary" disabled={cryptState==CryptState.Decrypted} onClick={() => changeCryptState(CryptState.Decrypted)}>Decrypt</button>
                    <button className="btn btn-secondary" disabled={cryptState==CryptState.Encrypted} onClick={() => changeCryptState(CryptState.Encrypted)}>Encrypt</button>
                </span>
            </form>
        </main>
    );
}