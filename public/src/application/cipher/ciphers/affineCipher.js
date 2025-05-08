import { CryptState } from "../core/cryptState";
import { iCipherFunction, CipherFunction } from "../core/iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */
export class AffineCipher extends CipherFunction {
  static name = "Affine Cipher";

  static category = "Alphabetical Ciphers";

  static appliedFunction = (c, index, key) => this.encryptFunction(c, [0, 0]);

  static encryptFunction(c, numbers) {
    //console.log(c, numbers);
    let a = numbers[0];
    let b = numbers[1];
    if (this.gcd(a, this.alphabet.length) !== 1) {
      // a is not coprime with b, simply return the character.
      return c;
    }
    let encipher =
      this.alphabet[(a * this.alphabet.indexOf(c) + b) % this.alphabet.length];
    return this.handleCipher(c, encipher);
  }

  static gcd(a, b) {
    if (b == 0) {
      return a;
    }
    return this.gcd(b, a % b);
  }

  static decryptFunction(c, numbers) {
    //console.log(c, numbers);
    let a = numbers[0];
    let b = numbers[1];
    let inv = this.modInverse(a, this.alphabet.length);
    if (inv == -1) {
      // a is not coprime with b, simply return the character.
      return c;
    }
    let decipher =
      this.alphabet[
        (inv * (this.alphabet.indexOf(c) - b + this.alphabet.length)) %
          this.alphabet.length
      ];
    return this.handleCipher(c, decipher);
  }

  static modInverse(a, m) {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m == 1) {
        return i;
      }
    }
    return -1;
  }

  static applyFunction(numbers, cryptState) {
    this.appliedFunction = (c, index, key) =>
      cryptState.equals(CryptState.Encrypted)
        ? this.encryptFunction(c, numbers)
        : this.decryptFunction(c, numbers);
  }
}
