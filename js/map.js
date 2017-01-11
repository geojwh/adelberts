//create var bounds
var northWest = L.latLng(36.91, -108.98),
    southEast = L.latLng(25.13, -79.46),
    bounds = L.latLngBounds(northWest, southEast);

//create map - zoom to var bounds
var map = L.map('map');
map.fitBounds(bounds);

//load osm basemap tiles
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//custom easy button control, zoom to var bounds
L.easyButton('fa-globe fa-lg', function(){
    map.fitBounds(bounds)
}).addTo(map);

//esri leaflet geocoder control
var searchControl = L.esri.Geocoding.geosearch().addTo(map);
var results = L.layerGroup().addTo(map);

//load counties.json, style based on distributor attribute, bindpopup
var countyPopup = function (feature, layer) {
    layer.bindPopup(feature.properties.COUNTY)
};

L.geoJson(counties, {
    onEachFeature: countyPopup,
    style: function (feature) {
        switch (feature.properties.DIST) {
        case 'Favorite Brands New Mexico':
            return { color: "#ff9900", fillOpacity: 0, weight: 2 };
        case 'L&F Distributors LLC':
            return { color: "#ff3333", fillOpacity: 0, weight: 2 };
        case 'Ben E. Keith':
            return { color: "#00cc66", fillOpacity: 0, weight: 2 };
        case 'Jack Hilliard Distributing':
            return { color: "#996633", fillOpacity: 0, weight: 2 };
        case 'Sons of John':
            return { color: "#9933ff", fillOpacity: 0, weight: 2 };
        case 'Crafty Connoisseurs Distributing':
            return { color: "#0066ff", fillOpacity: 0, weight: 2 };
        }
    }
}).addTo(map);

//Load states.json and style
L.geoJson(states, {
    style: function (feature) {
        return {color: "#666666", weight: 2.5, fillOpacity: 0, dashArray: "5"};
    }
}).addTo(map);

//load adelberts marker location and popup info
var beer = L.marker([30.3825210, -97.7199070], {title: "Adelberts Brewery"});

var beerContent = "<strong>Adelberts Brewery World Headquarters</strong>" + "<br>" + "2314 Rutland Drive, Suite #100" + "<br>" + "Austin, Texas 78758" + "<br>" + "(512) 662-1462 | <a href='http://adelbertsbeer.com/'>adelbertsbeer.com</a>";

beer.bindPopup(beerContent).addTo(map);

/*

*/