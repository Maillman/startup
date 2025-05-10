import { CryptState } from "./cryptState"; //TODO: Switch this to -> import { CryptState } from "../core/cryptState";
import { iCipherFunction, CipherFunction } from "./iCipher";

/**
 * @extends {CipherFunction}
 * @implements {iCipherFunction}
 */ //TODO: change class name here!
export class TemplateCipher extends CipherFunction {
    static name = "Template Cipher"; //TODO: change name here!

    static category = "Example Ciphers"; //TODO: change category here!

    //TODO Change default state as needed! 
    static appliedFunction = (c, index, key) => this.encryptFunction(c);

    static encryptFunction() {
        //TODO: implement code here!
    }

    static decryptFunction() {
        //TODO: implement code here!
    }

    //TODO: add parameters as needed!
    static applyFunction(text, cryptState){
        this.appliedFunction = (c, index, key) => cryptState.equals(CryptState.Encrypted) ? this.encryptFunction() : this.decryptFunction();
    }
}