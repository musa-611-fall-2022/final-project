import neighborhoods from "../data/neighborhoods.js";

function initMap() {
  let map = L.map('map', { maxZoom: 22, preferCanvas: true }).setView([39.95, -75.16], 15);
  L.tileLayer(`https://api.mapbox.com/styles/v1/simran-aro-map/clbcy72bk001615nu08334s8v/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2ltcmFuLWFyby1tYXAiLCJhIjoiY2xhdTJlMm9yMDI1ZTN4cHJvZW51Nno4NCJ9.rcqye_8iI_wAlqbcNVTlog&zoomwheel=true&fresh=true#15.52/39.946911/-75.157241
  `, {
    maxZoom: 22,
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
  }).addTo(map);

  const phl = L.geoJSON(neighborhoods, {
    style: { fill: false, color: '#127782', weight: 1 },
  }).addTo(map);

  map.fitBounds(phl.getBounds());

  return map;
}

function makeStopFeature(stop) {
  return {
    'type': 'Feature',
    'properties': {
      'stopname': stop['stopname'],
    },
    'geometry': stop['geometry'],
  };
}

function showStopOnMap(stopToShow, map) {
  if (map.stopLayers !== undefined) {
    map.removeLayer(map.stopLayers);
  }

  const stopFeatureCollection = {
    'type': 'FeatureCollection',
    'features': stopToShow.map(makeStopFeature),
  };

  map.stopLayers = L.geoJSON(stopFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      radius: 2,
      fillColor: "red",
      weight: 0.255,
      opacity: 1,
      fillOpacity: 0.8
    },
  })
    .bindTooltip(layer => layer.feature.properties['name'])
    .addTo(map);
}

function makeFoodFeature(food) {
  return {
    'type': 'Feature',
    'properties': {
      'name': food['name'],
      'amenity': food['amenity'],
      'cuisine': food['cuisine'],
    },
    'geometry': food['geometry'],
  };
}

function showFoodOnMap(foodToShow, map) {
  if (map.foodLayers !== undefined) {
    map.removeLayer(map.foodLayers);
  }

  const foodFeatureCollection = {
    'type': 'FeatureCollection',
    'features': foodToShow.map(makeFoodFeature),
  };

  map.foodLayers = L.geoJSON(foodFeatureCollection, {
    pointToLayer: (geoJsonPoint, latlng) => L.circleMarker(latlng),
    style: {
      radius: 3,
      fillColor: "white",
      color: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    },
  })

    .bindTooltip(layer => layer.feature.properties['name'])
    .addTo(map);
}



export {
  initMap,
  showFoodOnMap,
  showStopOnMap,
};


