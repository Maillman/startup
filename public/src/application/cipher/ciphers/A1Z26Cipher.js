import { CryptState } from "../core/cryptState";
import { iCipherFunction, CipherFunction } from "../core/iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class A1Z26Cipher extends CipherFunction {
  static name = "A1Z26 Cipher";

  static appliedFunction = (c, index, key) =>
    this.encryptFunction(c, index, "", "");

  static encryptFunction(c, index, text, delimiter) {
    let next_index = index[0] + 1;
    // console.log("A1Z26", c, index, text[next_index], next_index);
    let encipher = this.handleCipher(
      c,
      (this.alphabet.indexOf(c) + 1).toString()
    );
    if (
      next_index < text.length &&
      this.alphabet.indexOf(c) !== -1 &&
      this.alphabet.indexOf(text[next_index].toLowerCase()) !== -1
    ) {
      encipher += delimiter;
    }
    return encipher;
  }

  static decryptFunction(c, delimiter) {
    if (c == delimiter) {
      return "";
    }
    let findCharacter = this.alphabet[parseInt(c) - 1];
    if (this.alphabet.indexOf(findCharacter) === -1) {
      return c;
    }
    return findCharacter;
  }

  static applyFunction(text, delimiter, cryptState) {
    this.appliedFunction = (c, index, key) =>
      cryptState.equals(CryptState.Encrypted)
        ? this.encryptFunction(c, index, text, delimiter)
        : this.decryptFunction(c, delimiter);
  }
}
