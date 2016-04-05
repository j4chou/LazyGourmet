var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var search = require('youtube-search');
var opts = {
  maxResults: 2,
  key: 'AIzaSyAH0GMnEtMRm6g8A1kDNMaiuzpGxYl9-QM'
};

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var apiKey = '0bf4be4ce57a50dfc87815612972e33a';

var url = 'http://food2fork.com/api/search?key=' + apiKey + '&q=' ;

        // youTube search 

function searchYoutube(input) {
  var recipe = input + '%20recipe';
  console.log('recipe is', recipe);
  return search(recipe, opts, function(err, results) {
    if (err) return console.log(err);
    console.log("inside search youtube");
    console.log('results are',results);

    results;
    });
};


//.replace(/\s+\,+/g, '%20')

app.get('/', function(req, res) {

  console.log("inside server.js app.get");
  console.log("req.query is", Object.keys(req.query));
  var param = Object.keys(req.query)[0];
  console.log("param is", param);

  var videoResults = searchYoutube(param);
  console.log("video results inside app.get are",videoResults);

  var link = url + param;

  request(link, function (error, body) {
    if (!error && res.statusCode == 200) {
      var dataArray = [body, videoResults];
      console.log("DATA ARRAY IS", dataArray);
      res.send(body); 
    }
  });
  

})



// app.post('/', function(req, res) {
//   console.log("testing post");
//   searchYoutube(param, res);
// });


var port = 3000;
var server = app.listen(port, function() {
  console.log("Listening on http://localhost:" + port);
});