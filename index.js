var url = require('url');
var fs = require('fs');
var http = require('http');

var download = function (downLoadUrl, filePath, fn) {
    var options = {
        host: url.parse(downLoadUrl).hostname,
        port: url.parse(downLoadUrl).port || 80,
        path: url.parse(downLoadUrl).pathname
    };

    var file_name = url.parse(downLoadUrl).pathname.split('/').pop();
    //var file = fs.createWriteStream(filePath + file_name);
    fs.writeFileSync(filePath + file_name, '', 'utf-8');

    http.get(options, function(res) {
        if (res.statusCode === 404) {
        }
        res.on('data', function(data) {
            fs.appendFileSync(filePath + file_name, data, 'utf-8');
            //file.write(data, 'utf-8');
        });
        res.on('end', function() {
            console.log('download ' + file_name + ' success!');
            fn && fn(res.statusCode);
            //file.close();
        });
        res.on('error', function (e) {
            console.error('problem with request:' + e.message);
        });
    });
};

module.exports = download;
