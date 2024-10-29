const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * @callback CipherFunction
 * @param {string} c - The character to be transformed.
 * @returns {string} - The transformed character.
 */

/**
 * Example implementation of CipherFunction.
 * @type {CipherFunction}
 */
const testCipher = (c) => {
    // Your transformation logic here
    return c.toUpperCase(); // Example transformation
};
const caesarCipher = (c, shift) => {
    // Your transformation logic here
    return alphabet[(alphabet.indexOf(c)+shift+alphabet.length)%alphabet.length]; // Example transformation
};
//Export the functions for testing
export {
    testCipher,
    caesarCipher
}