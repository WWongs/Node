const express = require('express');
const bodyParser = require('body-parser');
const router = require('./module/router.js');

let app = express();

//暴露样式文件夹
app.use('/public/',express.static('./public/'));

//引入art-template渲染模板
app.engine('html', require('express-art-template'));


//引入body-parser
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//挂载路由
app.use(router);

app.listen(3000, function () {
    console.log('Server is running !');
})
