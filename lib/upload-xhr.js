module.exports = function uploadXHR (data, options) {
    $.ajax({
        type: options.method,
        url: options.action,
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        headers: options.headers,
        success: function (data) {
            options.success(null, data);
        }
    });
};
