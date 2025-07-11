import React, { useEffect, useRef } from "react";
import { ListCipher } from "./cipher/core/listCipher";
import applyCipher from "./cipher/core/applyCipher";
import { CryptState } from "./cipher/core/cryptState";
import Select, { components } from 'react-select';

const ciphers = new ListCipher();
export function Application({ setCopyToolTipOpen, setCipherToolTipOpen, handleMouseMove }) {
    const [cipherText, updateCipherText] = React.useState('Encrypted/Decrypted Cipher Text');
    const [plainText, updatePlainText] = React.useState('');
    const [key, setKey] = React.useState('a');
    //Do we even need this now?
    const [cipher, setCipher] = React.useState(ciphers.getAppliedCipher().name);
    const [cryptState, setCryptState] = React.useState(CryptState.Decrypted);

    const lastHoveredLabel = useRef(null);
    const CipherOption = createCipherOption(setCipherToolTipOpen, handleMouseMove, lastHoveredLabel);

    useEffect(() => {
        const convertText = applyCipher(plainText, ciphers.getAppliedCipher(), key);
        console.log(convertText);
        updateCipherText(convertText ? convertText : 'Encrypted/Decrypted Cipher Text');
    }, [plainText, key, cipher, cryptState]);
    
    function changeCipherText(e) {
        updatePlainText(e.target.value);
        handleCipherChange(cipher, cryptState, e.target.value);
    }

    function handleCipherChange(cipher, state, text) {
        ciphers.setAndApplyCipher(cipher, text, state);
        setCipher(cipher);
        console.log(cipher, state, text);
    }

    function changeKey(e) {
        setKey(e.target.value);
    }

    function changeCryptState(state) {
        setCryptState(state);
        handleCipherChange(cipher, state, plainText);
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(cipherText);
        setCopyToolTipOpen(true);
    }

    return (
        <main>
            <form>
                <span className="container-fluid d-flex flex-wrap align-items-center justify-content-between" style={{ padding: '10px 0px' }}>
                    <Select
                        defaultValue={{ value: cipher, label: cipher }}
                        options={ciphers.getAllCategories().map(category => ({
                            label: category,
                            options: ciphers.getCiphersForCategory(category).map(cipher => ({
                                label: cipher.name,
                                value: cipher.name
                            }))
                        }))}
                        components={{ Option: CipherOption }}
                        onChange={(selectedOption) =>
                            handleCipherChange(selectedOption.value, cryptState, plainText)
                        }
                        onMenuClose={() => setCipherToolTipOpen(false)}
                        styles={{ container: (base) => ({ ...base, width: 200 }) }}
                    />
                    <input type="key" placeholder="Key" className="form-control col" style={{ minWidth: '125px' }} onChange={changeKey} required/>
                </span>
                <textarea cols="40" rows="8" placeholder="Text to encrypt or decrypt..." onChange={(e) => changeCipherText(e)} value={plainText}></textarea>
                <span className="d-flex flex-row-reverse align-items-end" style={{ padding: '0px' }}>
                    <textarea className="col" cols="40" rows="8" disabled style={{ color: 'gray' }} value={cipherText}></textarea>
                    <button type="button" className="btn btn-dark copy-text-button" disabled={!plainText} style={{ position: 'absolute', borderRadius: '3px', padding: '2px 7px' }} onClick={() => copyToClipboard()} onMouseLeave={() => setTimeout(() => {setCopyToolTipOpen(false)}, 250)}>&#10697;</button>
                </span>
                <span className="container-fluid d-flex flex-wrap align-items-center" style={{ padding: '10px 0px' }}>
                    <button className="btn btn-secondary" disabled={cryptState==CryptState.Decrypted} onClick={() => changeCryptState(CryptState.Decrypted)}>Decrypt</button>
                    <button className="btn btn-secondary" disabled={cryptState==CryptState.Encrypted} onClick={() => changeCryptState(CryptState.Encrypted)}>Encrypt</button>
                </span>
            </form>
        </main>
    );
}

const createCipherOption = (setCipherToolTipOpen, handleMouseMove, lastHoveredLabel) => {
    // Ref to store the latest mouse position
    const mousePositionRef = useRef({ x: 0, y: 0 });

    const debouncedHover = debounce((label) => {
        if (lastHoveredLabel.current !== label) {
            console.log('Debounced Hover:', label);
            lastHoveredLabel.current = label;
            setCipherToolTipOpen(true);
            handleMouseMove(mousePositionRef.current);
        }
    }, 750); // 750 ms debounce
    
    return (props) => {
        const handleHover = () => {
            debouncedHover(props.data.label);
        };

        // Update mouse position on every mouse move
        const handleMouseMoveOption = (event) => {
            mousePositionRef.current = { x: event.clientX, y: event.clientY };
        };

        return (
            <components.Option {...props}>
                <div onMouseEnter={handleHover} onMouseMove={handleMouseMoveOption} onClick={() => {
                    setCipherToolTipOpen(false);
                    lastHoveredLabel.current = null;
                }
                }>{props.children}</div>
            </components.Option>
        );
    }
};

// function throttle(fn, limit) {
//   let inThrottle;
//   return function (...args) {
//     if (!inThrottle) {
//       fn.apply(this, args);
//       inThrottle = true;
//       setTimeout(() => (inThrottle = false), limit);
//     }
//   };
// }

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}