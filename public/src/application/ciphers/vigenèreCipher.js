import { iCipherFunction, CipherFunction } from "./iCipher";
import { CaesarCipher } from "./caesarCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class VigenèreCipher extends CipherFunction {
    static name = "Vigenère Cipher";

    static encryptFunction(c, index, key) {
        return this.vigenèreCipher(c, index, key);
    }

    static decryptFunction(c, index, key) {
        return this.vigenèreCipher(c, index, key);
    }

    static vigenèreCipher(c, index, key) {
        // console.log("vigenere", c, index, key);
        let keyIndex = (index[0]-index[1]) % key.length;
        let shift = this.findShift(key[keyIndex]);
        return CaesarCipher.decryptFunction(c, 0-shift);
    }

    static findShift(key) {
        return this.alphabet.indexOf(key ? key.toLowerCase() : 0);
    };
}