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
    shift = shift ? shift : 0;
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
export const enBaconCipher = (c) => {
    let baconIndex = alphabet.indexOf(c);
    baconIndex = baconIndex >= 21 ? baconIndex-2 : baconIndex >= 9 ? baconIndex-1 : baconIndex;
    return handleCipher(c, (baconIndex>>>0).toString(2).padStart(5,"0").replaceAll("0", "a").replaceAll("1", "b"));
};
export const deBaconCipher = (c, index, text) => {
    //console.log(c, index, text);
    let baconBinary = text.replace(/[^ab]/g,"").replaceAll("a", "0").replaceAll("b", "1");
    //console.log(text.replace(/[^abAB]/g,""), baconBinary);
    let uindex = index+1 
    if(uindex % 5 !== 0) {
        return '';
    }
    let baconIndex = parseInt(baconBinary.slice(uindex-5, uindex), 2);
    //console.log(baconBinary, baconIndex);
    baconIndex = baconIndex >= 19 ? baconIndex+2 : baconIndex >= 8 ? baconIndex+1 : baconIndex;
    //console.log(baconIndex, alphabet[baconIndex]);
    return handleCipher(c, alphabet[baconIndex]);
}

const handleCipher = (c, value) => {
    if (alphabet.indexOf(c) === -1) {
        return c;
    }
    return value;
}