const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * @callback CipherFunction
 * @param {number} index - The index of the character in the string.
 * @param {string} c - The character to be transformed.
 * @returns {string} - The transformed character.
 */

/**
 * Example implementation of CipherFunction.
 * @type {CipherFunction}
 */
const testCipher = (index, c) => {
    // Your transformation logic here
    return c.toUpperCase(); // Example transformation
};
const caesarCipher = (index, c, shift) => {
    // Your transformation logic here
    return alphabet[(index+shift+alphabet.length)%alphabet.length]; // Example transformation
};
//Export the functions for testing
export {
    testCipher,
    caesarCipher
}