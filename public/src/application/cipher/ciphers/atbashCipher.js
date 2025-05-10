import { iCipherFunction, CipherFunction } from "../core/iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class AtbashCipher extends CipherFunction {
  static name = "Atbash Cipher";

  static category = "Alphabetical Ciphers";

  static appliedFunction = (c, index, key) => this.atbashCipher(c);

  static encryptFunction(c) {
    return this.atbashCipher(c);
  }

  static decryptFunction(c) {
    return this.atbashCipher(c);
  }

  static atbashCipher(c) {
    return this.handleCipher(
      c,
      this.alphabet[this.alphabet.length - (this.alphabet.indexOf(c) + 1)]
    );
  }

  static applyFunction(text, cryptState) {
    this.appliedFunction = (c, index, key) => this.atbashCipher(c);
  }
}
