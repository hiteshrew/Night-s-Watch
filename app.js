const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https')

const app = express();

var watchChoice = "";
var genre = "";
var requestURL="";

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,(req,res) => {
	res.render("home");
});

app.get("/movie", (req,res)=> {

		res.render("genre.ejs")
		requestURL = 'https://yts.mx/api/v2/list_movies.json?limit=50';
});

app.get("/movie/:genreInput", (req,res)=> {

	var genre = req.params.genreInput;
	
	requestURL = requestURL + "&genre=" + genre;

	res.render("ratings")

	
	
	
	
});

app.get("/movie/ratings/:ratingInput", (req,res)=> {

	const min_rating = req.params.ratingInput;
	requestURL = requestURL + "&minimum_rating=" + min_rating ;
	// console.log(requestURL);
	res.render("preference")
});

app.get("/movie/preferences/:preferenceInput", (req,res)=> {

	const prefrence = req.params.preferenceInput;
	requestURL = requestURL + "&sort_by=" + prefrence;
	// console.log(requestURL);
	res.render("quality.ejs")
});

app.get("/movie/quality/:qualityInput", (req,res)=> {

	const quality = req.params.qualityInput;
	requestURL = requestURL + "&quality=" + quality;
	console.log(requestURL);
	res.redirect("/show")
});

app.get("/show", (req,res) => {
	
	https.get(requestURL, function(response){
		var body = '';
	
		response.on('data', function(chunk){
			body += chunk;
		});
	
		response.on('end', function(){
			var movieData = JSON.parse(body);
			// console.log("Got a response: ", movieData);	
			res.render("show.ejs", { MovieData: JSON.parse(body) });
		});
	}).on('error', function(e){
		  console.log("Got an error: ", e);
	});

});




app.listen(process.env.PORT || 3000, () =>{
	console.log("Server running on port 3000")

});




