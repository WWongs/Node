const express = require('express');
const superAgent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const request = require('request');

let app = express();

app.get('/', function (req, res, next) {

    let meizitu = new Promise(function (reslove, reject) {
            superAgent.get('http://www.haopic.me/tag/meizitu')
                .end(function (err, sres) {
                    // 常规的错误处理
                    if (err) {
                        reject(err);
                    }
                    var $ = cheerio.load(sres.text);
                    let totalPage = $('#page .wp-pagenavi a.larger').text();
                    totalPage = totalPage % 10;
                    reslove(totalPage);
                });
        })
        .then(function (totalPage) {
            let items = [];
            for (let i = 0; i < totalPage; i++) {
                superAgent.get('http://www.haopic.me/tag/meizitu/page/' + i)
                    .end(function (err, sres) {
                        // 常规的错误处理
                        if (err) {
                            return console.log(err);
                        }
                        var $ = cheerio.load(sres.text);            
                        $('#mainbox .item_box .post a img').each(function (idx, element) {
                            let $element = $(element);
                            let imgSrc = $element.attr('src');
                            let imgarr = imgSrc.split('/');
                            request(imgSrc).pipe(fs.createWriteStream('./uploadImages/' + imgarr[imgarr.length - 1]));
                            items.push({
                                imgSrc: $element.attr('src'),
                                imgTitle: $element.attr('alt')
                            });
                            console.log(i + '----' + imgSrc);
                        });
                        
                    });
            }
            res.json(items);
        }, function (err) {
            console.log(err);
        });

});

app.listen(3000, function () {
    console.log('Sever is running !!!');
})