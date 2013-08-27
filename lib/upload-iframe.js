function createIframe (options) {
    var $iframe = document.createElement('iframe');

    $iframe.id = options.iframeId;
    $iframe.setAttribute.name = options.iframeId;
    $iframe.style.display = 'none';
    $iframe.onerror = function () {
        console.log('iframe error');
    };

    return $iframe;
}

function createForm ($originalForm, options) {
    var $form = document.createElement('form');

    $form.setAttribute('action', options.action);
    $form.setAttribute('target', options.iframeId);
    $form.encoding = $form.enctype = "multipart/form-data";
    $form.style.display = 'none';

    return cloneForm($originalForm, $form, options);
}

function cloneForm ($originalForm, $targetForm, options) {
    var $selects = $originalForm.querySelectorAll('select');
    var $inputs  = $originalForm.querySelectorAll('input');
    
    for (var i = 0; i < $inputs.length; i++) {
        $input = $inputs[i].cloneNode();
        $targetForm.appendChild($input);
    }

    // Copy selects as hidden inputs
    for (var i = 0; i < $selects.length; i++) {
        var $select = $selects[i];
        var $input = document.createElement('input');
        $input.name = $select.getAttribute('name');
        $input.type = 'hidden';
        $input.value = $select.value;
        $targetForm.appendChild($input);
    }

    return $targetForm;
}

module.exports = function uploadIFrame ($form, options) {
    // todo: add option for postMessage handling when posting to own servers
    var $iframe = createIframe(options);
    document.body.appendChild($iframe);
    
    var $newForm = createForm($form, options);
    document.body.appendChild($newForm);

    if (typeof options.success === 'function') {
        $iframe.addEventListener('load', function () {
            options.success.call(this, null, { 'iframe': $iframe, 'form': $newForm });
        });
    };

    $newForm.submit();
};
