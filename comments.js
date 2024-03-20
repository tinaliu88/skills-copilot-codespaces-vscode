// Create web server
var express = require('express');
var app = express();
var fs = require('fs');

// Read the comments from the file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

app.use(express.static('public'));

// Send comments to the client
app.get('/comment', function(req, res) {
  res.send(comments);
});

// Receive the new comment and save it to the file
app.post('/comment', function(req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    comments.push(JSON.parse(body));
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.send(comments);
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});