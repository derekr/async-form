var test     = require('tape');

var iform = require('../lib/upload-iframe');

test('test simple iframe', function (t) {
    t.plan(5);

    var options = {
        'action': '/',
        'iframeId': 'test',
        'method': 'POST',
        'success': function success (err, res) {
            var $select = res.form.lastChild;
            var $input  = res.form.firstChild;

            t.equal(res.form.target, 'test', 'cloned form should target iframe');
            t.equal($input.getAttribute('value'), 'beep boop', 'cloned text-input contains correct value');
            t.equal($input.getAttribute('name'), 'text-input', 'cloned text-input has correct name attribute');
            t.equal($select.getAttribute('value'), 'beep boop', 'cloned select-input should target iframe');
            t.equal($select.getAttribute('name'), 'select-input', 'cloned select-input has correct name attribute');
        }
    };
    
    var $form   = document.createElement('form');
    var $input  = document.createElement('input');
    var $select = document.createElement('select');
    var $option = document.createElement('option');

    $form.setAttribute('action', options.action);
    
    $input.type = 'text';
    $input.setAttribute('value', 'beep boop');
    $input.setAttribute('name', 'text-input');
    $form.appendChild($input);

    $option.value = 'beep boop';
    $option.setAttribute('selected', 'selected');
    $select.appendChild($option);
    $select.setAttribute('name', 'select-input');
    $form.appendChild($select);

    iform($form, options);
});
