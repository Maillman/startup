import {alphabet} from './cipher.js';

/**
 * Applies the cipher function to each character in the input text.
 * @param {string} text - The input text to be transformed.
 * @param {CipherFunction} cipherFunction - The cipher function to apply.
 * @returns {string} - The transformed text.
 */
const applyCipher = (text, cipherFunction, key) => {
    let remove = 0;
    return text.split(/(\d+|(?=.))/).filter(Boolean).map((char, index) => {
        if (alphabet.indexOf(char.toLowerCase()) === -1) {
            remove += 1;
        }
        const isUpperCase = char === char.toUpperCase();
        const transformedChar = cipherFunction(char.toLowerCase(), [index, remove], key)
        return isUpperCase ? transformedChar.toUpperCase() : transformedChar;
    }).join('');
};

export default applyCipher;