var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    imageDir = '/Users/Charlys/Desktop/teste/';
 
var servidor = http.createServer(function (req, res) {
    var query = url.parse(req.url,true).query;
 
    if (typeof query.image === 'undefined') {
        getImages(imageDir, function (err, files) {
            var imageLists = '<ul>';
            for (var i=0; i<files.length; i++) {
                imageLists += '<li><a href="/?image=' + files[i] + '">' + files[i] + '</li>';
            }
            imageLists += '</ul>';
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(imageLists);
        });
    } else {
        //read the image using fs and send the image content back in the response
        fs.readFile(imageDir + query.image, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");    
            } else {
                res.writeHead(200,{'Content-type':'image/jpg'});
                res.end(content);
            }
        });
    }
 
});

servidor.listen(8888);
console.log("Iniciando servidor...");
 
function getImages(imageDir, callback) {
    var fileType = '.jpg', files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                    files.push(list[i]); 
            }
        }
        callback(err, files);
    });
}