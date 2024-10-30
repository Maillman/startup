export const alphabet = 'abcdefghijklmnopqrstuvwxyz';

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
export const testCipher = (c) => {
    // Your transformation logic here
    return c.toUpperCase(); // Example transformation
};
export const caesarCipher = (c, shift) => {
    return handleCipher(c, alphabet[(alphabet.indexOf(c)+shift+alphabet.length)%alphabet.length]);
};
export const vigenèreCipher = (c, index, key) => {
    let keyIndex = index % key.length;
    let shift = findShift(key[keyIndex]);
    return caesarCipher(c, 0-shift);
};
export const findShift = (key) => {
    return alphabet.indexOf(key ? key.toLowerCase() : 0);
};
export const atbashCipher = (c) => {
    return handleCipher(c, alphabet[alphabet.length-(alphabet.indexOf(c)+1)]);
};

const handleCipher = (c, value) => {
    if (alphabet.indexOf(c) === -1) {
        return c;
    }
    return value;
}