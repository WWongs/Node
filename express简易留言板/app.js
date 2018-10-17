const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let comments = [
    {
        name:'一号',
        message:'哎呦，不错哦！',
        dateTime:'8102-01-21'
    },
    {
        name:'二号',
        message:'是啊，不错哦！',
        dateTime:'8102-01-21'
    },
    {
        name:'三号',
        message:'都不错哦！',
        dateTime:'8102-01-21'
    },
    {
        name:'四号',
        message:'哎呦，不错哦！',
        dateTime:'8102-01-21'
    },
]

app.use('/public/',express.static('./public'));

//引入插件接受post发送的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//引入插件渲染模板
app.engine('html', require('express-art-template'));

app.get('/',function(req,res){
        res.render('../pages/index.html',{comments:comments});
   })

   .get('/post',function(req,res){
        res.render('../pages/sendMsg.html');
   })

   .post('/post',function(req,res){ 
        let comment = req.body;
        let commentDate = new Date();
        comment.dateTime = commentDate.getFullYear().toString() + '-' + (commentDate.getMonth()+1).toString() + '-' + commentDate.getDate().toString();
        comments.push(comment);
        res.redirect('/');
   })


app.listen(3000,function(){
    console.log('server is running !');
});