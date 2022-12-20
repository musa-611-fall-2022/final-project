/* global d3 API_KEY */

let earthquakes = new L.LayerGroup();
let tect = new L.LayerGroup();

let getUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let tectUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

function chooseColor(d) {
  return d > 90 ? '#e6537a' :
    d > 70 ? '#fbd580' :
      d > 50 ? '#f6faa5' :
        d > 30 ? '#c9ef9d' :
          d > 10 ? '#8cefec' :
            '#6f737c';
}

function createMap(earthquakes) {

  let streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  });

  let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY,
  });

  let outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY,
  });

  let baseMaps = {
    "Street Map": streetmap,
    "Satellite": satellite,
    "Outdoor": outdoor,
  };

  let overlayMaps = {
    Earthquakes: earthquakes,
    Tectonicplates: tect,
  };

  let myMap = L.map("map", {
    center: [
      50, -120,
    ],
    zoom: 4,
    layers: [streetmap, earthquakes],
  });

  d3.json(tectUrl, function(tData){
    L.geoJSON(tData, {

    }).addTo(tect);
    tect.addTo(myMap);
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
  }).addTo(myMap);

  let legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend'),
      magnitude = [-10, 10, 30, 50, 70, 90];
      // labels = [];

    for (let i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
        '<i style="background:' + chooseColor(magnitude[i] + 1) + '"></i> ' +
        magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(myMap);
}



function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> Location: " + feature.properties.place +
    "<h3> Magnitude: " + feature.properties.mag +
    "<h3> Depth: " + feature.geometry.coordinates[2] +
      "</h3><hr><p> Data: " + new Date(feature.properties.time) + "</p>");
  }

  earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: feature.properties.mag * 4,
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        weight: 1,
        opacity: 0.7,
        fillOpacity: 0.7,
      });
    },
  });

  createMap(earthquakes);
}
// Tectonic Plate data from: World tectonic plates and boundaries (Hugo Ahlenius)
// Dataset Site: https://github.com/fraxen/tectonicplates/tree/master/GeoJSON
// var tectUrl ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_steps.json"








d3.json(getUrl, function (data) {
  createFeatures(data.features);
});