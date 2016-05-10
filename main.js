/**
 * Created by Administrator on 2016/5/8.
 */
var request = require('request');
var cheerio=require('cheerio');
var path=require('path');
var fs=require('fs');
function hh() {
   /* var douyu = {
        url: 'http://www.douyu.com/directory/game/LOL?_dp=0.-1.2.0',
        dom: '#live-list-contentbox img',
        final: 'data-original',
        dir: 'douyu'
    };*/
    var douyu = {
        url: 'http://www.lesmao.net/',
        dom: '#show>div>div>a',
        final: 'src',
        dir: 'leisimao'
    };
    var requrl = douyu.url;
    var options = {
        url: requrl,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
        }
    };
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);//返回请求页面的HTML
            acquireData(body)
        }
    });
    function acquireData(data) {
        var $ = cheerio.load(data);
        var title = $('#ls-content-pic-post img').toArray();
        console.log(title.length);
        for (var i = 0; i < title.length; i++) {
            var out = title[i].attribs[douyu.final];
            var filename = parseUrl(out);
            downloadImg(out, filename, function () {
                console.log(filename + ' done');
            })
        }
    }
//解析HTML

/*    function acquireData(data) {
        var $ = cheerio.load(data);
        var title = $(douyu.dom).toArray();
        //console.log(title.length);
        for (var i = 0; i < title.length; i++) {
            var out = title[i].attribs[douyu.final];
            var filename = parseUrl(out);
            downloadImg(out, filename, function () {
                console.log(filename + ' done');
            })
        }
    }*/

   /* function parseUrl(address) {
        var filename = path.basename(address);
        return filename;
    }*/

    var date = new Date();
    var dirname = date.getFullYear().toString() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
    if (!fs.existsSync(douyu.dir)) {
        fs.mkdir(douyu.dir, function (err) {
            if (err) {
                throw err;
            }
        });
    }
    fs.mkdir(douyu.dir + '/' + dirname);

    var downloadImg = function (url, filename, callback) {
        request.head(url, function (err, res, body) {
            if (err) {
                console.log('err:' + err);
            }
            request(url).pipe(fs.createWriteStream(douyu.dir + '/' + dirname + '/' + filename)).on('close', callback);
        });
    };
}
hh();