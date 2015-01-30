var request = require('request');
var cheerio = require('cheerio');
var server = require('http').createServer();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.post('/', function (req, res) {

    var url = req.body.url;

    // Actual stuff you want to learn below.

    request.get({
        url: url
    }, function (err, response) {
        var htmlFromIndeed = response.body;
        // Cheerio stuff.
        var $ = cheerio.load(htmlFromIndeed);
        var logo = $('.cmp_logo').find('img').attr('src');
        var summary = $('#job_summary').text().split('\n');
        res.send(summary);
    });

});

server.on('request', app);

server.listen(1337);