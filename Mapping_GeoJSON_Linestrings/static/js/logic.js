// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Option 1
// let map = L.map('mapid').setView([40.7, -94.5], 4);
// Create the map object with a center and zoom level.
// or Option 2 do the same thing
// let map = L.map("mapid", {
//     center: [
//         36.1733, -120.1794
//     ],
//     zoom: 7
// });

// // Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let sateliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    SateliteStreets: sateliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/kermitbravo/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data,
        {
            style: function (feature) {
                return {
                    color: "#ffffa1",
                    weight: 1
                };
            },
            onEachFeature: function (features, layer) {
                layer.bindPopup("<h3>" + features.properties.AREA_NAME + "</h3> <hr> <h2>" + features.properties.AREA_S_CD + "</h2>")
            }
        }
    ).addTo(map);
});


