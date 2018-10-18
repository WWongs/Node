const express = require('express');
const fileCRUD = require('../module/fileCRUD.js');


let router = express.Router();

//渲染首页
router.get('/',function(req,res){

    fileCRUD.findAll(function(err,data){

        if(err){

            res.send('Server is error !!!');
        
        }else{

            res.render('index.html',{
                comments:JSON.parse(data).comments
            });
        }

        
    })
    
})

//渲染评论页
router.get('/post',function(req,res){

    res.render('sendMsg.html');

})

//得到评论信息
router.post('/post',function(req,res){

    fileCRUD.addMsg(req.body,function(err,data){
        
        if(data === 'ok'){
            res.redirect('/');
        }
        else{
            res.send('Server is error !!!');
        }
    })

})


module.exports = router;