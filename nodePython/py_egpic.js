const express = require('express');
const superAgent = require('superagent');
const cheerio = require('cheerio');

let app = express();

app.get('/', function (req, res, next) {

    superAgent.get('http://www.egpic.cn/center/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }

            var $ = cheerio.load(sres.text);

            console.log(sres.text);

            var items = [];
            $('.cb_list ul li').each(function (idx, element) {

                let imgSrc = $(this).find('.preview img').attr('src');
                let imgTitle = $(this).find('.tem-title .title a').text();

                items.push({
                    imgSrc: imgSrc,
                    imgTitle: imgTitle
                })
            });

            res.send(items);
        });
});

app.listen(3000, function () {
    console.log('Sever is running !!!');
})