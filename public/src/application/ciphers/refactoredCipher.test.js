import { ExampleCipher } from "./iCipher";
import { AffineCipher } from "./affineCipher";
import { CaesarCipher } from "./caesarCipher";
import { AtbashCipher } from "./atbashCipher";
import { BaconCipher } from "./baconCipher";
import { VigenèreCipher } from "./vigenèreCipher";
import { A1Z26Cipher } from "./A1Z26Cipher";

test('transforms character to uppercase', () => {
    expect(ExampleCipher.encryptFunction('a')).toBe('A');
    expect(ExampleCipher.encryptFunction('b')).toBe('B');
    expect(ExampleCipher.encryptFunction('c')).toBe('C');
});

test('transforms character to lowercase', () => {
    expect(ExampleCipher.decryptFunction('A')).toBe('a');
    expect(ExampleCipher.decryptFunction('B')).toBe('b');
    expect(ExampleCipher.decryptFunction('C')).toBe('c');
});

test('affine cipher encryption transforms characters', () => {
    // Simple shift
    expect(AffineCipher.encryptFunction('a', [1, 1])).toBe('b');
    expect(AffineCipher.encryptFunction('b', [1, 1])).toBe('c');
    expect(AffineCipher.encryptFunction('c', [1, 1])).toBe('d');
    // Should return the same character if a is not coprime with the alphabet length
    expect(AffineCipher.encryptFunction('a', [2, 1])).toBe('a');
    expect(AffineCipher.encryptFunction('b', [2, 1])).toBe('b');
    expect(AffineCipher.encryptFunction('c', [2, 1])).toBe('c');
    // Coprime Encryption
    expect(AffineCipher.encryptFunction('a', [3, 1])).toBe('b');
    expect(AffineCipher.encryptFunction('b', [3, 1])).toBe('e');
    expect(AffineCipher.encryptFunction('c', [3, 1])).toBe('h');
});

test('affine cipher decryption transforms characters', () => {
    // Simple shift
    expect(AffineCipher.decryptFunction('b', [1, 1])).toBe('a');
    expect(AffineCipher.decryptFunction('c', [1, 1])).toBe('b');
    expect(AffineCipher.decryptFunction('d', [1, 1])).toBe('c');
    // Should return the same character if a is not coprime with the alphabet length
    expect(AffineCipher.decryptFunction('a', [2, 1])).toBe('a');
    expect(AffineCipher.decryptFunction('b', [2, 1])).toBe('b');
    expect(AffineCipher.decryptFunction('c', [2, 1])).toBe('c');
    // Coprime Decryption
    expect(AffineCipher.decryptFunction('b', [3, 1])).toBe('a');
    expect(AffineCipher.decryptFunction('e', [3, 1])).toBe('b');
    expect(AffineCipher.decryptFunction('h', [3, 1])).toBe('c');
});

test('handles non-alphabetic characters', () => {
    expect(ExampleCipher.encryptFunction('1')).toBe('1');
    expect(ExampleCipher.encryptFunction('!')).toBe('!');
    expect(ExampleCipher.decryptFunction('@')).toBe('@');
    expect(CaesarCipher.encryptFunction('!', 1)).toBe('!');
    expect(CaesarCipher.decryptFunction('/', 5)).toBe('/');
    expect(AtbashCipher.encryptFunction(' ')).toBe(' ');
});

test('caesar cipher shifts characters', () => {
    //Shift Encryption
    expect(CaesarCipher.encryptFunction('b', 1)).toBe('a');
    expect(CaesarCipher.encryptFunction('d', 2)).toBe('b');
    expect(CaesarCipher.encryptFunction('f', 3)).toBe('c');
    expect(CaesarCipher.encryptFunction('a', 1)).toBe('z');
    //Shift Decryption
    expect(CaesarCipher.decryptFunction('a', 1)).toBe('b');
    expect(CaesarCipher.decryptFunction('b', 2)).toBe('d');
    expect(CaesarCipher.decryptFunction('c', 3)).toBe('f');
    expect(CaesarCipher.decryptFunction('z', 1)).toBe('a');
});

test('atbash cipher transforms characters', () => {
    expect(AtbashCipher.encryptFunction('a')).toBe('z');
    expect(AtbashCipher.encryptFunction('b')).toBe('y');
    expect(AtbashCipher.decryptFunction('c')).toBe('x');
    expect(AtbashCipher.decryptFunction('z')).toBe('a');
});

test('bacon cipher encryption transforms characters', () => {
    expect(BaconCipher.encryptFunction('a')).toBe('aaaaa');
    expect(BaconCipher.encryptFunction('b')).toBe('aaaab');
    expect(BaconCipher.encryptFunction('c')).toBe('aaaba');
    expect(BaconCipher.encryptFunction('i')).toBe('abaaa');
    expect(BaconCipher.encryptFunction('j')).toBe('abaaa');
    expect(BaconCipher.encryptFunction('u')).toBe('baabb');
    expect(BaconCipher.encryptFunction('v')).toBe('baabb');
    expect(BaconCipher.encryptFunction('z')).toBe('babbb');
});

test('bacon cipher decryption transforms characters', () => {
    expect(BaconCipher.decryptFunction('a', [4, 0], 'aaaaa')).toBe('a');
    expect(BaconCipher.decryptFunction('b', [4, 0], 'aaaab')).toBe('b');
    expect(BaconCipher.decryptFunction('a', [4, 0], 'aaaba')).toBe('c');
    expect(BaconCipher.decryptFunction('a', [4, 0], 'abaaa')).toBe('j');
    expect(BaconCipher.decryptFunction('b', [4, 0], 'abaab')).toBe('k');
    expect(BaconCipher.decryptFunction('b', [4, 0], 'baabb')).toBe('v');
    expect(BaconCipher.decryptFunction('a', [4, 0], 'babaa')).toBe('w');
    expect(BaconCipher.decryptFunction('b', [4, 0], 'babbb')).toBe('z');
});

test('bacon cipher decryption handles invalid characters', () => {
    expect(BaconCipher.decryptFunction('a', [0, 0], 'aaaaa')).toBe('');
    expect(BaconCipher.decryptFunction('a', [1, 0], 'aabaa')).toBe('');
    expect(BaconCipher.decryptFunction('a', [2, 0], 'babba')).toBe('');
    expect(BaconCipher.decryptFunction('b', [5, 0], 'aabbb')).toBe('');
});

test('bacon cipher decryption transforms further characters', () => {
    expect(BaconCipher.decryptFunction('a', [9, 0], 'aabbbaaaaa')).toBe('a');
    expect(BaconCipher.decryptFunction('b', [9, 0], 'aaaaaabaaa')).toBe('j');
    expect(BaconCipher.decryptFunction('b', [9, 0], 'aaaaabaabb')).toBe('v');
    expect(BaconCipher.decryptFunction('b', [9, 0], 'babbbbabbb')).toBe('z');
    expect(BaconCipher.decryptFunction('a', [14, 0], 'babbbbabbbaaaaa')).toBe('a');
    expect(BaconCipher.decryptFunction('a', [14, 0], 'aaaaaaaaaababbb')).toBe('z');
});

test('vigenère cipher shifts characters', () => {
    expect(VigenèreCipher.encryptFunction('a', [0, 0], 'a')).toBe('a');
    expect(VigenèreCipher.encryptFunction('a', [1, 0], 'a')).toBe('a');
    expect(VigenèreCipher.encryptFunction('c', [2, 0], 'key')).toBe('e');
    expect(VigenèreCipher.decryptFunction('z', [0, 0], 'b')).toBe('y');
    expect(VigenèreCipher.decryptFunction('z', [1, 0], 'ba')).toBe('z');
    expect(VigenèreCipher.decryptFunction('e', [4, 0], 'abcdefghi')).toBe('a');
});

test('A1Z26 cipher encryption transforms characters', () => {
    expect(A1Z26Cipher.encryptFunction('a', [0, 0], "a", "-")).toBe('1');
    expect(A1Z26Cipher.encryptFunction('b', [0, 0], "b", "-")).toBe('2');
    expect(A1Z26Cipher.encryptFunction('c', [0, 0], "c", "-")).toBe('3');
    expect(A1Z26Cipher.encryptFunction('z', [0, 0], "z", "-")).toBe('26');
});

test('A1Z26 cipher encryption transforms characters with delimiter', () => {
    expect(A1Z26Cipher.encryptFunction('a', [0, 0], "apple", ".")).toBe('1.');
    expect(A1Z26Cipher.encryptFunction('b', [0, 0], "bee", ".")).toBe('2.');
    expect(A1Z26Cipher.encryptFunction('c', [0, 0], "cat", ".")).toBe('3.');
    expect(A1Z26Cipher.encryptFunction('z', [0, 0], "zebra", ".")).toBe('26.');
});

test('A1Z26 cipher decryption transforms characters', () => {
    expect(A1Z26Cipher.decryptFunction('1', "-")).toBe('a');
    expect(A1Z26Cipher.decryptFunction('2', "-")).toBe('b');
    expect(A1Z26Cipher.decryptFunction('3', "-")).toBe('c');
    expect(A1Z26Cipher.decryptFunction('26', "-")).toBe('z');
    expect(A1Z26Cipher.decryptFunction('-', "-")).toBe('');
    expect(A1Z26Cipher.decryptFunction('.', "-")).toBe('.');
});