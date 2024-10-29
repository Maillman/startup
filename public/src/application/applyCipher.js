/**
 * Applies the cipher function to each character in the input text.
 * @param {string} text - The input text to be transformed.
 * @param {CipherFunction} cipherFunction - The cipher function to apply.
 * @returns {string} - The transformed text.
 */
const applyCipher = (text, cipherFunction) => {
    return text.split('').map((char, index) => {
        const isUpperCase = char === char.toUpperCase();
        const transformedChar = cipherFunction(index, char)
        return isUpperCase ? transformedChar.toUpperCase() : transformedChar;
    }).join('');
};

export default applyCipher;


/*
import {alphabet} from './cipher.js';

export function applyCipher(input, result, cipher, original) {
    cipherText = splitAlphabeticText(input);
    for (let c of cipherText) {
        index = alphabet.indexOf(result);
        if (index !== -1) {
            og = original.apply(index, c);
            transformed = cipher.apply(index, c);
            //index++;
        }else{
            transformed = c;
        }
        result.append(transformed);
    }
}

function splitAlphabeticText(input){
    return input.toLowerCase().split('');
}
*/