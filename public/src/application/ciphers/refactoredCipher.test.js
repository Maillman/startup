import { ExampleCipher } from "./iCipher";
import { AffineCipher } from "./affineCipher";
import { CaesarCipher } from "./caesarCipher";

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
    //expect(atbashCipher(' ')).toBe(' ');
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