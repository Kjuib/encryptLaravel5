const crypto = require('crypto');
const php = require('php-serialize');

const BASE_64_PREFIX = 'base64:';

function encrypt(value, apiKey = '') {
    if (typeof apiKey === 'string' && apiKey.startsWith(BASE_64_PREFIX)) {
        apiKey = Buffer.from(apiKey.replace(BASE_64_PREFIX, ''), 'base64');
    }

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('AES-256-CBC', apiKey, iv);
    let payloadValue = cipher.update(php.serialize(value), 'utf8', 'base64');
    payloadValue += cipher.final('base64');

    const ivStr = new Buffer(iv).toString('base64');
    const hmac = crypto.createHmac('sha256', apiKey);

    const mac = hmac.update(ivStr + payloadValue).digest('hex');

    return new Buffer(JSON.stringify({
        iv: ivStr,
        value: payloadValue,
        mac: mac
    })).toString('base64');
}

function decrypt(encryptedValue, apiKey = '') {
    if (typeof apiKey === 'string' && apiKey.startsWith(BASE_64_PREFIX)) {
        apiKey = Buffer.from(apiKey.replace(BASE_64_PREFIX, ''), 'base64');
    }

    const main = JSON.parse(Buffer.from(encryptedValue, 'base64'));
    const iv = Buffer.from(main.iv, 'base64');

    // TODO Laravel does a bunch of checks to make sure the data was not tampered with.

    const decipher = crypto.createDecipheriv('AES-256-CBC', apiKey, iv);
    let payloadValue = decipher.update(main.value, 'base64', 'utf8');
    payloadValue += decipher.final('utf8');

    return php.unserialize(payloadValue);
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;