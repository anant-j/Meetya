
var interests = []; //this array will hold all interest items

function myFunction() {
    var x = document.getElementById("myText").value;
    interests.push(x);
    document.getElementById('demo').innerHTML = interests;
    return interests;
}

