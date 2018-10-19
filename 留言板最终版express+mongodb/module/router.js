const express = require('express');
const fileCRUD = require('../module/fileCRUD.js');


let router = express.Router();

//渲染首页
router.get('/',function(req,res){

    fileCRUD.find(function(err,data){

        if(err){

            return res.status(500).send('Server is error !!!');
        
        }
        res.render('index.html',{
            comments:data
        });
             
    })
    
})

//渲染评论页
router.get('/post',function(req,res){

    res.render('sendMsg.html');

})

//得到评论信息
router.post('/post',function(req,res){

    let comment = req.body;
    let commentDate = new Date();
    comment.dateTime = commentDate.getFullYear().toString() + '-' + (commentDate.getMonth()+1).toString() + '-' + commentDate.getDate().toString();
    new fileCRUD(comment).save(function(err,result){
        if(err){
            return res.status(500).send('添加失败 !');
        }
        res.redirect('/');
        console.log('添加成功 !');
    });

})


module.exports = router;