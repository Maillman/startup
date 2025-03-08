export const alphabet = 'abcdefghijklmnopqrstuvwxyz';
/**
 * @interface CipherFunction
 */
export class CipherFunction {
    /**
     * the name of the cipher function
     * @type {string}
     */
    name;
    /**
     * The function in it's encryption state.
     * @param {string} c - The character to be transformed.
     * @param {array[number]} index - The index of the character in the input text. The first element is the current index,
     * the second element is the number of non-alphabetic characters removed.
     * @param {any} key - The key to use for the cipher function, if any.
     * @returns {string} - The transformed character.
     */
    encryptFunction(c, index, key) {}
    /**
 * The function in it's decryption state.
 * @param {string} c - The character to be transformed.
 * @param {array[number]} index - The index of the character in the input text. The first element is the current index,
 * the second element is the number of non-alphabetic characters removed.
 * @param {any} key - The key to use for the cipher function, if any.
 * @returns {string} - The transformed character.
 */
    decryptFunction(c, index, key) {}
}

/**
 * @implements CipherFunction
 */
export class ExampleCipher {
    name = "Example Cipher";
    encryptFunction(c) {
        // Your transformation logic here
        return c.toUpperCase(); // Example transformation
    }
    decryptFunction(c) {
        // Your transformation logic here
        return c.toLowerCase(); // Example transformation
    }
}