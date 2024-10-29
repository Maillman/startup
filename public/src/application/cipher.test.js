const testCipherFunction = require('./cipher'); // Adjust the path as needed

test('transforms character to uppercase', () => {
    expect(testCipherFunction(0, 'a')).toBe('A');
    expect(testCipherFunction(1, 'b')).toBe('B');
    expect(testCipherFunction(2, 'c')).toBe('C');
});

test('handles non-alphabetic characters', () => {
    expect(testCipherFunction(0, '1')).toBe('1');
    expect(testCipherFunction(1, '!')).toBe('!');
});