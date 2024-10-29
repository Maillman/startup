const applyCipher = require('./applyCipher');
const { testCipher, caesarCipher } = require('./cipher');

test('transforms text to uppercase using testCipherFunction', () => {
    expect(applyCipher('input', testCipher)).toBe('INPUT');
});

test('transforms text using caesarCipher with a shift of 3', () => {
    const shift = 3;
    const caesarCipherWithShift = (index, c) => caesarCipher(index, c, shift);
    expect(applyCipher('ABC', caesarCipherWithShift)).toBe('DEF');
});

test('handles mixed characters using testCipherFunction', () => {
    expect(applyCipher('a1!b2@', testCipher)).toBe('A1!B2@');
});