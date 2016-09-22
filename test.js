/**
 * Created by doveaz on 2016/5/8.
 */
var request = require('request');
var cheerio=require('cheerio');
var path=require('path');
var fs=require('fs');
var a=12500;
function createurl(){
    var requrl='http://www.lesmao.net/thread-'+a+'-1-1.html';
    a++;
    console.log(a);
    return requrl
}
function start() {
    var options = {
        url: createurl(),
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            acquireData(body);
        }
    });
}
setInterval(start,1000);
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
function acquireData(data) {
    var $ = cheerio.load(data);
    var title = $('#ls-content-pic-post img').toArray();
    var code=0;
    for (var i = 0; i < title.length; i++) {
        var imgsrc = title[i].attribs.src;
        request
            .get(imgsrc)
            .on('response', function(response) {
                code++;
                if(code>title.length-2){
                }
            })
            .on('error',function(err){
              })
            .pipe(fs.createWriteStream('leisimao' + '/' + parseUrlForFileName(imgsrc)))

}
}
