/**
 * A Cipher function interface for any cipher function to implement.
 * Any cipher function must have a name, an encryptFunction, and a
 * decryptFunction. Note the `static` keywords that must be applied
 * to all the fields in the interface that must be implemented. Any
 * helper methods to any cipher function must also be `static`.
 * @interface CipherFunction
 */
export class iCipherFunction {
    /**
     * the name of the cipher function
     * @type {string}
     */
    static name;

    /**
     * The function in it's encryption state.
     * @param {string} c - The character to be transformed.
     * @param {array[number]} index - The index of the character in the input text. The first element is the current index,
     * the second element is the number of non-alphabetic characters removed.
     * @param {any} key - The key to use for the cipher function, if any.
     * @returns {string} - The transformed character.
     */
    static encryptFunction(c, index, key) {}

    /**
     * The function in it's decryption state.
     * @param {string} c - The character to be transformed.
     * @param {array[number]} index - The index of the character in the input text. The first element is the current index,
     * the second element is the number of non-alphabetic characters removed.
     * @param {any} key - The key to use for the cipher function, if any.
     * @returns {string} - The transformed character.
     */
    static decryptFunction(c, index, key) {}
}

/**
 * A base cipher function class that implements the iCipherFunction interface.
 * Contains the `alphabet` string and the `handleCipher` method.
 * @implements {iCipherFunction}
 */
export class CipherFunction {
    static alphabet = 'abcdefghijklmnopqrstuvwxyz';
    
    static handleCipher(c, value) {
        if (this.alphabet.indexOf(c) === -1) {
            return c;
        }
        return value;
    };
}

/**
 * @implements {iCipherFunction}
 */
export class ExampleCipher {
    static name = "Example Cipher";

    static encryptFunction(c) {
        // Your transformation logic here
        return c.toUpperCase(); // Example transformation
    }

    static decryptFunction(c) {
        // Your transformation logic here
        return c.toLowerCase(); // Example transformation
    }
}