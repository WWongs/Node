const express = require('express');
const gxNews = require('./news');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


let upload = multer({
    dest: 'upload/'
});

let router = express.Router();



//渲染主页
router.get('/', function (req, res) {

    //数据库形式
    //通过数据库获取新闻信息
    let index = new Promise(function (reslove, reject) {
            gxNews.addNews.find(function (err, news) {
                if (err) {
                    reject(err);
                }

                //降序新闻消息
                for (let i = 0; i < news.length / 2; i++) {
                    let result = {};
                    result = news[i];
                    news[i] = news[news.length - i - 1];
                    news[news.length - i - 1] = result;
                }

                //限制主页新闻信息长度
                if (news.length >= 7) {
                    news.length = 7;
                }

                reslove(news);
            })
        })
        .then(function (news) {
            gxNews.addBanner.find(function (err, banner) {
                if (err) {
                    return res.status(404).send(err);
                }

                //倒序banner
                for (let i = 0; i < banner.length / 2; i++) {
                    let result = {};
                    result = banner[i];
                    banner[i] = banner[banner.length - i - 1];
                    banner[banner.length - i - 1] = result;
                }

                let indexBanner = [banner[0], banner[1], banner[2]];

                res.render('index.html', {
                    // title: '公信置业官网',
                    title: '官网',
                    news: news,
                    banners: indexBanner
                })
            })
        }, function (err) {
            return res.status(404).send(err);
        })
});

//渲染公司体系
router.get('/comSystem', function (req, res) {

    res.render('comSystem.html', {
        title: '公司体系'
    });

})

//核心业务
router.get('/comBusiness', function (req, res) {

    res.render('comBusiness.html', {
        title: '核心业务'
    })

})

//公司信息
router.get('/comIfomation', function (req, res) {

    //数据库形式
    let comIfo = new Promise(function (reslove, reject) {
            gxNews.addNews.find(function (err, comIfomationLists) {
                if (err) {
                    reject(err);
                }
                reslove(comIfomationLists);
            })
        })
        .then(function (comIfomationLists) {

            //降序消息
            for (let i = 0; i < comIfomationLists.length / 2; i++) {
                let result = {};
                result = comIfomationLists[i];
                comIfomationLists[i] = comIfomationLists[comIfomationLists.length - i - 1];
                comIfomationLists[comIfomationLists.length - i - 1] = result;
            }

            res.render('comIfomation.html', {
                title: '公司信息',
                news: comIfomationLists
            })

        }, function (err) {
            return res.status(404).send(err);
        })


})

//企业文化
router.get('/comCulture', function (req, res) {

    res.render('comCulture.html', {
        title: '企业文化'
    })

})


//公司简介
router.get('/comProfile', function (req, res) {

    res.render('comProfile.html', {
        title: '公司简介'
    })

})

//篇首语
router.get('/firstArticle', function (req, res) {

    res.render('firstArticle.html', {
        title: '篇首语'
    })

})


//公众号
router.get('/auctions', function (req, res) {

    res.render('auctions.html', {
        title: '公众号'
    })

})


//新闻消息
router.get('/new', function (req, res) {

    //数据库形式
    let id = req.query.id;
    id = id.toString().replace(/"/g, "");

    let newList = new Promise(function (reslove, reject) {
            gxNews.addNews.findById(id, function (err, newLists) {
                if (err) {
                    reject(err);
                }
                reslove(newLists);
            })
        })
        .then(function (newLists) {
            res.render('new.html', {
                title: '公信新闻消息页',
                news: newLists
            })
        }, function (err) {
            return res.status(404).send(err);
        });

})

//新闻编辑页
router.get('/edit', function (req, res) {

    res.render('../utf8-php/index1.html', {
        title: '编辑新闻页'
    })

})

//得到新闻页
router.post('/edit', function (req, res) {

    //获得当前日期
    let date = new Date();
    let year = date.getFullYear();
    let mouth = date.getMonth();
    let day = date.getDate();
    let newDates = year + '/' + (mouth + 1) + '/' + day;

    //更改新闻体
    let news = req.body;
    news.newBody = news.newBody.replace(/`/g, '&');
    news.newDate = newDates;

    //存入数据库
    new gxNews.addNews(news).save(function (err, data) {
        if (err) {
            return res.status(404).send('Bad Request');
        }
        console.log(news);
        res.json({
            'cod': 200
        });
    });

})


//渲染编辑banner页
router.get('/editBanner', function (req, res) {

    res.render('editBanner.html', {
        title: '编辑首页轮播图页'
    })

})


//得到post轮播图
router.post('/editBanner', upload.single('banner'), function (req, res) {

    let imgFiles = req.files.banner;
    // console.log(imgFiles);

    for (let i = 0; i < imgFiles.length; i++) {

        let name = imgFiles[i].name;
        let data = new Buffer(imgFiles[i].data, 'base64');

        //写入并创建新文件
        fs.writeFile(path.join(__dirname, '../upload/' + name), data, function (err, data) {
            if (err) {
                return res.status(404).send('Bad Request');
            }

            //保存到数据库
            new gxNews.addBanner({
                imgUrl: '/upload/' + name
            }).save(function (err, data) {
                if (err) {
                    return res.status(404).send('Bad Request');
                } else {
                    // res.send('200');
                }
            });
        })
    }

    res.redirect('/');

})



//404
router.get('*', function (req, res) {

    res.render('404.html');

})

module.exports = router;