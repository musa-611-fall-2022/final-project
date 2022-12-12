/* =============================================================
This script contains functions dealing with the map
=============================================================== */

// Sets block group layer styles
function colorCoding(feature) {
  return {
    fillColor: "#c8b7d9",
    color: "white",
    weight: 1,
    dashArray: '3',
    fillOpacity: 0.5,
  }
}

// Initializes map with empty block group layer on screen, and returns map obj
function initMap() {
  const map = L.map('map', { maxZoom: 22, preferCanvas: true, zoomControl: false }).setView([39.98, -75.16], 11.5);

  // MapBox credentials
  const mapboxAccount = 'mapbox';
  const mapboxStyle = 'light-v10';
  const mapboxToken = 'pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g';

  const attributionHTML = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>';
  const tileLayerUrl = `https://api.mapbox.com/styles/v1/${mapboxAccount}/${mapboxStyle}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxToken}`;
  
  // Add tile layer
  L.tileLayer(tileLayerUrl, {
      maxZoom: 19,
      attribution: attributionHTML,
  }).addTo(map);

  // Change attribution position
  L.control.attribution({
    position: 'topright',
  }).addTo(map);

  // Initialize polygon layer for later
  map.blockGroupLayer = L.geoJSON(null, {
    style: colorCoding,
  }).addTo(map);

  return map;
}

// Fetches info to display and adds data to block group layer
async function addBlockGroups(map) {
  try {
    const resp = await fetch('./data/census-block-groups.geojson');
    const data = await resp.json();
    map.blockGroupLayer.addData(data);
    // console.log(data);
  } catch(err) {
    console.log(err);
  }
}

export {
  initMap,
  addBlockGroups,
};