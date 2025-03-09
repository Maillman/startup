import { iCipherFunction, CipherFunction } from "./iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class CaesarCipher extends CipherFunction {
    static name = "Caesar Cipher";

    static encryptFunction(c, shift) {
        return this.caesarCipher(c, -shift);
    }

    static decryptFunction(c, shift) {
        return this.caesarCipher(c, shift);
    }
    
    static caesarCipher(c, shift) {
        shift = shift ? shift : 0;
        return this.handleCipher(c, this.alphabet[(this.alphabet.indexOf(c)+shift+this.alphabet.length)%this.alphabet.length]);
    };
}