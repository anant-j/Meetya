
var interests = [];

function myFunction() {
    var x = document.getElementById("myText").value;
    interests.push(x);
    document.getElementById('demo').innerHTML = interests;
}