const express = require('express');
const router = require('./module/router');
const bodyParser = require('body-parser');
const ueditor_backend = require('ueditor-backend');


let app = express();


//引入富文本编辑器
ueditor_backend(app);
app.use(express.static('utf8-php'));
app.use('/ueditor-upload/', express.static('./ueditor-upload/'));


//渲染模板
app.engine('html', require('express-art-template'));


//加载post插件
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//暴露样式文件
app.use('/public/', express.static('./public/'));
app.use('/upload/', express.static('./upload/'));


//挂载路由
app.use(router);


//监听端口
app.listen(3000, function () {
    console.log('Server is running at port 3000...');
})