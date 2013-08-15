if (typeof FormData === 'undefined') return; // don't run test for browsers that don't support form xhr

var test = require('tape');

var uploadXHR = require('../lib/upload-xhr');

test('test on ready state callbacks', function (t) {
    t.plan(5);

    var options = {
        'action': '/',
        'responseType': 'json',
        'xhr': {
            'opened': function openedTest (e) {
                t.equal(e.target.readyState, 1, '"opened" callback fired');
            },

            'loading': function loadingTest (e) {
                t.equal(e.target.readyState, 3, '"loading" callback fired');
            },

            'done': function doneTest (e) {
                t.equal(e.target.readyState, 4, '"done" callback fired');
            }
        },
        'success': function success (res) {
            t.equal(res.fields.text, 'bleep bloop', '"text" posted ok');
            t.equal(res.files.file.originalFilename, 'blob', '"file" posted ok')
        }
    };

    var data = new FormData();
    data.append('file', new Blob(["bleep bloop"], { "type" : "text/plain" }));
    data.append('text', 'bleep bloop');
    
    uploadXHR(data, options);
});
