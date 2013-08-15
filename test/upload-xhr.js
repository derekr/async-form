if (typeof FormData === 'undefined') return; // don't run test for browsers that don't support form xhr

var test = require('tape');

var uploadXHR = require('../lib/upload-xhr');

test('test on ready state callbacks', function (t) {
    t.plan(2);

    var options = {
        'action': '/',
        'method': 'POST',
        'headers': {
            'Accept': 'application/json'
        },
        'success': function success (err, res, body) {
            body = JSON.parse(body);
            t.equal(body.fields.text, 'bleep bloop', '"text" posted ok');
            t.equal(body.files.file.originalFilename, 'blob', '"file" posted ok')
        }
    };

    var data = new FormData();
    data.append('file', new Blob(["bleep bloop"], { "type" : "text/plain" }));
    data.append('text', 'bleep bloop');
    
    uploadXHR(data, options);
});
