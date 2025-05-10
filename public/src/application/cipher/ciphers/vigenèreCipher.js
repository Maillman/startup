import { CryptState } from "../core/cryptState";
import { iCipherFunction, CipherFunction } from "../core/iCipher";
import { CaesarCipher } from "./caesarCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class VigenèreCipher extends CipherFunction {
  static name = "Vigenère Cipher";

  static category = "Alphabetical Ciphers";

  static appliedFunction = (c, index, key) =>
    this.encryptFunction(c, index, key);

  static encryptFunction(c, index, key) {
    return this.vigenèreCipher(c, index, key);
  }

  static decryptFunction(c, index, key) {
    return this.vigenèreCipher(c, index, key);
  }

  static vigenèreCipher(c, index, key) {
    // console.log("vigenere", c, index, key);
    let keyIndex = (index[0] - index[1]) % key.length;
    let shift = this.findShift(key[keyIndex]);
    return CaesarCipher.decryptFunction(c, 0 - shift);
  }

  static findShift(key) {
    return this.alphabet.indexOf(key ? key.toLowerCase() : 0);
  }

  static applyFunction(text, cryptState) {
    this.appliedFunction = (c, index, key) =>
      cryptState.equals(CryptState.Encrypted)
        ? this.encryptFunction(c, index, key.toLowerCase())
        : this.decryptFunction(
            c,
            index,
            key
              .toLowerCase()
              .split("")
              .map(
                (char) =>
                  this.alphabet[
                    -1 * this.alphabet.indexOf(char) + this.alphabet.length
                  ]
              )
              .join("")
          );
  }
}
