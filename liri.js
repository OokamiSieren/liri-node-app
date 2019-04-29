// require the .env
require("dotenv").config();
//require the keys.js for security of spotify api id and key
var keys = require("./keys.js");
 //moment format
 var moment = require('moment');
 // spotify reqiure
 var Spotify = require('node-spotify-api');
 //require axios
var axios = require("axios");
// fs package to write and recieve packages
var fs = require("fs");

// variable for action in each function
var action = process.argv[2];
// set switch to run through the functions
switch(action) {
   case "movie-this":
   movieThis();
   break;

   case "concert-this":
   concertThis();
   break;
   
   case "spotify-this":
   spotifyThis();
   break;

   case "do-what-it-says":
   doWhatItSays();
   break;

}

// movie-this
function movieThis() {
// set variable to take user input
var movieName = process.argv.slice(3).join(" ");
// default variable if no user input
if (movieName == "") {
movieName = "Mr. Nobody";
}
// call omdbi api searching the movie name
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
     function(response) {
       console.log("Here is your movie information for " + movieName + " : "); 
        console.log("Title: " + response.data.Title);
        console.log("The date the movie was released: " + response.data.Released);
        console.log("The Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
       console.log("The IMDB Rating of the movie: " + response.data.imdbRating);
        console.log("The country of the movie: " + response.data.Country);
       console.log("The language of the movie: " + response.data.Language);
       console.log("The plot of the movie: " + response.data.Plot);
       console.log("The actors in the movie: " + response.data.Actors);
       }
    );
      };//end of movie-this function

    // Concert-this
    function concertThis(){
    // variable for user input of artist
    var artist = process.argv.slice(3).join(" ");
    // query for band api
    var bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //api call
    axios.get(bandQuery)
    .then(function(response) {
       console.log("The name of the next venue is " + response.data[0].venue.name + " and the location is " + response.data[0].venue.city + ", " + response.data[0].venue.country + ". " + "The next show is " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

   });
    }; //end of concert-this function

    function spotifyThis () {
       //variable for spotify key
       var spotify = new Spotify(keys.spotify);
       // variable for user song input
       var song = process.argv.slice(3).join(" ");
       // default variable if no user input
if (song == "") {
   song = "The Sign";
   }
// searching spotify
       spotify.search({ type: 'track', query: song }, function(err, data) {
         if (err) {
           return console.log('Error occurred: ' + err);
         }
        
       console.log("The artist for " + song + " is " + data.tracks.items[0].artists[0].name + ". "); 
       console.log("Here is a preview: " + data.tracks.items[0].preview_url)
       console.log("The name of the album that " + song + " is from: " + data.tracks.items[0].album.name + ". ");
       });

    };//end of spotify-this

// do-what-it-says
    function doWhatItSays() {
      fs.readFile("random.txt", "utf8", function(error, data) {
         if (error) {
            return console.log(error);
          }
      //variable to take text from random.txt and split it
      var output = data.split(",");
      // new action variable
      var action = output[0];
      // new input varible 
      var textInput = output[1];
      console.log(action,textInput);
      //call the spotify-this function to run new input
       spotifyThis(textInput);
      });

    };// end of do-what-it-says

    // writing a log of user data
    fs.appendFile("log.txt", action, function(err) {
      if (error) {
         return console.log(error);
       }

    });

    

