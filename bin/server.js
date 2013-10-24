var multiparty = require('multiparty');
var http       = require('http');
var fs         = require('fs');

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() === 'post') {
        var form = new multiparty.Form();
        
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'application/json'});
            fs.readFile(files.file.path, function () {
                res.write(JSON.stringify({
                    'fields': fields,
                    'files': files
                }));
                res.end('');
            });
        });
    } else {
        res.end('');
    }

});

server.listen(parseInt(process.env.PORT, 10));
