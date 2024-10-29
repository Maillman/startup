import React, { useEffect } from "react";
import { caesarCipher, vigenèreCipher, findShift } from "./cipher";
import applyCipher from "./applyCipher";

export function Application() {
    const [cipherText, updateCipherText] = React.useState('Encrypted/Decrypted Cipher Text');
    const [key, setKey] = React.useState('key');
    const [cipher, setCipher] = React.useState(() => (c, index) => vigenèreCipher(index, c, key));
    
    // useEffect(() => {
    //     setCipher(() => (c) => vigenèreCipher(c, key));
    // }, [key]);
    
    function changeCipherText(e) {
        const convertText = applyCipher(e.target.value, cipher);
        console.log(convertText);
        updateCipherText(convertText);
    }

    function handleCipherChange(e) {
        const selectedCipher = e.target.value;
        switch (selectedCipher) {
            // case 'Atbash Cipher':
            //     setCipher(() => atbashCipher);
            //     break;
            // case 'Affine Cipher':
            //     setCipher(() => affineCipher);
            //     break;
            // case 'Bacon Cipher':
            //     setCipher(() => baconCipher);
            //     break;
            case 'Caesar Cipher':
                setCipher(() => (c) => caesarCipher(c, key[0])); // Assuming key[0] is the shift for Caesar Cipher
                break;
            case 'Vigenère Cipher':
                setCipher(() => (c) => vigenèreCipher(c, key));
                break;
            // case 'A1Z26 Cipher':
            //     setCipher(() => a1z26Cipher);
            //     break;
            default:
                setCipher(() => (c) => vigenèreCipher(c, key));
                break;
        }
    }

    function changeKey(e) {
        const newKey = e.target.value.split('').map((c) => findShift(c));
        setKey(newKey);
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
                <textarea cols="40" rows="8" placeholder="Text to encrypt or decrypt..." onChange={(e) => changeCipherText(e)}></textarea>
                <textarea cols="40" rows="8" disabled placeholder={cipherText}></textarea>
                <span className="container-fluid d-flex flex-wrap align-items-center" style={{ padding: '10px 0px' }}>
                    <button className="btn btn-secondary">Decrypt</button><button className="btn btn-secondary">Encrypt</button>
                </span>
            </form>
        </main>
    );
}