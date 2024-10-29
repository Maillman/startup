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
const vigenèreCipher = (c, keyNumbers) => {
    // if(iterator.done){
    //     iterator = keyNumbers[Symbol.iterator]();
    // }
    // let shift = iterator.next().value;
    let shift = keyNumbers.shift();
    keyNumbers.push(shift);
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