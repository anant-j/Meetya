var indico = require('indico.io');
indico.apiKey = "f12ca69fa6d4c44e4932aba99ae8c5db";

var hugearray= ["hi", "byre"];

// categories of our array 
var food = [];
var entertainment = [];

var logError = function(err) { console.log(err); }

for ( i = 0; i < hugearray.length; i++) {
    let foodscore = entscore = 0;

    function one(callback){
    indico.relevance(hugearray[i], "food")
        .then(function(res) {
            foodscore = res;
        })
        .catch(logError);
        callback(foodscore);
    }

    function two(foodscore){
    indico.relevance(hugearray[i], "entertainment")
        .then(function(res) {
            entscore = res;

            if (foodscore >= entscore) {
                food.push(hugearray[i]);
                }
            else if (foodscore < entscore) {
                entertainment.push(hugearray[i]);
            }
    })
    .catch(logError) 
    }; 
    one(two);
    console.log(food);
}