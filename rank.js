var app_id = "aFL4QgBGgMQEBj5Wr7Cd";
var app_code = "Gh8ACDRdrIseYJbn-qghQQ";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = (postal_code = "N6G 2J8", keyword="sushi", all_places_details=[], context, callback) => {
    callback(null, top(postal_code, keyword, all_places_details));
}

async function top(postal_code, keyword, all_places_details) {
    get_nearby_places(postal_code, keyword, all_places_details);
    await sleep(1000);
    return get_top_five(all_places_details);
}
 
function get_top_five(all_places_details) {
    for (var i = 0; i < all_places_details.length; i++) {
        var price = Math.floor(Math.random()*3) + 1;
        all_places_details[i]["price"] = price;
    }
    all_places_details.sort(
        function(a, b) {
            if (a["price"] < b["price"])
                return -1;
            else if (a["price"] > b["price"])
                return 1;
             if (a["distance"] < b["distance"])
                return -1;
            else if (a["distance"] > b["distance"])
                return 1;
                
            return 0;
        }
    );
    
    if (all_places_details.length >= 5)
        return all_places_details.slice(0, 5);
    else
        return all_places_details;
}

async function get_nearby_places(postal_code, keyword, all_places_details) {
    latlng_array = [];
    get_latlng_from_postcode(postal_code, latlng_array);
    await sleep(500);
    places_search(latlng_array, keyword);
}

function places_search(latlng_array, keyword, all_places_details) { 
    getJSON(
        "https://geocoder.api.here.com/6.2/geocode.json?app_id=aFL4QgBGgMQEBj5Wr7Cd&app_code=Gh8ACDRdrIseYJbn-qghQQ&at=" + latlng_array[0].toString() + "," + latlng_array[1].toString() + "&q=" + keyword.replace(/ /g, "+"),
        function(data) {
            items_ = data["results"]["items"];
            for (var i = 0; i < items_.length; i++) {
                var place_details = new Object();
            
                place_details["name"] = items_[i].title;
                place_details["address"] = items_[i].vicinity;
                place_details["distance"] = items_[i].distance;
                place_details["rating"] = items_[i].averageRating;
                
                if (items_[i]["openingHours"] != null)
                    place_details["hours"] = items_[i]["openingHours"]["text"];
                else
                    place_details["hours"] = null;
                 all_places_details.push(place_details);
            }
        }
    );
}

function get_latlng_from_postcode(postal_code, latlng_array) {
    getJSON(
        "https://geocoder.api.here.com/6.2/geocode.json?app_id=aFL4QgBGgMQEBj5Wr7Cd&app_code=Gh8ACDRdrIseYJbn-qghQQ&searchtext=" + postal_code.replace(/ /g, "+"), 
        function(status, data) {
            if (status != null) {
                var location_ = data["Response"]["View"][0]["Result"][0]["Location"]["DisplayPosition"];
                latlng_array.push(location_.Latitude);
                latlng_array.push(location_.Longitude);
            }
        }
    );
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
        if (xhr.status === 200)
            callback(null, xhr.response);
        else
            callback(xhr.status, xhr.respons);
    };
    xhr.send();
};