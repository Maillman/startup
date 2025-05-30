import { A1Z26Cipher } from "../ciphers/A1Z26Cipher";
import { AffineCipher } from "../ciphers/affineCipher";
import { AtbashCipher } from "../ciphers/atbashCipher";
import { BaconCipher } from "../ciphers/baconCipher";
import { CaesarCipher } from "../ciphers/caesarCipher";
import { VigenèreCipher } from "../ciphers/vigenèreCipher";

export class ListCipher {
  constructor() {
    this.listCiphers = [
      A1Z26Cipher,
      AffineCipher,
      AtbashCipher,
      BaconCipher,
      CaesarCipher,
      VigenèreCipher,
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

  setAndApplyCipher(nameCipher, text, cryptState) {
    this.setAppliedCipher(nameCipher);
    this.appliedCipher.applyFunction(text, cryptState);
  }

  getCiphersForCategory(category) {
    return this.categoricalDictionary[category];
  }

  getAllCategories() {
    return Object.keys(this.categoricalDictionary);
  }

  getCipherDictionary() {
    return this.cipherDictionary;
  }

  getAllCiphers() {
    return Object.values(this.cipherDictionary);
  }

  getNumberOfCiphers() {
    return this.listCiphers.length;
  }
}
