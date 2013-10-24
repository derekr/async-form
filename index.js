/**
 * XHR file uploads with iFrame fallback for ie8.
 *
 * @package async-form
 * @author drk <drk@diy.org>
 */

/**
 * Lib
 */
var uploadXHR    = require('./lib/upload-xhr');
var uploadIFrame = require('./lib/upload-iframe');

function callbackStub () {}

var uploader = {
    'options': {
        'iframeId': 'async-form-iframe',
        'action': '/',
        'method': 'POST',
        'headers': {},
        'responseType': 'text',
        'jsonp': false
    },

    'setOptions': function setOptions (options) {
        options = options || {};

        this.options.iframeId     = options.iframeId || this.options.iframeId;
        this.options.action       = options.action || this.$form.getAttribute('action') || this.options.action;
        this.options.method       = options.method || this.options.method;
        this.options.headers      = options.headers || this.options.headers;
        this.options.responseType = options.responseType || this.options.responseType;
        this.options.success      = options.success || callbackStub;
        this.options.body         = options.body || {};
        this.options.useIframe    = options.useIframe || false;
    },

    'setForm': function setInput ($form) {
        this.$form = $form;
    },

    'upload': function upload () {
        if (typeof FormData !== 'undefined' && !this.options.useIframe) uploadXHR(this.getFormData(), this.options);
        else uploadIFrame(this.$form, this.options);
    },

    'getFormData': function getFormData () {
        var data = {};

        if (this.$form instanceof FormData) data = this.$form;
        else data = new FormData(this.$form);

        for (var name in this.options.body) {
            data.append(name, this.options.body[name]);
        }

        return data;
    }
};

/**
 * Constructor
 */
function asyncForm ($form, options) {
    uploader.setOptions(options);
    uploader.setForm($form);
    uploader.upload();
}

/**
 * Export
 */
module.exports = asyncForm;
