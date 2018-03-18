// server.js
// where your node app starts

// init project
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express()
var bodyParser = require('body-parser');
var cors = require('cors');

// Create an instance of express for our app and instantiate bodyParser and cors
app.use(bodyParser.json());
app.use(cors());

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

app.get("/dreams", (request, response) => {
  response.send(dreams)
})



// GET Call to return JSON that formats natural and unix date
app.get('/:dateVal', function(req,res,next) {
  var dateVal = req.params.dateVal;
  // Options for formatting date in natural date time
  var dateFomattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if(isNaN(dateVal)) {
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString('en-us', dateFomattingOptions);
    var unixDate = new Date(dateVal).getTime()/1000;
  } else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString('en-us', dateFomattingOptions);
  }
  res.json({unix: unixDate, natural: naturalDate});
});


// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
