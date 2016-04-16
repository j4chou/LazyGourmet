var request = require('request');

var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

var apiKey = 'eb83ffedca44fcdfbb67420382e5932e';

var url = 'http://food2fork.com/api/search?key=' + apiKey + '&q=';

app.get('/', function(req, res, next) {
  console.log("inside server.js app.get, req.query is", Object.keys(req.query));
  var param = Object.keys(req.query)[0];
  console.log("param is", param);
  var link = url + param;

  request(link, function (error, body) {
    if (!error && res.statusCode == 200) 
    {
      var dataContainer = [];
      dataContainer = [body];
 
      console.log("DATA CONTAINER IS", dataContainer);
      res.send(dataContainer); 
    }
  });

});

var port = 3000;
var server = app.listen(port, function() {
  console.log("Listening on http://localhost:" + port);
});