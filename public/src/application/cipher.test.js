import { 
    testCipher,
    caesarCipher,
    baconCipher,
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

test('bacon cipher transforms characters', () => {
    expect(baconCipher('a')).toBe('aaaaa');
    expect(baconCipher('b')).toBe('aaaab');
    expect(baconCipher('c')).toBe('aaaba');
    expect(baconCipher('i')).toBe('abaaa');
    expect(baconCipher('j')).toBe('abaaa');
    expect(baconCipher('u')).toBe('baabb');
    expect(baconCipher('v')).toBe('baabb');
    expect(baconCipher('z')).toBe('babbb');
});