const express = require('express'),
      bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('public'));

const category = require('./route/category');

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

var myLogger = function (req, res, next) {
    console.log(req.body);
    next();
};

app.use(requestTime);
app.use(myLogger);

app.use('/',category.list());
app.use('/',category.create());
app.use('/',category.update());
app.use('/',category.delete());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});