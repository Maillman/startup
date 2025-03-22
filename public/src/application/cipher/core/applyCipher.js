import { iCipherFunction } from "./iCipher";

/**
 * Applies the cipher function to each character in the input text.
 * @param {string} text - The input text to be transformed.
 * @param {typeof iCipherFunction} CipherFunction - The cipher function to apply.
 * @param {any} key - The key to use with the cipher function, if any.
 * @returns {string} - The transformed text.
 */
const applyCipher = (text, CipherFunction, key) => {
    let remove = 0;
    return text.split(/(\d+|(?=.))/).filter(Boolean).map((char, index) => {
        if (CipherFunction.getAlphabet().indexOf(char.toLowerCase()) === -1) {
            remove += 1;
        }
        const isUpperCase = char === char.toUpperCase();
        const transformedChar = CipherFunction.appliedFunction(char.toLowerCase(), [index, remove], key)
        //console.log(transformedChar);
        return isUpperCase ? transformedChar.toUpperCase() : transformedChar;
    }).join('');
};

export default applyCipher;