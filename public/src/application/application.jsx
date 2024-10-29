import React from "react";
import { testCipher, caesarCipher } from "./cipher";
import applyCipher from "./applyCipher";

export function Application() {
    const [cipherText, updateCipherText] = React.useState('Encrypted/Decrypted Cipher Text');
    const [cipher, setCipher] = React.useState(() => (index, c) => caesarCipher(index, c, 3));

    function changeCipherText(e) {
        const convertText = applyCipher(e.target.value, cipher);
        console.log(convertText);
        updateCipherText(convertText);
    }

    return (
        <main>
            <form>
                <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '10px 0px' }}>
                    <select className="form-select" style={{ width: '200px' }}>
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
                    <input type="key" placeholder="Key" className="form-control col" style={{ minWidth: '125px' }} required/>
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