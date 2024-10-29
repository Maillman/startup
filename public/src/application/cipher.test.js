const { testCipher, caesarCipher } = './cipher.js';

test('transforms character to uppercase', () => {
    expect(testCipher('a')).toBe('A');
    expect(testCipher('b')).toBe('B');
    expect(testCipher('c')).toBe('C');
});

test('handles non-alphabetic characters', () => {
    expect(testCipher('1')).toBe('1');
    expect(testCipher('!')).toBe('!');
});

test('caesar cipher shifts characters', () => {
    expect(caesarCipher('a', 1)).toBe('b');
    expect(caesarCipher('b', 2)).toBe('d');
    expect(caesarCipher('c', 3)).toBe('f');
    expect(caesarCipher('z', 1)).toBe('a');
});