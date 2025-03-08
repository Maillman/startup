import { CipherFunction } from "./cipher";

/**
 * @implements {CipherFunction}
 */
export class AffineCipher {
    name = "Affine Cipher";
    encryptFunction(c, numbers) {
        let a = numbers[0];
        let b = numbers[1];
        if(gcd(a, alphabet.length) !== 1) {
            // a is not coprime with b, simply return the character.
            return c;
        }
        let encipher = alphabet[(a*(alphabet.indexOf(c))+b)%alphabet.length];
        return handleCipher(c, encipher);
    };
    decryptFunction(c, numbers) {
        let a = numbers[0];
        let b = numbers[1];
        let inv = modInverse(a, alphabet.length);
        if(inv == -1) {
            // a is not coprime with b, simply return the character.
            return c;
        }
        let decipher = alphabet[(modInverse(a, alphabet.length)*(alphabet.indexOf(c)-b+alphabet.length))%alphabet.length];
        return handleCipher(c, decipher);
    };
}