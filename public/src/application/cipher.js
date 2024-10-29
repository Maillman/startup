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
const vigenèreCipher = (index, c, key) => {
    let keyIndex = index % key.length;
    let shift = findShift(key[keyIndex]);
    return caesarCipher(c, shift);
};
const findShift = (key) => {
    return alphabet.indexOf(key);
};
//Export the functions for testing
export {
    testCipher,
    caesarCipher,
    vigenèreCipher,
    findShift
}