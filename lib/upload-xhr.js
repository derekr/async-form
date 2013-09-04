// todo: refactor to use http module instead
var xhr = require('xhr');

module.exports = function uploadXHR (data, options) {
    xhr({
        'method': options.method,
        'uri': options.action,
        'body': data,
        'headers': options.headers
    }, options.success);
};
