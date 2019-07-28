// Grab the axios package...
var axios = require("axios");
// Core node package for reading and writing files
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var userInput = process.argv[2];

var userQuery = "";

for (var i = 3; i < process.argv.length; i++) {
  if (i > 3 && i < process.argv.length) {
    userQuery += "+" + process.argv[i];
  } else {
    userQuery += process.argv[i];
  }
}

switch (userInput) {
  case "movie-this": {
    movieThis();
    break;
  }
  case "spotify-this-song": {
    spotifyThis();
    break;
  }
  case "concert-this": {
    concertThis();
    break;
  }
  case "do-what-it-says": {
    doWhatItSays();
    break;
  }
}
function movieThis() {
  if (!userQuery) {
    userQuery = "Mr." + "Nobody";
  }
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    userQuery +
    "&y=&plot=short&apikey=" +
    keys.movies.id;

  axios.get(queryUrl).then(
    function(response, error) {
        var movieObj = {"Title of the Movie: ": response.data.Title,
                        "Realeased Year: " :response.data.Year,
                        "IMDB Rating: " :response.data.imdbRating,
                        "Country where the movie was produced: " : response.data.Country,
                        "Language of the Movie: " :response.data.Language,
                        "Plot of the Movie: " :response.data.Plot,
                        "Actors in the Movie: " :response.data.Actors}

    Array.from(Object.keys(movieObj)).forEach(function(key){
        console.log(key  + movieObj[key]);
        logThis(key  + movieObj[key]);
      });
          
    },
    function(error) {
      console.log(error);
    }
  );
}

function spotifyThis() {
  var songName;
  if (!userQuery) {
    userQuery = "The" + " Sign" + " Ace" + " of" + " base";
  }
  spotify
    .search({ type: "track", query: userQuery })
    .then(function(response, error) {
      var userSong = response.tracks.items;
      var songObj = {"Artist(s) Name: "  : userSong[0].artists[0].name,
                        "Song's Name :"  : userSong[0].name,
                        "Preview Link : ": userSong[0].preview_url ,
                        "Album : "       : userSong[0].album.name
                    }
   
      Array.from(Object.keys(songObj)).forEach(function(key){
        console.log(key  + songObj[key]);
        logThis(key  + songObj[key]);
      });

    })
    .catch(function(error) {
      console.log(error);
    });
}
function concertThis() {
    if (!userQuery) {
    userQuery = "backstreet " + "boys";
  }
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    userQuery +
    "/events?app_id=" +
    keys.bands.id;

  axios.get(queryUrl).then(
    function(response, error) {     
        for(var i=0;i<response.data.length;i++){

        var concertObj = {"Venue name: " :response.data[i].venue.name,
                          "Venue Location: " :response.data[i].venue.city,
                          "Venue Country: "  :response.data[i].venue.country,
                          "Date of the Event: ":moment(response.data[i].datetime).format("L"),
                          "------------------":"-------------------------------------------"
                        }

        Array.from(Object.keys(concertObj)).forEach(function(key){
            console.log(key  + concertObj[key]);
            logThis(key  + concertObj[key]);       
        }       
  );
    }
},

function(error) {
    console.log(error);
  }
  );
}

  
function doWhatItSays() {
  // This block of code will read from the "movies.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data"
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // Then split it by commas
    var dataArr = data.split(",");
    userQuery = dataArr[1];
    // We will then use spotifyThis() to get the data for the Song from random.txt file
    spotifyThis(userQuery);
  });
}
function logThis(logquery){
// This block of code will create a file called "logs.txt".
// It will then print "Inception, Die Hard" in the file
fs.appendFile("logs.txt", logquery, function(err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }
  
    // Otherwise, it will print: "logs.txt was updated!"
    // console.log("logs.txt was updated!");
  
  });
}