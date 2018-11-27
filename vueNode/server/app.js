let express = require('express');
let path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function(req, res) {
    
    res.send(path.join(__dirname, '../dist/index.html'));
})

app.post('/test', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.json({cod: 205});
})

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      res.json({cod: 200});
    }
});



app.listen('3000', function () {
    console.log('server is running at 3000 port ...');
})