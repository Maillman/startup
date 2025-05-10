import applyCipher from "../core/applyCipher";
import { CryptState } from "../core/cryptState";
import { AffineCipher } from "../ciphers/affineCipher";
import { BaconCipher } from "../ciphers/baconCipher";
import { CaesarCipher } from "../ciphers/caesarCipher";
import { ExampleCipher } from "../core/iCipher";
import { AtbashCipher } from "../ciphers/atbashCipher";
import { VigenèreCipher } from "../ciphers/vigenèreCipher";
import { A1Z26Cipher } from "../ciphers/A1Z26Cipher";

test('transforms text to uppercase using ExampleCipher', () => {
    expect(applyCipher('input', ExampleCipher)).toBe('INPUT');
});

test("transforms text using caesarCipher with a shift of 3 both ways", () => {
  const shift = 3;
  expect(applyCipher("DEF", CaesarCipher, shift)).toBe("ABC");
  CaesarCipher.applyFunction(CryptState.Decrypted);
  expect(applyCipher("ABC", CaesarCipher, shift)).toBe("DEF");
});

test("handles mixed characters using ExampleCipher", () => {
  expect(applyCipher("a1!b2@", ExampleCipher)).toBe("A1!B2@");
});

test("transforms plaintext to atbash cipher text", () => {
  expect(applyCipher("Letters should be flipped!", AtbashCipher)).toBe("Ovggvih hslfow yv uorkkvw!");
});

test("transforms plaintext to vigenère cipher text", () => {
  expect(applyCipher("keykeykeykey", VigenèreCipher, "key")).toBe("aaaaaaaaaaaa");
});

test("transforms vigenère cipher text to plaintext", () => {
  VigenèreCipher.applyFunction(CryptState.Decrypted);
  expect(applyCipher("aaaaaaaaaaaa", VigenèreCipher, "key")).toBe("keykeykeykey");
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
    AffineCipher.applyFunction(CryptState.Encrypted);
    expect(applyCipher('A linear equation is used.', AffineCipher, '15,6')).toBe('G pwtogb omugfwit wq uqoz.')
    AffineCipher.applyFunction(CryptState.Decrypted);
    expect(applyCipher('G pwtogb omugfwit wq uqoz.', AffineCipher, '15,6')).toBe('A linear equation is used.')
});

test('transforms A1Z26 cipher text to plaintext', () => {
    const delimiter = '-';
    A1Z26Cipher.applyFunction("", CryptState.Decrypted);
    expect(applyCipher('1 2 3 4 5', A1Z26Cipher, '-')).toBe('A B C D E');
    expect(applyCipher('1-2-3-4-5', A1Z26Cipher, '-')).toBe('ABCDE');
    expect(applyCipher('5-14-3-18-25-16-20-5-4 20-5-24-20', A1Z26Cipher, delimiter)).toBe('ENCRYPTED TEXT');
    expect(applyCipher('5-14-3-18-25-16-20-5\'4 20-5-24-20.', A1Z26Cipher, delimiter)).toBe('ENCRYPTE\'D TEXT.');
});

test('transforms plaintext to A1Z26 cipher text', () => {
    const delimiter = '-';
    let A1Z26TextTest = ['A B C D E', 'ABCDE', 'ENCRYPTED TEXT', 'ENCRYPTE\'D TEXT.'];
    let expectedText = ['1 2 3 4 5', '1-2-3-4-5', '5-14-3-18-25-16-20-5-4 20-5-24-20', '5-14-3-18-25-16-20-5\'4 20-5-24-20.'];
    for(let i = 0; i < A1Z26TextTest.length; i++) {
        // console.log(A1Z26TextTest[i] + ' -> ' + expectedText[i]);
        A1Z26Cipher.applyFunction(A1Z26TextTest[i], CryptState.Encrypted);
        expect(applyCipher(A1Z26TextTest[i], A1Z26Cipher, delimiter)).toBe(expectedText[i]);
    }
});
