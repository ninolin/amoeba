var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const category = require('./route/category');
const account = require('./route/account');

app.use(bodyParser.json());
// app.use('/',category.list());
// app.use('/',category.create());
// app.use('/',category.update());
// app.use('/',category.delete());
app.use('/',account.list());
app.use('/',account.add());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});