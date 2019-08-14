// Grab the axios package...
var axios = require("axios");
var inquirer = require("inquirer");
// Core node package for reading and writing files
var fs = require("fs");
require("dotenv").config();
var keys = require("./keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var userQuery = "";
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "movie-this",
        "spotify-this-song",
        "concert-this",
        "do-what-it-says",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
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
        case "Exit": {
          console.log("Exiting the application");
          break;
        }
      }
    });
}
runSearch();
function movieThis() {
  inquirer
    .prompt({
      name: "movie",
      type: "input",
      message: "What movie would you like to search for?",
      default: "Mr." + " Nobody"
    })
    .then(function(answer) {
      var queryUrl =
        "http://www.omdbapi.com/?t=" +
        answer.movie +
        "&y=&plot=short&apikey=" +
        keys.movies.id;
      // Then run a request with axios to the OMDB API with the movie specified
      axios.get(queryUrl).then(
        function(response, error) {
          var movieObj = {
            "Title of the Movie: ": response.data.Title,
            "Realeased Year: ": response.data.Year,
            "IMDB Rating: ": response.data.imdbRating,
            "Country where the movie was produced: ": response.data.Country,
            "Language of the Movie: ": response.data.Language,
            "Plot of the Movie: ": response.data.Plot,
            "Actors in the Movie: ": response.data.Actors
          };

          Array.from(Object.keys(movieObj)).forEach(function(key) {
            console.log(key + movieObj[key]);
            logThis(key + movieObj[key]);
          });
        },
        function(error) {
          console.log(error);
        }
      );
    });
}

function spotifyThis() {
  if (!userQuery) {
    inquirer
      .prompt({
        name: "song",
        type: "input",
        message: "What song would you like to search for?",
        default: "The" + " Sign" + " Ace" + " of" + " base"
      })

      .then(function(answer) {
        userQuery = answer.song;
        spotifySearch();
      })

      .catch(function(error) {
        console.log(error);
      });

    // spotifySearch();
  }
}

function concertThis() {
  inquirer
    .prompt({
      name: "band",
      type: "input",
      message: "What band would you like to search for?",
      default: "backstreet " + "boys"
    })

    // Then run a request with axios to the OMDB API with the movie specified
    .then(function(answer) {
      var queryUrl =
        "https://rest.bandsintown.com/artists/" +
        answer.band +
        "/events?app_id=" +
        keys.bands.id;

      axios.get(queryUrl).then(
        function(response, error) {
          for (var i = 0; i < response.data.length; i++) {
            var concertObj = {
              "Venue name: ": response.data[i].venue.name,
              "Venue Location: ": response.data[i].venue.city,
              "Venue Country: ": response.data[i].venue.country,
              "Date of the Event: ": moment(response.data[i].datetime).format(
                "L"
              ),
              "------------------":
                "-------------------------------------------"
            };

            Array.from(Object.keys(concertObj)).forEach(function(key) {
              console.log(key + concertObj[key]);
              logThis(key + concertObj[key]);
            });
          }
        },

        function(error) {
          console.log(error);
        }
      );
    });
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
    console.log(userQuery);
    // We will then use spotifySearch() to get the data for the Song from random.txt file
    spotifySearch();
  });
}

function logThis(logquery) {
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
function spotifySearch() {
  spotify
    .search({ type: "track", query: userQuery })
    .then(function(response, error) {
      var userSong = response.tracks.items;
      for (var i = 0; i < userSong.length; i++) {
        console.log("Artist(s) :" + userSong[i].album.artists[0].name);
        console.log("Song's Name :" + userSong[i].name);
        console.log("Preview Link : " + userSong[i].preview_url);
        console.log("Album : " + userSong[i].album.name);
        console.log(
          "----------------------------------------------------------------------------------"
        );
        logThis("Artist(s) :" + userSong[i].album.artists[0].name);
        logThis("Song's Name :" + userSong[i].name);
        logThis("Preview Link : " + userSong[i].preview_url);
        logThis("Album : " + userSong[i].album.name);
      }
          });
}
