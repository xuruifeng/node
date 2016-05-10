/**
 * Created by Administrator on 2016/5/8.
 */
var request = require('request');
var cheerio=require('cheerio');
var path=require('path');
var fs=require('fs');
var requrl = 'http://www.lesmao.net/thread-13564-1-1.html';
var options = {
    url: requrl,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36'
    }
};
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);//返回请求页面的HTML
        acquireData(body);
    }
});
function acquireData(data){
    var $ = cheerio.load(data);
    var title = $('.picvip').toString().match(/\b\d\d\b/)[0];
    console.log(title);
}