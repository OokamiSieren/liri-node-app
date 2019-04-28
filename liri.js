require("dotenv").config();
var keys = require("./keys.js");
 //moment format
 var moment = require('moment');
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
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
}

// movie-this
function movieThis() {
// set variable to take user input
var movieName = process.argv.slice(3).join(" ");
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
