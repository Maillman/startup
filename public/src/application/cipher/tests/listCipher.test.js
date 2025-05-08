import { ExampleCipher } from "../core/iCipher";
import { ListCipher } from "../core/listCipher";

const listCipher = new ListCipher();
test("assert dictionary has same number of ciphers as list", () => {
  const dictCiphers = listCipher.getAllCiphers();
  const cipherNames = Object.keys(dictCiphers);
  //console.log(cipherNames);
  expect(cipherNames.length).toBe(listCipher.getNumberOfCiphers());
});

test("returns ciphers correctly", () => {
  expect(listCipher.getCipher("Example Cipher")).toBe(ExampleCipher);
  expect(listCipher.getCipher("Invalid Cipher")).toBe(undefined);
});

test("gets applied cipher correctly", () => {
  expect(listCipher.getAppliedCipher().name).toBe("Atbash Cipher");
});

test("sets applied cipher correctly", () => {
  expect(listCipher.getAppliedCipher().name).toBe("Atbash Cipher");
  listCipher.setAppliedCipher("Example Cipher");
  expect(listCipher.getAppliedCipher()).toBe(ExampleCipher);
  expect(listCipher.getAppliedCipher().name).toBe("Example Cipher");
});
