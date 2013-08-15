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
        'responseType': 'text'
    },

    'setOptions': function setOptions (options) {
        options = options || {};
        
        this.options.iframeId     = options.iframeId || this.options.iframeId;
        this.options.action       = options.action || getFormAction(this.$input) || this.options.action;
        this.options.responseType = options.responseType || this.options.responseType;
        this.options.success      = options.success || callbackStub;
        this.options.onreadystatechange = options.onreadystatechange || false;
    },

    'setInput': function setInput ($input) {
        this.$input = $input;
    },

    'upload': function upload () {
        if (typeof FormData !== 'undefined') this.uploadXHR();
        else uploadIFrame(this.$input, this.options);
    },

    'uploadXHR': function uploadXHRFacade ($input, options) {
        var data = new FormData();
        data.append('file', this.$input);

        uploadXHR(data, this.options);
    }
};

function findParentForm($node) {
    if (isForm($node)) return $node;
    else return findParentForm($node.parentNode);
}

function isForm ($el) {
    return ($el.tagName === 'FORM');
}

function getFormAction ($input) {
    return findParentForm($input).getAttribute('action') || '/';
}

function isFileInput ($el) {
    return ($el.tagName === 'INPUT' && $el.type === 'file');
}

/**
 * Constructor
 */
function asyncForm ($input, options) {
    uploader.setInput($input);
    uploader.setOptions(options);
    uploader.upload();
};

/**
 * Export
 */
module.exports = asyncForm;
