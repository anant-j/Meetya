var app_id = "aFL4QgBGgMQEBj5Wr7Cd";
var app_code = "Gh8ACDRdrIseYJbn-qghQQ";
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/*
module.exports = (postal_code="", keyword="", all_places_details=[], context, callback) => {
    return callback(null, top(postal_code, keyword, all_places_details));
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
*/
module.exports = (postal_code, keyword, all_places_details=[], latlng_array=[], context, callback) => {
    return get_nearby_places(postal_code, keyword, all_places_details, latlng_array, callback);
}


function get_nearby_places(postal_code, keyword, all_places_details, latlng_array, callback) {
    get_latlng_from_postcode(postal_code, latlng_array, keyword, all_places_details, callback);
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
    // console.log(latlng_array[0]);
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
            callback(null, all_places_details);
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
