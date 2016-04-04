var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var apiKey = '0bf4be4ce57a50dfc87815612972e33a';

var url = 'http://food2fork.com/api/search?key=' + apiKey + '&q=' ;

app.get('/', function(req, res) {
	console.log("inside server.js app.get");
	console.log("req.query is", Object.keys(req.query));
	var param = Object.keys(req.query)[0].split(" ").join('%20');

	var link = url + param;
	request(''+link, function (error, body) {
    if (!error && res.statusCode == 200) {
      console.log("body is:",body);
      res.send(body); 
    }
  });
})



var port = 3000;
var server = app.listen(port, function() {
  console.log("Listening on http://localhost:" + port);
});