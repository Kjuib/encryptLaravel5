const crypto = require('crypto');
const encryptLaravel5 = require('./index');


describe('can encrypt and decrypt', () => {
    test('string', () => {
        let apiKey = crypto.randomBytes(32);
        let obj1 = 'hello sir, can I buy you a drink?';

        let encrypted = encryptLaravel5.encrypt(obj1, apiKey);
        let decrypted = encryptLaravel5.decrypt(encrypted, apiKey);

        expect(JSON.stringify(obj1)).toBe(JSON.stringify(decrypted));
    });

    test('object', () => {
        let apiKey = crypto.randomBytes(32);
        let obj1 = {
            name: 'taco',
            id: 123,
            allow: true,
        };

        let encrypted = encryptLaravel5.encrypt(obj1, apiKey);
        let decrypted = encryptLaravel5.decrypt(encrypted, apiKey);

        expect(JSON.stringify(obj1)).toBe(JSON.stringify(decrypted));
    });

    test('sub-objects and arrays', () => {
        let apiKey = crypto.randomBytes(32);
        let obj1 = {
            name: 'taco',
            id: 123,
            allow: true,
            children: [
                {
                    name: 'tim'
                },
                {
                    name: 'sue'
                },
                {
                    name: 'bob'
                },
            ],
            aliases: [
                'tac',
                't',
                'tacocat'
            ]
        };

        let encrypted = encryptLaravel5.encrypt(obj1, apiKey);
        let decrypted = encryptLaravel5.decrypt(encrypted, apiKey);

        expect(JSON.stringify(obj1)).toBe(JSON.stringify(decrypted));
    });
});
