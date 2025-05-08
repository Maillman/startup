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

    this.cipherDictionary = {};

    this.listCiphers.forEach((item) => {
      this.cipherDictionary[item.name] = item;
    });
  }

  getCipher(nameCipher) {
    return this.cipherDictionary[nameCipher];
  }

  getAllCiphers() {
    return this.cipherDictionary;
  }

  getNumberOfCiphers() {
    return this.listCiphers.length;
  }
}
