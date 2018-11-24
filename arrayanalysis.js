var indico = require('indico.io');
indico.apiKey = "f12ca69fa6d4c44e4932aba99ae8c5db";

//var fs = require('fs');
//var hugearray = fs.readFileSync('file.txt').toString().split("\n");
var hugearray= ["firstval", "secondval"];

// categories of our array 
var food = [];
var entertainment = [];

var logError = function(err) { console.log(err); }

for ( i = 0; i < hugearray.length; i++) {

    function one(callback){
    indico.relevance(hugearray[i], "food")
        .then(function(res) {
            callback(res);
        })
        .catch(logError);
    }

    function two(foodscore){
    indico.relevance(hugearray[i], "entertainment")
        .then(function(res) {
            if (foodscore >= res) {
                food.push(hugearray[i]);
                //console.log(food);
                }
            else if (foodscore < res) {
                entertainment.push(hugearray[i]);
                //console.log(entertainment);
            }
    })
    .catch(logError) 
    };

    one(two);
}

setTimeout(function() {
      console.log(food);
      console.log(entertainment);
    }, 5000)
 //console.log(food);
 //console.log(entertainment);