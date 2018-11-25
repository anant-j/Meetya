// Returns the mode of an array. If multi-modal, returns one of the elements at
// random. If non-modal, returns a random element in the array.
module.exports.mode = function mode(array) {
    if (array.length == 0)
        return null;
    
    var modeMap = {};
    var stringsWithMaxCount = [];
    var maxCount = 1;
    
    // fill dict with counts of strings and get maxCount
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if (modeMap[el] > maxCount) {
            maxCount = modeMap[el];
        }
    }
    
    // fill array with strings with identical maxCount
    for (var key in modeMap) {
        if (modeMap[key] == maxCount) {
            stringsWithMaxCount.push(key);
        }
    }
    
    var rand = stringsWithMaxCount[Math.floor(Math.random()*stringsWithMaxCount.length)];
    return rand;
}