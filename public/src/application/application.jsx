import React, { useEffect } from "react";
import * as Cipher from './cipher.js';
import applyCipher from "./applyCipher";

const { 
    atbashCipher,
    caesarCipher,
    vigenèreCipher 
} = Cipher;
export function Application() {
    const [cipherText, updateCipherText] = React.useState('Encrypted/Decrypted Cipher Text');
    const [plainText, updatePlainText] = React.useState('');
    const [key, setKey] = React.useState('key');
    const [cipher, setCipher] = React.useState(() => (c, index, key) => atbashCipher(c));
    useEffect(() => {
        changeCipherText({ target: { value: plainText } });
    }, [key]);
    
    function changeCipherText(e) {
        updatePlainText(e.target.value);
        const convertText = applyCipher(e.target.value, cipher, key);
        console.log(convertText);
        updateCipherText(convertText ? convertText : 'Encrypted/Decrypted Cipher Text');
    }

    function handleCipherChange(e) {
        const selectedCipher = e.target.value;
        switch (selectedCipher) {
            case 'Atbash Cipher':
                setCipher(() => (c, index, key) => atbashCipher(c));
                break;
            // case 'Affine Cipher':
            //     setCipher(() => affineCipher);
            //     break;
            // case 'Bacon Cipher':
            //     setCipher(() => baconCipher);
            //     break;
            case 'Caesar Cipher':
                setCipher(() => (c, index, key) => caesarCipher(c, parseInt(key))); // Assuming key is the shift for Caesar Cipher
                break;
            case 'Vigenère Cipher':
                setCipher(() => (c, index, key) => vigenèreCipher(c, index, key));
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

    return (
        <main>
            <form>
                <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '10px 0px' }}>
                    <select className="form-select" style={{ width: '200px' }} onChange={handleCipherChange}>
                        <optgroup label="Alphabetical Ciphers">
                            <option>Atbash Cipher</option>
                            <option>Affine Cipher</option>
                            <option>Bacon Cipher</option>
                            <option>Caesar Cipher</option>
                            <option>Vigenère Cipher</option>
                        </optgroup>
                        <optgroup label="Numerical Ciphers">
                            <option>A1Z26 Cipher</option>
                        </optgroup>
                    </select>
                    <input type="key" placeholder="Key" className="form-control col" style={{ minWidth: '125px' }} onChange={changeKey} required/>
                </span>
                <textarea cols="40" rows="8" placeholder="Text to encrypt or decrypt..." onChange={(e) => changeCipherText(e)} value={plainText}></textarea>
                <textarea cols="40" rows="8" disabled placeholder={cipherText}></textarea>
                <span className="container-fluid d-flex flex-wrap align-items-center" style={{ padding: '10px 0px' }}>
                    <button className="btn btn-secondary">Decrypt</button><button className="btn btn-secondary">Encrypt</button>
                </span>
            </form>
        </main>
    );
}