const fs = require('fs');

const PATH = '../expressDemo/db.json';

//查找所有评论
module.exports.findAll = function(callback){
    
    fs.readFile(PATH,'utf8',function(err,data){
    
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }

    })
}


//添加评论
module.exports.addMsg = function(comment,callback){

    fs.readFile(PATH,'utf8',function(err,data){
    
        if(err){

            callback(err,null);

        }else{

            let comments = JSON.parse(data).comments;
            let commentDate = new Date();
            comment.dateTime = commentDate.getFullYear().toString() + '-' + (commentDate.getMonth()+1).toString() + '-' + commentDate.getDate().toString();
            comments.push(comment);
            comments = JSON.stringify({comments});


            fs.writeFile(PATH,comments,'utf8',function(err){
                if(err){
                    callback(err,null);
                }else{
                    callback(null,'ok');
                }
            });

            
        }
    })
}