var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use('/category',require('./route/category'));
app.use('/user',require('./route/user'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});