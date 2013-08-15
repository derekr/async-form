var STATUS_OK = 200;

function callbackStub () {}

function readyStateCallback (data, callback) {
    if (typeof callback !== 'function') return;

    return callback.call(this, data);
}

module.exports = function uploadXHR (data, options) {
    options.xhr = options.xhr || {};

    options.xhr.unset           == options.xhr.unset || callbackStub;
    options.xhr.opened          == options.xhr.opened || callbackStub;
    options.xhr.headersRecieved == options.xhr.headersRecieved || callbackStub;
    options.xhr.loading         == options.xhr.loading || callbackStub;
    options.xhr.done            == options.xhr.done || callbackStub;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (e) {
        switch (e.target.readyState) {
            case 0:
                readyStateCallback(e, options.xhr.unset);
                break;
            case 1:
                readyStateCallback(e, options.xhr.opened);
                break;
            case 2:
                readyStateCallback(e, options.xhr.headersRecieved);
                break;
            case 3:
                readyStateCallback(e, options.xhr.loading);
                break;
            case 4:
                readyStateCallback(e, options.xhr.done);
                if (e.target.status === STATUS_OK) {
                    var data = options.responseType === 'json' ? JSON.parse(e.target.responseText) : e.target.responseText;
                    readyStateCallback(data, options.success);
                } 
                break;
        }
    };

    xhr.open('POST', options.action, true);
    xhr.responseType = options.responseType;
    xhr.send(data);
};
