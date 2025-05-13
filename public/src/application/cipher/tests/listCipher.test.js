import { CaesarCipher } from "../ciphers/caesarCipher";
import { ListCipher } from "../core/listCipher";

const listCipher = new ListCipher();
test("assert dictionary has same number of ciphers as list", () => {
  const dictCiphers = listCipher.getCipherDictionary();
  const cipherNames = Object.keys(dictCiphers);
  //console.log(cipherNames);
  expect(cipherNames.length).toBe(listCipher.getNumberOfCiphers());
});

test("returns ciphers correctly", () => {
  expect(listCipher.getCipher("Caesar Cipher")).toBe(CaesarCipher);
  expect(listCipher.getCipher("Invalid Cipher")).toBe(undefined);
});

test("gets applied cipher correctly", () => {
  expect(listCipher.getAppliedCipher().name).toBe("Atbash Cipher");
});

test("sets applied cipher correctly", () => {
  expect(listCipher.getAppliedCipher().name).toBe("Atbash Cipher");
  listCipher.setAppliedCipher("Caesar Cipher");
  expect(listCipher.getAppliedCipher()).toBe(CaesarCipher);
  expect(listCipher.getAppliedCipher().name).toBe("Caesar Cipher");
});

test("returns categories correctly", () => {
    const alphabeticalCiphers = listCipher.getCiphersForCategory("Alphabetical Ciphers");
    const numericalCiphers = listCipher.getCiphersForCategory("Numerical Ciphers");
    //console.log(alphabeticalCiphers, numericalCiphers);
    expect(alphabeticalCiphers.length).toBeGreaterThan(0);
    expect(numericalCiphers.length).toBeGreaterThan(0);
});

test("gets all categories", () => {
  const allCategories = listCipher.getAllCategories();
  //console.log(allCategories);
  expect(allCategories.length).toBeGreaterThan(0);
  expect(allCategories).toContain("Alphabetical Ciphers");
});