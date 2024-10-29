const { testCipher, caesarCipher } = require('./cipher.js');

test('transforms character to uppercase', () => {
    expect(testCipher(0, 'a')).toBe('A');
    expect(testCipher(1, 'b')).toBe('B');
    expect(testCipher(2, 'c')).toBe('C');
});

test('handles non-alphabetic characters', () => {
    expect(testCipher(0, '1')).toBe('1');
    expect(testCipher(1, '!')).toBe('!');
});

test('caesar cipher shifts characters', () => {
    expect(caesarCipher(0, 'a', 1)).toBe('b');
    expect(caesarCipher(1, 'b', 2)).toBe('d');
    expect(caesarCipher(2, 'c', 3)).toBe('f');
    expect(caesarCipher(25, 'z', 1)).toBe('a');
});