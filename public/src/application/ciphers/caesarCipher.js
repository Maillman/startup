import { CipherFunction, alphabet, handleCipher } from "./iCipher";

/**
 * @implements {CipherFunction}
 */
export class CaesarCipher {
    static name = "Caesar Cipher";

    static encryptFunction(c, shift) {
        return this.caesarCipher(c, -shift);
    }

    static decryptFunction(c, shift) {
        return this.caesarCipher(c, shift);
    }
    
    static caesarCipher(c, shift) {
        shift = shift ? shift : 0;
        return handleCipher(c, alphabet[(alphabet.indexOf(c)+shift+alphabet.length)%alphabet.length]);
    };
}