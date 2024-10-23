import React from "react";

export function Application() {
    return (
        <main>
            <form>
                <span class="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '10px 0px' }}>
                    <select class="form-select" style={{ width: '200px' }}>
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
                    <input type="key" placeholder="Key" class="form-control col" style={{ minWidth: '125px' }} required/>
                </span>
                <textarea cols="40" rows="8" placeholder="Text to encrypt or decrypt..."></textarea>
                <textarea cols="40" rows="8" disabled>Encrypted/Decrypted Cipher Text</textarea>
                <span class="container-fluid d-flex flex-wrap align-items-center" style={{ padding: '10px 0px' }}>
                    <button class="btn btn-secondary">Decrypt</button><button class="btn btn-secondary">Encrypt</button>
                </span>
            </form>
        </main>
    );
}