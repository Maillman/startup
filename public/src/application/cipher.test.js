import { 
    testCipher,
    caesarCipher,
    enBaconCipher,
    deBaconCipher,
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

test('viègenere cipher shifts characters', () => {
    expect(vigenèreCipher('a', 0, 'a')).toBe('a');
    expect(vigenèreCipher('a', 1, 'a')).toBe('a');
    expect(vigenèreCipher('c', 2, 'key')).toBe('e');
    expect(vigenèreCipher('z', 0, 'b')).toBe('y');
    expect(vigenèreCipher('z', 1, 'ba')).toBe('z');
    expect(vigenèreCipher('e', 4, 'abcdefghi')).toBe('a');
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
    expect(deBaconCipher('a', 4, 'aaaaa')).toBe('a');
    expect(deBaconCipher('b', 4, 'aaaab')).toBe('b');
    expect(deBaconCipher('a', 4, 'aaaba')).toBe('c');
    expect(deBaconCipher('a', 4, 'abaaa')).toBe('j');
    expect(deBaconCipher('b', 4, 'abaab')).toBe('k');
    expect(deBaconCipher('b', 4, 'baabb')).toBe('v');
    expect(deBaconCipher('a', 4, 'babaa')).toBe('w');
    expect(deBaconCipher('b', 4, 'babbb')).toBe('z');
});

test('debacon cipher handles invalid characters', () => {
    expect(deBaconCipher('a', 0, 'aaaaa')).toBe('');
    expect(deBaconCipher('a', 1, 'aabaa')).toBe('');
    expect(deBaconCipher('a', 2, 'babba')).toBe('');
    expect(deBaconCipher('b', 5, 'aabbb')).toBe('');
});

test('debacon cipher transforms further characters', () => {
    expect(deBaconCipher('a', 9, 'aabbbaaaaa')).toBe('a');
    expect(deBaconCipher('b', 9, 'aaaaaabaaa')).toBe('j');
    expect(deBaconCipher('b', 9, 'aaaaabaabb')).toBe('v');
    expect(deBaconCipher('b', 9, 'babbbbabbb')).toBe('z');
    expect(deBaconCipher('a', 14, 'babbbbabbbaaaaa')).toBe('a');
    expect(deBaconCipher('a', 14, 'aaaaaaaaaababbb')).toBe('z');
});