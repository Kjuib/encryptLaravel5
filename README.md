# encryptLaravel5
Duplicate the encryption/decryption of php Laravel v5.

# Installation
```bash
    npm i encrypt-laravel-5 --save
```

# Usage (Javascript)
```javascript
    let encryptLaravel5 = require('encrypt-laravel-5');

    let encryptedValue = encryptLaravel5.encrypt('value1', '<your laravel5 api key here>');
    
    let decryptedValue = encryptLaravel5.decrypt(encryptedValue, '<your laravel5 api key here>');
    // decryptedValue === 'value1'
```
