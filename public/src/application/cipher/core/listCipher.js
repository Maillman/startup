import { A1Z26Cipher } from "../ciphers/A1Z26Cipher";
import { AffineCipher } from "../ciphers/affineCipher";
import { AtbashCipher } from "../ciphers/atbashCipher";
import { BaconCipher } from "../ciphers/baconCipher";
import { CaesarCipher } from "../ciphers/caesarCipher";
import { VigenèreCipher } from "../ciphers/vigenèreCipher";
import { ExampleCipher } from "./iCipher";

export class ListCipher {
  constructor() {
    this.listCiphers = [
      A1Z26Cipher,
      AffineCipher,
      AtbashCipher,
      BaconCipher,
      CaesarCipher,
      VigenèreCipher,
      ExampleCipher,
      // Add more ciphers here...
    ];

    this.appliedCipher = AtbashCipher;

    this.cipherDictionary = {};

    this.categoricalDictionary = {};

    this.listCiphers.forEach((cipher) => {
      this.cipherDictionary[cipher.name] = cipher;
      let category = this.categoricalDictionary[cipher.category];
      if(category===undefined) category = [];
      category.push(cipher);
      this.categoricalDictionary[cipher.category] = category;
    });
  }

  getCipher(nameCipher) {
    return this.cipherDictionary[nameCipher];
  }

  getAppliedCipher() {
    return this.appliedCipher;
  }

  setAppliedCipher(nameCipher) {
    let selectedCipher = this.cipherDictionary[nameCipher];
    if (selectedCipher === undefined) {
      throw new Error("Cipher not found in list, please check your spelling");
    }
    this.appliedCipher = selectedCipher;
  }

  getCiphersForCategory(category) {
    return this.categoricalDictionary[category];
  }

  getAllCiphers() {
    return this.cipherDictionary;
  }

  getNumberOfCiphers() {
    return this.listCiphers.length;
  }
}
