/**
 * XHR file uploads with iFrame fallback for ie8.
 *
 * @package async-form
 * @author drk <drk@diy.org>
 */

var uploadXHR    = require('./upload-xhr');
var uploadIFrame = require('./upload-iframe');

function callbackStub () {};

var uploader = {
    'options': {
        'iframeId': 'async-form-iframe',
        'action': '/',
        'method': 'POST',
        'headers': {},
        'responseType': 'text'
    },

    'setOptions': function setOptions (options) {
        options = options || {};
        
        this.options.iframeId     = options.iframeId || this.options.iframeId;
        this.options.action       = options.action || this.$form.getAttribute('action') || this.options.action;
        this.options.method       = options.method || this.options.method;
        this.options.headers      = options.headers || this.options.headers;
        this.options.responseType = options.responseType || this.options.responseType;
        this.options.success      = options.success || callbackStub;
    },

    'setForm': function setInput ($input) {
        this.$form = $form;
    },

    'upload': function upload () {
        if (typeof FormData !== 'undefined') uploadXHR(new FormData(this.$form), this.options);
        else uploadIFrame(this.$form, this.options);
    },
};

/**
 * Constructor
 */
function asyncForm ($form, options) {
    uploader.setForm($form);
    uploader.setOptions(options);
    uploader.upload();
};

/**
 * Export
 */
module.exports = asyncForm;
