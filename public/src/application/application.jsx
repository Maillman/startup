import React, { useEffect } from "react";
import * as Cipher from './cipher.js';
import applyCipher from "./applyCipher";
import { CryptState } from "./cryptState.js";

const { 
    atbashCipher,
    enBaconCipher,
    deBaconCipher,
    enAffineCipher,
    deAffineCipher,
    caesarCipher,
    vigenèreCipher 
} = Cipher;
export function Application() {
    const [cipherText, updateCipherText] = React.useState('Encrypted/Decrypted Cipher Text');
    const [plainText, updatePlainText] = React.useState('');
    const [key, setKey] = React.useState('a');
    const [cipher, setCipher] = React.useState(() => (c, index, key) => atbashCipher(c));
    const [cryptState, setCryptState] = React.useState(CryptState.Decrypted);
    useEffect(() => {
        const convertText = applyCipher(plainText, cipher, key);
        console.log(convertText);
        updateCipherText(convertText ? convertText : 'Encrypted/Decrypted Cipher Text');
    }, [plainText, key, cipher]);
    
    function changeCipherText(e) {
        updatePlainText(e.target.value);
        const getCipher = document.querySelector('.form-select');
        handleCipherChange(getCipher.value, cryptState, e.target.value);
    }

    function handleCipherChange(cipher, state, text) {
        const selectedCipher = cipher;
        switch (selectedCipher) {
            case 'Atbash Cipher':
                setCipher(() => (c, index, key) => atbashCipher(c));
                break;
            case 'Affine Cipher':
                setCipher(() => (c, index, key) => state==CryptState.Decrypted ? deAffineCipher(c, key.split(/[^0-9]+/).map(Number).filter(num => !isNaN(num))) : enAffineCipher(c, key.split(/[^0-9]+/).map(Number).filter(num => !isNaN(num))));
                break;
            case 'Bacon Cipher':
                setCipher(() => (c, index, key) => state==CryptState.Decrypted ? deBaconCipher(c, index, text.toLowerCase()): enBaconCipher(c));
                break;
            case 'Caesar Cipher':
                setCipher(() => (c, index, key) => caesarCipher(c, state==CryptState.Decrypted ? parseInt(key) : -1*parseInt(key))); // Assuming key is the shift for Caesar Cipher
                break;
            case 'Vigenère Cipher':
                setCipher(() => (c, index, key) => vigenèreCipher(c, index, state==CryptState.Decrypted ? key.toLowerCase() : key.toLowerCase().split('').map(
                    (char) => Cipher.alphabet[(-1*Cipher.alphabet.indexOf(char))+Cipher.alphabet.length]
                ).join(''))); // Assuming key is the keyword for Vigenère Cipher
                break;
            // case 'A1Z26 Cipher':
            //     setCipher(() => a1z26Cipher);
            //     break;
            default:
                setCipher(() => (c, index, key) => vigenèreCipher(c, index, key));;
                break;
        }
    }

    function changeKey(e) {
        setKey(e.target.value);
    }

    function changeCryptState(state) {
        setCryptState(state);
        const getCipher = document.querySelector('.form-select');
        handleCipherChange(getCipher.value, state, plainText);
    }

    return (
        <main>
            <form>
                <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '10px 0px' }}>
                    <select className="form-select" style={{ width: '200px' }} onChange={(e) => handleCipherChange(e.target.value, cryptState, plainText)}>
                        <optgroup label="Alphabetical Ciphers">
                            <option>Atbash Cipher</option>
                            <option>Affine Cipher</option>
                            <option>Bacon Cipher</option>
                            <option>Caesar Cipher</option>
                            <option>Vigenère Cipher</option>
                        </optgroup>
                        <optgroup label="Numerical Ciphers">
                            <option disabled>A1Z26 Cipher</option>
                        </optgroup>
                    </select>
                    <input type="key" placeholder="Key" className="form-control col" style={{ minWidth: '125px' }} onChange={changeKey} required/>
                </span>
                <textarea cols="40" rows="8" placeholder="Text to encrypt or decrypt..." onChange={(e) => changeCipherText(e)} value={plainText}></textarea>
                <textarea cols="40" rows="8" disabled style={{ color: 'gray' }} value={cipherText}></textarea>
                <span className="container-fluid d-flex flex-wrap align-items-center" style={{ padding: '10px 0px' }}>
                    <button className="btn btn-secondary" disabled={cryptState==CryptState.Decrypted} onClick={() => changeCryptState(CryptState.Decrypted)}>Decrypt</button>
                    <button className="btn btn-secondary" disabled={cryptState==CryptState.Encrypted} onClick={() => changeCryptState(CryptState.Encrypted)}>Encrypt</button>
                </span>
            </form>
        </main>
    );
}