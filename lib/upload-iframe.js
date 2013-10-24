function createIframe (options) {
    var id = options.iframeId;

    // ie9 requires createElement to only contain element name
    var $iframe = document.createElement('IFRAME');

    $iframe.setAttribute('id', id);
    $iframe.setAttribute('name', id);
    $iframe.style.display = 'none';
    $iframe.onerror = function () {
        console.log('iframe error');
    };

    return $iframe;
}

function cloneForm ($originalForm, $targetForm, options) {
    var i, $input;
    
    /**
     * Had issues w/ selecting "not" text inputs so there is a bit of
     * duplication here.
     */
    var $selects     = $originalForm.querySelectorAll('select');
    var $fileInputs  = $originalForm.querySelectorAll('input[type=file]');
    var $inputs      = $originalForm.querySelectorAll('input[type=text]');
    var $hidden      = $originalForm.querySelectorAll('input[type=hidden]');
    
    // Don't clone file inputs
    for (i = 0; i < $fileInputs.length; i++) {
        $targetForm.appendChild($fileInputs[i]);
    }

    for (i = 0; i < $inputs.length; i++) {
        $input = $inputs[i].cloneNode(true);
        $input.type = 'hidden';
        $targetForm.appendChild($input);
    }

    for (i = 0; i < $hidden.length; i++) {
        $input = $hidden[i].cloneNode(true);
        $input.type = 'hidden';
        $targetForm.appendChild($input);
    }

    for (var b in options.body) {
        $input = document.createElement('input');
        $input.name = b;
        $input.type = 'hidden';
        $input.value = options.body[b];
        $targetForm.appendChild($input);
    }

    // Copy selects as hidden inputs
    for (i = 0; i < $selects.length; i++) {
        var $select = $selects[i];
        $input = document.createElement('input');
        $input.name = $select.getAttribute('name');
        $input.type = 'hidden';
        $input.value = $select.value;
        $targetForm.appendChild($input);
    }

    return $targetForm;
}

function createForm ($originalForm, options) {
    var $form = document.createElement('form');

    $form.setAttribute('action', options.action);
    $form.setAttribute('target', options.iframeId);
    $form.setAttribute('method', options.method);
    $form.encoding = $form.enctype = 'multipart/form-data';
    $form.style.display = 'none';

    return cloneForm($originalForm, $form, options);
}

module.exports = function uploadIFrame ($form, options) {
    // todo: add option for postMessage handling when posting to own servers
    var $iframe = createIframe(options);
    document.body.appendChild($iframe);
    
    var $newForm = createForm($form, options);
    document.body.appendChild($newForm);

    if (typeof options.success === 'function') {
        $iframe.attachEvent('onload', function () {
            options.success.call(this, null, { 'iframe': $iframe, 'form': $newForm });
        });
    }

    $newForm.submit();
};
