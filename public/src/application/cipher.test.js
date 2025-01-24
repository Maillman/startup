import { 
    testCipher,
    caesarCipher,
    enBaconCipher,
    deBaconCipher,
    enAffineCipher,
    deAffineCipher,
    enA1Z26Cipher,
    deA1Z26Cipher,
    atbashCipher,
    vigenèreCipher } from './cipher';

test('transforms character to uppercase', () => {
    expect(testCipher('a')).toBe('A');
    expect(testCipher('b')).toBe('B');
    expect(testCipher('c')).toBe('C');
});

test('handles non-alphabetic characters', () => {
    expect(testCipher('1')).toBe('1');
    expect(testCipher('!')).toBe('!');
    expect(testCipher('@')).toBe('@');
    expect(caesarCipher('!', 1)).toBe('!');
    expect(caesarCipher('/', 5)).toBe('/');
    expect(atbashCipher(' ')).toBe(' ');
});

test('caesar cipher shifts characters', () => {
    expect(caesarCipher('a', 1)).toBe('b');
    expect(caesarCipher('b', 2)).toBe('d');
    expect(caesarCipher('c', 3)).toBe('f');
    expect(caesarCipher('z', 1)).toBe('a');
});

test('atbash cipher transforms characters', () => {
    expect(atbashCipher('a')).toBe('z');
    expect(atbashCipher('b')).toBe('y');
    expect(atbashCipher('c')).toBe('x');
    expect(atbashCipher('z')).toBe('a');
});

test('vigenère cipher shifts characters', () => {
    expect(vigenèreCipher('a', [0, 0], 'a')).toBe('a');
    expect(vigenèreCipher('a', [1, 0], 'a')).toBe('a');
    expect(vigenèreCipher('c', [2, 0], 'key')).toBe('e');
    expect(vigenèreCipher('z', [0, 0], 'b')).toBe('y');
    expect(vigenèreCipher('z', [1, 0], 'ba')).toBe('z');
    expect(vigenèreCipher('e', [4, 0], 'abcdefghi')).toBe('a');
});

test('enbacon cipher transforms characters', () => {
    expect(enBaconCipher('a')).toBe('aaaaa');
    expect(enBaconCipher('b')).toBe('aaaab');
    expect(enBaconCipher('c')).toBe('aaaba');
    expect(enBaconCipher('i')).toBe('abaaa');
    expect(enBaconCipher('j')).toBe('abaaa');
    expect(enBaconCipher('u')).toBe('baabb');
    expect(enBaconCipher('v')).toBe('baabb');
    expect(enBaconCipher('z')).toBe('babbb');
});

test('debacon cipher transforms characters', () => {
    expect(deBaconCipher('a', [4, 0], 'aaaaa')).toBe('a');
    expect(deBaconCipher('b', [4, 0], 'aaaab')).toBe('b');
    expect(deBaconCipher('a', [4, 0], 'aaaba')).toBe('c');
    expect(deBaconCipher('a', [4, 0], 'abaaa')).toBe('j');
    expect(deBaconCipher('b', [4, 0], 'abaab')).toBe('k');
    expect(deBaconCipher('b', [4, 0], 'baabb')).toBe('v');
    expect(deBaconCipher('a', [4, 0], 'babaa')).toBe('w');
    expect(deBaconCipher('b', [4, 0], 'babbb')).toBe('z');
});

test('debacon cipher handles invalid characters', () => {
    expect(deBaconCipher('a', [0, 0], 'aaaaa')).toBe('');
    expect(deBaconCipher('a', [1, 0], 'aabaa')).toBe('');
    expect(deBaconCipher('a', [2, 0], 'babba')).toBe('');
    expect(deBaconCipher('b', [5, 0], 'aabbb')).toBe('');
});

test('debacon cipher transforms further characters', () => {
    expect(deBaconCipher('a', [9, 0], 'aabbbaaaaa')).toBe('a');
    expect(deBaconCipher('b', [9, 0], 'aaaaaabaaa')).toBe('j');
    expect(deBaconCipher('b', [9, 0], 'aaaaabaabb')).toBe('v');
    expect(deBaconCipher('b', [9, 0], 'babbbbabbb')).toBe('z');
    expect(deBaconCipher('a', [14, 0], 'babbbbabbbaaaaa')).toBe('a');
    expect(deBaconCipher('a', [14, 0], 'aaaaaaaaaababbb')).toBe('z');
});

test('enaffine cipher transforms characters', () => {
    // Simple shift
    expect(enAffineCipher('a', [1, 1])).toBe('b');
    expect(enAffineCipher('b', [1, 1])).toBe('c');
    expect(enAffineCipher('c', [1, 1])).toBe('d');
    // Should return the same character if a is not coprime with the alphabet length
    expect(enAffineCipher('a', [2, 1])).toBe('a');
    expect(enAffineCipher('b', [2, 1])).toBe('b');
    expect(enAffineCipher('c', [2, 1])).toBe('c');
    // Coprime Encipher
    expect(enAffineCipher('a', [3, 1])).toBe('b');
    expect(enAffineCipher('b', [3, 1])).toBe('e');
    expect(enAffineCipher('c', [3, 1])).toBe('h');
});

test('deaffine cipher transforms characters', () => {
    // Simple shift
    expect(deAffineCipher('b', [1, 1])).toBe('a');
    expect(deAffineCipher('c', [1, 1])).toBe('b');
    expect(deAffineCipher('d', [1, 1])).toBe('c');
    // Should return the same character if a is not coprime with the alphabet length
    expect(deAffineCipher('a', [2, 1])).toBe('a');
    expect(deAffineCipher('b', [2, 1])).toBe('b');
    expect(deAffineCipher('c', [2, 1])).toBe('c');
    // Coprime Decipher
    expect(deAffineCipher('b', [3, 1])).toBe('a');
    expect(deAffineCipher('e', [3, 1])).toBe('b');
    expect(deAffineCipher('h', [3, 1])).toBe('c');
});

test('enA1Z26 cipher transforms characters', () => {
    expect(enA1Z26Cipher('a', [0, 0], "a", "-")).toBe('1');
    expect(enA1Z26Cipher('b', [0, 0], "b", "-")).toBe('2');
    expect(enA1Z26Cipher('c', [0, 0], "c", "-")).toBe('3');
    expect(enA1Z26Cipher('z', [0, 0], "z", "-")).toBe('26');
});

test('enA1Z26 cipher transforms characters with delimiter', () => {
    expect(enA1Z26Cipher('a', [0, 0], "apple", ".")).toBe('1.');
    expect(enA1Z26Cipher('b', [0, 0], "bee", ".")).toBe('2.');
    expect(enA1Z26Cipher('c', [0, 0], "cat", ".")).toBe('3.');
    expect(enA1Z26Cipher('z', [0, 0], "zebra", ".")).toBe('26.');
});

test('deA1Z26 cipher transforms characters', () => {
    expect(deA1Z26Cipher('1', "-")).toBe('a');
    expect(deA1Z26Cipher('2', "-")).toBe('b');
    expect(deA1Z26Cipher('3', "-")).toBe('c');
    expect(deA1Z26Cipher('26', "-")).toBe('z');
    expect(deA1Z26Cipher('-', "-")).toBe('');
    expect(deA1Z26Cipher('.', "-")).toBe('.');
});