var express = require('express');
var app = express();
var axios = require('axios')

app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Home page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// Post page from jsonplaceholder
app.get('/posts', function(req, res) {
	axios.get('https://jsonplaceholder.typicode.com/posts')
	.then((response) => {
	  // console.log(`statusCode: ${res.statusCode}`)
	  let str = response.data
	  // console.log(str)
	  res.render('pages/posts', {str: str});
	})
	.catch((error) => {
	  console.error(error)
	})
});

// tryaboutme 
app.get('/tryaboutme', function(req, res) {
  res.render('pages/tryaboutme');
});

// aboutme JSON API
app.get('/aboutme', function (req, res) {
	var info = [ 
		{ 'Tell me a little more about yourself.': 'Love team work, keep the promise, easygoing, optimistic, innovative'},
		{'What excites you about technology?': 'Find solutions to difficulties'},
		{'What is your preferred technology stack?': 'React'},
		{'What are your favorite hobbies?': 'Basketball and Github'}
	]
	let q = req.query;
	switch(q.info) {
		case 'description':
			res.send(info[0]);
			break;
		case 'tech':
			res.send(info[1]);
			break;
		case 'techstack':
			res.send(info[2]);
			break;
		case 'hobbies':
			res.send(info[3]);
			break;
		default:
			res.send(info);
	}
})

// All of these dummy routers below used for testing JSON API
// Check it out in tryaboutme.ejs. All JSON response will print in the console.
// test: description
app.get('/test1', function(req, res) {
	axios.get('http://localhost:8888/aboutme',
	{
		params:{
			info:'description'
		}
	})
	.then((resquest) => {
		let str = resquest.data
		// Print response in the console
		console.log(str)
		res.render('pages/tryaboutme');
	})
	.catch((error) => {
	  console.error(error)
	})
});
// test: tech
app.get('/test2', function(req, res) {
	axios.get('http://localhost:8888/aboutme',
	{
		params:{
			info:'tech'
		}
	})
	.then((resquest) => {
		let str = resquest.data
		// Print response in the console
		console.log(str)
		res.render('pages/tryaboutme');
	})
	.catch((error) => {
	  console.error(error)
	})
});
// test: techstack
app.get('/test3', function(req, res) {
	axios.get('http://localhost:8888/aboutme',
	{
		params:{
			info:'techstack'
		}
	})
	.then((resquest) => {
		let str = resquest.data
		// Print response in the console
		console.log(str)
		res.render('pages/tryaboutme');
	})
	.catch((error) => {
	  console.error(error)
	})
});
// test: hobbies
app.get('/test4', function(req, res) {
	axios.get('http://localhost:8888/aboutme',
	{
		params:{
			info:'hobbies'
		}
	})
	.then((resquest) => {
		let str = resquest.data
		// Print response in the console
		console.log(str)
		res.render('pages/tryaboutme');
	})
	.catch((error) => {
	  console.error(error)
	})
});
// test: null
app.get('/test5', function(req, res) {
	axios.get('http://localhost:8888/aboutme')
	.then((resquest) => {
		let str = resquest.data
		// Print response in the console
		console.log(str)
		res.render('pages/tryaboutme');
	})
	.catch((error) => {
	  console.error(error)
	})
});
// All of these dummy routers above used for testing JSON API

// 404 Not Found
app.use(function(req, res) {
  res.render('pages/notfound')
})

// Listen port 8888
app.listen(8888);
console.log('The server is listening on 8888 Port...');