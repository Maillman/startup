const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * @callback CipherFunction
 * @param {string} c - The character to be transformed.
 * @param {number} index - The index of the character in the input text.
 * @returns {string} - The transformed character.
 */

/**
 * Example implementation of CipherFunction.
 * @type {CipherFunction}
 */
const testCipher = (c) => {
    init: () => {
        console.log('init');
    }
    // Your transformation logic here
    return c.toUpperCase(); // Example transformation
};
const caesarCipher = (c, shift) => {
    // Your transformation logic here
    if (alphabet.indexOf(c) === -1) {
        return c;
    }
    return alphabet[(alphabet.indexOf(c)+shift+alphabet.length)%alphabet.length]; // Example transformation
};
const vigenèreCipher = (c, index, key) => {
    let keyIndex = index % key.length;
    let shift = findShift(key[keyIndex]);
    return caesarCipher(c, 0-shift);
};
const findShift = (key) => {
    return alphabet.indexOf(key ? key.toLowerCase() : 0);
};
//Export the functions for testing
export {
    alphabet,
    testCipher,
    caesarCipher,
    vigenèreCipher,
    findShift
}