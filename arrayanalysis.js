var mode = require('./mode.js');
var rank = require('./rank.js');
var temp, temp2;

// dependencies
var indico = require('indico.io');
const BPromise = require('bluebird');
indico.apiKey = "f12ca69fa6d4c44e4932aba99ae8c5db";

//var fs = require('fs');
//var hugearray = fs.readFileSync('file.txt').toString().split("\n");
var hugearray= ["fish", "salmon", "nintendo", "sushi", "sushi", "bowling", "nintendo"];

// categories of our array 
var food = [];
var entertainment = [];

var logError = function(err) { console.log(err); }

// functions to call api and return relevance
function one(item){
    return indico.relevance(item, ["food"])
        .catch(logError);
    }
function two(item){
    return indico.relevance(item, ["entertainment"])
        .catch(logError);
    }

// promise function; will call functions (that call api), and sort elements into corresponding array
    BPromise.each(hugearray, (item) => { 
      return BPromise.all([one(item), two(item)])
      .spread((value1, value2) => {
        const array = value1[0] >= value2[0] ? food : entertainment;
        array.push(item);
      })

    
    })

// prints arrays: optional
    
    .then
    (function() {
    console.log("Food:", food);
    console.log("Entertainment:", entertainment);
    })
    
/*
// finds the common food for the categories
commonfood = mode(food);
commonent = mode(ent);
*/
// prints common variables (optional)
.then(function() {
    temp = mode.mode(food);
    temp2 = mode.mode(entertainment);
})
.then(function() {
    console.log("Most common food:", temp);
    console.log("Most common entertainment:", temp2);
    //console.log(rank("N6G 2J8", temp));
    //module.exports.entertainment(rank("N6G 2J8", temp2));
})

/*
// exports the objects
module.exports.commonfood;
module.exports.entertainment;
*/