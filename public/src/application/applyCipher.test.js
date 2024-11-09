import applyCipher from './applyCipher';
import { testCipher, caesarCipher, deBaconCipher } from './cipher';

test('transforms text to uppercase using testCipherFunction', () => {
    expect(applyCipher('input', testCipher)).toBe('INPUT');
});

test('transforms text using caesarCipher with a shift of 3', () => {
    const shift = 3;
    const caesarCipherWithShift = (c) => caesarCipher(c, shift);
    expect(applyCipher('ABC', caesarCipherWithShift)).toBe('DEF');
});

test('handles mixed characters using testCipherFunction', () => {
    expect(applyCipher('a1!b2@', testCipher)).toBe('A1!B2@');
});

test('transforms bacon cipher text to plaintext', () => {
    let baconTextTest = ['aaaaa','aaaabaaaaaaaaaa', 'ABAAA... aaaaaababb baaabbaabaaabaabaabbaabaa!', 'a!a!a!a!a -> b!a!b!b!b'];
    let expectedText = ['a','baa', 'J... am steve!', 'a -> z'];
    for(let i = 0; i < baconTextTest.length; i++) {
        console.log(baconTextTest[i] + ' -> ' + expectedText[i]);
        expect(applyCipher(baconTextTest[i], (c, index) => deBaconCipher(c, index, baconTextTest[i].toLowerCase()))).toBe(expectedText[i]);
    }
    
});