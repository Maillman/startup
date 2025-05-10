import { CryptState } from "../core/cryptState";
import { iCipherFunction, CipherFunction } from "../core/iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class CaesarCipher extends CipherFunction {
  static name = "Caesar Cipher";

  static category = "Alphabetical Ciphers";

  static appliedFunction = (c, index, key) => this.encryptFunction(c, parseInt(key));

  static encryptFunction(c, shift) {
    return this.caesarCipher(c, -shift);
  }

  static decryptFunction(c, shift) {
    return this.caesarCipher(c, shift);
  }

  static caesarCipher(c, shift) {
    shift = shift ? shift : 0;
    return this.handleCipher(
      c,
      this.alphabet[
        (this.alphabet.indexOf(c) + shift + this.alphabet.length) %
          this.alphabet.length
      ]
    );
  }

  static applyFunction(text, cryptState) {
    this.appliedFunction = (c, index, key) =>
      cryptState.equals(CryptState.Encrypted)
        ? this.encryptFunction(c, parseInt(key))
        : this.decryptFunction(c, parseInt(key));
  };
}
