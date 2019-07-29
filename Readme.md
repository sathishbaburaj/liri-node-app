# liri-Bot
### Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface.
LIRI will be a command line node app that takes in parameters and gives you back data and it is based on Node.js.
 LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.


Using .gitignore, API keys are stored locally and kept safe through abstraction by .env, having users instead provide their own API keys if they intend to use the app.

All the data input by user is logged into the logs.txt file using fs.appendFile using the logThis() function.

![][/images/image1.JPG)

### Built With/Installations Required

*[Node.js] (https://nodejs.org/en/)

*[Node-File-System] (https://nodejs.org/api/fs.html)

*[Axios] (https://www.npmjs.com/package/axios)

*[DotEnv] (https://www.npmjs.com/package/dotenv)

*[JavaScript] (https://www.javascript.com/)

*[Moment.js] (https://www.npmjs.com/package/moment)

*[OMDB-API] (http://www.omdbapi.com)

*[Bandsintown-API] (http://www.artists.bandsintown.com/bandsintown-api)

*[Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)

### Command to run the App

1. node liri.js movie-this <movie name>

*  This command searches the movie database in OMDB API through Axios and returns information about the movie.It includes 

* Title of the movie
* Year the movie released
* IMDB rating
* Country where the movie produced
* Language of the movie
* Plot of the movie
* Actors in the movie

![](/images/movie-this1.PNG)
![](/images/movie-this2.PNG)