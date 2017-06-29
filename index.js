const crypto = require('crypto');
const php = require('php-serialize');

const BASE_64_PREFIX = 'base64:';

function encrypt(value, apiKey = '') {
    if (apiKey.startsWith(BASE_64_PREFIX)) {
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

module.exports.encrypt = encrypt;