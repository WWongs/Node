const http = require('http');
const fs = require('fs');
const template = require('art-template')
const url = require('url');

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


http.
    createServer(function(req,res) {

        let urlObj = url.parse(req.url,true);
        let pathName = urlObj.pathname;

        // 首页
        if( pathName === '/' ){  
            fs.readFile('./pages/index.html',function(err,data){
                if( err ){
                    return res.end('404 not found ...');
                }
                var htmlStr = template.render(data.toString(),{
                    comments:comments
                })
                res.end( htmlStr );
            });

        //留言页
        }else if( pathName === '/post' ){
            fs.readFile('./pages/sendMsg.html',function(err,data){
                if( err ){
                    return res.end('404 not found ...');
                }
                res.end( data );
            });
        
        //发表留言按钮事件
        }else if(pathName === '/postMsg'){

            let comment = urlObj.query;
            let commentDate = new Date();
            comment.dateTime = commentDate.getFullYear().toString() + '-' + (commentDate.getMonth()+1).toString() + '-' + commentDate.getDate().toString();
            comments.push(comment);

            res.statusCode = 302;
            res.setHeader('Location','/');
            res.end();
        }

        //请求静态资源
        else if( pathName.indexOf('/public/' ) === 0){
            fs.readFile( '.' + pathName,function(err,data){
                if( err ){
                    return res.end('404 not found ...');
                }
                res.setHeader( 'Content-Type','text/css' );
                res.end( data );
            });

        //404页面
        }else{
            res.end('404 not found ...');
        }
    }).
    // 监听端口号
    listen(3000,function(){
        console.log('Server is running ...');
    });