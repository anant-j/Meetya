var app_id = "aFL4QgBGgMQEBj5Wr7Cd";
var app_code = "Gh8ACDRdrIseYJbn-qghQQ";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = (postal_code="N6G 2J8", keyword="sushi", all_places_details=[], latlng_array=[], context, callback) => {
    return get_nearby_places(postal_code, keyword, all_places_details, latlng_array, callback);
}

function get_nearby_places(postal_code, keyword, all_places_details, latlng_array, callback) {
    return get_latlng_from_postcode(postal_code, latlng_array, keyword, all_places_details, callback);
}

function get_latlng_from_postcode(postal_code, latlng_array, keyword, all_places_details, callback) {
    getJSON(
        "https://geocoder.api.here.com/6.2/geocode.json?app_id=aFL4QgBGgMQEBj5Wr7Cd&app_code=Gh8ACDRdrIseYJbn-qghQQ&searchtext=" + postal_code.replace(/ /g, "+"), 
        function(status, data) {
            if (status != null) {
                return;
            }
            var json = JSON.parse(data);
            var location_ = json["Response"]["View"][0]["Result"][0]["Location"]["DisplayPosition"];
            latlng_array.push(location_.Latitude);
            latlng_array.push(location_.Longitude);
            return places_search(latlng_array, keyword, all_places_details, callback);
        }
    );
}

function places_search(latlng_array, keyword, all_places_details, callback) {
    console.log(latlng_array[0]);
    getJSON(
        "https://places.api.here.com/places/v1/discover/search?app_id=aFL4QgBGgMQEBj5Wr7Cd&app_code=Gh8ACDRdrIseYJbn-qghQQ&at=" + latlng_array[0].toString() + "," + latlng_array[1].toString() + "&q=" + keyword.replace(/ /g, "+"),
        function(status, data) {
            if (status != null) {
                return;
            }
            var json = JSON.parse(data);
            var items_ = json["results"]["items"];
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
            
            console.log("done");
            callback(null, all_places_details.sort(
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
            )[0]);
        }
    );
}

var getJSON = function(url, callback_) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    
    xhr.responseType = "json";
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback_(null, xhr.responseText);
        } else {
            callback_(xhr.status, xhr.response);
        }
    };
    xhr.send();
};