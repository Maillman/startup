export class CryptState {
    static Unknown = new CryptState('Unknown');
    static Encrypted = new CryptState('Encrypted');
    static Decrypted = new CryptState('Decrypted');

    constructor(name) {
        this.name = name;
    }
}