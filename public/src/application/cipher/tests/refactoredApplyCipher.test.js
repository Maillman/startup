import { CryptState } from "../core/cryptState";
import { AffineCipher } from "../ciphers/affineCipher";
import { BaconCipher } from "../ciphers/baconCipher";
import { CaesarCipher } from "../ciphers/caesarCipher";
import applyCipher from "../core/applyCipher";
import { ExampleCipher } from "../core/iCipher";

// test('transforms text to uppercase using testCipherFunction', () => {
//     expect(applyCipher('input', ExampleCipher)).toBe('INPUT');
// });

test("transforms text using caesarCipher with a shift of 3", () => {
  const shift = 3;
  CaesarCipher.applyFunction(shift, CryptState.Decrypted);
  expect(applyCipher("ABC", CaesarCipher)).toBe("DEF");
});

test("handles mixed characters using testCipherFunction", () => {
  expect(applyCipher("a1!b2@", ExampleCipher)).toBe("A1!B2@");
});

test("transforms bacon cipher text to plaintext", () => {
  let baconTextTest = [
    "aaaaa",
    "aaaabaaaaaaaaaa",
    "ABAAA... aaaaaababb baaabbaabaaabaabaabbaabaa!",
    "a!a!a!a!a -> b!a!b!b!b",
  ];
  let expectedText = ["a", "baa", "J... am steve!", "a -> z"];
  for (let i = 0; i < baconTextTest.length; i++) {
    // console.log(baconTextTest[i] + ' -> ' + expectedText[i]);
    BaconCipher.applyFunction(baconTextTest[i], CryptState.Decrypted);
    expect(applyCipher(baconTextTest[i], BaconCipher)).toBe(expectedText[i]);
  }
});

test('transforms affine cipher text to plaintext', () => {
    const numbers = [15, 6];
    AffineCipher.applyFunction(numbers, CryptState.Encrypted);
    expect(applyCipher('A linear equation is used.', AffineCipher)).toBe('G pwtogb omugfwit wq uqoz.')
    AffineCipher.applyFunction(numbers, CryptState.Decrypted);
    expect(applyCipher('G pwtogb omugfwit wq uqoz.', AffineCipher)).toBe('A linear equation is used.')
});

// test('transforms A1Z26 cipher text to plaintext', () => {
//     const delimiter = '-';
//     const deA1Z26CipherWithDelimiter = (c) => deA1Z26Cipher(c, delimiter);
//     expect(applyCipher('1 2 3 4 5', deA1Z26CipherWithDelimiter)).toBe('A B C D E');
//     expect(applyCipher('1-2-3-4-5', deA1Z26CipherWithDelimiter)).toBe('ABCDE');
//     expect(applyCipher('5-14-3-18-25-16-20-5-4 20-5-24-20', deA1Z26CipherWithDelimiter)).toBe('ENCRYPTED TEXT');
//     expect(applyCipher('5-14-3-18-25-16-20-5\'4 20-5-24-20.', deA1Z26CipherWithDelimiter)).toBe('ENCRYPTE\'D TEXT.');
// });

// test('transforms plaintext to A1Z26 cipher text', () => {
//     const delimiter = '-';
//     let A1Z26TextTest = ['A B C D E', 'ABCDE', 'ENCRYPTED TEXT', 'ENCRYPTE\'D TEXT.'];
//     let expectedText = ['1 2 3 4 5', '1-2-3-4-5', '5-14-3-18-25-16-20-5-4 20-5-24-20', '5-14-3-18-25-16-20-5\'4 20-5-24-20.'];
//     for(let i = 0; i < A1Z26TextTest.length; i++) {
//         // console.log(A1Z26TextTest[i] + ' -> ' + expectedText[i]);
//         expect(applyCipher(A1Z26TextTest[i], (c, index) => enA1Z26Cipher(c, index, A1Z26TextTest[i], delimiter))).toBe(expectedText[i]);
//     }
// });
