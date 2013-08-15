function createIframe (options) {
    var $iframe = document.createElement('iframe');
    $iframe.id   = options.iframeId;
    $iframe.setAttribute.name = options.iframeId;
    $iframe.style.display = 'none';
    $iframe.onerror = function () {
        console.log('iframe error');
    };
    return $iframe;;
}

function createForm (options) {
    var $form = document.createElement('form');
    $form.setAttribute('action', options.action);
    $form.setAttribute('target', options.iframeId);
    $form.style.display = 'none';
    return $form;
}

module.exports = function uploadIFrame ($input, options, callback) {
    var $iframe = createIframe(options);
    document.body.appendChild($iframe);
    
    var $form = createForm(options);
    document.body.appendChild($form);
    $form.submit();
};
