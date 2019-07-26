var axios = require("axios");
require("dotenv").config();
var keys = require("./keys");
var moment= require("moment");
// console.log(keys);
// Grab or assemble the movie name and store it in a variable called "movieName"
var input = process.argv[2];
switch (input) {
    
  case "movie-this": {
      
    movieThis();
    break;
  }
}
function movieThis(){
var movieName="";
    if (process.argv[3]===undefined){
        movieName = 'Mr.'+'Nobody';
    }
        else{
            movieName = process.argv.slice(3).join(" ");
        }
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl =
      "http://www.omdbapi.com/?t=" +
      movieName +
      "&y=&plot=short&apikey="+keys.movies.id;
    

    axios.get(queryUrl).then(
      function(response) {
        console.log("Title of the Movie: "+ response.data.Title+'\n'+
        "Realeased Year: "+ response.data.Year+'\n'+
        "IMDB Rating: "+ response.data.imdbRating+'\n'+
        "Country where the movie was produced: "+response.data.Country+'\n'+
        "Language of the Movie: "+ response.data.Language+'\n'+
        "Plot of the Movie: "+ response.data.Plot+'\n'+
        "Actors in the Movie: "+ response.data.Actors);     
      },
      function(error) {
        console.log(error);
      }
    );
    
    }