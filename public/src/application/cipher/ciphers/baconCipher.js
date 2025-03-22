import { CryptState } from "../core/cryptState";
import { iCipherFunction, CipherFunction } from "../core/iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class BaconCipher extends CipherFunction {
  static name = "Bacon Cipher";

  static appliedFunction = (c, index, key) => this.encryptFunction(c);

  static encryptFunction(c) {
    let baconIndex = this.alphabet.indexOf(c);
    baconIndex =
      baconIndex >= 21
        ? baconIndex - 2
        : baconIndex >= 9
        ? baconIndex - 1
        : baconIndex;
    return this.handleCipher(
      c,
      (baconIndex >>> 0)
        .toString(2)
        .padStart(5, "0")
        .replaceAll("0", "a")
        .replaceAll("1", "b")
    );
  }

  static decryptFunction(c, index, text) {
    //console.log("bacon", c, index, text);
    let baconBinary = text
      .replace(/[^ab]/g, "")
      .replaceAll("a", "0")
      .replaceAll("b", "1");
    //console.log(text.replace(/[^abAB]/g,""), baconBinary);
    let uindex = index[0] - index[1] + 1;
    if (uindex % 5 !== 0) {
      return "";
    }
    let baconIndex = parseInt(baconBinary.slice(uindex - 5, uindex), 2);
    //console.log(baconBinary, baconIndex);
    baconIndex =
      baconIndex >= 19
        ? baconIndex + 2
        : baconIndex >= 8
        ? baconIndex + 1
        : baconIndex;
    //console.log(baconIndex, this.alphabet[baconIndex]);
    return this.handleCipher(c, this.alphabet[baconIndex]);
  }

  static applyFunction = (text, cryptState) => {
    this.appliedFunction = (c, index, key) =>
      cryptState.equals(CryptState.Encrypted)
        ? this.encryptFunction(c)
        : this.decryptFunction(c, index, text.toLowerCase());
  };
}
