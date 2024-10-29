const alphabet = 'abcdefghijklmnopqrstuvwxyz';

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