async function show_place(place_array) {
    await sleep(1000);
    
    var elem = document.getElementById("suggestion");
    elem.innerHTML = "";
    
    for (var i = 0; i < place_array.length; i++) {
        console.log("Hello\n");
        place = place_array[i];
        elem.innerHTML += "<p>\"name\": " + place["name"] + "</p>";
        elem.innerHTML += "<p>\"address\": " + place["address"] + "</p>";
        elem.innerHTML += "<p>\"distance (m)\": " + place["distance"] + "</p>";
        elem.innerHTML += "<p>\"rating (out of 5)\": " + place["distance"] + "</p>";
        elem.innerHTML += "<p>\"hours\": " + place["hours"] + "</p>";
        elem.innerHTML += "<p>\"price (out of 3)\": " + place["price"] + "</p>";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
