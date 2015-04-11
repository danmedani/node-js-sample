var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {

	var nano = require('nano')('http://localhost:5984');
	nano.db.create('books');
	var books = nano.db.use('books');

	//Insert a book document in the books database
	books.insert({name: 'The Art of war'}, null, function(err, body) {
	  if (!err){
	    response.send(body);
	  }
	});

	//Get a list of all books
	books.list(function(err, body){
	  response.send(body.rows);
	}


  	response.send('Hello World!');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
