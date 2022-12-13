/* =============================================================
This script contains functions dealing with the map
=============================================================== */

// Arr that store map style quintile breaks
let quintiles = [];

// Sets block group layer styles (uniform color)
function monochromeStyle(feature) {
  return {
    fillColor: "#c8b7d9",
    color: "white",
    weight: 1,
    dashArray: '3',
    fillOpacity: 0.5,
  }
}

function getQuintileColor(val) {
  return val > quintiles[4] ? '#353797' :
         val > quintiles[3] ? '#5557c3' :
         val > quintiles[2] ? '#8e8fd7' :
         val > quintiles[1] ? '#c6c7eb' :
                              '#ffffff';
}

// Sets quintile display styles
function quintileStyle(feature) {
  return {
    fillColor: getQuintileColor(feature.properties.mapDisplayVal),
    color: "white",
    weight: 1,
    dashArray: '3',
    fillOpacity: 0.7,
  }
}

// Initializes map with empty block group layer on screen, and returns map obj
function initMap() {
  const map = L.map('map', { maxZoom: 22, preferCanvas: true, zoomControl: false }).setView([39.98, -75.16], 11.5);

  // MapBox credentials
  const mapboxAccount = 'mapbox';
  const mapboxStyle = 'light-v10';
  const mapboxToken = 'pk.eyJ1IjoibGktamllLWZqIiwiYSI6ImNsYWU2dWtqbzByZHYzb3F5dndrZm9vbXoifQ.RhKDjT-7I5oWlzeDbfrI9g';

  const attributionHTML = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
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
    style: monochromeStyle,
  }).addTo(map);

  return map;
}

async function fetchMapBaseData() {
  const resp = await fetch('./data/census-block-groups.geojson');
  const mapData = await resp.json();
  return mapData;
}

// Fetches info to display and adds data to block group layer
// `map` is the map object to add data to
// `mapBaseData` should be a global variable to update
async function addBlockGroups(map, mapBaseData) {
  try {
    mapBaseData = await fetchMapBaseData();
    map.blockGroupLayer.addData(mapBaseData);
    console.log(mapBaseData);
  } catch(err) {
    console.log(err);
  }
}

import { map } from './main.js';

// Merges data gotten from API to map base data
function mergeAttributeToMapData(mapBaseData, updateData, key) {
  for(const feature of mapBaseData.features) {
    for(let i = 0; i < updateData.length; i++) {
      const entry = updateData[i];
      if(entry.geoid == feature.properties.GEOID10) {
        // Update
        feature.properties.mapDisplayVal = entry[key];

        // get this out of the arr to make later processes faster
        updateData.splice(i, 1);
        break;
      }
    }
    if(feature.properties.mapDisplayVal == undefined) {
      feature.properties.mapDisplayVal = null;
    }
  }
  return mapBaseData;
}

function computeQuintiles(dataObject, key, ntiles) {
  const quintiles = [];
  // First turn object into array
  const ascArr = dataObject.map(item => Number(item[key])).sort((a, b) => a - b);
  const sectionLength = ascArr.length / ntiles;
  
  // Add the min
  quintiles.push(ascArr[0]);

  // Add the mid ntile-1 values
  for(let i = 1; i < ntiles; i++) {
    const thisLocation = Math.round(sectionLength * i) - 1;
    quintiles.push(ascArr[thisLocation]);
  }

  // Add the final one
  quintiles.push(ascArr[ascArr.length - 1]);
  return quintiles;
}

// Creates a data that joins information fetched from API to base map
function makeDisplayData(mapBaseData, mapUpdateData) {
  // First update mapUpdateData
  mapUpdateData.map(item => {
    item.geoid = '42101' + item.geoid;
  })

  // Copy a version
  const updateData = mapUpdateData.slice();

  // Get the key name of updateData (count, avg, or else)
  const key = Object.keys(updateData[0])[1];
  console.log('map update data hello', updateData);

  // Get quintiles of display data || Update the global arr
  quintiles = computeQuintiles(mapUpdateData, key, 5);

  // Merge info back to map base data
  mapBaseData = mergeAttributeToMapData(mapBaseData, updateData, key);

  map.blockGroupLayer.clearLayers();
  map.blockGroupLayer.addData(mapBaseData);
  map.blockGroupLayer.setStyle(quintileStyle);
  console.log('updated: ', mapBaseData);
}

export {
  initMap,
  addBlockGroups,
  fetchMapBaseData,
  makeDisplayData,
};